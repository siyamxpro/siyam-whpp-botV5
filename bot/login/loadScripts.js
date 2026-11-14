/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

const fs = require('fs');
const path = require('path');

function loadScripts(directory) {
  const scripts = new Map();

  if (!fs.existsSync(directory)) return scripts;

  const files = fs.readdirSync(directory);

  for (const file of files) {
    if (!file.endsWith('.js')) continue;

    const filePath = path.join(directory, file);

    try {
      delete require.cache[require.resolve(filePath)];
      scripts.set(path.basename(file, '.js'), require(filePath));
    } catch (error) {
      console.error(`Failed to load ${file}:`, error.message);
    }
  }

  return scripts;
}

module.exports = loadScripts;
