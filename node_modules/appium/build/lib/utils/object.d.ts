/**
 * Converts a string to kebab-case (for Appium CLI and schema property names).
 *
 * @param value - Input string
 * @returns Kebab-cased string
 */
export declare function kebabCase(value: string): string;
/**
 * Converts a string to camelCase.
 *
 * @param value - Input string
 * @returns camelCased string
 */
export declare function camelCase(value: string): string;
/**
 * Uppercases the first character of a string.
 *
 * @param value - Input string
 * @returns Capitalized string, or empty string when input is empty
 */
export declare function capitalize(value: string): string;
/**
 * Returns a shallow copy of `obj` without any of `keys`. Non-plain objects are returned unchanged.
 *
 * @param obj - Source object
 * @param keys - Property names to omit
 * @returns Shallow copy without the listed keys
 */
export declare function omitKeys<T extends Record<string, unknown>>(obj: T, keys: readonly string[]): T;
/**
 * Returns a shallow copy of `obj` whose entries pass `predicate`.
 *
 * @param obj - Source object
 * @param predicate - Filter invoked with each value and key
 * @returns Shallow copy containing only matching entries
 */
export declare function pickBy<T extends Record<string, unknown>>(obj: T, predicate: (value: T[keyof T], key: keyof T) => boolean): Partial<T>;
/**
 * Returns an object with the same keys as `obj` and values transformed by `fn`.
 *
 * @param obj - Source object
 * @param fn - Mapper invoked with each value and key
 * @returns Object with transformed values
 */
export declare function mapValues<T extends Record<string, unknown>, R>(obj: T, fn: (value: T[keyof T], key: keyof T) => R): Record<string, R>;
/**
 * Returns an object with keys renamed by `fn` and original values preserved.
 *
 * @param obj - Source object
 * @param fn - Key mapper invoked with each value and key
 * @returns Object with renamed keys
 */
export declare function mapKeys<T extends Record<string, unknown>>(obj: T, fn: (value: T[keyof T], key: keyof T) => string): Record<string, unknown>;
/**
 * Reads a dot-separated path on `obj`, returning `defaultValue` when any segment is missing.
 *
 * @param obj - Object to read from
 * @param path - Dot-separated property path
 * @param defaultValue - Value returned when the path cannot be resolved
 * @returns Value at the path, or `defaultValue`
 */
export declare function getPath(obj: unknown, path: string, defaultValue?: unknown): unknown;
/**
 * Assigns `value` at a dot-separated path on `obj`, creating plain object segments as needed.
 *
 * No-ops when the path contains empty segments or keys that could trigger prototype pollution
 * (`__proto__`, `constructor`, `prototype`).
 *
 * @param obj - Object to mutate
 * @param path - Dot-separated property path
 * @param value - Value to assign at the path
 */
export declare function setPath(obj: Record<string, unknown>, path: string, value: unknown): void;
/**
 * Binds listed methods on `obj` so they keep the correct `this` when passed as callbacks.
 *
 * @param obj - Target object
 * @param methodNames - Method names to bind
 * @returns `obj` (mutated in place)
 */
export declare function bindAll<T extends object>(obj: T, methodNames: readonly string[]): T;
/**
 * Returns a copy of `arr` with falsy entries removed.
 *
 * @param arr - Input array
 * @returns Array containing only truthy elements
 */
export declare function compact<T>(arr: Array<T | null | undefined | false | '' | 0>): T[];
/**
 * Removes all occurrences of `values` from `arr` (mutates `arr`).
 *
 * @param arr - Array to modify
 * @param values - Values to remove
 * @returns `arr`
 */
export declare function pull<T>(arr: T[], ...values: T[]): T[];
/**
 * Zips two arrays into tuples `[a[i], b[i]]`.
 *
 * @param a - First array
 * @param b - Second array
 * @returns Array of zipped pairs
 */
export declare function zip<A, B>(a: readonly A[], b: readonly B[]): Array<[A, B | undefined]>;
/**
 * Returns elements in `a` that are not present in `b`.
 *
 * @param a - Source array
 * @param b - Values to exclude
 * @returns Filtered array
 */
export declare function difference<T>(a: readonly T[], b: readonly T[]): T[];
/**
 * Deep-defaults merge: each source fills only `undefined` properties in the result (recursive for plain objects).
 *
 * @param sources - Objects merged in order; null/undefined sources are skipped
 * @returns Merged object
 */
export declare function defaultsDeep<T extends Record<string, unknown>>(...sources: Array<Partial<T> | undefined>): T;
//# sourceMappingURL=object.d.ts.map