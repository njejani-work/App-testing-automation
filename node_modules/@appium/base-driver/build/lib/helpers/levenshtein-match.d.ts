/**
 * Inclusive maximum Levenshtein edit distance for offering a "did you mean" hint.
 * Matches with distance greater than this value are treated as unrelated.
 */
export declare const LEVENSHTEIN_SUGGESTION_MAX_EDIT_DISTANCE = 2;
export interface LevenshteinRankResult {
    /** Candidates sorted by ascending edit distance from `target`, then alphabetically within ties. */
    sorted: string[];
    /** Closest name only if its edit distance is at most `maxEditDistance` (inclusive). */
    suggestion: string | undefined;
}
/**
 * Sorts candidates by Levenshtein distance from `target` and optionally picks a suggestion
 * when the closest match is within `maxEditDistance` edits (single pass over candidates).
 */
export declare function rankLevenshteinCandidates(target: string, candidates: readonly string[], maxEditDistance?: number): LevenshteinRankResult;
/**
 * Sorts strings by ascending Levenshtein distance from `target`.
 * Strings with the same distance are sorted alphabetically.
 */
export declare function sortByLevenshteinDistance(target: string, candidates: readonly string[]): string[];
/**
 * Returns the closest string in `candidates` by Levenshtein distance only if that
 * distance is at most `maxEditDistance` (inclusive).
 */
export declare function getLevenshteinSuggestion(target: string, candidates: readonly string[], maxEditDistance?: number): string | undefined;
//# sourceMappingURL=levenshtein-match.d.ts.map