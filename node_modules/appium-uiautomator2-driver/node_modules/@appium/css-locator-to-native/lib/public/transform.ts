import {UnresolvedStrategyError} from './errors.js';
import {normalizeCssSelector} from './normalize.js';
import type {CssTransformer, CssTransformerConfig, NativeLocator, StrategyEmitter} from './types.js';

/** Keys that must never be used as emitter registry lookups */
const BLOCKED_EMITTER_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

/**
 * Create a CSS-to-native transformer using caller-provided schemas, emitters, and strategy routing.
 *
 * The returned function parses the CSS input, invokes `resolveStrategy` to pick an emitter
 * registry key, and delegates native selector emission to that emitter.
 *
 * @param config - Transformer configuration
 * @param config.schema - Attribute vocabulary passed to {@link normalizeCssSelector}
 * @param config.emitters - Named registry of strategy emitters (at least one entry)
 * @param config.resolveStrategy - Callback that returns an emitter key for the parsed selector
 * @returns A function `(css, ctx?) => NativeLocator` that transforms CSS into a native locator
 */
export function createCssTransformer<TEmitters extends Record<string, StrategyEmitter<any>>, TContext = unknown>(
  config: CssTransformerConfig<TEmitters, TContext>,
): CssTransformer<TContext> {
  /**
   * Transform a CSS selector into a native locator for the resolved strategy.
   *
   * @param css - CSS selector string to transform
   * @param ctx - Optional context forwarded to `resolveStrategy` and the selected emitter
   * @returns Native locator strategy name and selector string
   * @throws {InvalidSelectorError} If the CSS syntax cannot be parsed
   * @throws {UnsupportedSelectorError} If the selector uses unsupported CSS features or attributes
   * @throws {UnresolvedStrategyError} If `resolveStrategy` returns no key or an unknown emitter key
   */
  return function transformCss(css: string, ctx?: TContext): NativeLocator {
    const parsed = normalizeCssSelector(css, config.schema);
    const strategyKey = config.resolveStrategy(parsed, css, ctx);

    if (!hasRegisteredEmitter(config.emitters, strategyKey)) {
      throw new UnresolvedStrategyError(`No native strategy matched for CSS selector '${css}'`);
    }

    const emitter = config.emitters[strategyKey];
    return {
      strategy: emitter.strategy,
      selector: emitter.emit(parsed, ctx),
    };
  };
}

function hasRegisteredEmitter(emitters: Record<string, StrategyEmitter<any>>, key: string): boolean {
  return typeof key === 'string' && key.length > 0 && !BLOCKED_EMITTER_KEYS.has(key) && Object.hasOwn(emitters, key);
}
