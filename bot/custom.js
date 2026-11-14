/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

const logger = require('../logger/log');

function custom(sock, config = {}) {
  logger.info('Custom bot initialization completed.');

  return {
    sock,
    config,
    startedAt: Date.now()
  };
}

module.exports = custom;
