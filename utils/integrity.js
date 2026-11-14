/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getHash(file) {
    const content = fs.readFileSync(file);
    return crypto.createHash('sha256').update(content).digest('hex');
}

function verifyIntegrity(manifestPath = 'integrity.json') {
    const fullManifest = path.resolve(process.cwd(), manifestPath);

    if (!fs.existsSync(fullManifest)) {
        return {
            valid: false,
            errors: ['integrity.json পাওয়া যায়নি।']
        };
    }

    const manifest = JSON.parse(
        fs.readFileSync(fullManifest, 'utf8')
    );

    const errors = [];

    for (const [file, expectedHash] of Object.entries(manifest.files || {})) {
        const fullPath = path.resolve(process.cwd(), file);

        if (!fs.existsSync(fullPath)) {
            errors.push(`${file}: ফাইল নেই`);
            continue;
        }

        if (getHash(fullPath) !== expectedHash) {
            errors.push(`${file}: পরিবর্তন শনাক্ত হয়েছে`);
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

module.exports = {
    getHash,
    verifyIntegrity
};
