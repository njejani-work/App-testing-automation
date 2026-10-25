/**
 * Deep-merge plain objects into a clone of `target`. Skips null/undefined sources.
 * Non-plain values on a key replace the previous value (same as lodash merge for objects).
 */
export declare function mergePlainObjects<T extends Record<string, unknown>>(target: T, ...sources: Array<Partial<T> | undefined>): T;
/** Return a shallow copy of `obj` without `key`. Non-objects are returned unchanged. */
export declare function omit<T extends Record<string, unknown>>(obj: T, key: string): T;
/** Return a shallow copy of `obj` without any of `keys`. */
export declare function omitKeys<T extends Record<string, unknown>>(obj: T, keys: readonly string[]): T;
/** Return a shallow copy of `obj` containing only listed keys. */
export declare function pick<T extends Record<string, unknown>>(obj: T, keys: readonly string[]): Partial<T>;
/** Return a shallow copy of `obj` whose entries pass `predicate`. */
export declare function pickBy<T extends Record<string, unknown>>(obj: T, predicate: (value: T[keyof T], key: keyof T) => boolean): Partial<T>;
//# sourceMappingURL=utils.d.ts.map