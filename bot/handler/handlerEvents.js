'use strict';

const EventEmitter = require('events');

class BotEvents extends EventEmitter {
    constructor() {
        super();
        this.setMaxListeners(100);
    }

    async dispatch(eventName, ...args) {
        const listeners = this.listeners(eventName);

        for (const listener of listeners) {
            try {
                await listener(...args);
            } catch (error) {
                console.error(
                    `[EVENT ERROR] ${eventName}:`,
                    error.stack || error.message
                );
            }
        }
    }
}

module.exports = new BotEvents();
