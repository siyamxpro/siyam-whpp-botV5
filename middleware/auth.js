/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

function auth(req, res, next) {
  const token = req.headers.authorization;
  const expected = process.env.ADMIN_TOKEN;

  if (!expected || token !== `Bearer ${expected}`) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });
  }

  next();
}

module.exports = auth;
