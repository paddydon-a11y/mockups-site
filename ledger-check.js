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
