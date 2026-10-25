import type { Args } from 'appium/types';
import type { ReadConfigFileResult } from './config-file';
/**
 * Returns key/value pairs of server arguments that differ from schema defaults (flattened comparison).
 *
 * @param parsedArgs - Fully merged server args (CLI + config + defaults)
 */
export declare function getNonDefaultServerArgs(parsedArgs: Args): Args;
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
export declare function showConfig(nonDefaultPreConfigParsedArgs: Partial<Args>, configResult: ReadConfigFileResult, defaults: Partial<Args>, parsedArgs: Args): void;
//# sourceMappingURL=startup-config.d.ts.map