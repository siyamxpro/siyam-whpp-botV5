/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */
'use strict';

const fs = require('fs');
const path = require('path');

class JSONStore {
    constructor(file) {
        this.file = path.resolve(process.cwd(), file);
        this.ensureFile();
    }

    ensureFile() {
        fs.mkdirSync(path.dirname(this.file), { recursive: true });

        if (!fs.existsSync(this.file)) {
            fs.writeFileSync(this.file, '{}');
        }
    }

    read() {
        try {
            return JSON.parse(fs.readFileSync(this.file, 'utf8'));
        } catch {
            throw new Error(`ডেটা ফাইল পড়া যায়নি: ${this.file}`);
        }
    }

    write(data) {
        const temp = `${this.file}.tmp`;

        fs.writeFileSync(temp, JSON.stringify(data, null, 2));
        fs.renameSync(temp, this.file);

        return true;
    }

    get(key, fallback = null) {
        const data = this.read();
        return Object.prototype.hasOwnProperty.call(data, key)
            ? data[key]
            : fallback;
    }

    set(key, value) {
        const data = this.read();
        data[key] = value;
        return this.write(data);
    }

    delete(key) {
        const data = this.read();
        delete data[key];
        return this.write(data);
    }
}

module.exports = JSONStore;
