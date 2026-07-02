# mockups-site — client mockup previews (GitHub Pages)

Static mockup sites, one folder per client, served at previews.construction-sites.co.uk/<folder>/.

## MANDATORY workflow for every new mockup or significant change

1. Build the mockup in its folder.
2. Verify with headless screenshots (desktop 1440px AND mobile 390px, including a scrolled state and the open mobile menu). Playwright is available via `NODE_PATH=/home/patrick/projects/mockup-gen/node_modules`.
3. **ALWAYS serve it locally and give Patrick the local URL for review BEFORE any git push.** Start (or reuse) a server: `cd /home/patrick/projects/mockups-site && python3 -m http.server 8010` then link `http://localhost:8010/<folder>/`. Do NOT push until Patrick has reviewed and approved. No exceptions — pushing first has been a repeated mistake.
4. Only after approval: git add/commit/push.

Exception: urgent fixes to a bug already live on Pages may be pushed immediately, but still provide the local URL.

## Copy rules

- **NEVER use em dashes (—) anywhere in site copy.** Rewrite with commas, colons, full stops or "No." labels instead. Grep for `—` before finishing.
- Never fabricate reviews, years trading, accreditations, insurance, emails or addresses that weren't supplied. Real details only; omit what's unknown.
- Keep the Pages artifact under 1GB (retired mockups go to paddydon-a11y/mockups-cold).

## Design rules

- Each mockup gets a bespoke design; never reuse the same fonts/palette combo as recent siblings unless the brief says "clone X".
- Avoid `backdrop-filter` on fixed navs that contain a fixed-position mobile menu (it creates a containing block and breaks the menu positioning). Use a solid rgba background instead.
