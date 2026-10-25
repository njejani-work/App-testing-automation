import { type InspectOptions } from 'node:util';
import type { JsonValue } from 'type-fest';
/** ANSI styles supported by Node's `util.styleText`. `grey` is accepted as an alias for `gray`. */
export type TextStyle = 'reset' | 'bold' | 'dim' | 'italic' | 'underline' | 'blink' | 'inverse' | 'hidden' | 'strikethrough' | 'doubleunderline' | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray' | 'grey' | 'bgBlack' | 'bgRed' | 'bgGreen' | 'bgYellow' | 'bgBlue' | 'bgMagenta' | 'bgCyan' | 'bgWhite' | 'framed' | 'overlined' | 'redBright' | 'greenBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright';
/** Applies terminal styling via Node's `util.styleText`. */
export declare function styleText(style: TextStyle, text: string): string;
/** Removes ANSI escape sequences (CSI and OSC) from a string. */
export declare function stripColors(text: string): string;
declare const logSymbols: {
    readonly info: "ℹ" | "i";
    readonly success: "✔" | "√";
    readonly warning: "⚠" | "‼";
    readonly error: "✖" | "×";
};
/** Options for {@linkcode CliConsole}. */
export interface ConsoleOpts {
    /** If _truthy_, suppress all output except JSON (use {@linkcode CliConsole#json}), which writes to `STDOUT`. */
    jsonMode?: boolean;
    /** If _falsy_, do not use fancy symbols. */
    useSymbols?: boolean;
    /** If _falsy_, do not use color output. If _truthy_, forces color output. By default, checks `NO_COLOR`, `FORCE_COLOR`, `TERM`, and stderr TTY. Ignored if `useSymbols` is `false`. */
    useColor?: boolean;
}
/** Symbol keys used for decoration */
type SymbolKey = keyof typeof logSymbols;
/**
 * A particular console/logging class for Appium's CLI.
 *
 * - By default, uses some fancy symbols
 * - Writes to `STDERR`, generally.
 * - In "JSON mode", `STDERR` is squelched. Use {@linkcode CliConsole.json} to write the JSON.
 *
 * DO NOT extend this to do anything other than what it already does. Download a library or something.
 */
export declare class CliConsole {
    #private;
    static readonly symbolToColor: Record<SymbolKey, TextStyle>;
    constructor(opts?: ConsoleOpts);
    /**
     * Wraps a message string in breathtaking fanciness
     *
     * Returns `undefined` if `msg` is `undefined`.
     */
    decorate(msg: string | undefined, symbol?: SymbolKey): string | undefined;
    /**
     * Writes to `STDOUT`.  Must be stringifyable.
     *
     * You probably don't want to call this more than once before exiting (since that will output invalid JSON).
     */
    json(value: JsonValue): void;
    /** General logging function. */
    log(message?: string, ...args: unknown[]): void;
    /** A "success" message */
    ok(message?: string, ...args: unknown[]): void;
    /** Alias for {@linkcode CliConsole.log} */
    debug(message?: string, ...args: unknown[]): void;
    /** Wraps {@link console.dir} */
    dump(item: unknown, opts?: InspectOptions): void;
    /** An "info" message */
    info(message?: string, ...args: unknown[]): void;
    /** A "warning" message */
    warn(message?: string, ...args: unknown[]): void;
    /** An "error" message */
    error(message?: string, ...args: unknown[]): void;
}
export declare const console: CliConsole;
export { logSymbols, logSymbols as symbols };
//# sourceMappingURL=console.d.ts.map