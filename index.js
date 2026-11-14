/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

'use strict';

const express = require('express');
const config = require('./config.json');
const log = require('./logger/log');
const startWhatsApp = require('./bot/login/login');

const app = express();

let socketState = 'starting';
let server = null;
let whatsapp = null;

if (config.server?.enabled !== false) {
    app.get('/', (_req, res) => {
        res.status(200).send(
            'SIYAM HASAN WhatsApp GoatBot is running!'
        );
    });

    app.get('/health', (_req, res) => {
        res.status(200).json({
            status: socketState,
            platform: 'WhatsApp',
            author: '𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡',
            uptime: process.uptime()
        });
    });

    const PORT = Number(process.env.PORT || config.server?.port || 3000);

    server = app.listen(PORT, '0.0.0.0', () => {
        log.success('SERVER', `Server running on port ${PORT}`);
    });
}

async function startBot() {
    try {
        whatsapp = await startWhatsApp({
            config,
            onState: state => {
                socketState = state;
            }
        });
    } catch (error) {
        socketState = 'error';
        log.error('WHATSAPP', error.stack || error.message);
        process.exitCode = 1;
    }
}

async function shutdown() {
    if (socketState === 'stopping') return;

    socketState = 'stopping';
    log.info('SYSTEM', 'Shutting down WhatsApp bot...');

    try {
        if (whatsapp?.end) {
            whatsapp.end();
        }
    } catch (error) {
        log.error('SHUTDOWN', error.message);
    }

    if (server) {
        server.close(() => process.exit(0));
    } else {
        process.exit(0);
    }

    setTimeout(() => process.exit(0), 5000).unref();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

process.on('unhandledRejection', error => {
    log.error('PROMISE', error?.stack || String(error));
});

process.on('uncaughtException', error => {
    log.error('EXCEPTION', error?.stack || String(error));
});

startBot();
