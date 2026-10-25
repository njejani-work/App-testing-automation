"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const support_1 = require("@appium/support");
const mixin_1 = require("./mixin");
const EventCommands = {
    /**
     * Log a user-defined event in the event log.
     *
     * @param vendor - a vendor prefix for the user, to ensure namespace
     * separation
     * @param event - the event name
     */
    async logCustomEvent(vendor, event) {
        this.logEvent(`${vendor}:${event}`);
    },
    /**
     * Get the event log
     * @param type - the event type to filter with.
     * It returns all events if the type is not provided or empty string/array.
     * @returns the event history log object
     */
    async getLogEvents(type) {
        if (support_1.util.isEmpty(type)) {
            return this.eventHistory;
        }
        const typeList = Array.isArray(type) ? type : [type];
        return Object.entries(this.eventHistory).reduce((acc, [eventType, eventTimes]) => {
            if (typeList.includes(eventType)) {
                acc[eventType] = eventTimes;
            }
            return acc;
        }, {});
    },
};
(0, mixin_1.mixin)(EventCommands);
//# sourceMappingURL=event.js.map