#!/usr/bin/env node
// Cooldown check for new mockups. Run before designing:
//   node ledger-check.js          -> what's banned right now (last 10 entries)
//   node ledger-check.js 15       -> widen the window
// Anything printed under BANNED may not be used in the next mockup.

const fs = require('fs');
const path = require('path');

const ledger = JSON.parse(fs.readFileSync(path.join(__dirname, 'recipe-ledger.json'), 'utf8'));
const window = parseInt(process.argv[2], 10) || 10;
const recent = ledger.entries.slice(0, window);

const uniq = (arr) => [...new Set(arr.filter(Boolean))];

const fonts = uniq(recent.map((e) => e.displayFont));
const palettes = uniq(recent.map((e) => e.paletteFamily));
const loaders = uniq(recent.map((e) => e.loaderConcept));
// Structural first-screen layout: a fixed vocabulary, banned over a shorter
// window. Hero *names* are free text and never repeat; layouts do.
const LAYOUT_WINDOW = 5;
const LAYOUTS = ['split-photo-right', 'text-over-photo', 'photo-first', 'poster-type', 'logo-crest', 'before-after', 'gallery-fold', 'video-fold', 'horizontal-strip', 'statement', 'other'];
const layouts = uniq(ledger.entries.slice(0, LAYOUT_WINDOW).map((e) => e.heroLayout));
const missingLayout = ledger.entries.slice(0, 10).filter((e) => !e.heroLayout || !LAYOUTS.includes(e.heroLayout));
const combos = uniq(
  recent
    .filter((e) => e.hero && e.services)
    .map((e) => `${e.hero}+${e.services}+${e.gallery || '-'}`)
);

console.log(`Recipe ledger: ${ledger.entries.length} entries, checking last ${recent.length}\n`);
console.log(`BANNED display fonts (used in last ${recent.length}):`);
fonts.forEach((f) => console.log(`  - ${f}`));
console.log(`\nBANNED palette families:`);
palettes.forEach((p) => console.log(`  - ${p}`));
if (loaders.length) {
  console.log(`\nBANNED loader concepts:`);
  loaders.forEach((l) => console.log(`  - ${l}`));
}
console.log(`\nBANNED hero layouts (heroLayout used in last ${LAYOUT_WINDOW}):`);
layouts.forEach((l) => console.log(`  - ${l}`));
console.log(`  allowed values: ${LAYOUTS.join(', ')}`);
if (missingLayout.length) {
  console.log(`\nENTRIES MISSING heroLayout (not valid until fixed): ${missingLayout.map((e) => e.slug).join(', ')}`);
}
if (combos.length) {
  console.log(`\nBANNED hero+services+gallery combos:`);
  combos.forEach((c) => console.log(`  - ${c}`));
}

// Saturation report across the whole ledger — spot the next "tell" early
const tally = (key) => {
  const counts = {};
  ledger.entries.forEach((e) => {
    const v = e[key];
    if (v) counts[v] = (counts[v] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
};
console.log(`\nAll-time saturation (top 5):`);
console.log(`  fonts:    ${tally('displayFont').map(([k, n]) => `${k} x${n}`).join(', ')}`);
console.log(`  palettes: ${tally('paletteFamily').map(([k, n]) => `${k} x${n}`).join(', ')}`);
console.log(`  layouts:  ${tally('heroLayout').map(([k, n]) => `${k} x${n}`).join(', ') || 'none recorded yet'}`);
