"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFrom = resolveFrom;
const promises_1 = require("node:fs/promises");
const node_module_1 = __importDefault(require("node:module"));
const node_path_1 = __importDefault(require("node:path"));
/**
 * Resolves `moduleId` using Node's module resolution from `fromDirectory`.
 *
 * @param fromDirectory - Directory to resolve from (typically a project or `APPIUM_HOME` root)
 * @param moduleId - Module id or path to resolve (e.g. `semver/package.json`)
 * @returns Resolved module id. Package paths are typically absolute filesystem paths; built-in
 *   modules may resolve to non-absolute ids (e.g. `node:fs`, `fs`).
 * @throws `Error` if Node cannot resolve `moduleId` from `fromDirectory`
 */
async function resolveFrom(fromDirectory, moduleId) {
    let resolvedFromDirectory;
    try {
        resolvedFromDirectory = await (0, promises_1.realpath)(fromDirectory);
    }
    catch (error) {
        const err = error;
        if (err.code === 'ENOENT') {
            resolvedFromDirectory = node_path_1.default.resolve(fromDirectory);
        }
        else {
            throw error;
        }
    }
    const fromFile = node_path_1.default.join(resolvedFromDirectory, 'noop.js');
    const nodeModule = node_module_1.default;
    return nodeModule._resolveFilename(moduleId, {
        id: fromFile,
        filename: fromFile,
        paths: nodeModule._nodeModulePaths(resolvedFromDirectory),
    });
}
//# sourceMappingURL=resolve-from.js.map