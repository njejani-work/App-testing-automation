export interface IsPackageChangedOptions {
    cwd?: string;
    hashFilename?: string;
}
export interface IsPackageChangedResult {
    hash: string;
    isChanged: boolean;
    oldHash?: string;
    writeHash: () => Promise<void>;
}
/**
 * Detects whether `package.json` dependencies changed since the last hash write.
 * Inlined from the `package-changed` package (lockfile support omitted; unused by Appium).
 */
export declare function isPackageChanged(options?: IsPackageChangedOptions): Promise<IsPackageChangedResult>;
//# sourceMappingURL=is-package-changed.d.ts.map