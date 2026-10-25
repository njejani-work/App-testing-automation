/**
 * Resolves `moduleId` using Node's module resolution from `fromDirectory`.
 *
 * @param fromDirectory - Directory to resolve from (typically a project or `APPIUM_HOME` root)
 * @param moduleId - Module id or path to resolve (e.g. `semver/package.json`)
 * @returns Resolved module id. Package paths are typically absolute filesystem paths; built-in
 *   modules may resolve to non-absolute ids (e.g. `node:fs`, `fs`).
 * @throws `Error` if Node cannot resolve `moduleId` from `fromDirectory`
 */
export declare function resolveFrom(fromDirectory: string, moduleId: string): Promise<string>;
//# sourceMappingURL=resolve-from.d.ts.map