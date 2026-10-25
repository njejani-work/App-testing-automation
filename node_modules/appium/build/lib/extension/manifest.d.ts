import type { ExtensionType } from '@appium/types';
import type { ExtManifest, ExtPackageJson, ExtRecord, ManifestData } from 'appium/types';
import { INSTALL_TYPE_DEV, INSTALL_TYPE_NPM } from './extension-config';
/**
 * Handles reading & writing of extension config files.
 *
 * Only one instance of this class exists per value of `APPIUM_HOME`.
 */
export declare class Manifest {
    #private;
    /**
     * Returns the memoized manifest for an `APPIUM_HOME` directory (one instance per home).
     *
     * @param appiumHome - `APPIUM_HOME` path used as the cache key
     */
    static getInstance: ((appiumHome: string) => Manifest) & {
        cache: Map<unknown, Manifest>;
    };
    private constructor();
    /** `APPIUM_HOME` directory this manifest is tied to. */
    get appiumHome(): string;
    /**
     * Absolute path to the extension manifest file after {@link Manifest.read} or {@link Manifest.write} has resolved it.
     * Before that, this is `undefined`.
     */
    get manifestPath(): string | undefined;
    /** Schema revision of the in-memory manifest data (from YAML `schemaRev`). */
    get schemaRev(): number;
    /**
     * Returns the live installed-extension map for drivers or plugins (same object as stored in memory).
     * Mutations affect the manifest until replaced by a new object (e.g. via `read()`); `setExtension` / `deleteExtension` update this record.
     *
     * @param extType - `"driver"` or `"plugin"`
     */
    getExtensionData<ExtType extends ExtensionType>(extType: ExtType): ExtRecord<ExtType>;
    /**
     * Whether a driver with the given manifest key is present.
     *
     * @param name - Driver name as stored under `drivers` in the manifest
     */
    hasDriver(name: string): boolean;
    /**
     * Whether a plugin with the given manifest key is present.
     *
     * @param name - Plugin name as stored under `plugins` in the manifest
     */
    hasPlugin(name: string): boolean;
    /**
     * Loads manifest YAML from disk into memory, runs migration when needed, may sync with installed packages, and writes back if required.
     * Concurrent calls while a read is in flight share the same in-flight work.
     *
     * @returns The parsed in-memory manifest data
     */
    read(): Promise<ManifestData>;
    /**
     * Serializes the current in-memory manifest to the resolved manifest path.
     * Concurrent calls while a write is in flight share the same in-flight work.
     *
     * @returns `true` when the file was written successfully
     */
    write(): Promise<boolean>;
    /**
     * Scans `APPIUM_HOME` (root and `node_modules`) for Appium extension packages and merges them into the manifest.
     *
     * @param hasAppiumDependency - When true and the root `package.json` depends on Appium, matching extensions use the `"dev"` install type
     * @returns `true` if any extension entries changed, `false` otherwise
     */
    syncWithInstalledExtensions(hasAppiumDependency?: boolean): Promise<boolean>;
    /**
     * Builds manifest metadata from a `package.json` and registers it if it is a driver or plugin and the entry changed.
     *
     * @param pkgJson - Parsed extension `package.json`
     * @param pkgPath - Path to that `package.json` (install path is derived from its directory)
     * @param installType - How the package was discovered (`npm` vs `dev`)
     * @returns `true` if the manifest was updated, `false` if unchanged or already matched
     * @throws TypeError if the package is not a valid driver or plugin extension
     */
    addExtensionFromPackage(pkgJson: ExtPackageJson<ExtensionType>, pkgPath: string, installType?: typeof INSTALL_TYPE_NPM | typeof INSTALL_TYPE_DEV): boolean;
    /**
     * Stores a deep-cloned copy of extension metadata under the given type and name.
     *
     * @param extType - `"driver"` or `"plugin"`
     * @param extName - Manifest key for the extension
     * @param extData - Full extension entry to persist in memory
     * @returns The cloned data now held in the manifest
     */
    setExtension<ExtType extends ExtensionType>(extType: ExtType, extName: string, extData: ExtManifest<ExtType>): ExtManifest<ExtType>;
    /**
     * Updates the in-memory manifest schema revision (typically during migration).
     *
     * @param rev - New `schemaRev` value
     */
    setSchemaRev(rev: number): void;
    /**
     * Removes an extension entry from the manifest data in memory (does not write to disk by itself).
     *
     * @param extType - `"driver"` or `"plugin"`
     * @param extName - Manifest key to remove
     */
    deleteExtension(extType: ExtensionType, extName: string): void;
}
//# sourceMappingURL=manifest.d.ts.map