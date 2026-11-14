/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    console.log(
      `[${new Date().toISOString()}]`,
      req.method,
      req.originalUrl,
      res.statusCode,
      `${duration}ms`
    );
  });

  next();
}

module.exports = requestLogger;
