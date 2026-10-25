import type { KeywordDefinition } from 'ajv';
import { transformers } from './cli-transformers';
export type AppiumCliTransformerName = keyof typeof transformers;
export interface AppiumJSONSchemaKeywords {
    appiumCliDest?: string;
    appiumCliDescription?: string;
    appiumCliAliases?: string[];
    appiumCliIgnored?: boolean;
    appiumCliTransformer?: AppiumCliTransformerName;
    appiumDeprecated?: boolean;
}
/**
 * Collection of keyword definitions to add to the singleton `Ajv` instance.
 */
export declare const keywords: Record<string, KeywordDefinition>;
//# sourceMappingURL=keywords.d.ts.map