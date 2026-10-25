import type { Args, CliCommand, CliCommandServer, CliCommandSetupSubcommand, CliExtensionSubcommand } from 'appium/types';
import type { InitResult } from './init-types';
/**
 * Parses CLI/programmatic args, loads config and extensions, and returns server-ready state or runs extension/setup flows.
 */
export declare class AppiumInitializer {
    private throwInsteadOfExit;
    /**
     * Resolves Appium home, loads config, and either returns server-ready state for the server subcommand
     * or performs setup/extension CLI work and returns an empty result.
     *
     * @param args - Optional programmatic args; when omitted, parses `process.argv`
     */
    init<Cmd extends CliCommand = CliCommandServer, SubCmd extends CliExtensionSubcommand | CliCommandSetupSubcommand | void = void>(args?: Args<Cmd, SubCmd>): Promise<InitResult<Cmd>>;
    private parsePreConfigArgs;
    private assertConfigFileOk;
    private finishServerInit;
    private applyLogFilters;
    private runExtensionCliIfNeeded;
}
//# sourceMappingURL=appium-initializer.d.ts.map