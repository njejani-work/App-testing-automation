"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_WS_PATHNAME_PREFIX = void 0;
exports.addWebSocketHandler = addWebSocketHandler;
exports.getWebSocketHandlers = getWebSocketHandlers;
exports.removeWebSocketHandler = removeWebSocketHandler;
exports.removeAllWebSocketHandlers = removeAllWebSocketHandlers;
const support_1 = require("@appium/support");
exports.DEFAULT_WS_PATHNAME_PREFIX = '/ws';
/**
 * Adds a WebSocket handler to this server's mapping.
 * @see AppiumServerExtension.addWebSocketHandler
 */
async function addWebSocketHandler(handlerPathname, handlerServer) {
    this.webSocketsMapping[handlerPathname] = handlerServer;
}
/**
 * Returns WebSocket handlers for this server, optionally filtered by pathname.
 * @see AppiumServerExtension.getWebSocketHandlers
 */
async function getWebSocketHandlers(keysFilter = null) {
    return Object.entries(this.webSocketsMapping).reduce((acc, [pathname, wsServer]) => {
        if (typeof keysFilter !== 'string' || pathname.includes(keysFilter)) {
            acc[pathname] = wsServer;
        }
        return acc;
    }, {});
}
/**
 * Removes a WebSocket handler by pathname.
 * @see AppiumServerExtension.removeWebSocketHandler
 */
async function removeWebSocketHandler(handlerPathname) {
    const wsServer = this.webSocketsMapping?.[handlerPathname];
    if (!wsServer) {
        return false;
    }
    try {
        wsServer.close();
        for (const client of wsServer.clients || []) {
            client.terminate();
        }
        return true;
    }
    catch {
        // ignore
    }
    finally {
        delete this.webSocketsMapping[handlerPathname];
    }
    return false;
}
/**
 * Removes all WebSocket handlers from this server.
 * @see AppiumServerExtension.removeAllWebSocketHandlers
 */
async function removeAllWebSocketHandlers() {
    if (support_1.util.isEmpty(this.webSocketsMapping)) {
        return false;
    }
    const results = await Promise.all(Object.keys(this.webSocketsMapping).map((pathname) => this.removeWebSocketHandler(pathname)));
    return results.some(Boolean);
}
//# sourceMappingURL=websocket.js.map