import path from 'node:path'
import fsp, { writeFile } from 'node:fs/promises'
import os from 'node:os'
import cp from 'node:child_process'
import { format } from 'node:util'

import { BlobReader, BlobWriter, ZipReader, type FileEntry } from '@zip.js/zip.js'
import { EnvHttpProxyAgent, fetch, getGlobalDispatcher, type RequestInit } from 'undici'

import findEdgePath from './finder.js'
import { TAGGED_VERSIONS, EDGE_PRODUCTS_API, TAGGED_VERSION_URL, LATEST_RELEASE_URL, DOWNLOAD_URL, BINARY_FILE, log } from './constants.js'
import { hasAccess, getNameByArchitecture, sleep, extractBasicAuthFromUrl } from './utils.js'

interface ProductAPIResponse {
    Product: string
    Releases: {
        Platform: string
        Architecture: string
        ProductVersion: string
    }[]
}

// undici's own fetch: Node's built-in fetch ignores `agent`, and its bundled undici differs per Node version.
/**
 * A dispatcher set with undici's setGlobalDispatcher wins, as it did through Node's fetch in 7.x
 * (WebdriverIO's proxy docs suggest one). Else the agent reads HTTPS_PROXY / HTTP_PROXY / NO_PROXY
 * (and their lower-case forms). Read per request: WebdriverIO sets it after this module has loaded.
 */
let envProxyAgent: EnvHttpProxyAgent | undefined
function fetchOpts (): RequestInit {
    const globalDispatcher = getGlobalDispatcher()
    // a plain Agent is undici's default
    if (globalDispatcher.constructor.name !== 'Agent') {
        return { dispatcher: globalDispatcher }
    }
    envProxyAgent ??= new EnvHttpProxyAgent()
    return { dispatcher: envProxyAgent }
}

export async function download (
    edgeVersion: string | undefined = process.env.EDGEDRIVER_VERSION,
    cacheDir: string = process.env.EDGEDRIVER_CACHE_DIR || os.tmpdir()
) {
    const binaryFilePath = path.resolve(cacheDir, BINARY_FILE)
    if (await hasAccess(binaryFilePath)) {
        return binaryFilePath
    }

    if (!edgeVersion) {
        const edgePath = findEdgePath()
        if (!edgePath) {
            throw new Error('Could not find Microsoft Edge binary, please make sure the browser is installed on your system.')
        }

        log.info(`Trying to detect Microsoft Edge version from binary found at ${edgePath}`)
        edgeVersion = os.platform() === 'win32' ? await getEdgeVersionWin(edgePath) : await getEdgeVersionUnix(edgePath)
        if (!edgeVersion) {
            throw new Error(`Could not detect Microsoft Edge version from binary found at ${edgePath}`)
        }
        log.info(`Detected Microsoft Edge v${edgeVersion}`)
    }

    const version = await fetchVersion(edgeVersion)
    const res = await downloadDriver(version)

    await fsp.mkdir(cacheDir, { recursive: true })
    await downloadZip(res, cacheDir)
    await fsp.chmod(binaryFilePath, '755')
    log.info('Finished downloading Edgedriver')
    await sleep() // wait for file to be accessible, avoid ETXTBSY errors
    return binaryFilePath
}

/**
 * Every CDN request goes through here: fetch rejects a URL with `user:pass@`, so the
 * credentials of `EDGEDRIVER_CDNURL` move into an Authorization header. `url` has none,
 * so it is the one to log.
 */
function fetchCdn (rawUrl: string) {
    const { url, authHeader } = extractBasicAuthFromUrl(rawUrl)
    const opts = fetchOpts()
    if (authHeader) {
        opts.headers = { Authorization: authHeader }
    }
    return { url, response: fetch(url, opts) }
}

async function downloadDriver(version: string) {
    try {
        const { url: downloadUrl, response } = fetchCdn(format(DOWNLOAD_URL, version, getNameByArchitecture()))
        log.info(`Downloading Edgedriver from ${downloadUrl}`)
        const res = await response

        if (!res.body || !res.ok || res.status !== 200) {
            throw new Error(`Failed to download binary from ${downloadUrl} (statusCode ${res.status})`)
        }

        return res
    } catch (err) {
        const majorVersion = version.split('.')[0]
        const latestVersion = await fetchVersion(majorVersion)
        if (latestVersion !== version) {
            log.error(`Failed to download Edgedriver for version ${version}, retrying with the per architecture detected latest version ${latestVersion}`)
            return await downloadDriver(latestVersion)
        }

        throw new Error(`Failed to download Edgedriver: ${err instanceof Error ? err.message : err}`)
    }
}

export async function getEdgeVersionWin (edgePath: string) {
    const versionPath = path.dirname(edgePath)
    const contents = await fsp.readdir(versionPath)
    const versions = contents.filter((p) => /^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/g.test(p))

    // returning oldest in case there is an updated version and Edge still hasn't relaunched;
    // compare part by part as numbers: as text, '154.0.4258.62' sorts before '154.0.4258.9'
    const oldest = versions.sort((a, b) => {
        const [x, y] = [a.split('.').map(Number), b.split('.').map(Number)]
        return x.map((part, i) => part - y[i]).find((diff) => diff !== 0) ?? 0
    })[0]
    return oldest
}

export async function getEdgeVersionUnix (edgePath: string) {
    log.info(`Trying to detect Microsoft Edge version from binary found at ${edgePath}`)
    // execFile, not exec: no shell, so quotes or `$(...)` in the path stay literal
    const versionOutput = await new Promise<string>((resolve, reject) => cp.execFile(edgePath, ['--version'], (err, stdout, stderr) => {
        if (err) {
            return reject(err)
        }
        if (stderr) {
            return reject(new Error(stderr))
        }
        return resolve(stdout)
    }))
    /**
     * example output: "Microsoft Edge 124.0.2478.105 unknown"
     */
    return versionOutput
    /**
     * trim the output
     */
        .trim()
    /**
     * split by space, e.g. `[Microsoft, Edge, 124.0.2478.105, unknown]
     */
        .split(' ')
    /**
     * filter for entity that matches the version pattern, e.g. `124.0.2478.105`
     */
        .filter((v) => v.match(/\d+\.\d+\.\d+\.\d+/g))
    /**
     * get the first entity
     */
        .pop()
}

export async function fetchVersion (edgeVersion: string) {
    const p = os.platform()
    const platform = p === 'win32' ? 'windows' : p === 'darwin' ? 'macos' : 'linux'

    /**
     * if version has 4 digits it is a valid version, e.g. 109.0.1467.0
     */
    if (edgeVersion.split('.').length === 4) {
        return edgeVersion
    }

    /**
     * if browser version is a tagged version, e.g. stable, beta, dev, canary
     */
    if (TAGGED_VERSIONS.includes(edgeVersion.toLowerCase())) {
        const products = await fetch(EDGE_PRODUCTS_API, fetchOpts())
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`statusCode ${res.status}`)
                }
                return await res.json() as ProductAPIResponse[]
            })
            .catch((err) => {
                // the CDN below still answers for tagged versions
                log.error(`Couldn't fetch version from ${EDGE_PRODUCTS_API}: ${err.stack}`)
                return [] as ProductAPIResponse[]
            })
        const product = products.find((p) => p.Product.toLowerCase() === edgeVersion.toLowerCase())
        const productVersion = product?.Releases.find((r) => (
            /**
             * On Mac we all product versions are universal to its architecture
             */
            (platform === 'macos' && r.Platform === 'MacOS') ||
      /**
       * On Windows we need to check for the architecture
       */
      (platform === 'windows' && r.Platform === 'Windows' && os.arch() === r.Architecture) ||
      /**
       * On Linux we only have one architecture
       */
      (platform === 'linux' && r.Platform === 'Linux')
        ))?.ProductVersion

        if (productVersion) {
            return productVersion
        }

        const res = await fetchCdn(format(TAGGED_VERSION_URL, edgeVersion.toUpperCase())).response
        if (res.status !== 200) {
            throw new Error(`Couldn't fetch the latest ${edgeVersion} version (statusCode ${res.status}): ${res.statusText}`)
        }
        return sanitizeVersion(await res.text())
    }

    /**
     * check for a number in the version and check for that
     */
    const MATCH_VERSION = /\d+/g
    const versionMatch = edgeVersion.match(MATCH_VERSION)
    if (versionMatch) {
        const [major] = versionMatch
        const { url, response } = fetchCdn(format(LATEST_RELEASE_URL, major.toString().toUpperCase(), platform.toUpperCase()))
        log.info(`Fetching latest version from ${url}`)
        const res = await response
        if (!res.ok || res.status !== 200) {
            throw new Error(`Couldn't detect version for ${edgeVersion}`)
        }

        return sanitizeVersion(await res.text())
    }

    throw new Error(`Couldn't detect version for ${edgeVersion}`)
}

async function downloadZip(res: Awaited<ReturnType<typeof fetch>>, cacheDir: string) {
    const zipBlob = await res.blob()
    const zip = new ZipReader(new BlobReader(zipBlob))
    const resolvedCacheDir = path.resolve(cacheDir)
    for (const entry of await zip.getEntries()) {
        const unzippedFilePath = path.join(cacheDir, entry.filename)
        if (entry.directory) {
            continue
        }
        /**
         * guard against Zip Slip: a malicious archive could contain entries
         * with `../` or absolute paths that escape the cache directory
         */
        const resolvedPath = path.resolve(unzippedFilePath)
        if (resolvedPath !== resolvedCacheDir && !resolvedPath.startsWith(resolvedCacheDir + path.sep)) {
            throw new Error(`Zip entry "${entry.filename}" resolves outside the cache directory`)
        }
        const fileEntry = entry as FileEntry
        if (!await hasAccess(path.dirname(unzippedFilePath))) {
            await fsp.mkdir(path.dirname(unzippedFilePath), { recursive: true })
        }
        const content = await fileEntry.getData<Blob>(new BlobWriter())
        await writeFile(unzippedFilePath, content.stream())
    }
}

/**
 * Fetching the latest version from the CDN contains extra characters that need to be removed,
 * e.g. "��127.0.2651.87\n\n"
 */
function sanitizeVersion (version: string) {
    return version.replace(/\0/g, '').slice(2).trim()
}

/**
 * True when this module was invoked directly as the package's postinstall
 * entrypoint (`dist/install.js`), as opposed to being imported as a dependency.
 */
export function isAutoInstallEntrypoint (argv1: string | undefined) {
    if (!argv1) {
        return false
    }
    const installJsPath = path.join('dist', 'install.js')
    return path.normalize(argv1).endsWith(path.sep + installJsPath)
}

/**
 * download on install
 */
if (isAutoInstallEntrypoint(process.argv[1]) && Boolean(process.env.EDGEDRIVER_AUTO_INSTALL)) {
    // no top-level await: it would make `require('edgedriver')` (require(esm)) throw
    void download().then(
        () => log.info('Success!'),
        (err) => log.error(`Failed to install Edgedriver: ${err.stack}`)
    )
}
