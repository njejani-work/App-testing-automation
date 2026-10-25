import type { DriverClass, PluginClass } from '@appium/types';
import { DriverConfig } from './driver-config';
import { PluginConfig } from './plugin-config';
export type ExtensionConfigs = {
    driverConfig: DriverConfig;
    pluginConfig: PluginConfig;
};
export type PluginNameMap = Map<PluginClass, string>;
export type DriverNameMap = Map<DriverClass, string>;
/**
 * Loads extensions and creates `ExtensionConfig` instances.
 *
 * - Reads the manifest file, creating if necessary
 * - Using the parsed extension data, creates/gets the `ExtensionConfig` subclass instances
 * - Returns these instances
 *
 * If `appiumHome` is needed, use `resolveAppiumHome` from the `env` module in `@appium/support`.
 */
export declare function loadExtensions(appiumHome: string): Promise<ExtensionConfigs>;
/**
 * Find any plugin name which has been installed, and which has been requested for activation by
 * using the --use-plugins flag, and turn each one into its class, so we can send them as objects
 * to the server init. We also want to send/assign them to the umbrella driver so it can use them
 * to wrap command execution
 */
export declare function getActivePlugins(pluginConfig: PluginConfig, maxParallelImports: number, usePlugins?: string[]): Promise<PluginNameMap>;
/**
 * Find any driver name which has been installed, and turn each one into its class, so we can send
 * them as objects to the server init in case they need to add methods/routes or update the server.
 * If the --drivers flag was given, this method only loads the given drivers.
 */
export declare function getActiveDrivers(driverConfig: DriverConfig, maxParallelImports: number, useDrivers?: string[]): Promise<DriverNameMap>;
//# sourceMappingURL=index.d.ts.map