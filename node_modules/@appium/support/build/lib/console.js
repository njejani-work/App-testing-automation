"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symbols = exports.logSymbols = exports.console = exports.CliConsole = void 0;
exports.styleText = styleText;
exports.stripColors = stripColors;
const node_console_1 = require("node:console");
const node_stream_1 = require("node:stream");
const node_util_1 = require("node:util");
// CSI (Control Sequence Introducer) and OSC (Operating System Command) per ECMA-48.
const ANSI_CSI_RE = // eslint-disable-next-line no-control-regex
 /\x1b\[[0-?]*[ -/]*[@-~]/g;
const ANSI_OSC_RE = // eslint-disable-next-line no-control-regex
 /\x1b\][^\x07]*(?:\x07|\x1b\\)/g;
/** Applies terminal styling via Node's `util.styleText`. */
function styleText(style, text) {
    const format = style === 'grey' ? 'gray' : style;
    return (0, node_util_1.styleText)(format, text);
}
/** Removes ANSI escape sequences (CSI and OSC) from a string. */
function stripColors(text) {
    return text.replace(ANSI_OSC_RE, '').replace(ANSI_CSI_RE, '');
}
function isUnicodeSupported() {
    if (process.env.TERM === 'dumb') {
        return false;
    }
    if (process.platform === 'win32') {
        return Boolean(process.env.CI ||
            process.env.WT_SESSION ||
            process.env.TERMINAL_EMULATOR === 'JetBrains-JediTerm' ||
            process.env.TERM_PROGRAM === 'vscode');
    }
    return true;
}
const UNICODE = isUnicodeSupported();
/** Returns whether stderr should use ANSI color by default. */
function stderrSupportsColor(stream = process.stderr) {
    const { env } = process;
    if (env.NO_COLOR !== undefined || env.NODE_DISABLE_COLORS !== undefined) {
        return false;
    }
    const { FORCE_COLOR: forceColor } = env;
    if (forceColor !== undefined) {
        const normalized = forceColor.toLowerCase();
        return normalized !== '0' && normalized !== 'false';
    }
    if (env.TERM === 'dumb') {
        return false;
    }
    if (!stream.isTTY) {
        return false;
    }
    return true;
}
const logSymbols = {
    info: UNICODE ? 'ℹ' : 'i',
    success: UNICODE ? '✔' : '√',
    warning: UNICODE ? '⚠' : '‼',
    error: UNICODE ? '✖' : '×',
};
exports.logSymbols = logSymbols;
exports.symbols = logSymbols;
/**
 * Stream to nowhere. Used when we want to disable any output other than JSON output.
 */
class NullWritable extends node_stream_1.Writable {
    /* eslint-disable promise/prefer-await-to-callbacks -- Node stream callback API */
    _write(chunk, encoding, callback) {
        setImmediate(callback);
    }
}
/**
 * A particular console/logging class for Appium's CLI.
 *
 * - By default, uses some fancy symbols
 * - Writes to `STDERR`, generally.
 * - In "JSON mode", `STDERR` is squelched. Use {@linkcode CliConsole.json} to write the JSON.
 *
 * DO NOT extend this to do anything other than what it already does. Download a library or something.
 */
class CliConsole {
    static symbolToColor = {
        success: 'green',
        info: 'cyan',
        warning: 'yellow',
        error: 'red',
    };
    #console;
    #useSymbols;
    #useColor;
    constructor(opts = {}) {
        const { jsonMode = false, useSymbols = true, useColor } = opts;
        this.#console = new node_console_1.Console(process.stdout, jsonMode ? new NullWritable() : process.stderr);
        this.#useSymbols = Boolean(useSymbols);
        this.#useColor = Boolean(useColor ?? stderrSupportsColor(process.stderr));
    }
    /**
     * Wraps a message string in breathtaking fanciness
     *
     * Returns `undefined` if `msg` is `undefined`.
     */
    decorate(msg, symbol) {
        if (typeof msg !== 'string' || typeof symbol !== 'string' || !this.#useSymbols) {
            return msg;
        }
        let newMsg = `${logSymbols[symbol]} ${msg}`;
        if (this.#useColor) {
            newMsg = styleText(CliConsole.symbolToColor[symbol], newMsg);
        }
        return newMsg;
    }
    /**
     * Writes to `STDOUT`.  Must be stringifyable.
     *
     * You probably don't want to call this more than once before exiting (since that will output invalid JSON).
     */
    json(value) {
        this.#console.log(JSON.stringify(value));
    }
    /** General logging function. */
    log(message, ...args) {
        this.#console.error(message, ...args);
    }
    /** A "success" message */
    ok(message, ...args) {
        this.#console.error(this.decorate(message, 'success'), ...args);
    }
    /** Alias for {@linkcode CliConsole.log} */
    debug(message, ...args) {
        this.log(message, ...args);
    }
    /** Wraps {@link console.dir} */
    dump(item, opts) {
        this.#console.dir(item, opts);
    }
    /** An "info" message */
    info(message, ...args) {
        this.log(this.decorate(message, 'info'), ...args);
    }
    /** A "warning" message */
    warn(message, ...args) {
        this.log(this.decorate(message, 'warning'), ...args);
    }
    /** An "error" message */
    error(message, ...args) {
        this.log(this.decorate(message, 'error'), ...args);
    }
}
exports.CliConsole = CliConsole;
exports.console = new CliConsole();
//# sourceMappingURL=console.js.map