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

// B motion roll (2026-10-27, replaces the 10-20 direction/ground roll). The
// random directions made B "too off the mark"; B is now A brought to life:
// same look, a full bleed moving hero and two interesting bits. Hero motion
// never repeats the last 3 B, bits never repeat the last 2 B.
const HERO_MOTIONS = ['video', 'crossfade', 'ken-burns', 'word-swap', 'parallax', 'reveal-wipe', 'before-after', 'marquee'];
const BITS = ['trade-moment', 'counter', 'drag-compare', 'work-strip', 'pinned-steps', 'draw-svg', 'tilt-cards', 'review-ticker', 'area-map', 'calc', 'photo-stack'];
const MOTION_WINDOW = 3;
const BITS_WINDOW = 2;
const MOTION_SINCE = '2026-10-27';
const bEntries = ledger.entries.filter((e) => e.variant === 'B');
const usedMotions = uniq(bEntries.slice(0, MOTION_WINDOW).map((e) => e.heroMotion));
const usedBits = uniq(bEntries.slice(0, BITS_WINDOW).flatMap((e) => e.bits || []));
const shuffle = (arr) => arr.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(([, v]) => v);
const openMotions = HERO_MOTIONS.filter((m) => !usedMotions.includes(m));
const openBits = BITS.filter((b) => b !== 'trade-moment' && !usedBits.includes(b));
const missingB = bEntries
  .slice(0, 5)
  .filter((e) => (e.date || '') >= MOTION_SINCE)
  .filter((e) => !HERO_MOTIONS.includes(e.heroMotion) || !Array.isArray(e.bits) || e.bits.length < 2 || e.bits.some((b) => !BITS.includes(b)));
console.log(`\nMOTION ROLL (for the B mockup only; see mockup-b-variant.md, "What B adds"):`);
console.log(`  hero motion: ${shuffle(openMotions)[0]}   (banned, used by the last ${MOTION_WINDOW} B: ${usedMotions.join(', ') || 'none'})`);
// About half the time one bit is the trade moment: motion only this trade
// could own (leak detection = water running down the page).
const rolledBits = shuffle(openBits).slice(0, 2);
if (Math.random() < 0.5) rolledBits[1] = 'trade-moment';
const sameTrade = ledger.entries.filter((e) => e.tradeMoment).slice(0, 20).map((e) => `${e.trade.split(',')[0]}: ${e.tradeMoment}`);
console.log(`  bits:        ${rolledBits.join(' + ')}   (banned: ${usedBits.join(', ') || 'none'})`);
if (rolledBits.includes('trade-moment')) {
  console.log(`  trade moment: one piece of motion only this trade could own; log it as tradeMoment. Recent ones (do something else for the same trade):`);
  sameTrade.forEach((t) => console.log(`    - ${t}`));
}
console.log(`  hero motions: ${HERO_MOTIONS.join(', ')}`);
console.log(`  bits:         ${BITS.join(', ')}`);
console.log(`  B = a copy of A (palette, fonts, copy, sections) with a full bleed moving hero; out there, not wild`);
if (missingB.length) {
  console.log(`\nB ENTRIES MISSING heroMotion/bits (not valid until fixed): ${missingB.map((e) => e.slug).join(', ')}`);
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
