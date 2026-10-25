import type { AppiumLogger, BidiModuleMap, BiDiResultData, IIpcSubscription, IpcData, StringRecord } from '@appium/types';
export declare class ExtensionCore {
    bidiEventSubs: Record<string, string[]>;
    bidiCommands: BidiModuleMap;
    _logPrefix?: string;
    readonly eventEmitter: NodeJS.EventEmitter;
    protected _log: AppiumLogger;
    private ipc?;
    constructor(logPrefix?: string);
    get log(): AppiumLogger;
    updateLogPrefix(logPrefix: string): void;
    updateBidiCommands(cmds: BidiModuleMap): void;
    doesBidiCommandExist(moduleName: string, methodName: string): boolean;
    ensureBidiCommandExists(moduleName: string, methodName: string): void;
    executeBidiCommand(bidiCmd: string, bidiParams: StringRecord, next?: () => Promise<any>, driver?: ExtensionCore): Promise<BiDiResultData>;
    onIpcInit(): Promise<void>;
    ipcSubscribe<T extends IpcData>(topic: string): IIpcSubscription<T>;
}
//# sourceMappingURL=extension-core.d.ts.map