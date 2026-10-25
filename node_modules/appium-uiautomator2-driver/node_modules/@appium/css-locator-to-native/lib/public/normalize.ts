import {normalizeFromParsed} from '../internal/normalize-from-parsed.js';
import {cssSelectorParserAdapter} from '../internal/parser/adapter.js';
import {InvalidSelectorError, UnsupportedSelectorError} from './errors.js';
import type {AttributeSchema, ParsedSelector} from './types.js';

/**
 * Parse and normalize a CSS selector string into a platform-agnostic {@link ParsedSelector} IR.
 *
 * Only the first comma-separated rule is used. Tag, class, and `#id` values are preserved as raw
 * CSS tokens; platform-specific mapping is the caller's responsibility.
 *
 * @param selector - CSS selector string to parse
 * @param schema - Caller-defined attribute vocabulary and coercion rules
 * @returns Normalized selector intermediate representation
 * @throws {InvalidSelectorError} If the CSS syntax cannot be parsed
 * @throws {UnsupportedSelectorError} If the selector uses unsupported CSS features or attributes
 */
export function normalizeCssSelector(selector: string, schema: AttributeSchema): ParsedSelector {
  const parser = cssSelectorParserAdapter;
  try {
    const parsed = parser.parse(selector);
    return normalizeFromParsed(parsed, schema);
  } catch (err) {
    if (err instanceof InvalidSelectorError || err instanceof UnsupportedSelectorError) {
      throw err;
    }
    const message = err instanceof Error ? err.message : String(err);
    throw new UnsupportedSelectorError(`Unsupported CSS selector '${selector}'. Reason: '${message}'`);
  }
}
