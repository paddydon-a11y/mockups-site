import puppeteer from 'puppeteer';
import { readFile, writeFile, readdir } from 'node:fs/promises';

const DIR = new URL('./', import.meta.url);
const read = (f) => readFile(new URL(f, DIR), 'utf8');

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@500;600&display=swap" rel="stylesheet">`;

const [light, dark, mark] = await Promise.all([
  read('logo-duku.svg'), read('logo-duku-dark.svg'), read('logo-duku-mark.svg'),
]);
const photos = (await readdir(new URL('./photos/', DIR))).filter(f => /^duku-\d+\.jpg$/i.test(f)).sort();
const photoData = Object.fromEntries(await Promise.all(photos.map(async f => {
  const b = await readFile(new URL('./photos/' + f, DIR));
  return [f, 'data:image/jpeg;base64,' + b.toString('base64')];
})));

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

// helper: render a snippet, screenshot one element by id
async function shot(html, sel, file, omitBackground = true) {
  await page.setContent(`<!doctype html><html><head><meta charset=utf8>${FONTS}
    <style>body{margin:0}</style></head><body>${html}</body></html>`, { waitUntil: 'load' });
  await page.evaluate(() => Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 4000))]));
  const el = await page.$(sel);
  await el.screenshot({ path: new URL(file, DIR).pathname, omitBackground });
  console.log('wrote', file);
}

await shot(`<div id=a style="display:inline-block">${light}</div>`, '#a', 'logo-duku.png');
await shot(`<div id=a style="display:inline-block;background:#16191c;padding:24px">${dark}</div>`, '#a', 'logo-duku-dark.png', false);
await shot(`<div id=a style="display:inline-block">${mark}</div>`, '#a', 'logo-duku-mark.png');
// favicon-ish square mark on white
await shot(`<div id=a style="display:inline-flex;width:240px;height:240px;align-items:center;justify-content:center;background:#fff">${mark}</div>`, '#a', 'logo-duku-mark-512.png', false);

// CONTACT SHEET
const photoGrid = photos.map(f => `<img src="${photoData[f]}" style="width:100%;height:160px;object-fit:cover;border-radius:6px">`).join('');
const sheet = `<!doctype html><html><head><meta charset=utf8>${FONTS}
<style>
  body{margin:0;font-family:Oswald,sans-serif;background:#fff;color:#1C2227}
  .wrap{width:1180px;margin:0 auto;padding:36px}
  h1{font-family:Anton,sans-serif;font-weight:400;letter-spacing:1px;margin:0 0 4px;font-size:30px}
  .sub{color:#FF6A1A;letter-spacing:6px;font-weight:600;font-size:13px;margin-bottom:26px}
  .row{display:flex;gap:18px;margin-bottom:20px}
  .card{flex:1;border:1px solid #e4e8ec;border-radius:10px;padding:22px;display:flex;align-items:center;justify-content:center;min-height:150px}
  .card.dark{background:#16191c;border-color:#16191c}
  .card.orange{background:#FF6A1A;border-color:#FF6A1A}
  .card.steel{background:linear-gradient(135deg,#cfd6dc,#8b959d)}
  .lbl{font-size:11px;letter-spacing:3px;color:#8b959d;text-transform:uppercase;margin:24px 0 8px}
  .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
  svg{max-width:100%;height:auto}
</style></head><body><div class=wrap id=sheet>
  <h1>DUKU LTD</h1><div class=sub>STEEL FIXING &middot; LOGO &amp; ASSET SHEET</div>
  <div class=row><div class=card>${light}</div></div>
  <div class=row><div class="card dark">${dark}</div></div>
  <div class=row>
    <div class=card style="flex:0 0 220px">${mark}</div>
    <div class="card orange" style="flex:0 0 220px">${mark}</div>
    <div class="card steel" style="flex:0 0 220px">${mark}</div>
    <div class="card dark">${dark}</div>
  </div>
  <div class=lbl>Free-licence photo set (${photos.length})</div>
  <div class=grid>${photoGrid}</div>
</div></body></html>`;
await page.setContent(sheet, { waitUntil: 'load' });
await page.evaluate(() => Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 5000))]));
await new Promise(r => setTimeout(r, 800));
const el = await page.$('#sheet');
await el.screenshot({ path: new URL('preview.png', DIR).pathname });
console.log('wrote preview.png');

await browser.close();
