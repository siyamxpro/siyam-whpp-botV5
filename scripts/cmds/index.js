'use strict';

const fs = require('fs');
const path = require('path');

const commands = new Map();

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

        const command = require(filePath);

        if (
            !command ||
            typeof command.name !== 'string' ||
            typeof command.run !== 'function'
        ) {
            console.error(`[COMMAND] Invalid command file: ${file}`);
            continue;
        }

        commands.set(command.name.toLowerCase(), command);

        if (Array.isArray(command.aliases)) {
            for (const alias of command.aliases) {
                commands.set(String(alias).toLowerCase(), command);
            }
        }

        console.log(`[COMMAND] Loaded: ${command.name}`);

    } catch (error) {
        console.error(`[COMMAND] Failed: ${file}`, error);
    }
}

module.exports = commands;
