/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

const express = require('express');
const os = require('os');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    platform: os.platform(),
    nodeVersion: process.version,
    timestamp: Date.now()
  });
});

module.exports = router;
