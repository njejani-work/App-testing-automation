#!/usr/bin/env node
import './logsink';
import './logger';
import type { AppiumServer } from '@appium/types';
import type { Args, CliCommand, CliCommandServer, CliCommandSetupSubcommand, CliExtensionSubcommand } from 'appium/types';
import type { ExtCommandInitResult, InitResult, ServerInitData } from './bootstrap/init-types';
/**
 * Initializes Appium, but does not start the server.
 *
 * Use this to get at the configuration schema.
 *
 * If `args` contains a non-empty `subcommand` which is not `server`, this function will return an empty object.
 */
export declare function init<Cmd extends CliCommand = CliCommandServer, SubCmd extends CliExtensionSubcommand | CliCommandSetupSubcommand | void = void>(args?: Args<Cmd, SubCmd>): Promise<InitResult<Cmd>>;
/**
 * Initializes Appium's config. Starts server if appropriate and resolves the
 * server instance if so; otherwise resolves with `undefined`.
 */
export declare function main<Cmd extends CliCommand = CliCommandServer, SubCmd extends CliExtensionSubcommand | CliCommandSetupSubcommand | void = void>(args?: Args<Cmd, SubCmd>): Promise<Cmd extends CliCommandServer ? AppiumServer : void>;
export { readConfigFile } from './bootstrap/config-file';
export { finalizeSchema, getSchema, validate } from './schema/schema';
export declare const resolveAppiumHome: ((cwd?: string) => Promise<string>) & {
    cache: Map<unknown, Promise<string>>;
};
export type { ExtCommandInitResult, InitResult, ServerInitData };
//# sourceMappingURL=main.d.ts.map