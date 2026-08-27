# Guest Tiling, Stourbridge — mockup notes

Preview: https://previews.construction-sites.co.uk/guest-tiling/ (after push)

## Brief
Facebook page scrape plus one line from Patrick that resets the positioning:
"It would need to be aimed more at national housebuilders. We do the odd domestic
project but mainly it's contracting for the big boys."

The site is therefore written contract-facing (plots, house types, site programme,
handover) even though every supplied photo is a domestic job.

## What is real
- Logo: real. Alpha-keyed off their white-background JPG (`logo.png`), plus a
  knockout white version for the slate panels (`logo-white.png`). Not redrawn.
- Phone `07572 071543`, email `darren@guesttiling.co.uk` (both base64 in the page).
- Postcode `DY8 5LL`, Stourbridge.
- 9 work photos, all theirs. No stock anywhere on the page.
- "Domestic & commercial" is lifted verbatim off their own logo lockup.
- Areas taken from their Facebook service-area list (Brierley Hill, Kidderminster,
  Pedmore and Stourbridge East, Wordsley, Kingswinford South, Wollaston) plus
  obvious neighbours.

## ⚠️ Flags — confirm with client before launch
- **NO reviews at all.** None supplied, none public. The 4 review cards are
  PLACEHOLDERS (2 trade, 2 domestic). Must be replaced or removed at launch.
- **NO owner name used.** `darren@` is an email address only and the rule is never
  to infer a name from one. All CTAs say "Call us". If Darren is happy to be named
  publicly, the CTAs can become "Call Darren".
- **NO accreditations, insurance or years trading claimed anywhere.** Nothing was
  supplied. Worth asking: public liability cover, any tiling association
  membership, CSCS cards, how long trading.
- **NO street address**, only the postcode. Confirm whether they want a full
  address on the site.
- **Housebuilder claim is theirs, not verified by us.** The hero badge says
  "Working for national housebuilders" and the reviews reference developments.
  No developer is named anywhere on purpose. Ask which developers they work for
  and whether they are allowed to name them, that would be the single biggest
  credibility upgrade on this page.
- Several photos are mid-build (protective film, bare plaster, a tea towel over a
  pipe). Left in deliberately, they read as site work to a contractor audience.
  If Darren has finished-and-cleared shots, swap them in.
- Service list is inferred from the photos plus the housebuilder positioning.
  Confirm the six are right, and whether they do underfloor heating, tanking or
  screeding as separate lines.

## Design
See `SEED.txt` and the `guest-tiling` entry in `recipe-ledger.json`.
New this build: `H-SETOUT` hero, `G-BOND` half-bond gallery, and the
`ld-combbed` (Comb & Bed) loader, which has been added to `loader-lab`.
