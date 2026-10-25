"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = migrate;
const constants_1 = require("../constants");
const logger_1 = require("../logger");
const SCHEMA_REV_3 = 3;
const SCHEMA_REV_4 = 4;
const Migrations = {
    [SCHEMA_REV_3]: (manifest) => {
        const drivers = manifest.getExtensionData(constants_1.DRIVER_TYPE);
        const plugins = manifest.getExtensionData(constants_1.PLUGIN_TYPE);
        const allExtData = [...Object.values(drivers), ...Object.values(plugins)];
        return allExtData.some((metadata) => !('installPath' in metadata));
    },
    [SCHEMA_REV_4]: (manifest) => {
        if (manifest.schemaRev < SCHEMA_REV_4) {
            const drivers = manifest.getExtensionData(constants_1.DRIVER_TYPE);
            const plugins = manifest.getExtensionData(constants_1.PLUGIN_TYPE);
            const allExtData = [...Object.values(drivers), ...Object.values(plugins)];
            return allExtData.some((metadata) => metadata.installType === 'npm');
        }
        return false;
    },
};
/**
 * Applies a series of migration functions to a manifest to update its manifest schema version.
 *
 * `data` is modified in-place.
 *
 * @returns If `true` existing packages should be synced from disk and the manifest should be persisted.
 */
async function migrate(manifest) {
    let didChange = false;
    for (const migration of Object.values(Migrations)) {
        if (migration) {
            didChange = (await migration(manifest)) || didChange;
        }
    }
    didChange = setSchemaRev(manifest, constants_1.CURRENT_SCHEMA_REV) || didChange;
    if (didChange) {
        logger_1.log.debug(`Upgraded extension manifest to schema v${manifest.schemaRev}`);
    }
    return didChange;
}
function setSchemaRev(manifest, version) {
    if ((manifest.schemaRev ?? 0) < version) {
        manifest.setSchemaRev(version);
        return true;
    }
    return false;
}
//# sourceMappingURL=manifest-migrations.js.map