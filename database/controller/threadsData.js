'use strict';

const path = require('path');
const JSONStore = require('../jsonStore');

const store = new JSONStore(
    path.join(__dirname, '..', 'data', 'threads.json')
);

module.exports = {
    get: id => store.get(id),
    set: (id, data) => store.set(id, data),
    delete: id => store.delete(id),
    getAll: () => store.getAll(),
    clear: () => store.clear()
};
