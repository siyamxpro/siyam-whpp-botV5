/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */
'use strict';

const path = require('path');
const JSONStore = require('../jsonStore');

const store = new JSONStore(
    path.join(__dirname, '..', 'data', 'users.json')
);

module.exports = {
    get: id => store.get(id),
    set: (id, data) => store.set(id, data),
    delete: id => store.delete(id),
    getAll: () => store.getAll(),
    clear: () => store.clear()
};
