"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNonDefaultServerArgs = getNonDefaultServerArgs;
exports.showConfig = showConfig;
/* eslint-disable no-console */
const support_1 = require("@appium/support");
const schema_1 = require("../schema/schema");
const utils_1 = require("../utils");
/**
 * Returns key/value pairs of server arguments that differ from schema defaults (flattened comparison).
 *
 * @param parsedArgs - Fully merged server args (CLI + config + defaults)
 */
function getNonDefaultServerArgs(parsedArgs) {
    /**
     * Flattens parsed args into a single level object for comparison with
     * flattened defaults across server args and extension args.
     */
    const flatten = (args) => {
        const argSpecs = (0, schema_1.getAllArgSpecs)();
        const flattened = [...argSpecs.values()].reduce((acc, argSpec) => {
            const value = (0, utils_1.getPath)(args, argSpec.dest);
            if (value !== undefined) {
                acc[argSpec.dest] = { value, argSpec };
            }
            return acc;
        }, {});
        return flattened;
    };
    const args = flatten(parsedArgs);
    // hopefully these function names are descriptive enough
    const typesDiffer = (dest) => typeof args[dest].value !== typeof defaultsFromSchema[dest];
    const defaultValueIsArray = (dest) => Array.isArray(defaultsFromSchema[dest]);
    const argsValueIsArray = (dest) => Array.isArray(args[dest].value);
    const arraysDiffer = (dest) => (0, utils_1.difference)(args[dest].value, defaultsFromSchema[dest]).length > 0;
    const valuesDiffer = (dest) => args[dest].value !== defaultsFromSchema[dest];
    const defaultIsDefined = (dest) => defaultsFromSchema[dest] !== undefined;
    const argValueNotArrayOrArraysDiffer = (dest) => !argsValueIsArray(dest) || arraysDiffer(dest);
    const defaultValueNotArrayAndValuesDiffer = (dest) => !defaultValueIsArray(dest) && valuesDiffer(dest);
    /**
     * This used to be a hideous conditional, but it's broken up into a hideous function instead.
     * hopefully this makes things a little more understandable.
     * - checks if the default value is defined
     * - if so, and the default is not an array:
     *   - ensures the types are the same
     *   - ensures the values are equal
     * - if so, and the default is an array:
     *   - ensures the args value is an array
     *   - ensures the args values do not differ from the default values
     */
    const isNotDefault = (dest) => defaultIsDefined(dest) &&
        (typesDiffer(dest) ||
            (defaultValueIsArray(dest) && argValueNotArrayOrArraysDiffer(dest)) ||
            defaultValueNotArrayAndValuesDiffer(dest));
    const defaultsFromSchema = (0, schema_1.getDefaultsForSchema)(true);
    const nonDefault = (0, utils_1.pickBy)(args, (_v, key) => isNotDefault(String(key)));
    const result = {};
    for (const entry of Object.values(nonDefault)) {
        if (!entry) {
            continue;
        }
        const { value, argSpec } = entry;
        (0, utils_1.setPath)(result, argSpec.dest, value);
    }
    return result;
}
/**
 * Prints a breakdown of configuration: defaults, config file, CLI/programmatic overrides, and final merged args.
 *
 * The actual shape of `nonDefaultPreConfigParsedArgs` and `defaults` does not matter for the purposes of this
 * function, but it's intended to be called with values of type {@link ParsedArgs} and
 * `DefaultValues<true>`, respectively.
 *
 * @param nonDefaultPreConfigParsedArgs - CLI-only (or programmatic) args that differ from defaults
 * @param configResult - Result of {@link readConfigFile}
 * @param defaults - Schema default values
 * @param parsedArgs - Final merged configuration
 */
function showConfig(nonDefaultPreConfigParsedArgs, configResult, defaults, parsedArgs) {
    console.log('Appium Configuration\n');
    console.log('from defaults:\n');
    console.dir(compactConfig(defaults));
    if (configResult.config) {
        console.log(`\nfrom config file at ${configResult.filepath}:\n`);
        console.dir(compactConfig(configResult.config));
    }
    else {
        console.log(`\n(no configuration file loaded)`);
    }
    const compactedNonDefaultPreConfigArgs = compactConfig(nonDefaultPreConfigParsedArgs);
    if (support_1.util.isEmpty(compactedNonDefaultPreConfigArgs)) {
        console.log(`\n(no CLI parameters provided)`);
    }
    else {
        console.log('\nvia CLI or function call:\n');
        console.dir(compactedNonDefaultPreConfigArgs);
    }
    console.log('\nfinal configuration:\n');
    console.dir(compactConfig(parsedArgs));
}
/**
 * Compacts an object for {@link showConfig}:
 * 1. Removes `subcommand` key/value
 * 2. Removes `undefined` values
 * 3. Removes empty objects (but not `false` values)
 * Does not operate recursively.
 */
function compactConfig(obj) {
    return (0, utils_1.pickBy)(obj, (value, key) => key !== 'subcommand' &&
        value !== undefined &&
        !(value !== null && typeof value === 'object' && support_1.util.isEmpty(value)));
}
//# sourceMappingURL=startup-config.js.map