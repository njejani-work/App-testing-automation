"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePlainObjects = mergePlainObjects;
exports.omit = omit;
exports.omitKeys = omitKeys;
exports.pick = pick;
exports.pickBy = pickBy;
const support_1 = require("@appium/support");
/**
 * Deep-merge plain objects into a clone of `target`. Skips null/undefined sources.
 * Non-plain values on a key replace the previous value (same as lodash merge for objects).
 */
function mergePlainObjects(target, ...sources) {
    const result = structuredClone(target);
    for (const source of sources) {
        if (source == null) {
            continue;
        }
        for (const [key, value] of Object.entries(source)) {
            const existing = result[key];
            if (support_1.util.isPlainObject(existing) && support_1.util.isPlainObject(value)) {
                result[key] = mergePlainObjects(existing, value);
            }
            else if (value !== undefined) {
                result[key] = value;
            }
        }
    }
    return result;
}
/** Return a shallow copy of `obj` without `key`. Non-objects are returned unchanged. */
function omit(obj, key) {
    if (!support_1.util.isPlainObject(obj)) {
        return obj;
    }
    return Object.fromEntries(Object.entries(obj).filter(([k]) => k !== key));
}
/** Return a shallow copy of `obj` without any of `keys`. */
function omitKeys(obj, keys) {
    if (!support_1.util.isPlainObject(obj) || keys.length === 0) {
        return obj;
    }
    const keysToOmit = new Set(keys);
    return Object.fromEntries(Object.entries(obj).filter(([k]) => !keysToOmit.has(k)));
}
/** Return a shallow copy of `obj` containing only listed keys. */
function pick(obj, keys) {
    const keysToPick = new Set(keys);
    return Object.fromEntries(Object.entries(obj).filter(([k]) => keysToPick.has(k)));
}
/** Return a shallow copy of `obj` whose entries pass `predicate`. */
function pickBy(obj, predicate) {
    return Object.fromEntries(Object.entries(obj).filter(([key, value]) => predicate(value, key)));
}
//# sourceMappingURL=utils.js.map