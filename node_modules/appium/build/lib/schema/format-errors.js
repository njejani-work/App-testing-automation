"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrors = formatErrors;
const better_ajv_errors_1 = __importDefault(require("@sidvind/better-ajv-errors"));
const schema_1 = require("./schema");
/**
 * Given an array of errors and the result of loading a config file, generate a
 * helpful string for the user.
 *
 * - If `opts` contains a `json` property, this should be the original JSON
 *   _string_ of the config file.  This is only applicable if the config file
 *   was in JSON format. If present, it will associate line numbers with errors.
 * - If `errors` happens to be empty, this will throw.
 *
 * @throws {TypeError} If `errors` is empty
 */
function formatErrors(errors = [], config = {}, opts = {}) {
    if (errors && !errors.length) {
        throw new TypeError('Array of errors must be non-empty');
    }
    return (0, better_ajv_errors_1.default)((0, schema_1.getSchema)(opts.schemaId), config, errors, {
        json: opts.json,
        format: opts.pretty === false ? 'js' : 'cli',
    });
}
//# sourceMappingURL=format-errors.js.map