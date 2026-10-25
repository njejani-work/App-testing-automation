import type { ExtensionType } from '@appium/types';
/**
 * The original ID of the Appium config schema.
 * We use this in the CLI to convert it to `argparse` options.
 */
export declare const APPIUM_CONFIG_SCHEMA_ID = "appium.json";
/**
 * The schema prop containing server-related options. Everything in here
 * is "native" to Appium.
 */
export declare const SERVER_PROP_NAME = "server";
export interface ArgSpecOptions<D = unknown> {
    extName?: string;
    extType?: ExtensionType;
    dest?: string;
    defaultValue?: D;
}
/**
 * An `ArgSpec` is a class representing metadata about an argument (or config
 * option) used for cross-referencing.
 *
 * This class has no instance methods beyond stringification and is effectively
 * a read-only struct.
 */
export declare class ArgSpec<D = unknown> {
    readonly name: string;
    readonly extType?: ExtensionType;
    readonly extName?: string;
    readonly ref: string;
    readonly arg: string;
    readonly dest: string;
    readonly rawDest: string;
    readonly defaultValue?: D;
    /**
     * Builds computed fields and assigns them to the instance.
     * Use {@link ArgSpec.create} instead of `new ArgSpec()`.
     */
    constructor(name: string, { extType, extName, dest, defaultValue }?: ArgSpecOptions<D>);
    /**
     * Return the schema ID (`$id`) for the argument given the parameters.
     */
    static toSchemaRef(name: string, extType?: ExtensionType, extName?: string): string;
    /**
     * Return the root schema ID for an extension or Appium base schema.
     */
    static toSchemaBaseRef(extType?: ExtensionType, extName?: string): string;
    /**
     * Return the unique CLI argument key for the argument.
     */
    static toArg(name: string, extType?: ExtensionType, extName?: string): string;
    /**
     * Normalizes a raw extension name (not including type).
     */
    static toNormalizedExtName(extName: string): string;
    /**
     * Parse root schema ID (`<extType>-<normalizedExtName>.json`) to extension info.
     */
    static extensionInfoFromRootSchemaId(schemaId: string): {
        extType?: ExtensionType;
        normalizedExtName?: string;
    };
    /**
     * Creates a frozen `ArgSpec`.
     */
    static create<D = unknown>(name: string, opts?: ArgSpecOptions<D>): Readonly<ArgSpec<D>>;
    toString(): string;
}
//# sourceMappingURL=arg-spec.d.ts.map