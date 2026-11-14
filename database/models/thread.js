/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

function createThread(data = {}) {
  return {
    threadID: data.threadID || '',
    threadName: data.threadName || '',
    members: Array.isArray(data.members) ? data.members : [],
    createdAt: data.createdAt || Date.now(),
    ...data
  };
}

module.exports = createThread;
