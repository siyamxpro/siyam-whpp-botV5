/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

'use strict';

const stamp = () => new Date().toISOString();

module.exports = {
    info(tag, message) {
        console.log(`[${stamp()}] [INFO] [${tag}] ${message}`);
    },

    warn(tag, message) {
        console.warn(`[${stamp()}] [WARN] [${tag}] ${message}`);
    },

    error(tag, message) {
        console.error(`[${stamp()}] [ERROR] [${tag}] ${message}`);
    },

    success(tag, message) {
        console.log(`[${stamp()}] [SUCCESS] [${tag}] ${message}`);
    }
};
