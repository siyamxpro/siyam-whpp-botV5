/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { getHash } = require('../utils/integrity');

const protectedFiles = [
    'index.js',
    'config/index.js',
    'bot/login/login.js',
    'bot/messageHandler.js',
    'logger/log.js',
    'utils/authorGuard.js',
    'utils/integrity.js'
];

const files = {};

for (const file of protectedFiles) {
    const fullPath = path.resolve(process.cwd(), file);

    if (!fs.existsSync(fullPath)) {
        console.error(`ফাইল পাওয়া যায়নি: ${file}`);
        process.exitCode = 1;
        continue;
    }

    files[file] = getHash(fullPath);
}

if (process.exitCode) process.exit(1);

fs.writeFileSync(
    'integrity.json',
    JSON.stringify({
        author: '𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡',
        algorithm: 'sha256',
        files
    }, null, 2)
);

console.log('Integrity manifest তৈরি হয়েছে।');
