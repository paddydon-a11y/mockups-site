import { writeFile } from 'node:fs/promises';

const UA = 'DukuLogoBot/1.0 (patrick.d@haliburton.co.uk)';
const OUT = new URL('./photos/', import.meta.url);

// search terms -> how many to try to keep from each
const TERMS = [
  'rebar reinforcement steel',
  'steel fixing reinforcement',
  'reinforcing steel construction site',
  'rebar tying wire',
  'concrete reinforcement cage',
  'rebar foundation slab',
  'reinforcement bar bending',
];

const stripHtml = (s = '') => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

async function search(term) {
  const u = new URL('https://commons.wikimedia.org/w/api.php');
  u.search = new URLSearchParams({
    action: 'query', format: 'json', generator: 'search',
    gsrsearch: term, gsrnamespace: '6', gsrlimit: '8',
    prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata', iiurlwidth: '1600',
  });
  const r = await fetch(u, { headers: { 'User-Agent': UA } });
  const j = await r.json();
  return Object.values(j?.query?.pages ?? {});
}

const seen = new Set();
const picked = [];

for (const term of TERMS) {
  let pages;
  try { pages = await search(term); } catch (e) { console.error('search fail', term, e.message); continue; }
  for (const p of pages) {
    const ii = p.imageinfo?.[0]; if (!ii) continue;
    if (ii.mime !== 'image/jpeg') continue;            // jpg only
    if ((ii.thumbwidth || 0) < 1200) continue;          // decent res
    if (ii.thumbwidth < ii.thumbheight) continue;        // prefer landscape
    const key = p.pageid; if (seen.has(key)) continue; seen.add(key);
    const em = ii.extmetadata ?? {};
    picked.push({
      title: p.title,
      thumburl: ii.thumburl,
      page: ii.descriptionurl,
      width: ii.thumbwidth, height: ii.thumbheight,
      licence: stripHtml(em.LicenseShortName?.value) || 'see page',
      artist: stripHtml(em.Artist?.value) || 'Unknown',
      term,
    });
    if (picked.filter(x => x.term === term).length >= 2) break; // ~2 per term
  }
  if (picked.length >= 10) break;
}

console.log(`Selected ${picked.length} images. Downloading...`);
const credits = [];
let n = 0;
for (const img of picked) {
  n++;
  const name = `duku-${String(n).padStart(2, '0')}.jpg`;
  try {
    const r = await fetch(img.thumburl, { headers: { 'User-Agent': UA } });
    if (!r.ok) { console.error('dl fail', name, r.status); continue; }
    const buf = Buffer.from(await r.arrayBuffer());
    await writeFile(new URL(name, OUT), buf);
    console.log(`  ${name}  ${(buf.length/1024).toFixed(0)}KB  ${img.width}x${img.height}  [${img.licence}]`);
    credits.push({ file: name, ...img });
  } catch (e) { console.error('err', name, e.message); }
}

await writeFile(new URL('credits.json', OUT), JSON.stringify(credits, null, 2));
const md = ['# Photo credits (Wikimedia Commons — free licence)\n',
  'All images sourced from Wikimedia Commons. Most require attribution + same-licence (CC BY / CC BY-SA); a few are public domain / CC0. Keep this file with the photos.\n',
  ...credits.map(c => `- **${c.file}** — "${stripHtml(c.title.replace(/^File:/, ''))}" by ${c.artist}. Licence: ${c.licence}. Source: ${c.page}`),
].join('\n');
await writeFile(new URL('CREDITS.md', OUT), md + '\n');
console.log(`Done. ${credits.length} saved + CREDITS.md written.`);
