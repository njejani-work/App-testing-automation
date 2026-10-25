import type { ListCommandsResponse, ListExtensionsResponse } from '@appium/types';
import type { AppiumDriver } from './appium';
/**
 * Returns available REST and BiDi commands for base, driver and plugins.
 */
export declare function listCommands(this: AppiumDriver, sessionId?: string): Promise<ListCommandsResponse>;
/**
 * Returns available execute methods exposed by driver and plugins.
 */
export declare function listExtensions(this: AppiumDriver, sessionId?: string): Promise<ListExtensionsResponse>;
//# sourceMappingURL=inspector-commands.d.ts.map