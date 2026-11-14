/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */
'use strict';

const fs = require('fs');
const path = require('path');

class JSONStore {
    constructor(file) {
        this.file = path.resolve(file);
        this.ensureFile();
    }

    ensureFile() {
        fs.mkdirSync(path.dirname(this.file), {
            recursive: true
        });

        if (!fs.existsSync(this.file)) {
            fs.writeFileSync(this.file, '{}', 'utf8');
        }
    }

    read() {
        try {
            const data = JSON.parse(
                fs.readFileSync(this.file, 'utf8')
            );

            if (
                !data ||
                typeof data !== 'object' ||
                Array.isArray(data)
            ) {
                throw new Error('Invalid JSON database format');
            }

            return data;
        } catch (error) {
            throw new Error(
                `Database read error: ${this.file} - ${error.message}`
            );
        }
    }

    write(data) {
        const temp = `${this.file}.tmp`;

        fs.writeFileSync(
            temp,
            JSON.stringify(data, null, 2),
            'utf8'
        );

        fs.renameSync(temp, this.file);

        return true;
    }

    get(key, fallback = null) {
        const data = this.read();

        return Object.prototype.hasOwnProperty.call(data, key)
            ? data[key]
            : fallback;
    }

    getAll() {
        return this.read();
    }

    set(key, value) {
        const data = this.read();

        data[key] = value;

        return this.write(data);
    }

    delete(key) {
        const data = this.read();

        if (!Object.prototype.hasOwnProperty.call(data, key)) {
            return false;
        }

        delete data[key];

        return this.write(data);
    }

    clear() {
        return this.write({});
    }
}

module.exports = JSONStore;
