import type { StringRecord } from '@appium/types';
interface Grid3HubConfiguration {
    hubProtocol?: string;
    hubHost?: string;
    hubPort?: number;
    url?: string;
    host?: string;
    port?: number;
    id?: string;
    register?: boolean;
    registerCycle?: number;
}
interface Grid3NodeConfig extends StringRecord {
    configuration?: Grid3HubConfiguration;
    capabilities?: unknown;
}
export default function registerNode(data: string, addr: string, port: number, basePath: string): Promise<void>;
export default function registerNode(data: Grid3NodeConfig, addr?: string, port?: number, basePath?: string): Promise<void>;
export {};
//# sourceMappingURL=grid-v3-register.d.ts.map