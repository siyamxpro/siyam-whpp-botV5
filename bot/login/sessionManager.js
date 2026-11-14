/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

const fs = require('fs');
const path = require('path');

const SESSION_DIR = path.join(process.cwd(), 'auth_info');

function createSession() {
  fs.mkdirSync(SESSION_DIR, { recursive: true });
  return SESSION_DIR;
}

function getSessionPath() {
  return SESSION_DIR;
}

function sessionExists() {
  return fs.existsSync(SESSION_DIR);
}

function clearSession() {
  if (fs.existsSync(SESSION_DIR)) {
    fs.rmSync(SESSION_DIR, {
      recursive: true,
      force: true
    });
  }
}

module.exports = {
  createSession,
  getSessionPath,
  sessionExists,
  clearSession
};
