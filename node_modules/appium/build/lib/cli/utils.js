"use strict";
/* eslint-disable no-console */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RingBuffer = exports.JSON_SPACES = void 0;
exports.errAndQuit = errAndQuit;
exports.log = log;
exports.spinWith = spinWith;
const support_1 = require("@appium/support");
const ora_1 = __importDefault(require("ora"));
exports.JSON_SPACES = 4;
class RingBuffer {
    size;
    buffer = [];
    constructor(size = 50) {
        this.size = size;
    }
    /**
     * Get the current buffer contents.
     */
    getBuff() {
        return this.buffer;
    }
    /**
     * Add an item to the buffer.
     */
    enqueue(item) {
        if (this.buffer.length >= this.size) {
            this.dequeue();
        }
        this.buffer.push(item);
    }
    /**
     * Remove the oldest item from the buffer.
     */
    dequeue() {
        this.buffer.shift();
    }
}
exports.RingBuffer = RingBuffer;
/**
 * Log an error to the console and exit the process.
 *
 * @param json - whether we should log json or text
 * @param msg - error message, object, Error instance, etc.
 */
function errAndQuit(json, msg) {
    if (json) {
        console.log(JSON.stringify({ error: String(msg) }, null, exports.JSON_SPACES));
    }
    else {
        console.error(support_1.console.styleText('red', String(msg)));
        if (msg?.stderr) {
            console.error(support_1.console.styleText('red', String(msg.stderr)));
        }
    }
    process.exit(1);
}
/**
 * Conditionally log something to the console.
 *
 * @param json - whether we are in json mode (and should therefore not log)
 * @param msg - string to log
 */
function log(json, msg) {
    if (!json) {
        console.log(msg);
    }
}
/**
 * Start a spinner, execute an async function, and then stop the spinner.
 *
 * @param json - whether we are in json mode (and should therefore not log)
 * @param msg - string to log
 * @param fn - function to wrap with spinning
 * @returns result of `fn`
 */
async function spinWith(json, msg, fn) {
    if (json) {
        return await fn();
    }
    const spinner = (0, ora_1.default)(msg).start();
    try {
        const res = await fn();
        spinner.succeed();
        return res;
    }
    catch (err) {
        spinner.fail();
        throw err;
    }
}
//# sourceMappingURL=utils.js.map