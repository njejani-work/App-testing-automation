"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appiumPackageRoot = exports.npmPackage = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
function readPackageJsonSync() {
    let current = node_path_1.default.resolve(__dirname);
    const root = node_path_1.default.parse(current).root;
    let pkgRoot;
    while (true) {
        if (node_fs_1.default.existsSync(node_path_1.default.join(current, 'package.json'))) {
            pkgRoot = current;
            break;
        }
        if (current === root) {
            throw new Error(`Could not find \`package.json\` from ${__dirname}`);
        }
        current = node_path_1.default.dirname(current);
    }
    const pkg = JSON.parse(node_fs_1.default.readFileSync(node_path_1.default.join(pkgRoot, 'package.json'), 'utf8'));
    if (typeof pkg.name !== 'string' || typeof pkg.version !== 'string') {
        throw new Error(`Invalid \`package.json\` near ${__dirname}`);
    }
    return { pkgRoot, pkg: pkg };
}
const { pkg, pkgRoot } = readPackageJsonSync();
exports.npmPackage = pkg;
exports.appiumPackageRoot = pkgRoot;
//# sourceMappingURL=package-json.js.map