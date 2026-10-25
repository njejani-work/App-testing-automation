import type { Class, DriverType, ExtensionType, PluginType } from '@appium/types';
import type { Args, CliExtensionCommand, CliExtensionSubcommand } from 'appium/types';
import type { ExtensionConfig } from '../extension/extension-config';
import DriverCliCommand from './driver-command';
import PluginCliCommand from './plugin-command';
export declare const commandClasses: Readonly<{
    readonly driver: typeof DriverCliCommand;
    readonly plugin: typeof PluginCliCommand;
}>;
export type ExtCommand<ExtType extends ExtensionType> = ExtType extends DriverType ? Class<DriverCliCommand> : ExtType extends PluginType ? Class<PluginCliCommand> : never;
/**
 * Executes a driver/plugin extension subcommand and returns the command result.
 *
 * When JSON output is enabled, this also prints the serialized command result
 * unless output was suppressed by the caller.
 */
export declare function runExtensionCommand<Cmd extends CliExtensionCommand, SubCmd extends CliExtensionSubcommand>(args: Args<Cmd, SubCmd>, config: ExtensionConfig<Cmd>): Promise<Record<string, unknown>>;
//# sourceMappingURL=extension.d.ts.map