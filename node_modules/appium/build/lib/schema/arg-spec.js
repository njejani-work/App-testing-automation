"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgSpec = exports.SERVER_PROP_NAME = exports.APPIUM_CONFIG_SCHEMA_ID = void 0;
const utils_1 = require("../utils");
/**
 * The original ID of the Appium config schema.
 * We use this in the CLI to convert it to `argparse` options.
 */
exports.APPIUM_CONFIG_SCHEMA_ID = 'appium.json';
/**
 * The schema prop containing server-related options. Everything in here
 * is "native" to Appium.
 */
exports.SERVER_PROP_NAME = 'server';
const SCHEMA_ID_REGEXP = /^(?<extType>.+?)-(?<normalizedExtName>.+)\.json$/;
const PROPERTIES = 'properties';
/**
 * An `ArgSpec` is a class representing metadata about an argument (or config
 * option) used for cross-referencing.
 *
 * This class has no instance methods beyond stringification and is effectively
 * a read-only struct.
 */
class ArgSpec {
    name;
    extType;
    extName;
    ref;
    arg;
    dest;
    rawDest;
    defaultValue;
    /**
     * Builds computed fields and assigns them to the instance.
     * Use {@link ArgSpec.create} instead of `new ArgSpec()`.
     */
    constructor(name, { extType, extName, dest, defaultValue } = {}) {
        const arg = ArgSpec.toArg(name, extType, extName);
        const ref = ArgSpec.toSchemaRef(name, extType, extName);
        const rawDest = (0, utils_1.camelCase)(dest ?? name);
        const destKeypath = extType && extName ? [extType, extName, rawDest].join('.') : rawDest;
        this.defaultValue = defaultValue;
        this.name = name;
        this.extType = extType;
        this.extName = extName;
        this.arg = arg;
        this.dest = destKeypath;
        this.ref = ref;
        this.rawDest = rawDest;
    }
    /**
     * Return the schema ID (`$id`) for the argument given the parameters.
     */
    static toSchemaRef(name, extType, extName) {
        const baseRef = ArgSpec.toSchemaBaseRef(extType, extName);
        if (extType && extName) {
            return [`${baseRef}#`, PROPERTIES, name].join('/');
        }
        return [`${baseRef}#`, PROPERTIES, exports.SERVER_PROP_NAME, PROPERTIES, name].join('/');
    }
    /**
     * Return the root schema ID for an extension or Appium base schema.
     */
    static toSchemaBaseRef(extType, extName) {
        if (extType && extName) {
            return `${extType}-${ArgSpec.toNormalizedExtName(extName)}.json`;
        }
        return exports.APPIUM_CONFIG_SCHEMA_ID;
    }
    /**
     * Return the unique CLI argument key for the argument.
     */
    static toArg(name, extType, extName) {
        const properName = (0, utils_1.kebabCase)(name.replace(/^--?/, ''));
        if (extType && extName) {
            return [extType, (0, utils_1.kebabCase)(extName), properName].join('-');
        }
        return properName;
    }
    /**
     * Normalizes a raw extension name (not including type).
     */
    static toNormalizedExtName(extName) {
        return (0, utils_1.kebabCase)(extName);
    }
    /**
     * Parse root schema ID (`<extType>-<normalizedExtName>.json`) to extension info.
     */
    static extensionInfoFromRootSchemaId(schemaId) {
        const matches = schemaId.match(SCHEMA_ID_REGEXP);
        if (matches?.groups) {
            const { extType, normalizedExtName } = matches.groups;
            return { extType, normalizedExtName };
        }
        return {};
    }
    /**
     * Creates a frozen `ArgSpec`.
     */
    static create(name, opts) {
        return Object.freeze(new ArgSpec(name, opts));
    }
    toString() {
        let str = `[ArgSpec] ${this.name} (${this.ref})`;
        if (this.extType && this.extName) {
            str += ` (ext: ${this.extType}/${this.extName})`;
        }
        return str;
    }
}
exports.ArgSpec = ArgSpec;
//# sourceMappingURL=arg-spec.js.map