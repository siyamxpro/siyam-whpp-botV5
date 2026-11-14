/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */
'use strict';

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');

function connectDB() {
    try {
        fs.mkdirSync(DATA_DIR, {
            recursive: true
        });

        const files = [
            'users.json',
            'threads.json',
            'global.json'
        ];

        for (const file of files) {
            const filePath = path.join(DATA_DIR, file);

            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(
                    filePath,
                    '{}',
                    'utf8'
                );
            }
        }

        return true;
    } catch (error) {
        throw new Error(
            `Database initialization failed: ${error.message}`
        );
    }
}

module.exports = connectDB;
