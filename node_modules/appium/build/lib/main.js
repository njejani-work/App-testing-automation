#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAppiumHome = exports.validate = exports.getSchema = exports.finalizeSchema = exports.readConfigFile = void 0;
exports.init = init;
exports.main = main;
require("./logsink"); // must run first: global npmlog / log sink setup (see logsink module)
require("./logger"); // load Appium logger immediately after logsink (order matters for log wiring)
const support_1 = require("@appium/support");
const appium_initializer_1 = require("./bootstrap/appium-initializer");
const appium_main_runner_1 = require("./bootstrap/appium-main-runner");
const initializer = new appium_initializer_1.AppiumInitializer();
const mainRunner = new appium_main_runner_1.AppiumMainRunner();
/**
 * Initializes Appium, but does not start the server.
 *
 * Use this to get at the configuration schema.
 *
 * If `args` contains a non-empty `subcommand` which is not `server`, this function will return an empty object.
 */
async function init(args) {
    return initializer.init(args);
}
/**
 * Initializes Appium's config. Starts server if appropriate and resolves the
 * server instance if so; otherwise resolves with `undefined`.
 */
async function main(args) {
    const initResult = await init(args);
    return mainRunner.run(initResult, args);
}
// NOTE: backwards compat for scripts referencing `build/lib/main.js` directly.
// The executable is `../index.js`, so that module will typically be `require.main`.
if (require.main === module) {
    void main();
}
// Re-export helpers from the same package so `import { … } from 'appium'` stays a supported
// programmatic API (this file is the package `types` entry). The monorepo does not import these
// from `'appium'`; consumers use local paths or `@appium/support`. Dropping them is semver-major.
var config_file_1 = require("./bootstrap/config-file");
Object.defineProperty(exports, "readConfigFile", { enumerable: true, get: function () { return config_file_1.readConfigFile; } });
var schema_1 = require("./schema/schema");
Object.defineProperty(exports, "finalizeSchema", { enumerable: true, get: function () { return schema_1.finalizeSchema; } });
Object.defineProperty(exports, "getSchema", { enumerable: true, get: function () { return schema_1.getSchema; } });
Object.defineProperty(exports, "validate", { enumerable: true, get: function () { return schema_1.validate; } });
exports.resolveAppiumHome = support_1.env.resolveAppiumHome;
//# sourceMappingURL=main.js.map