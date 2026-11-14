'use strict';

const fs = require('fs');
const path = require('path');

const handlerEvents = require('../../bot/handler/handlerEvents');

module.exports = function registerEvents(sock, context) {
    const files = fs.readdirSync(__dirname);

    for (const file of files) {
        if (
            !file.endsWith('.js') ||
            file === 'index.js'
        ) {
            continue;
        }

        const filePath = path.join(__dirname, file);

        try {
            delete require.cache[require.resolve(filePath)];

            const event = require(filePath);

            if (
                !event ||
                typeof event.eventName !== 'string' ||
                typeof event.run !== 'function'
            ) {
                console.error(`[EVENT] Invalid event file: ${file}`);
                continue;
            }

            handlerEvents.removeAllListeners(event.eventName);

            handlerEvents.on(event.eventName, async (...args) => {
                try {
                    await event.run(context, ...args);
                } catch (error) {
                    console.error(
                        `[EVENT] ${file} failed:`,
                        error.stack || error.message
                    );
                }
            });

            sock.ev.on(event.eventName, (...args) => {
                handlerEvents.dispatch(event.eventName, ...args);
            });

            console.log(`[EVENT] Loaded: ${event.eventName} (${file})`);

        } catch (error) {
            console.error(`[EVENT] Failed: ${file}`, error);
        }
    }
};
