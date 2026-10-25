import os from 'node:os'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'

import decamelize from 'decamelize'

import type { EdgedriverParameters } from './types.js'

interface Priorities {
    regex: RegExp
    weight: number
}

export function getNameByArchitecture() {
    const platformIdentifier = os.platform() === 'win32'
        ? 'win'
        : os.platform() === 'darwin'
            ? 'mac'
            : 'linux'
    const arch = ['arm64', 'ppc64', 'x64', 's390x'].includes(os.arch())
        ? '64' + (os.platform() === 'darwin' && os.arch() === 'arm64' ? '_m1' : '')
        : '32'
    return `edgedriver_${platformIdentifier}${arch}`
}

const EXCLUDED_PARAMS = ['version', 'help']
export function parseParams(params: EdgedriverParameters) {
    return Object.entries(params)
        .filter(([key,]) => !EXCLUDED_PARAMS.includes(key))
        .map(([key, val]) => {
            if (typeof val === 'boolean' && !val) {
                return ''
            }
            const vals = Array.isArray(val) ? val : [val]
            return vals.map((v) => `--${decamelize(key, { separator: '-' })}${typeof v === 'boolean' ? '' : `=${v}`}`)
        })
        .flat()
        .filter(Boolean)
}

/**
 * helper utility to clone a list
 * @param  {Any[]} arr  list of things
 * @return {Any[]}      new list of same things
 */
export function uniq(arr: string[]) {
    return Array.from(new Set(arr))
}

export function sort(installations: string[], priorities: Priorities[]) {
    const defaultPriority = 10
    return installations
    // assign priorities
        .map((inst) => {
            for (const pair of priorities) {
                if (pair.regex.test(inst)) {
                    return { path: inst, weight: pair.weight }
                }
            }

            return { path: inst, weight: defaultPriority }
        })
    // sort based on priorities
        .sort((a, b) => (b.weight - a.weight))
    // remove priority flag
        .map(pair => pair.path)
}

/**
 * First executable named `executable` in a PATH directory, like `which`
 */
export function findOnPath(executable: string, envPath = process.env.PATH) {
    for (const dir of (envPath ?? '').split(path.delimiter).filter(Boolean)) {
        const candidate = path.join(dir, executable)
        try {
            fs.accessSync(candidate, fs.constants.X_OK)
            if (fs.statSync(candidate).isFile()) {
                return candidate
            }
        } catch {
            // not in this directory, or not executable
        }
    }
}

/**
 * Look for edge executables on PATH
 */
export function findByWhich(executables: string[], priorities: Priorities[]) {
    const installations = executables
        .map((executable) => findOnPath(executable))
        .filter((browserPath): browserPath is string => Boolean(browserPath))

    return sort(uniq(installations), priorities)
}

/**
 * Helper utility to check file access
 * @param {string} file file to check access for
 * @return              true if file can be accessed
 */
export function hasAccessSync(filePath: string) {
    if (!filePath) {
        return false
    }
    try {
        fs.accessSync(filePath)
        return true
    } catch {
        return false
    }
}

export async function hasAccess(filePath: string) {
    return fsp.access(filePath).then(() => true, () => false)
}

export function sleep (ms = 100) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export interface BasicAuthResult {
    url: string
    authHeader?: string
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
 * Extract Basic Auth credentials from a URL and return the cleaned URL with auth header.
 * This is needed because fetch() doesn't support URLs with embedded credentials.
 * @param urlString URL that may contain credentials (e.g., https://user:pass@host/)
 * @returns Object with cleaned URL and optional Authorization header
 */
export function extractBasicAuthFromUrl(urlString: string): BasicAuthResult {
    try {
        const url = new URL(urlString)
        if (url.username || url.password) {
            // URL keeps them percent-encoded (`p%40ss`); the header needs the real `p@ss`
            const credentials = Buffer.from(`${decodeCredential(url.username)}:${decodeCredential(url.password)}`).toString('base64')
            url.username = ''
            url.password = ''
            return {
                url: url.toString(),
                authHeader: `Basic ${credentials}`
            }
        }
    } catch {
        // If URL parsing fails, return original string
    }
    return { url: urlString }
}
