# Duku Ltd — brand starter kit

Steel fixing contractor, Southeast England. No prior logo or online presence — this is the
first set of brand assets: a rebar-themed logo plus a small free-licence photo set.

## The logo
The mark is a letter **D** bent from a single ribbed reinforcement bar, with a steel-grey
metallic finish, diagonal rib texture, and a safety-orange tie-wire wrap (the steel fixer's
signature knot) at the top. Wordmark **DUKU** in a heavy industrial sans, with **STEEL FIXING**
spaced out beneath an orange rule.

### Files
| File | Use |
|------|-----|
| `logo-duku.svg` / `.png` | Primary lockup, light backgrounds |
| `logo-duku-dark.svg` / `.png` | Lockup for dark backgrounds (light text) |
| `logo-duku-mark.svg` / `.png` | Mark only — favicon, social avatar, app icon |
| `logo-duku-mark-512.png` | 512px square mark on white (favicon source) |
| `preview.png` | Contact sheet (all variants + photos) |

SVGs are the masters — scale to any size with no quality loss. PNGs are exported at 2× for
quick placement.

## Brand colours
| Token | Hex | Use |
|-------|-----|-----|
| Steel light | `#EEF2F5` | bar highlight |
| Steel mid | `#8B959D` | bar body |
| Steel dark | `#59626A` | bar shadow |
| Ink | `#1C2227` | wordmark on light, dark backgrounds |
| Safety orange | `#FF6A1A` | accent / tie wire / rule |

## Fonts
- **Wordmark:** Anton (Google Fonts) — free, heavy industrial display.
- **Tagline:** Oswald 600 (Google Fonts).

The SVGs reference these by name with `Arial Black` / `Arial` fallbacks. For a locked-down
final logo, outline the text to paths so it renders identically without the fonts installed.

## Photos
See `photos/` and `photos/CREDITS.md`. Four brand-usable, free-licence images (two CC BY-SA
3.0 needing attribution, two public domain). The Commons pool for UK steel fixing is thin, so
treat these as placeholders — Duku's own job photos will be far stronger for the real site.

## Rebuilding
- `node fetch-photos.mjs` — re-pulls candidate photos from Wikimedia Commons.
- `node render.mjs` — re-exports the PNGs and contact sheet (needs Puppeteer; this folder
  borrows it from `../../mockup-gen/node_modules` via a temporary symlink during the build).
