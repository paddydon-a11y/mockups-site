# SCA Business Consultancy — build notes and flags

**Slug:** `sca-consultancy` · **Source:** branded redesign of `sca-consultancy.com` (WordPress)
**Status:** BUILT, NOT COMMITTED, NOT PUSHED. Local review only.
**Preview URL once pushed:** https://previews.construction-sites.co.uk/sca-consultancy/

**NOT A TRADE.** B2B cost reduction and business consultancy. Second non-trade
mockup in the system after `select-invoice-finance`, and it follows the same three
deviations: no gallery (a consultancy has no work photos), photo cards carry the
SPEND being audited rather than the service, and the textarea is labelled "Tell us
about your business" rather than "the job".

**Rebuilt from scratch 2026-09-01** on Patrick's instruction, after the first
build was rejected: "I think you might just need a complete overhaul. Don't worry
about the mockup rules, it's not a construction website so don't be bound by
them." The trade-mockup furniture is all gone: no loader, no floating call
button, no trust strip, no specimen sheet, no savings calculator, no invented
client schedule, no orange edge strips or dashed dividers, no town-chip cloud.
It is now a straight professional-services site. Design seed is in `SEED.txt`.

**Root cause of the first build's problems, recorded so it does not repeat:** it
was only ever QA'd at 390 and 1440, the two canonical viewports. Everything
between those broke (orphaned grid cells, collapsed spacing, clipped lists) and
Patrick found it. The rebuild uses `clamp()` for all spacing and type and
explicit tested column counts instead of `auto-fit`, and is checked at nine
widths: 390, 480, 560, 660, 768, 900, 1024, 1200, 1440.

## What is REAL (all scraped from their own site)

- Company name, strapline, and both office addresses and numbers:
  Belfast 9 Houston Road BT6 9SE / 028 9532 0223, London 90 Long Acre WC2E 9RZ /
  020 3637 9161. Both are base64 encoded in the HTML and written by JS.
- **Logo:** their own two SVGs, untouched. `logo-mark.svg` (horizontal lockup, nav),
  `logo-full.svg` (round mark, favicon and loader). `-white.svg` variants are the
  same files with `fill:#0F316A` swapped for white, nothing redrawn.
- **Palette:** #0f316a and #ff6600 read straight out of the `.st0` / `.st1` classes
  in their own SVG.
- Trading since 2004, founded as Specialist Cost Auditors.
- Circa 30% average saving; over 60 to 65% keep their existing supplier; 6 to 12
  weeks to first savings; 24 months of monitoring after implementation.
- All eleven consultancy lines and all ten cost reduction categories with their
  real sub-category lists.
- Every results figure: £150,000 hotel group, £500,000 catering company, £450,000
  construction client, £600k settled at £104k, £700k settled at £53k, £350k closed
  at nil.
- **All four reviews are REAL**, lifted from their case studies page and attributed
  by role and client scale exactly as they publish them. There are NO placeholder
  reviews on this build and no Google G, because they publish none.
- All seven directors, their real roles and real bios cut to one line each.
- FAQ answers are their own FAQ copy, tightened.

## Flags to raise with the client

1. **All ten category photographs are substitutes.** Their site has no photography
   at all, only the logo. These are Pexels stock chosen to show the SPEND being
   audited (meters, server blades, a glass elevation, city towers, a container ship,
   a print room, pallet racking, archive shelving, turbines, a commercial kitchen).
   All are people-free per the stock rule. Swap for anything they have.
2. **Commercial Energy Compensation has no page on their site** (the nav item 404s).
   Its one-line description on the register is written from the service name alone.
   Confirm the wording with them before launch.
3. **Email.** `john@sca-consultancy.com` is used as the general contact address
   because it is the only one on their site that is not role-specific to a
   salesperson. They publish seven director addresses. Confirm which one they want
   on the site, or whether they want an `info@`.
4. **The savings figures conflict slightly on their own site.** The Benefits page
   says "over 65% of cases" achieve savings without changing supplier, the FAQ says
   "over 60%", and the Methodology page says "more than 50% of our projects". The
   page uses 65% in the Bottom Line Review chips and 60% in the FAQ answer, matching
   where each came from. Worth them settling on one number.
5. **No accreditations, no insurance claim, no team size, no client names anywhere.**
   None are published, so none were invented. If they hold anything (ACCA, CIPS,
   ISO, professional indemnity) it would strengthen the trust strip.
6. **No WhatsApp and no floating call button.** Both published numbers are
   landlines, so the sticky nav carries the Belfast number instead and the hero,
   CTA band and contact section each carry it again. If they have a mobile they
   are happy to publish, a WhatsApp route can go back in.
7. **No fee, rate, guarantee or percentage is quoted anywhere except the figures
   they publish themselves.** Circa 30%, 65%, 6 to 12 weeks and 24 months all come
   off their own pages. Nothing on the page projects a saving for the visitor.
8. **Office hours are not stated.** They do not publish any, so none were invented.
   Worth adding if they want them.
9. Owner-name CTAs were deliberately not used. John McGowan is named publicly as MD
   so he appears in the team block, but the CTAs say "Call the Belfast office".

## Design idea

Restraint plus scale, and **the numbers are the design**. This firm sells on figures,
so the figures get the room: four real proof stats under the hero, a real result
closing each of the eleven service lines, and a full-bleed navy results band where
six real case figures are the largest type on the page after the H1. Every number on
the page is one they publish themselves.

**Section order (Patrick, 2026-09-01):** the photo grid sits directly under the hero,
not after two text sections. "Feels super wordy for lots of the initial scrolling, we
need the pics maybe higher up." The first photograph now lands at roughly y=1350 on
mobile and y=1430 on desktop, one screen down instead of four sections. The hero stats
go 2x2 at 390 rather than stacking four deep, which buys another ~240px. Section head
ledes and the service and approach one-liners were trimmed at the same time. Nav order
follows the page.

**Loading screen:** a plain brand load, added back on Patrick's request. Their real
full-colour round mark on white, with a hairline track filling in SCA orange
underneath, 2 seconds then a fade. Not a trade animation. Content renders beneath it
and is never gated on JS, and there are fail-safe teardowns at 2.6s and 3.2s.

`ld-auditline`, the trade-style audit animation built for the first version, survives
in `loader-lab/` as an unused concept for the next audit or cost-recovery prospect.

## QC

Static sweep clean: no em dashes, no raw phone or email, no italics, no monospace,
no orange edge strips, credit present, GA present, form carries all four spam fields
and exactly the four visible fields.

Playwright checked at **nine widths** (390, 480, 560, 660, 768, 900, 1024, 1200,
1440), not just the canonical two. At every one: no horizontal overflow, no element
wider than the viewport, no broken images, zero console errors, H1 above the fold,
gutters correct, and no grid row ending on a single orphaned cell.
