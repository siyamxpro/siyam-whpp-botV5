/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

function rateLimit(options = {}) {
  const windowMs = options.windowMs || 60000;
  const max = options.max || 60;
  const requests = new Map();

  return function (req, res, next) {
    const key = req.ip || 'unknown';
    const now = Date.now();

    const record = requests.get(key) || {
      count: 0,
      resetAt: now + windowMs
    };

    if (now > record.resetAt) {
      record.count = 0;
      record.resetAt = now + windowMs;
    }

    record.count++;
    requests.set(key, record);

    if (record.count > max) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests'
      });
    }

    next();
  };
}

module.exports = rateLimit;
