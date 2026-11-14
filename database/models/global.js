/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

function createGlobal(data = {}) {
  return {
    botName: data.botName || 'WhatsApp Bot',
    prefix: data.prefix || '!',
    maintenance: Boolean(data.maintenance),
    createdAt: data.createdAt || Date.now(),
    ...data
  };
}

module.exports = createGlobal;
