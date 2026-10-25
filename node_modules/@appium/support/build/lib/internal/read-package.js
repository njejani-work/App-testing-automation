"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageDirectorySync = packageDirectorySync;
exports.readPackageSync = readPackageSync;
exports.readPackage = readPackage;
const node_fs_1 = __importDefault(require("node:fs"));
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const normalize_package_data_1 = __importDefault(require("normalize-package-data"));
/** Finds the directory containing the nearest `package.json` by walking upward from `cwd`. */
function packageDirectorySync({ cwd } = {}) {
    let dir = node_path_1.default.resolve(cwd ?? process.cwd());
    const fsRoot = node_path_1.default.parse(dir).root;
    while (true) {
        if (node_fs_1.default.existsSync(node_path_1.default.join(dir, 'package.json'))) {
            return dir;
        }
        if (dir === fsRoot) {
            return undefined;
        }
        dir = node_path_1.default.dirname(dir);
    }
}
function readPackageSync(options = {}) {
    const { cwd, normalize = true } = options;
    const contents = node_fs_1.default.readFileSync(getPackagePath(cwd), 'utf8');
    return parsePackageJson(contents, normalize);
}
async function readPackage(options = {}) {
    const { cwd, normalize = true } = options;
    const contents = await promises_1.default.readFile(getPackagePath(cwd), 'utf8');
    return parsePackageJson(contents, normalize);
}
function getPackagePath(cwd) {
    return node_path_1.default.resolve(cwd ?? process.cwd(), 'package.json');
}
function parsePackageJson(contents, normalize = true) {
    const json = JSON.parse(contents);
    if (normalize === false) {
        return json;
    }
    (0, normalize_package_data_1.default)(json);
    return json;
}
//# sourceMappingURL=read-package.js.map