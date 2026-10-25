import type { Manifest } from './manifest';
/**
 * Applies a series of migration functions to a manifest to update its manifest schema version.
 *
 * `data` is modified in-place.
 *
 * @returns If `true` existing packages should be synced from disk and the manifest should be persisted.
 */
export declare function migrate(manifest: Manifest): Promise<boolean>;
//# sourceMappingURL=manifest-migrations.d.ts.map