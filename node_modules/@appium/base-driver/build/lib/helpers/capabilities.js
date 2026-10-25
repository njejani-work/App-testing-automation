"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isW3cCaps = isW3cCaps;
exports.fixCaps = fixCaps;
const support_1 = require("@appium/support");
/**
 * Determine whether the given argument is valid
 * W3C capabilities instance.
 */
function isW3cCaps(caps) {
    if (!support_1.util.isPlainObject(caps)) {
        return false;
    }
    const c = caps;
    const isFirstMatchValid = () => Array.isArray(c.firstMatch) &&
        !support_1.util.isEmpty(c.firstMatch) &&
        c.firstMatch.every((item) => support_1.util.isPlainObject(item));
    const isAlwaysMatchValid = () => support_1.util.isPlainObject(c.alwaysMatch);
    if (Object.hasOwn(c, 'firstMatch') && Object.hasOwn(c, 'alwaysMatch')) {
        return isFirstMatchValid() && isAlwaysMatchValid();
    }
    if (Object.hasOwn(c, 'firstMatch')) {
        return isFirstMatchValid();
    }
    if (Object.hasOwn(c, 'alwaysMatch')) {
        return isAlwaysMatchValid();
    }
    return false;
}
/**
 * Normalize capability values according to constraints (e.g. string 'true' → boolean).
 */
function fixCaps(oldCaps, desiredCapConstraints, log) {
    const caps = { ...oldCaps };
    const logCastWarning = (prefix) => log.warn(`${prefix}. This may cause unexpected behavior`);
    // boolean capabilities can be passed in as strings 'false' and 'true'
    // which we want to translate into boolean values
    const booleanCaps = Object.keys(desiredCapConstraints).filter((key) => desiredCapConstraints[key]?.isBoolean === true);
    for (const cap of booleanCaps) {
        const value = oldCaps[cap];
        if (typeof value !== 'string') {
            continue;
        }
        if (!['true', 'false'].includes(value.toLowerCase())) {
            logCastWarning(`String capability '${cap}' ('${value}') cannot be converted to a boolean`);
            continue;
        }
        logCastWarning(`Capability '${cap}' changed from string '${value}' to boolean`);
        caps[cap] = value.toLowerCase() === 'true';
    }
    // int capabilities are often sent in as strings by frameworks
    const intCaps = Object.keys(desiredCapConstraints).filter((key) => desiredCapConstraints[key]?.isNumber === true);
    for (const cap of intCaps) {
        const value = oldCaps[cap];
        if (typeof value !== 'string') {
            continue;
        }
        const intValue = parseInt(value, 10);
        const floatValue = parseFloat(value);
        const newValue = floatValue !== intValue ? floatValue : intValue;
        if (Number.isNaN(newValue)) {
            logCastWarning(`String capability '${cap}' ('${value}') cannot be converted to a number`);
            continue;
        }
        logCastWarning(`Capability '${cap}' changed from string '${value}' to number ${newValue}`);
        caps[cap] = newValue;
    }
    return caps;
}
//# sourceMappingURL=capabilities.js.map