/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
}

module.exports = notFound;
