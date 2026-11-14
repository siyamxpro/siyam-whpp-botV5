/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */
'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).json({
        bot: 'SIYAM WHATSAPP GOATBOT',
        platform: 'WhatsApp',
        runtime: process.version,
        memory: process.memoryUsage(),
        uptime: process.uptime()
    });
});

module.exports = router;
