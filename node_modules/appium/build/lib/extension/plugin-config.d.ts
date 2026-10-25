import type { PluginType } from '@appium/types';
import type { ExtManifest, ExtName, ExtRecord } from 'appium/types';
import { ExtensionConfig } from './extension-config';
import type { Manifest } from './manifest';
export declare class PluginConfig extends ExtensionConfig<PluginType> {
    private static readonly _instances;
    private constructor();
    static create(manifest: Manifest): PluginConfig;
    static getInstance(manifest: Manifest): PluginConfig | undefined;
    validate(): Promise<ExtRecord<PluginType>>;
    extensionDesc(pluginName: ExtName<PluginType>, { version }: ExtManifest<PluginType>): string;
    print(activeNames?: ExtName<PluginType>[]): void;
}
//# sourceMappingURL=plugin-config.d.ts.map