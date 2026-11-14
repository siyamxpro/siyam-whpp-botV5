/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

const usersData = require('../../database/controller/usersData');
const threadsData = require('../../database/controller/threadsData');
const globalData = require('../../database/controller/globalData');

async function loadData() {
  return {
    users: usersData,
    threads: threadsData,
    global: globalData
  };
}

module.exports = loadData;
