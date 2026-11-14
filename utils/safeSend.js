/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */
'use strict';

async function safeSend(sock, jid, content, options = {}) {
    if (!sock || !jid || !content) {
        throw new Error('Message send করার তথ্য অসম্পূর্ণ।');
    }

    try {
        return await sock.sendMessage(jid, content, options);
    } catch (error) {
        console.error('[SEND ERROR]', error.message);
        return null;
    }
}

async function sendText(sock, jid, text, quoted) {
    const options = quoted ? { quoted } : {};

    return safeSend(
        sock,
        jid,
        { text: String(text) },
        options
    );
}

module.exports = {
    safeSend,
    sendText
};
