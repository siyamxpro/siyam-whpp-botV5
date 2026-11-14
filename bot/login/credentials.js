/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

const fs = require('fs');
const path = require('path');

const AUTH_DIR = path.join(process.cwd(), 'auth_info');

function credentialsExist() {
  return fs.existsSync(path.join(AUTH_DIR, 'creds.json'));
}

function readCredentials() {
  const file = path.join(AUTH_DIR, 'creds.json');

  if (!fs.existsSync(file)) return null;

  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function deleteCredentials() {
  if (fs.existsSync(AUTH_DIR)) {
    fs.rmSync(AUTH_DIR, {
      recursive: true,
      force: true
    });
  }
}

module.exports = {
  credentialsExist,
  readCredentials,
  deleteCredentials
};
