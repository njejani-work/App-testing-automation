"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlainObject = isPlainObject;
exports.escapeRegExp = escapeRegExp;
exports.unleakString = unleakString;
/**
 * Returns true if the value is a plain object (Object prototype or null prototype).
 *
 * @param value - Value to check
 * @returns `true` if the value is a plain object
 */
function isPlainObject(value) {
    if (value === null || typeof value !== 'object') {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
}
/**
 * Escapes RegExp special characters in a string.
 *
 * @param value - Input string
 * @returns Escaped string safe for RegExp source
 */
function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
/**
 * This function is necessary to workaround unexpected memory leaks
 * caused by NodeJS string interning
 * behavior described in https://bugs.chromium.org/p/v8/issues/detail?id=2869
 *
 * @param s - The string to unleak
 * @returns Either the unleaked string or the original object converted to string
 */
function unleakString(s) {
    return ` ${s}`.substring(1);
}
//# sourceMappingURL=node.js.map