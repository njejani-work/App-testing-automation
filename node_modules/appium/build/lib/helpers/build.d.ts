import type { BuildInfo } from 'appium/types';
export declare const APPIUM_VER: string;
/**
 * Returns the current git commit SHA for this Appium checkout.
 *
 * Attempts to read from local git first; when unavailable and fallback is enabled,
 * queries the GitHub API for the tag matching the current Appium version.
 */
export declare function getGitRev(useGithubApiFallback?: boolean): Promise<string | null>;
/**
 * Update mutable build info metadata from local git or GitHub fallback.
 */
export declare function updateBuildInfo(useGithubApiFallback?: boolean): Promise<void>;
/**
 * Mutable object containing Appium build information. By default it
 * only contains the Appium version, but is updated with the build timestamp
 * and git commit hash asynchronously as soon as `updateBuildInfo` is called
 * and succeeds.
 */
export declare function getBuildInfo(): BuildInfo;
//# sourceMappingURL=build.d.ts.map