/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */
'use strict';

const fs = require('fs');
const path = require('path');

const AUTHOR = '𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡';
const HEADER = `@author ${AUTHOR}`;

function checkAuthorHeader(files = []) {
    const failures = [];

    for (const file of files) {
        const fullPath = path.resolve(process.cwd(), file);

        if (!fs.existsSync(fullPath)) {
            failures.push(`${file}: ফাইল পাওয়া যায়নি`);
            continue;
        }

        const content = fs.readFileSync(fullPath, 'utf8');

        if (!content.includes(HEADER)) {
            failures.push(`${file}: লেখকের নামের Header পরিবর্তিত`);
        }
    }

    if (failures.length) {
        console.error('\n⚠️ AUTHOR PROTECTION WARNING');
        console.error('লেখকের নামের Header পরিবর্তন শনাক্ত হয়েছে।');

        for (const failure of failures) {
            console.error(`- ${failure}`);
        }

        return false;
    }

    return true;
}

module.exports = {
    AUTHOR,
    checkAuthorHeader
};
