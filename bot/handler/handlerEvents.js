/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

const EventEmitter = require('events');

class BotEvents extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(100);
  }

  async dispatch(eventName, ...args) {
    try {
      this.emit(eventName, ...args);
    } catch (error) {
      this.emit('error', error);
    }
  }
}

module.exports = new BotEvents();
