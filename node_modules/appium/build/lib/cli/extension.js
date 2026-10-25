"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandClasses = void 0;
exports.runExtensionCommand = runExtensionCommand;
const constants_1 = require("../constants");
const cli_args_guards_1 = require("../schema/cli-args-guards");
const driver_command_1 = __importDefault(require("./driver-command"));
const plugin_command_1 = __importDefault(require("./plugin-command"));
const utils_1 = require("./utils");
exports.commandClasses = Object.freeze({
    [constants_1.DRIVER_TYPE]: driver_command_1.default,
    [constants_1.PLUGIN_TYPE]: plugin_command_1.default,
});
/**
 * Executes a driver/plugin extension subcommand and returns the command result.
 *
 * When JSON output is enabled, this also prints the serialized command result
 * unless output was suppressed by the caller.
 */
async function runExtensionCommand(args, config) {
    // TODO driver config file should be locked while any of these commands are
    // running to prevent weird situations
    let jsonResult = {};
    const { extensionType: type } = config; // NOTE this is the same as `args.subcommand`
    if (!(0, cli_args_guards_1.isExtensionCommandArgs)(args)) {
        throw new TypeError(`Cannot call ${type} command without a subcommand like 'install'`);
    }
    let { json } = args;
    const { suppressOutput } = args;
    json = Boolean(json);
    if (suppressOutput) {
        json = true;
    }
    const CommandClass = exports.commandClasses[type];
    const cmd = new CommandClass({ config, json });
    try {
        jsonResult = (await cmd.execute(args));
    }
    catch (err) {
        // in the suppress output case, we are calling this function internally and should
        // just throw instead of printing an error and ending the process
        if (suppressOutput) {
            throw err;
        }
        (0, utils_1.errAndQuit)(json, err);
    }
    if (json && !suppressOutput) {
        console.log(JSON.stringify(jsonResult, null, utils_1.JSON_SPACES));
    }
    return jsonResult;
}
//# sourceMappingURL=extension.js.map