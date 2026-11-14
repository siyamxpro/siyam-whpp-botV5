/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

function isValidJid(jid) {
  return typeof jid === 'string' &&
    /@s\.whatsapp\.net$|@g\.us$|@lid$/.test(jid);
}

function getPhoneNumber(jid) {
  if (!isValidJid(jid)) return null;

  return jid.split('@')[0].replace(/\D/g, '');
}

function isGroupJid(jid) {
  return typeof jid === 'string' && jid.endsWith('@g.us');
}

function isUserJid(jid) {
  return typeof jid === 'string' &&
    jid.endsWith('@s.whatsapp.net');
}

module.exports = {
  isValidJid,
  getPhoneNumber,
  isGroupJid,
  isUserJid
};
