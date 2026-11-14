/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

'use strict';

/*
 * Messenger-এর আসল command ফাইলগুলো এখানে এখনো যোগ করা হয়নি।
 * পরে প্রতিটি command WhatsApp context অনুযায়ী রূপান্তর করা হবে।
 */

const registry = new Map();

registry.set('help', {
    adminOnly: false,

    run: async ctx => {
        return ctx.reply(
            'SIYAM WHATSAPP GOATBOT\n' +
            'Prefix: ' + (ctx.config.prefix || ',') + '\n' +
            'WhatsApp command adapters will be added after migration.'
        );
    }
});

module.exports = registry;
