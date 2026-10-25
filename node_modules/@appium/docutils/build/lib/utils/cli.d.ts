/**
 * Converts an object of string values to an array of arguments for CLI
 *
 * Supports `boolean` and `number` values as well.  `boolean`s are assumed to be flags which default
 * to `false`, so they will only be added to the array if the value is `true`.
 */
export declare const argify: (obj: Record<string, string | number | boolean | undefined>) => string[];
/**
 * Converts a string to kebab-case.
 * @param value Input string
 * @returns Kebab-cased string
 */
export declare function kebabCase(value: string): string;
//# sourceMappingURL=cli.d.ts.map