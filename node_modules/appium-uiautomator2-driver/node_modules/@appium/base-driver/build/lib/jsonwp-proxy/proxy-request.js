"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyRequest = void 0;
const axios_1 = __importDefault(require("axios"));
class ProxyRequest {
    _requestConfig;
    _resultPromise;
    _abortController;
    _cancelled;
    constructor(requestConfig) {
        this._requestConfig = requestConfig;
        this._resultPromise = null;
        this._abortController = null;
        this._cancelled = false;
    }
    async execute() {
        if (this._resultPromise) {
            return await this._resultPromise;
        }
        const abortController = new AbortController();
        this._abortController = abortController;
        this._cancelled = false;
        try {
            this._resultPromise = this._makeRequest(abortController.signal);
            return await this._resultPromise;
        }
        finally {
            this._abortController = null;
        }
    }
    cancel() {
        this._cancelled = true;
        this._abortController?.abort();
    }
    async _makeRequest(signal) {
        try {
            return await (0, axios_1.default)({
                ...this._requestConfig,
                signal,
            });
        }
        catch (err) {
            if (this._cancelled && axios_1.default.isCancel(err)) {
                // The request was cancelled; do not propagate the error to callers.
                return await new Promise(() => { });
            }
            throw err;
        }
    }
}
exports.ProxyRequest = ProxyRequest;
//# sourceMappingURL=proxy-request.js.map