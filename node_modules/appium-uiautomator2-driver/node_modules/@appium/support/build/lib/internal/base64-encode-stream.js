"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBase64EncodeStream = createBase64EncodeStream;
const node_stream_1 = __importDefault(require("node:stream"));
/** Returns a Transform stream that base64-encodes incoming binary chunks. */
function createBase64EncodeStream() {
    let remainder = Buffer.alloc(0);
    /* eslint-disable promise/prefer-await-to-callbacks -- Node stream Transform API */
    return new node_stream_1.default.Transform({
        transform(chunk, _encoding, callback) {
            const input = Buffer.concat([remainder, chunk]);
            const completeByteLength = Math.floor(input.length / 3) * 3;
            if (completeByteLength === 0) {
                remainder = input;
                callback();
                return;
            }
            const encodable = input.subarray(0, completeByteLength);
            remainder = input.subarray(completeByteLength);
            callback(null, toBase64Buffer(encodable));
        },
        flush(callback) {
            if (remainder.length) {
                callback(null, toBase64Buffer(remainder));
            }
            else {
                callback();
            }
        },
    });
    /* eslint-enable promise/prefer-await-to-callbacks */
}
function toBase64Buffer(data) {
    return Buffer.from(data.toString('base64'), 'latin1');
}
//# sourceMappingURL=base64-encode-stream.js.map