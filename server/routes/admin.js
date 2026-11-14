/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

router.get('/', auth, (req, res) => {
  res.json({
    success: true,
    message: 'Admin API is running',
    timestamp: Date.now()
  });
});

module.exports = router;
