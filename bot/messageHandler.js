/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

'use strict';

const log = require('../logger/log');
const commands = require('../scripts/cmds');

module.exports = async function handleMessage(sock, message, config) {
    if (!message?.message || message.key?.fromMe) return;

    const jid = message.key.remoteJid;

    if (!jid || jid === 'status@broadcast') return;

    const sender = message.key.participant || jid;

    const senderNumber = String(sender)
        .split('@')[0]
        .split(':')[0];

    const text = extractText(message.message).trim();

    if (!text) return;

    const ownerNumber = String(config.ownerNumber || '')
        .replace(/\D/g, '');

    const adminNumbers = (config.adminNumbers || [])
        .map(number => String(number).replace(/\D/g, ''));

    const isOwner = senderNumber === ownerNumber;

    const isAdmin = isOwner || adminNumbers.includes(senderNumber);

    if (config.whiteListMode?.enable) {
        const allowedNumbers = (
            config.whiteListMode.whiteListIds || []
        ).map(number => String(number).replace(/\D/g, ''));

        if (!allowedNumbers.includes(senderNumber)) return;
    }

    const prefix = config.prefix || ',';

    if (!text.startsWith(prefix)) return;

    const body = text.slice(prefix.length).trim();

    const [commandName, ...args] = body.split(/\s+/);

    if (!commandName) return;

    const context = {
        sock,
        message,
        config,
        jid,
        sender,
        senderNumber,

        args,
        input: args.join(' '),

        commandName: commandName.toLowerCase(),

        isOwner,
        isAdmin,

        reply: async response => {
            return sock.sendMessage(
                jid,
                { text: String(response) },
                { quoted: message }
            );
        }
    };

    const command = commands.get(context.commandName);

    if (!command) {
        log.info(
            'COMMAND',
            `Command not registered: ${context.commandName}`
        );
        return;
    }

    if (
        config.adminOnly?.enable &&
        !isAdmin &&
        !(config.adminOnly.ignoreCommand || [])
            .includes(context.commandName)
    ) {
        return;
    }

    if (command.adminOnly && !isAdmin) {
        return context.reply(
            'এই কমান্ডটি শুধু অ্যাডমিন ব্যবহার করতে পারবেন।'
        );
    }

    await command.run(context);
};

function extractText(message) {
    if (message.conversation) {
        return message.conversation;
    }

    if (message.extendedTextMessage?.text) {
        return message.extendedTextMessage.text;
    }

    const mediaTypes = [
        'imageMessage',
        'videoMessage',
        'documentMessage'
    ];

    for (const type of mediaTypes) {
        const caption = message[type]?.caption;

        if (caption) return caption;
    }

    return '';
      }
