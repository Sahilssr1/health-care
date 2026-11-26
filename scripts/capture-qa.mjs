import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const base = process.env.QA_ORIGIN || 'http://127.0.0.1:13106';
const out = resolve(process.env.QA_OUTPUT || 'docs/proof/final-qa-20261112');
const chrome = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
await mkdir(out, { recursive: true });

const browser = await chromium.launch({ executablePath: chrome, headless: true });
const report = [];
const desktop = { width: 1440, height: 1000, deviceScaleFactor: 1 };
const mobile = { width: 390, height: 844, deviceScaleFactor: 1, isMobile: true };

async function capture(name, path, viewport, selector) {
  const page = await browser.newPage({ viewport });
  const failed = [];
  const consoleErrors = [];
  page.on('response', response => {
    if (response.status() >= 400) failed.push({ url: response.url(), status: response.status() });
  });
  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  await page.goto(`${base}${path}`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.evaluate(async () => {
    const step = Math.max(400, window.innerHeight * 0.8);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
  const target = selector ? page.locator(selector) : page;
  await target.screenshot({ path: resolve(out, `${name}.png`), fullPage: !selector });
  const assessment = await page.evaluate(() => ({
    title: document.title,
    overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    logoCount: document.querySelectorAll('img[alt*="Bihar Healthcare Conclave"]').length,
    images: [...document.images].map(image => ({ src: image.currentSrc || image.src, complete: image.complete, width: image.naturalWidth })).filter(image => !image.complete || image.width === 0),
    pageMarker: document.documentElement.dataset.page || null,
  }));
  report.push({ name, path, selector: selector || null, viewport, failed, consoleErrors, ...assessment });
  await page.close();
}

await capture('home-desktop-full', '/', desktop);
await capture('home-mobile-full', '/', mobile);
await capture('programme-desktop-full', '/programme', desktop);
await capture('programme-mobile-full', '/programme', mobile);
for (const id of ['nursing-education-awards', 'environmental-sustainability', 'ai-enabled-demonstrations', 'innovation-hackathon', 'student-innovation-exhibition', 'health-lab-tech-exhibition']) {
  await capture(`programme-${id}`, `/programme#${id}`, desktop, `#${id}`);
}
await capture('awards-full', '/awards', desktop);
await capture('workshop-quality-standards', '/programme#nursing-quality-workshop', desktop, '#nursing-quality-workshop');
await capture('partners-full', '/partners', desktop);
await capture('partnerships-full', '/partnerships', desktop);
await capture('register-full', '/register', desktop);
await capture('register-mobile', '/register', mobile);
await capture('contact-full', '/contact', desktop);
await writeFile(resolve(out, 'qa-report.json'), JSON.stringify(report, null, 2));
await browser.close();
console.log(JSON.stringify({ out, report }, null, 2));
