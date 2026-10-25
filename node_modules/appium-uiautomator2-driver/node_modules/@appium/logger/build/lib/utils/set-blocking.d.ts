type BlockingStream = NodeJS.WriteStream & {
    _handle?: {
        setBlocking?: (value: boolean) => void;
    };
};
/**
 * Enable or disable blocking mode for stdio streams.
 * @param blocking Whether stdio should block on write.
 * @param streams Streams to configure (defaults to stdout and stderr).
 */
export declare function setBlocking(blocking: boolean, streams?: readonly BlockingStream[]): void;
export {};
//# sourceMappingURL=set-blocking.d.ts.map