import os from 'node:os'
import util from 'node:util'
import fs from 'node:fs/promises'

import decamelize from 'decamelize'
import { fetch, type RequestInit, type Response } from 'undici'

import { GECKODRIVER_DOWNLOAD_PATH } from './constants.js'
import type { GeckodriverParameters } from './types.js'

const RETRY_DELAY = 100

export async function hasAccess(filePath: string) {
    return fs.access(filePath).then(() => true, () => false)
}

export function getDownloadUrl(version: string) {
    const platformIdentifier = os.platform() === 'win32'
        ? 'win'
        : os.platform() === 'darwin'
            ? 'macos'
            : 'linux'
    const arch = os.arch() === 'arm64'
        ? '-aarch64'
        : platformIdentifier === 'macos'
            ? ''
            : os.arch() === 'x64'
                ? '64'
                : '32'
    const ext = os.platform() === 'win32' ? '.zip' : '.tar.gz'
    return util.format(GECKODRIVER_DOWNLOAD_PATH, version, version, platformIdentifier, arch, ext)
}

const EXCLUDED_PARAMS = ['version', 'help']
export function parseParams(params: GeckodriverParameters) {
    return Object.entries(params)
        .filter(([key,]) => !EXCLUDED_PARAMS.includes(key))
        .map(([key, val]) => {
            if (typeof val === 'boolean' && !val) {
                return ''
            }
            const values = Array.isArray(val) ? val : [val]
            return values.map((v) => `--${decamelize(key, { separator: '-' })}${typeof v === 'boolean' ? '' : `=${v}`}`)
        })
        .flat()
        .filter(Boolean)
}

export async function retryFetch(url: string, opts: RequestInit = {}, retry = 3): Promise<Response> {
    while (retry > 0) {
        try {
            return await fetch(url, opts)
        } catch (e) {
            retry = retry - 1
            if (retry === 0) {
                throw e
            }
            await sleep(RETRY_DELAY)
        }
    }
    throw new Error('Failed to fetch after retries')
}

/**
 * A bare `%` (`p%ss`) is not percent-encoding: keep it as text. If decodeURIComponent threw here,
 * the caller would get back, and log, the URL with the password in it.
 */
function decodeCredential (value: string) {
    try {
        return decodeURIComponent(value)
    } catch {
        return value
    }
}

/**
 * fetch rejects a URL with `user:pass@`: move the credentials of `GECKODRIVER_CDNURL` into an
 * Authorization header. The returned `url` has none, so it is the one to log.
 */
export function extractBasicAuthFromUrl(urlString: string): { url: string, authHeader?: string } {
    try {
        const url = new URL(urlString)
        if (url.username || url.password) {
            // URL keeps them percent-encoded (`p%40ss`); the header needs the real `p@ss`
            const credentials = Buffer.from(`${decodeCredential(url.username)}:${decodeCredential(url.password)}`).toString('base64')
            url.username = ''
            url.password = ''
            return { url: url.toString(), authHeader: `Basic ${credentials}` }
        }
    } catch {
        // not a valid URL: let fetch report it
    }
    return { url: urlString }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
