import axios from 'axios';
export declare class ProxyRequest {
    private readonly _requestConfig;
    private _resultPromise;
    private _abortController;
    private _cancelled;
    constructor(requestConfig: axios.RawAxiosRequestConfig<any>);
    execute(): Promise<axios.AxiosResponse>;
    cancel(): void;
    private _makeRequest;
}
//# sourceMappingURL=proxy-request.d.ts.map