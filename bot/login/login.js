'use strict';

const fs = require('fs');
const path = require('path');
const pino = require('pino');

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys');

const log = require('../../logger/log');
const handleMessage = require('../messageHandler');
const registerEvents = require('../../scripts/events');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = async function startWhatsApp({ config, onState }) {
    const authDir = path.resolve(
        __dirname,
        '..',
        '..',
        config.session?.directory || 'auth_info'
    );

    fs.mkdirSync(authDir, { recursive: true });

    const { state, saveCreds } = await useMultiFileAuthState(authDir);
    const { version } = await fetchLatestBaileysVersion();

    const phone = String(
        config.pairing?.phoneNumber || config.ownerNumber || ''
    ).replace(/\D/g, '');

    let socket;
    let pairingRequested = false;
    let reconnecting = false;
    let stopped = false;

    async function connect() {
        if (stopped || reconnecting) return;

        reconnecting = true;

        try {
            socket = makeWASocket({
                version,
                auth: state,
                printQRInTerminal: false,
                logger: pino({
                    level: config.logging?.level || 'info'
                }),
                browser: [
                    'Siyam WhatsApp Bot',
                    'Chrome',
                    '1.0.0'
                ],
                markOnlineOnConnect: false,
                syncFullHistory: false
            });

            socket.ev.on('creds.update', saveCreds);

            // Register custom event files
            registerEvents(socket, { config });

            socket.ev.on('connection.update', async update => {
                const { connection, lastDisconnect } = update;

                if (connection === 'connecting') {
                    onState?.('connecting');
                }

                if (connection === 'open') {
                    onState?.('connected');

                    log.success(
                        'WHATSAPP',
                        `Connected: ${socket.user?.id || 'Account connected'}`
                    );
                }

                if (connection === 'close') {
                    onState?.('disconnected');

                    const status =
                        lastDisconnect?.error?.output?.statusCode;

                    const loggedOut =
                        status === DisconnectReason.loggedOut;

                    log.warn(
                        'WHATSAPP',
                        `Connection closed. Status: ${status ?? 'unknown'}`
                    );

                    if (!loggedOut && !stopped) {
                        reconnecting = false;

                        await sleep(
                            Number(config.autoRestart?.delayMs || 3000)
                        );

                        await connect();
                    } else {
                        log.error(
                            'WHATSAPP',
                            'Session logged out. Pair the account again.'
                        );
                    }
                }
            });

            if (
                !state.creds.registered &&
                config.pairing?.printPairingCode
            ) {
                if (!/^\d{8,15}$/.test(phone)) {
                    log.warn(
                        'PAIRING',
                        'Set a valid phone number in config.json.'
                    );
                } else if (!pairingRequested) {
                    pairingRequested = true;

                    await sleep(1500);

                    try {
                        const code = await socket.requestPairingCode(phone);

                        console.log('\n================================');
                        console.log(' SIYAM WHATSAPP PAIRING CODE');
                        console.log(` ${code}`);
                        console.log(' Open WhatsApp > Linked devices');
                        console.log('================================\n');
                    } catch (error) {
                        pairingRequested = false;

                        log.error(
                            'PAIRING',
                            `Pairing code error: ${error.message}`
                        );
                    }
                }
            }

            socket.ev.on('messages.upsert', async ({ messages, type }) => {
                if (type !== 'notify') return;

                for (const message of messages) {
                    try {
                        await handleMessage(socket, message, config);
                    } catch (error) {
                        log.error(
                            'MESSAGE',
                            error.stack || error.message
                        );
                    }
                }
            });

        } catch (error) {
            reconnecting = false;
            throw error;
        }

        reconnecting = false;
    }

    await connect();

    return {
        end() {
            stopped = true;

            try {
                socket?.end(undefined);
            } catch (error) {
                log.warn('WHATSAPP', error.message);
            }
        }
    };
};
