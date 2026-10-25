/**
 * This module provides transformer functions for CLI arguments.
 *
 * Use case: config schemas can accept richer types (arrays/objects), but CLI
 * values are strings. Transformers convert string input into those richer types.
 */
/**
 * Splits a CSV string into an array
 */
export declare function parseCsvLine(value: string): string[];
export declare const transformers: {
    /**
     * Given a CSV-style string or pathname, parse it into an array.
     * The file can also be split on newlines.
     */
    readonly csv: (csvOrPath: string) => string[];
    /**
     * Parse a string which could be a path to a JSON file or a JSON string.
     */
    readonly json: (jsonOrPath: string) => Record<string, any>;
};
//# sourceMappingURL=cli-transformers.d.ts.map