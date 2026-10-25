"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBlocking = setBlocking;
const DEFAULT_STREAMS = [process.stdout, process.stderr];
/**
 * Enable or disable blocking mode for stdio streams.
 * @param blocking Whether stdio should block on write.
 * @param streams Streams to configure (defaults to stdout and stderr).
 */
function setBlocking(blocking, streams = DEFAULT_STREAMS) {
    for (const stream of streams) {
        const handle = stream._handle;
        if (handle && stream.isTTY && typeof handle.setBlocking === 'function') {
            handle.setBlocking(blocking);
        }
    }
}
//# sourceMappingURL=set-blocking.js.map