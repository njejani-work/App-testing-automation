/**
 * Returns true if the value is a plain object (Object prototype or null prototype).
 *
 * @param value - Value to check
 * @returns `true` if the value is a plain object
 */
export declare function isPlainObject(value: unknown): value is Record<string, unknown>;
/**
 * Escapes RegExp special characters in a string.
 *
 * @param value - Input string
 * @returns Escaped string safe for RegExp source
 */
export declare function escapeRegExp(value: string): string;
/**
 * This function is necessary to workaround unexpected memory leaks
 * caused by NodeJS string interning
 * behavior described in https://bugs.chromium.org/p/v8/issues/detail?id=2869
 *
 * @param s - The string to unleak
 * @returns Either the unleaked string or the original object converted to string
 */
export declare function unleakString(s: any): string;
//# sourceMappingURL=node.d.ts.map