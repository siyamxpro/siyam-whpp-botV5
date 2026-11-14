/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */
'use strict';

function normalizePhone(value) {
    return String(value || '')
        .replace(/\D/g, '')
        .replace(/^00/, '');
}

function isValidPhone(value) {
    return /^\d{8,15}$/.test(normalizePhone(value));
}

function phoneFromJid(jid) {
    return normalizePhone(
        String(jid || '').split('@')[0].split(':')[0]
    );
}

module.exports = {
    normalizePhone,
    isValidPhone,
    phoneFromJid
};
