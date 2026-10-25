import type { Args, CliCommandSetup, CliCommandSetupSubcommand } from 'appium/types';
import type { ExtensionConfig } from '../extension/extension-config';
/**
 * Subcommands of preset for setup
 */
export declare const SUBCOMMAND_MOBILE = "mobile";
export declare const SUBCOMMAND_DESKTOP = "desktop";
export declare const SUBCOMMAND_BROWSER = "browser";
export declare const SUBCOMMAND_RESET = "reset";
/**
 * Plugin names listed in KNOWN_PLUGINS to install by default.
 */
export declare const DEFAULT_PLUGINS: string[];
type DriverConfig = ExtensionConfig<'driver'>;
type PluginConfig = ExtensionConfig<'plugin'>;
/**
 * Return a list of drivers available for current host platform.
 */
export declare function getPresetDrivers(presetName: Exclude<CliCommandSetupSubcommand, 'reset'>): string[];
/**
 * Return desktop platform name for setup command description.
 */
export declare function determinePlatformName(): string;
/**
 * Runs the `setup` command and applies the selected preset.
 *
 * Depending on the subcommand, this installs mobile/desktop/browser presets or
 * removes all installed extensions and manifests via `reset`.
 */
export declare function runSetupCommand(preConfigArgs: Args<CliCommandSetup>, driverConfig: DriverConfig, pluginConfig: PluginConfig): Promise<void>;
export {};
//# sourceMappingURL=setup-command.d.ts.map