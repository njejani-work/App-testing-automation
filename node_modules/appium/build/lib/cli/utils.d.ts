export declare const JSON_SPACES = 4;
export declare class RingBuffer<T = any> {
    private readonly size;
    private readonly buffer;
    constructor(size?: number);
    /**
     * Get the current buffer contents.
     */
    getBuff(): T[];
    /**
     * Add an item to the buffer.
     */
    enqueue(item: T): void;
    /**
     * Remove the oldest item from the buffer.
     */
    dequeue(): void;
}
/**
 * Log an error to the console and exit the process.
 *
 * @param json - whether we should log json or text
 * @param msg - error message, object, Error instance, etc.
 */
export declare function errAndQuit(json: boolean, msg: unknown): never;
/**
 * Conditionally log something to the console.
 *
 * @param json - whether we are in json mode (and should therefore not log)
 * @param msg - string to log
 */
export declare function log(json: boolean, msg: string): void;
/**
 * Start a spinner, execute an async function, and then stop the spinner.
 *
 * @param json - whether we are in json mode (and should therefore not log)
 * @param msg - string to log
 * @param fn - function to wrap with spinning
 * @returns result of `fn`
 */
export declare function spinWith<T>(json: boolean, msg: string, fn: () => T | Promise<T>): Promise<T>;
//# sourceMappingURL=utils.d.ts.map