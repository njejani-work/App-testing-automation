/**
 * @license Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execSync } from 'node:child_process'

import { sort, findByWhich, hasAccessSync, uniq } from './utils.js'

interface ApplicationDataType {
    SPApplicationsDataType: {
        info: string
        path: string
    }[]
}

const DARWIN_LIST_APPS = 'system_profiler SPApplicationsDataType -json'
const darwinGetAppPaths = (app: string) => {
    const apps: ApplicationDataType = JSON.parse(execSync(DARWIN_LIST_APPS).toString())
    const appPaths = apps.SPApplicationsDataType
        .filter(inst => inst.info && inst.info.startsWith(app))
        .map(inst => inst.path)

    return appPaths
}

const darwinGetInstallations = (appPaths: string[], suffixes: string[]) => {
    const installations: string[] = []
    appPaths.forEach((inst) => {
        suffixes.forEach(suffix => {
            const execPath = path.join(inst.substring(0, inst.indexOf('.app') + 4).trim(), suffix)
            if (hasAccessSync(execPath) && installations.indexOf(execPath) === -1) {
                installations.push(execPath)
            }
        })
    })
    return installations
}

const EDGE_BINARY_NAMES = ['edge', 'msedge', 'microsoft-edge', 'microsoft-edge-stable', 'microsoft-edge-beta', 'microsoft-edge-dev']
const EDGE_REGEX = /((ms|microsoft))?-?edge-?((stable|dev|beta))?/g

function darwin() {
    const suffixes = [
        '/Contents/MacOS/Microsoft Edge'
    ]

    const appName = 'Microsoft Edge'
    const defaultPath = `/Applications/${appName}.app${suffixes[0]}`

    let installations
    if (hasAccessSync(defaultPath)) {
        installations = [defaultPath]
    } else {
        const appPaths = darwinGetAppPaths(appName)
        installations = darwinGetInstallations(appPaths, suffixes)
    }

    // Retains one per line to maintain readability.
    // clang-format off
    const priorities = [
        { regex: new RegExp(`^${process.env.HOME}/Applications/.*Microsoft Edge.app`), weight: 50 },
        { regex: /^\/Applications\/.*Microsoft Edge.app/, weight: 100 },
        { regex: /^\/Volumes\/.*Microsoft Edge.app/, weight: -2 }
    ]

    const whichFinds = findByWhich(
        EDGE_BINARY_NAMES,
        [{ regex: EDGE_REGEX, weight: 51 }]
    )
    const installFinds = sort(installations, priorities)
    return [...installFinds, ...whichFinds]
}

/**
 * Look for linux executables in 3 ways
 * 1. Look into the directories where .desktop are saved on gnome based distros
 * 2. Look for edge by using the which command
 */
function linux() {
    let installations: string[] = []

    // 1. Look into the directories where .desktop are saved on gnome based distros
    const desktopInstallationFolders = [
        path.join(os.homedir(), '.local/share/applications/'),
        '/usr/share/applications/',
    ]
    desktopInstallationFolders.forEach(folder => {
        installations = installations.concat(findEdgeExecutables(folder))
    })

    // PATH first keeps the result of installs that already worked; .desktop entries are the fallback
    const whichFinds = findByWhich(
        EDGE_BINARY_NAMES,
        [{ regex: EDGE_REGEX, weight: 51 }]
    )
    return uniq([...whichFinds, ...installations])
}

function win32() {
    const installations: string[] = []
    const suffixes = [
        `${path.sep}Microsoft${path.sep}Edge${path.sep}Application${path.sep}edge.exe`,
        `${path.sep}Microsoft${path.sep}Edge${path.sep}Application${path.sep}msedge.exe`,
        `${path.sep}Microsoft${path.sep}Edge Dev${path.sep}Application${path.sep}msedge.exe`
    ]

    const prefixes = [
        process.env.LOCALAPPDATA || '', process.env.PROGRAMFILES || '', process.env['PROGRAMFILES(X86)'] || ''
    ].filter(Boolean)

    prefixes.forEach(prefix => suffixes.forEach(suffix => {
        const edgePath = path.join(prefix, suffix)
        if (hasAccessSync(edgePath)) {
            installations.push(edgePath)
        }
    }))

    return installations
}

// e.g. `Exec=/usr/bin/microsoft-edge-stable %U`: the binary is the first word of the value
const EXEC_LINE_REGEX = /^Exec=(\/\S+)/gm
const EDGE_BINARY_NAME_REGEX = /^(microsoft-edge|msedge)/

/**
 * `*.desktop` files under `dir`, skipping folders that can't be read: one unreadable
 * subfolder must not stop the search (a recursive `readdirSync` throws on the first one)
 */
function listDesktopFiles(dir: string): string[] {
    let entries: fs.Dirent[]
    try {
        entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
        return []
    }
    return entries.flatMap((entry) => {
        const entryPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            return listDesktopFiles(entryPath)
        }
        return entry.name.endsWith('.desktop') && (entry.isFile() || entry.isSymbolicLink()) ? [entryPath] : []
    })
}

function findEdgeExecutables(folder: string) {
    const installations: string[] = []

    // read the files directly: a shell `grep ... ${folder}` broke on a home folder with a space
    for (const desktopFile of listDesktopFiles(folder)) {
        let content: string
        try {
            content = fs.readFileSync(desktopFile, 'utf8')
        } catch {
            continue
        }
        for (const [, execPath] of content.matchAll(EXEC_LINE_REGEX)) {
            if (EDGE_BINARY_NAME_REGEX.test(path.basename(execPath)) && hasAccessSync(execPath)) {
                installations.push(execPath)
            }
        }
    }

    return installations
}

export default () => {
    /**
     * Check for the EDGE_BINARY_PATH env variable
     */
    const binaryPathEnv = process.env.EDGE_BINARY_PATH
    if (typeof binaryPathEnv === 'string' && binaryPathEnv) {
        return process.env.EDGE_BINARY_PATH
    }

    if (os.platform() === 'win32') {
        return win32()[0]
    }
    if (os.platform() === 'darwin') {
        return darwin()[0]
    }

    return linux()[0]
}
