export interface InternalCssAttribute {
  name: string;
  operator?: '=' | '*=' | '^=' | '$=' | '~=';
  value?: string;
}

export interface InternalCssPseudoClass {
  name: string;
  value?: string;
}

export interface InternalCssRule {
  combinator?: string;
  tag?: string;
  classNames: string[];
  ids: string[];
  attributes: InternalCssAttribute[];
  pseudoClasses: InternalCssPseudoClass[];
  nestedRule?: InternalCssRule;
}

export interface InternalCssSelector {
  rules: InternalCssRule[];
}

export interface CssParserAdapter {
  parse(selector: string): InternalCssSelector;
}
