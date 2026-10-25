import type { ParsedArgs } from 'appium/types';
/**
 * Initialize the log sink from parsed CLI/server args.
 * Sets up Winston transports (console, optional file, optional webhook) and forwards
 * npmlog messages to them. Call this before other logging setup.
 *
 * @param args - Parsed server/CLI arguments (e.g. `loglevel`, `logFile`, `webhook`).
 */
export declare function init(args: ParsedArgs): Promise<void>;
/**
 * Clear the log sink and remove global log listeners.
 * Safe to call before re-initializing with `init`.
 */
export declare function clear(): void;
/**
 * Strips ANSI color control codes from a string.
 *
 * @param text - String that may contain escape codes (e.g. `\u001b[31m`).
 * @returns The string with all color codes removed.
 */
export declare function stripColorCodes(text: string): string;
//# sourceMappingURL=logsink.d.ts.map