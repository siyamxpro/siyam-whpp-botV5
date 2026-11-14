/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */
'use strict';

function errorHandler(error, _req, res, _next) {
    console.error('[SERVER ERROR]', error.stack || error.message);

    if (res.headersSent) return;

    res.status(error.statusCode || 500).json({
        success: false,
        message: 'সার্ভারে একটি সমস্যা হয়েছে।'
    });
}

module.exports = errorHandler;
