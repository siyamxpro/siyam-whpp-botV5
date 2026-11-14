/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */
'use strict';

const { verifyIntegrity } = require('../utils/integrity');

const result = verifyIntegrity();

if (!result.valid) {
    console.error('⚠️ ফাইল পরিবর্তন শনাক্ত হয়েছে!');

    for (const error of result.errors) {
        console.error('-', error);
    }

    process.exit(1);
}

console.log('সব Protected ফাইলের Integrity ঠিক আছে।');
