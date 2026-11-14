/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

const JSONStore = require('../jsonStore');

const store = new JSONStore('global.json');

module.exports = {
  get: id => store.get(id),
  set: (id, data) => store.set(id, data),
  delete: id => store.delete(id),
  getAll: () => store.getAll()
};
