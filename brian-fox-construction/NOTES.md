# Brian Fox Construction — mockup notes

Slug: `brian-fox-construction` · Built 2026-08-27 · **BUILT, NOT COMMITTED, NOT PUSHED**
Brief: Patrick, WhatsApp brief. Contact Andrew Fox, phone 07901 957807. Groundworks (main),
site clearance, drainage, machine/excavation work. Northern Ireland, exact areas TBC.
Team of 6, 5 machines. No website, no Checkatrade, no logo. Yellow and black requested.

## ⚠️ Confirm with the client before this goes live

- **Logo is DESIGNED FROM SCRATCH** (yellow BF tile + hazard strip + Saira Extra Condensed
  wordmark). `logo.png` / `logo-white.png` / `mark.png` in the folder, source in `cand/logo.html`.
  Needs Andrew's sign-off; easy to swap if he has something.
- **All photos are stock.** Pexels (JCB hero 35846752, excavator 13931830, tipper 36506004,
  fleet 34100275, backhoe 5125782, New Holland 27434716, bucket 11824185, rubble 30751525) plus
  vetted shots already used on leggat-plant-civils (dozer, trench dig), jd-robson (drainage
  trench pair) and gcs-shropshire (UK drainage detail, footings, drainage runs). None are his
  jobs or his machines. Get real fleet and site photos, especially the five machines together.
- **The five machines are not itemised.** The site says "5 machines" and "team of six" only.
  The silhouette row in the capability band (two excavators, dozer, dumper, roller) is
  decorative and does NOT match a real fleet list. Ask what the five actually are and swap
  the silhouettes and the copy to match.
- **Services 05 and 06 are assumed.** Foundations & Footings and Muck Away & Site Prep are
  standard groundworks items added to make six cards; not in the brief.
- **Reviews are placeholders** (Dungannon, Lisburn, Ballymena, Newry). Replace before launch.
- **Areas are the whole province.** 24 towns across all six counties because the brief says
  "exact areas/radius to be confirmed". Trim once Andrew confirms where he will travel.
- **No email, no address, no accreditations, no insurance claim, no years trading.** None
  supplied, none on the page. Form goes to /api/enquiry as usual.
- **Owner name not used.** Andrew Fox is the contact but not publicly front-and-centre, so
  CTAs say "Call us". Add "Call Andrew" if he wants it.
- **"Same day, usually within the hour"** response line in the contact cards is a
  reasonable default; confirm he is happy with it.

## The ~25 SEO pages (brief)

The mockup is the homepage only. For the live build the plan is 5 service pages
(Groundworks, Site Clearance, Drainage, Machine & Excavation Work, Foundations & Footings)
plus ~20 location pages from the areas grid (Belfast, Lisburn, Newry, Armagh, Portadown,
Craigavon, Lurgan, Banbridge, Dungannon, Cookstown, Omagh, Enniskillen, Derry/Londonderry,
Strabane, Coleraine, Ballymena, Antrim, Larne, Bangor, Newtownards), trimmed to his real
radius. Each needs unique copy per the SEO page-quality rule.

## Build

- Loader: **Blade Clear** (`ld-bladeclear`, NEW, added to loader-lab). Solid yellow dozer
  tracks in on black and shoves seven rubble blocks off the right edge, leaving a clean
  yellow ground line; wordmark lands. 2.0s lit, 2.25s teardown, 2.5s CSS fail-safe.
- The same clearing strip runs along the base of the hero (desktop and the 390 fold) on
  `body.lit`, so the loader hands off into the page.
- Palette: plant yellow #ffcd11 as a FIELD + true black #0d0d0d. Hazard chevrons as the
  only pattern. Zero border radius.
- Type: Saira Extra Condensed 800 / Barlow.
- Full SEED in `SEED.txt`; ledger entry prepended to `recipe-ledger.json`.
- Footer credit deep-links `/construction-company-website-design`, anchor = naked URL.
