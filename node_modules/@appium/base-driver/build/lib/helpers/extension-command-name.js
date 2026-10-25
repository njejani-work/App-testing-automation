"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveExecuteExtensionName = resolveExecuteExtensionName;
const support_1 = require("@appium/support");
/**
 * Resolves the name of extension method corresponding to an `execute` command string
 * based on the driver's `executeMethodMap`.
 *
 * @param commandName - The command name to resolve.
 * @returns The resolved extension command name if a mapping exists. Otherwise, the original command name.
 */
function resolveExecuteExtensionName(commandName) {
    const Driver = this.constructor;
    const methodMap = Driver.executeMethodMap;
    if (methodMap && support_1.util.isPlainObject(methodMap) && commandName in methodMap) {
        const command = methodMap[commandName]?.command;
        if (typeof command === 'string') {
            return command;
        }
    }
    return commandName;
}
//# sourceMappingURL=extension-command-name.js.map