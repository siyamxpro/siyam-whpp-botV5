/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */
'use strict';

const express = require('express');
const healthRoutes = require('./routes/health');
const statusRoutes = require('./routes/status');

function createServer() {
    const app = express();

    app.disable('x-powered-by');
    app.use(express.json({ limit: '100kb' }));

    app.use('/health', healthRoutes);
    app.use('/status', statusRoutes);

    app.use((_req, res) => {
        res.status(404).json({
            success: false,
            message: 'Route পাওয়া যায়নি।'
        });
    });

    return app;
}

module.exports = createServer;
