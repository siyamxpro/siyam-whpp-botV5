/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

const usersData = require('../../database/controller/usersData');
const threadsData = require('../../database/controller/threadsData');

async function handlerCheckData(message) {
  if (!message) return;

  const jid = message.key?.remoteJid;
  const sender = message.key?.participant || jid;

  if (!jid || !sender) return;

  if (!jid.endsWith('@g.us')) {
    const user = await usersData.get(sender);

    if (!user) {
      await usersData.set(sender, {
        userID: sender,
        name: message.pushName || 'Unknown',
        money: 0,
        exp: 0,
        createdAt: Date.now()
      });
    }
  } else {
    const thread = await threadsData.get(jid);

    if (!thread) {
      await threadsData.set(jid, {
        threadID: jid,
        threadName: '',
        members: [],
        createdAt: Date.now()
      });
    }
  }
}

module.exports = handlerCheckData;
