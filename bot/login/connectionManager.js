/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

const EventEmitter = require('events');

class ConnectionManager extends EventEmitter {
  constructor() {
    super();
    this.socket = null;
    this.status = 'disconnected';
  }

  setSocket(socket) {
    this.socket = socket;
    this.setStatus('connected');
  }

  getSocket() {
    return this.socket;
  }

  setStatus(status) {
    this.status = status;
    this.emit('status', status);
  }

  getStatus() {
    return this.status;
  }

  disconnect() {
    this.socket = null;
    this.setStatus('disconnected');
  }
}

module.exports = new ConnectionManager();
