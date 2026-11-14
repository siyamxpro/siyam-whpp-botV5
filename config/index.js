/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */
'use strict';

const fs = require('fs');
const path = require('path');

const configPath = path.resolve(__dirname, '..', 'config.json');

function loadConfig() {
    if (!fs.existsSync(configPath)) {
        throw new Error('config.json পাওয়া যায়নি।');
    }

    const config = JSON.parse(
        fs.readFileSync(configPath, 'utf8')
    );

    if (!config.prefix || typeof config.prefix !== 'string') {
        throw new Error('সঠিক prefix সেট করা হয়নি।');
    }

    if (!config.session?.directory) {
        throw new Error('Session directory সেট করা হয়নি।');
    }

    return config;
}

module.exports = loadConfig;
