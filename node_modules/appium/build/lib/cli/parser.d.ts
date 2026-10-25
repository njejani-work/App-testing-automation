import { ArgumentParser } from 'argparse';
import type { ArgumentDefinitions } from './args';
export declare const EXTRA_ARGS = "extraArgs";
type LooseArgsMap = {
    [key: string]: any;
};
type TransformedArgsMap = LooseArgsMap & {
    [EXTRA_ARGS]: string[];
};
/**
 * A wrapper around `argparse`
 *
 * - Handles instantiation, configuration, and monkeypatching of an
 *    `ArgumentParser` instance for Appium server and its extensions
 * - Handles error conditions, messages, and exit behavior
 */
export declare class ArgParser {
    readonly prog: string;
    readonly debug: boolean;
    readonly parser: ArgumentParser;
    readonly rawArgs: ArgumentDefinitions;
    readonly parse_args: ArgParser['parseArgs'];
    /**
     * @param debug - if true, throw instead of exiting on parse errors
     */
    constructor(debug?: boolean);
    /**
     * Normalizes server arg keys from schema names to parser destination names.
     *
     * This mutates and returns the same object.
     */
    static normalizeServerArgs<T extends LooseArgsMap>(obj: T): T;
    /**
     * Given an object full of arguments as returned by `argparser.parse_args`,
     * expand the ones for extensions into a nested object structure and rename
     * keys to match the intended destination.
     *
     * E.g., `{'driver-foo-bar': baz}` becomes `{driver: {foo: {bar: 'baz'}}}`
     */
    private static _transformParsedArgs;
    /**
     * Patches the `exit()` method of the parser to throw an error, so we can handle it manually.
     */
    private static _patchExit;
    /**
     * Adds the `server` subcommand parser and returns its argument definitions.
     */
    private static _addServerToParser;
    /**
     * Adds extension sub-sub-commands to `driver`/`plugin` subcommands
     */
    private static _addExtensionCommandsToParser;
    /**
     * Add subcommand and sub-sub commands for 'setup' subcommand.
     */
    private static _addSetupToParser;
    /**
     * Parses CLI args and returns Appium's normalized argument object.
     *
     * If no explicit subcommand is provided, this injects `server`.
     * `parse_args` is a backwards-compatible alias of this method.
     */
    parseArgs(args?: string[]): TransformedArgsMap;
}
/**
 * Creates and returns an `ArgParser` after finalizing schema state.
 */
export declare function getParser(debug?: boolean): Promise<ArgParser>;
export {};
//# sourceMappingURL=parser.d.ts.map