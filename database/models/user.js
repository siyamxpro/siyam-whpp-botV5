/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

function createUser(data = {}) {
  return {
    userID: data.userID || '',
    name: data.name || 'Unknown',
    money: Number(data.money) || 0,
    exp: Number(data.exp) || 0,
    role: data.role || 'user',
    createdAt: data.createdAt || Date.now(),
    ...data
  };
}

module.exports = createUser;
