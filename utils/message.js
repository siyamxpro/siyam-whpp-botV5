/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */
'use strict';

function extractMessageText(message = {}) {
    if (message.conversation) return message.conversation;

    if (message.extendedTextMessage?.text) {
        return message.extendedTextMessage.text;
    }

    const types = [
        'imageMessage',
        'videoMessage',
        'documentMessage'
    ];

    for (const type of types) {
        if (message[type]?.caption) {
            return message[type].caption;
        }
    }

    if (message.buttonsResponseMessage?.selectedButtonId) {
        return message.buttonsResponseMessage.selectedButtonId;
    }

    if (message.listResponseMessage?.singleSelectReply?.selectedRowId) {
        return message.listResponseMessage.singleSelectReply.selectedRowId;
    }

    return '';
}

function parseCommand(text, prefix = ',') {
    const value = String(text || '').trim();

    if (!value.startsWith(prefix)) return null;

    const parts = value.slice(prefix.length).trim().split(/\s+/);
    const name = (parts.shift() || '').toLowerCase();

    if (!name) return null;

    return {
        name,
        args: parts,
        input: parts.join(' ')
    };
}

module.exports = {
    extractMessageText,
    parseCommand
};
