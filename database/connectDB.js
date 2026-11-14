/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');

function connectDB() {
  fs.mkdirSync(DATA_DIR, { recursive: true });

  for (const file of ['users.json', 'threads.json', 'global.json']) {
    const filePath = path.join(DATA_DIR, file);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '{}', 'utf8');
    }
  }

  return true;
}

module.exports = connectDB;
