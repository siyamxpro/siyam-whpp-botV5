/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 * WhatsApp message action handler
 */

const messageHandler = require('../messageHandler');
const logger = require('../../logger/log');

async function handlerAction(sock, message, config = {}) {
  try {
    return await messageHandler(sock, message, config);
  } catch (error) {
    logger.error('Handler action error:', error);
    return null;
  }
}

module.exports = handlerAction;
