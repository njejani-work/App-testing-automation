import type { BaseDriverCapConstraints, Capabilities, Constraints, NSCapabilities, W3CCapabilities } from '@appium/types';
/** Result of successfully parsing W3C capabilities for the inner driver. */
export interface ParsedDriverCaps<C extends Constraints = BaseDriverCapConstraints> {
    desiredCaps: Capabilities<C>;
    processedW3CCapabilities: W3CCapabilities<C>;
}
/** Result when capability parsing fails or caps are invalid. */
export interface InvalidCaps<C extends Constraints = BaseDriverCapConstraints> {
    error: Error;
    desiredCaps?: Capabilities<C>;
    processedW3CCapabilities?: W3CCapabilities<C>;
}
/**
 * Creates an error when a session receives non-W3C capabilities.
 */
export declare function makeNonW3cCapsError(): Error;
/**
 * Parses W3C capabilities for the inner driver and applies defaults.
 *
 * @returns Parsed caps or an invalid result with an error.
 */
export declare function parseCapsForInnerDriver<C extends Constraints = BaseDriverCapConstraints>(w3cCapabilities: W3CCapabilities<C>, constraints?: C, defaultCapabilities?: NSCapabilities<C>): ParsedDriverCaps<C> | InvalidCaps<C>;
/**
 * Prefixes capability keys with `appium:` where appropriate.
 */
export declare function insertAppiumPrefixes<C extends Constraints = BaseDriverCapConstraints>(caps: Capabilities<C>): NSCapabilities<C>;
/**
 * Removes `appium:` prefix from capability keys.
 */
export declare function removeAppiumPrefixes<C extends Constraints = BaseDriverCapConstraints>(caps: NSCapabilities<C>): Capabilities<C>;
/**
 * Pulls Appium settings from capabilities (mutates caps). Supports
 * `settings[key]: value` and `settings: { key: value }`.
 *
 * @returns Parsed settings object; empty if none found.
 */
export declare function pullSettings(caps: Record<string, unknown> | null | undefined): Record<string, unknown>;
//# sourceMappingURL=capability.d.ts.map