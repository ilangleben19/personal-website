import type { NextApiRequest, NextApiResponse } from 'next';

import puppeteer from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';

import { Server } from 'socket.io';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (!(res.socket as any).server.io) {
        console.log('Starting socket.io');

        const io = new Server((res.socket as any).server);

        io.on('connection', async socket => {
            console.log('Connected!');

            socket.on('fetch', async (embedUrl: string) => {
                const browser = await puppeteer.launch(
                    process.env.NODE_ENV === 'production'
                        ? {
                            args: chrome.args,
                            executablePath: await chrome.executablePath,
                            headless: chrome.headless,
                        }
                        : {
                            executablePath: './node_modules/puppeteer/.local-chromium/linux-856583/chrome-linux/chrome',
                        }
                );
                const page = await browser.newPage();
                console.log('fetching');
                await page.goto(embedUrl);
                console.log(`Navigated to ${embedUrl}`);
                socket.emit('test', await page.content());
            });
        });

        (res.socket as any).server.io = io;
    } else
        console.log('Socket.io already running!');

    res.end();
};