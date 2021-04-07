import type { NextApiRequest, NextApiResponse } from 'next';

import puppeteer from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';

export const config = {
    api: {
        bodyParser: true,
    },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(req.body);
    const embedUrl: string = body.embedUrl;
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
    await page.goto(embedUrl); // Load page
    await page.click('div.manual-play__button-play__area-effect'); // Click "see the board"
    await page.waitForSelector('#svgContainer > svg'); // Wait for the SVG to load
    const svg = await page.evaluate(() => document.querySelector('#svgContainer > svg').outerHTML);
    res.send(svg);
};