export {InvalidSelectorError, UnsupportedSelectorError, UnresolvedStrategyError} from './public/errors.js';
export {normalizeCssSelector} from './public/normalize.js';
export {createCssTransformer} from './public/transform.js';
export type {
  AttrType,
  AttributeSchema,
  CssTransformer,
  CssTransformerConfig,
  NativeLocator,
  ParsedAttribute,
  ParsedRule,
  ParsedSelector,
  StrategyEmitter,
  StrategyKey,
  StrategyResolver,
} from './public/types.js';
