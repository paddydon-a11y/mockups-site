# mockups-site — client mockup previews (GitHub Pages)

Static mockup sites, one folder per client, served at
previews.construction-sites.co.uk/<folder>/.

## One source of truth

Before building or editing ANY mockup, read
**`/home/patrick/projects/team-handbook/playbooks/mockup-system.md`** in full
(team members: `team-handbook` repo → `playbooks/mockup-system.md`). It contains
the complete workflow, design system, copy rules, QC procedure and final
checklist. Everything below is only a repo-level reminder of the blocking rules.

## Blocking rules (full detail in the handbook doc)

1. **Design seed + `node ledger-check.js` BEFORE any HTML.** Ledger entry goes in
   the same commit as the mockup.
2. **QC before handover:** static grep sweep first (em dashes, raw phone/email,
   italics, "proper" in hero, "crew"), then Playwright at 1440x900 AND 390x844
   (including a scrolled state and the open mobile menu). Playwright is available
   via `NODE_PATH=/home/patrick/projects/mockup-gen/node_modules`.
3. **ALWAYS serve locally and give Patrick the URL for review BEFORE any git
   push.** Use a RANDOM free port — never 8010, it is always taken:
   `cd ~/projects/mockups-site && PORT=$((8000 + RANDOM % 1000)) && python3 -m http.server $PORT --bind 0.0.0.0 &`
   then link `http://localhost:$PORT/<folder>/`. Do NOT push until approved.
   Only exception: urgent fixes to a bug already live on Pages.
4. Only after explicit approval: git add/commit/push (SEED block in the commit
   message). If a Pages deploy fails, never `gh run rerun` — trigger a fresh
   build with `gh api -X POST repos/paddydon-a11y/mockups-site/pages/builds`.

## Repo-specific facts

- **This repo is PUBLIC.** Nothing from the team handbook (strategy, client
  notes, pricing) goes in it beyond what belongs on the mockup pages themselves.
- Image paths are RELATIVE (`hero.jpg`); og:image/og:url are the only absolute
  URLs.
- Keep the Pages artifact under 1GB — retired mockups move to
  `paddydon-a11y/mockups-cold` (private).
- **Never use em dashes (—) in site copy**; no italics; never fabricate years
  trading, accreditations, insurance, emails, addresses or owner names.
  Placeholder reviews are allowed on mockups only (see handbook doc, Part 3).
- Each mockup is a bespoke design: the ledger bans fonts/palettes/loaders/block
  combos used in the last 10 entries, unless the brief says "clone X".
- No `backdrop-filter` on the fixed nav (breaks nested fixed mobile menu on iOS);
  solid background only.
