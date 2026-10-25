# @appium/css-locator-to-native

Platform-agnostic CSS selector parsing and normalization for native locator transformation.

## Installation

```bash
npm install @appium/css-locator-to-native
```

## Quick start

```typescript
import {
  createCssTransformer,
  type AttributeSchema,
  type ParsedSelector,
  type StrategyKey,
} from '@appium/css-locator-to-native';

const schema: AttributeSchema = {
  attributes: {
    visible: {type: 'boolean'},
    name: {type: 'string', aliases: ['id']},
    index: {type: 'numeric', aliases: ['nth-child']},
  },
  booleanFormat: 'zero-one',
};

const emitters = {
  native: {
    strategy: 'my-native-strategy',
    emit(parsed: ParsedSelector) {
      // Map ParsedSelector IR to your platform's selector syntax
      return parsed.rule.tag ?? '*';
    },
  },
};

const transformCss = createCssTransformer({
  schema,
  emitters,
  resolveStrategy(): StrategyKey<typeof emitters> {
    return 'native';
  },
});

const {strategy, selector} = transformCss('window#foo[visible]');
// => { strategy: 'my-native-strategy', selector: '...' }
```

## API

Everything is exported from a single entry point:

| Export | Description |
|---|---|
| `normalizeCssSelector(css, schema)` | Parse and normalize a CSS selector into a `ParsedSelector` IR |
| `createCssTransformer(config)` | Returns a function that parses CSS and produces a `NativeLocator` |
| `InvalidSelectorError` | CSS syntax cannot be parsed |
| `UnsupportedSelectorError` | Parsed CSS uses unsupported features or unknown attributes |
| `UnresolvedStrategyError` | No matching emitter for the resolved strategy key |

### ParsedSelector IR

Normalization produces a platform-agnostic intermediate representation. The IR captures CSS structure — tags, classes, `#id`, attributes, pseudos, combinators — validated against your schema. It does **not** encode iOS class chain, UiAutomator, or any other native syntax.

```typescript
interface ParsedSelector {
  rule: ParsedRule; // first comma-separated rule only
}

interface ParsedRule {
  combinator?: 'descendant' | 'child';
  tag?: string;           // raw CSS tag (may be '*')
  classes: string[];      // raw class tokens
  id?: string;            // raw #id value
  attributes: ParsedAttribute[];
  pseudos: ParsedAttribute[];
  nested?: ParsedRule;
}
```

### Attribute schemas

Drivers declare which CSS attributes are valid and how booleans are coerced:

```typescript
interface AttributeSchema {
  attributes: Record<string, {type: 'boolean' | 'string' | 'numeric'; aliases?: string[]}>;
  booleanFormat?: 'zero-one' | 'true-false' | 'literal';
}
```

- **`zero-one`** — `true`/`1`/empty → `'1'`, `false`/`0` → `'0'`
- **`true-false`** — `true`/empty → `'true'`, `false` → `'false'`
- **`literal`** (default) — keep the raw attribute value unchanged; implicit booleans (no value) stay unset

Tag, class, and `#id` mapping (e.g. `XCUIElementType*` prefixing, `resourceId` prefixing) is entirely the driver's responsibility in emitters.

### Multi-strategy routing

`createCssTransformer` requires a registry of `StrategyEmitter`s and a `resolveStrategy` callback. The resolver picks which emitter to use based on selector shape; the transformer returns both the target strategy name and the native selector string.

```typescript
interface NativeLocator {
  strategy: string;
  selector: string;
}
```

A driver with a single target strategy uses a one-entry registry and a trivial resolver.

## Driver integration pattern

Platform logic stays in the driver. A typical layout:

```
lib/css/
  schema.ts          # AttributeSchema for the platform
  *-emitter.ts       # StrategyEmitter implementations
  resolve-helpers.ts # isSimpleIdSelector, etc.
  index.ts           # createCssTransformer wrapper
```

In `find` commands, use the strategy from the transform result instead of hardcoding it:

```typescript
if (strategy === 'css selector') {
  ({strategy, selector} = cssToNativeLocator(selector));
}
```

## Supported CSS subset

Matches the subset accepted by existing Appium drivers:

- Tags (including `*`), `#id`, classes, attribute selectors (`=`, `*=`, `^=`, `$=`, `~=`)
- Child (`>`) and descendant (space) combinators
- Pseudo-classes accepted as attributes per schema (e.g. `:visible`, `:nth-child(2)`)
- First comma-separated rule only (additional rules are ignored)
- Unsupported: `+` / `~` combinators, pseudo-elements, nesting (`&`), namespaces

## Development

```bash
npm install --no-package-lock
npm run typecheck   # type-check lib + test
npm run build       # compile to build/
npm test            # unit tests (compiled ESM)
npm run lint
npm run format:check
```

## Requirements

- Node.js `^20.19.0 || ^22.12.0 || >=24.0.0`
- npm `>=10`

## License

[Apache-2.0](LICENSE)
