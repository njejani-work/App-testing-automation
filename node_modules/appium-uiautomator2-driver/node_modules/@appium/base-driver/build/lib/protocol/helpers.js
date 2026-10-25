"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponseValue = formatResponseValue;
exports.ensureW3cResponse = ensureW3cResponse;
const support_1 = require("@appium/support");
const helpers_1 = require("../basedriver/helpers");
const constants_1 = require("../constants");
/**
 * Preprocesses the resulting value for API responses,
 * so they have keys for both W3C and JSONWP protocols.
 * The argument value is NOT mutated.
 *
 * @param resValue - The actual response value
 * @returns Either modified value or the same one if nothing has been modified
 */
function formatResponseValue(resValue) {
    if (resValue === undefined) {
        // convert undefined to null
        return null;
    }
    // If the MJSONWP element key format (ELEMENT) was provided,
    // add a duplicate key (element-6066-11e4-a52e-4f735466cecf)
    // If the W3C element key format (element-6066-11e4-a52e-4f735466cecf)
    // was provided, add a duplicate key (ELEMENT)
    return (0, helpers_1.duplicateKeys)(resValue, constants_1.MJSONWP_ELEMENT_KEY, constants_1.W3C_ELEMENT_KEY);
}
/**
 * Properly formats the status for API responses,
 * so they are correct for the W3C protocol.
 *
 * @param responseBody - The response body
 * @returns The fixed response body
 */
function ensureW3cResponse(responseBody) {
    if (!support_1.util.isPlainObject(responseBody)) {
        return responseBody;
    }
    const result = { ...responseBody };
    delete result.status;
    delete result.sessionId;
    return result;
}
//# sourceMappingURL=helpers.js.map