/**
 * Converts a tuple to an object; use for extracting parameter types from a function signature
 */
export type TupleToObject<T extends readonly any[], M extends Record<Exclude<keyof T, keyof any[]>, PropertyKey>> = {
    [K in Exclude<keyof T, keyof any[]> as M[K]]: T[K];
};
/**
 * Type guard to narrow an array to a string array
 * @param value any value
 * @returns `true` if the array is `string[]`
 */
export declare const isStringArray: (value: any) => value is string[];
/**
 * Performs a deep "defaults" merge into a clone of `target`.
 * Only undefined properties in `target` are filled from `defaults`.
 * @param target Destination object
 * @param defaults Default values object
 * @returns Merged clone
 */
export declare function mergeDefaultsDeep<T extends Record<string, any>>(target: T, defaults: T): T;
//# sourceMappingURL=object.d.ts.map