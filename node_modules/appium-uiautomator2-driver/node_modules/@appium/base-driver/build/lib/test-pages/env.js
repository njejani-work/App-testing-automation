"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEGACY_TEST_PAGES_ENV = void 0;
exports.isLegacyTestPagesEnabled = isLegacyTestPagesEnabled;
/** Environment variable that opts into deprecated built-in test pages on the Appium server. */
exports.LEGACY_TEST_PAGES_ENV = 'APPIUM_ENABLE_LEGACY_TEST_PAGES';
const TRUTHY = new Set(['1', 'true', 'yes']);
/** @returns Whether built-in legacy test pages should be mounted on the Appium server. */
function isLegacyTestPagesEnabled() {
    return TRUTHY.has(String(process.env[exports.LEGACY_TEST_PAGES_ENV] ?? '').toLowerCase());
}
//# sourceMappingURL=env.js.map