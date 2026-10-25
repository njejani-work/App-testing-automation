import {UnsupportedSelectorError} from '../public/errors.js';
import type {AttributeSchema, ParsedAttribute, ParsedRule, ParsedSelector} from '../public/types.js';
import type {
  InternalCssAttribute,
  InternalCssPseudoClass,
  InternalCssRule,
  InternalCssSelector,
} from './parser/types.js';
import {isEmpty} from './utils.js';

const SUPPORTED_COMBINATORS = new Set([' ', '>', undefined]);

type AliasMap = Map<string, string>;

/**
 * Normalize an internally parsed CSS selector into the public {@link ParsedSelector} IR.
 *
 * @param parsed - Parser output in the internal selector shape
 * @param schema - Caller-defined attribute vocabulary and coercion rules
 * @returns Normalized selector intermediate representation (first rule only)
 * @throws {UnsupportedSelectorError} If the parsed selector uses unsupported features or attributes
 */
export function normalizeFromParsed(parsed: InternalCssSelector, schema: AttributeSchema): ParsedSelector {
  if (isEmpty(parsed.rules)) {
    throw new UnsupportedSelectorError('No rules could be parsed out of the current selector');
  }

  const aliasMap = buildAliasMap(schema);
  return {
    rule: normalizeRule(parsed.rules[0], schema, aliasMap),
  };
}

function buildAliasMap(schema: AttributeSchema): AliasMap {
  const aliases = new Map<string, string>();
  for (const [canonicalName, definition] of Object.entries(schema.attributes)) {
    aliases.set(canonicalName.toLowerCase(), canonicalName);
    for (const alias of definition.aliases ?? []) {
      aliases.set(alias.toLowerCase(), canonicalName);
    }
  }
  return aliases;
}

function resolveEntityName(name: string, schema: AttributeSchema, aliasMap: AliasMap): string {
  const canonical = aliasMap.get(name.toLowerCase());
  if (!canonical) {
    throw new UnsupportedSelectorError(
      `'${name}' is not a valid attribute. Supported attributes are: '${Object.keys(schema.attributes).join(', ')}'`,
    );
  }
  return canonical;
}

function coerceBoolean(
  rawValue: string | undefined,
  entityName: string,
  booleanFormat: AttributeSchema['booleanFormat'],
): string | undefined {
  const format = booleanFormat ?? 'literal';

  if (format === 'literal') {
    return rawValue;
  }

  const value = (rawValue ?? '').toLowerCase() || 'true';

  switch (format) {
    case 'zero-one':
      switch (value) {
        case '0':
        case 'false':
          return '0';
        case '1':
        case 'true':
          return '1';
        default:
          throw new UnsupportedSelectorError(
            `'${entityName}' must be true/1 or false/0 or empty. Found '${rawValue ?? ''}'`,
          );
      }
    case 'true-false':
      switch (value) {
        case 'true':
          return 'true';
        case 'false':
          return 'false';
        default:
          throw new UnsupportedSelectorError(`'${entityName}' must be true, false or empty. Found '${rawValue ?? ''}'`);
      }
    default:
      throw new UnsupportedSelectorError(`Unsupported boolean format '${booleanFormat}'.`);
  }
}

function assertStringValue(value: string | undefined, entityName: string): asserts value is string | undefined {
  if (!isEmpty(value) && typeof value !== 'string') {
    throw new UnsupportedSelectorError(
      `'${entityName}=${value}' is an invalid attribute. Only string and empty attribute types are supported.`,
    );
  }
}

function normalizeEntity(
  name: string,
  value: string | undefined,
  operator: ParsedAttribute['operator'],
  schema: AttributeSchema,
  aliasMap: AliasMap,
): ParsedAttribute {
  const canonicalName = resolveEntityName(name, schema, aliasMap);
  const definition = schema.attributes[canonicalName];
  if (!definition) {
    throw new UnsupportedSelectorError(`'${name}' is not a valid attribute.`);
  }

  assertStringValue(value, canonicalName);

  switch (definition.type) {
    case 'boolean': {
      const coerced = coerceBoolean(value, canonicalName, schema.booleanFormat);
      const attr: ParsedAttribute = {
        name: canonicalName.toLowerCase(),
        implicit: value === undefined,
      };
      if (coerced !== undefined) {
        attr.value = coerced;
      }
      return attr;
    }
    case 'numeric': {
      const attr: ParsedAttribute = {
        name: canonicalName.toLowerCase(),
        value,
      };
      if (operator) {
        attr.operator = operator;
      }
      return attr;
    }
    case 'string':
      if (operator && !['=', '*=', '^=', '$=', '~='].includes(operator)) {
        throw new UnsupportedSelectorError(`Unsupported CSS attribute operator '${operator}'.`);
      }
      return {
        name: canonicalName.toLowerCase(),
        operator,
        value: value ?? '',
      };
    default:
      throw new UnsupportedSelectorError(`Unsupported attribute type for '${canonicalName}'.`);
  }
}

function normalizeAttribute(attr: InternalCssAttribute, schema: AttributeSchema, aliasMap: AliasMap): ParsedAttribute {
  return normalizeEntity(attr.name, attr.value, attr.operator, schema, aliasMap);
}

function normalizePseudo(pseudo: InternalCssPseudoClass, schema: AttributeSchema, aliasMap: AliasMap): ParsedAttribute {
  return normalizeEntity(pseudo.name, pseudo.value, undefined, schema, aliasMap);
}

function mapCombinator(combinator: string | undefined): ParsedRule['combinator'] {
  if (!combinator || combinator === ' ') {
    return 'descendant';
  }
  if (combinator === '>') {
    return 'child';
  }
  throw new UnsupportedSelectorError(
    `'${combinator}' is not a supported combinator. Only child combinator (>) and descendant combinator are supported.`,
  );
}

function normalizeRule(
  rule: InternalCssRule,
  schema: AttributeSchema,
  aliasMap: AliasMap,
  isNested = false,
): ParsedRule {
  if (rule.combinator && !SUPPORTED_COMBINATORS.has(rule.combinator)) {
    throw new UnsupportedSelectorError(
      `'${rule.combinator}' is not a supported combinator. Only child combinator (>) and descendant combinator are supported.`,
    );
  }

  const parsedRule: ParsedRule = {
    classes: [...rule.classNames],
    attributes: rule.attributes.map((attr) => normalizeAttribute(attr, schema, aliasMap)),
    pseudos: rule.pseudoClasses.map((pseudo) => normalizePseudo(pseudo, schema, aliasMap)),
  };

  if (rule.tag !== undefined) {
    parsedRule.tag = rule.tag;
  }
  if (rule.ids.length) {
    parsedRule.id = rule.ids[0];
  }
  if (isNested || rule.combinator) {
    parsedRule.combinator = mapCombinator(rule.combinator);
  }
  if (rule.nestedRule) {
    parsedRule.nested = normalizeRule(rule.nestedRule, schema, aliasMap, true);
  }

  return parsedRule;
}
