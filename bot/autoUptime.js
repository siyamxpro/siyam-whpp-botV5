/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

let uptimeTimer = null;

function startAutoUptime(config = {}) {
  const url = config.autoUptime?.url;
  const interval = Number(config.autoUptime?.interval) || 300000;

  if (!url || uptimeTimer) return;

  uptimeTimer = setInterval(async () => {
    try {
      await fetch(url, { method: 'GET' });
    } catch (error) {
      console.error('Auto uptime error:', error.message);
    }
  }, interval);

  uptimeTimer.unref?.();
}

function stopAutoUptime() {
  if (uptimeTimer) {
    clearInterval(uptimeTimer);
    uptimeTimer = null;
  }
}

module.exports = {
  startAutoUptime,
  stopAutoUptime
};
