/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */
'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).json({
        success: true,
        status: 'online',
        platform: 'WhatsApp',
        author: '𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
