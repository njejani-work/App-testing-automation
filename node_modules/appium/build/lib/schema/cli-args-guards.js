"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isServerCommandArgs = isServerCommandArgs;
exports.isSetupCommandArgs = isSetupCommandArgs;
exports.isExtensionCommandArgs = isExtensionCommandArgs;
exports.isDriverCommandArgs = isDriverCommandArgs;
exports.isPluginCommandArgs = isPluginCommandArgs;
const constants_1 = require("../constants");
/**
 * Type guard: args are for the server command.
 *
 * @param args - Parsed args before full subcommand-specific narrowing
 */
function isServerCommandArgs(args) {
    return args.subcommand === constants_1.SERVER_SUBCOMMAND;
}
/**
 * Type guard: args are for the setup command.
 *
 * @param args - Parsed args before full subcommand-specific narrowing
 */
function isSetupCommandArgs(args) {
    return args.subcommand === constants_1.SETUP_SUBCOMMAND;
}
/**
 * Type guard: args are for an extension command (driver or plugin).
 *
 * @param args - Parsed args before full subcommand-specific narrowing
 */
function isExtensionCommandArgs(args) {
    return args.subcommand === constants_1.DRIVER_TYPE || args.subcommand === constants_1.PLUGIN_TYPE;
}
/**
 * Type guard: args are for a driver extension command.
 *
 * @param args - Parsed args before full subcommand-specific narrowing
 */
function isDriverCommandArgs(args) {
    return args.subcommand === constants_1.DRIVER_TYPE;
}
/**
 * Type guard: args are for a plugin extension command.
 *
 * @param args - Parsed args before full subcommand-specific narrowing
 */
function isPluginCommandArgs(args) {
    return args.subcommand === constants_1.PLUGIN_TYPE;
}
//# sourceMappingURL=cli-args-guards.js.map