/**
 * A stopwatch-like thing
 *
 * Used for displaying elapsed time in milliseconds
 * @param id - Unique identifier
 * @returns Function that returns the elapsed time in milliseconds
 */
export declare function stopwatch(id: string): () => number;
export declare namespace stopwatch {
    var cache: Map<string, number>;
}
//# sourceMappingURL=timing.d.ts.map