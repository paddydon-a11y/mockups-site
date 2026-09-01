# TrowelTech Plastering, mockup notes

Slug: `trowel-tech-plastering` · Built 2026-09-01 · **BUILT, NOT PUSHED**
Brief: Patrick, WhatsApp call notes. Contact David Veitch, phone 07585 954713,
Birmingham, all aspects of plastering (main focus) plus rendering, boarding and
skimming. Logo supplied. Instagram, photos, colours and coverage radius all still
outstanding, so the build uses stock throughout.

## This is the second build

The first cut was navy panels with the logo's orange as the accent, numbered
service cards, a tick trust strip, and a draggable before/after wall drawn in CSS.
Patrick cut it on review: *"the before/after is shit, fuck that off"* and *"the
whole design i kinda hate, looks like cheap AI"*. He chose **material-led, real
surface** as the replacement identity.

What changed, and why:

- **No accent colour anywhere.** The page is white, set-plaster stone and
  wet-plaster ink. The photographs carry all the colour, the interface carries
  none. This also removes the three-way orange collision the first cut had to
  argue against (TRS, SCA, JAS2).
- **The material is real.** The fold, the about band and the CTA band are
  photographs of actual plaster and render, not colour fills and not drawn
  textures. Every drawn surface from the first cut is gone.
- **No cards, chips, pills, numbered badges or tick icons.** Services, reviews,
  contact details, the trust strip and the areas list are all separated by
  hairline rules instead. Zero border-radius on the whole page except the two
  circular FABs.
- **One typeface, nothing heavier than 600.** Onest doing display and body,
  separated only by size and tracking. The shouty-900-display-plus-body-sans
  pairing was a large part of what read as generic.
- **The before/after is gone entirely**, along with the drawn brickwork it was
  built from. Nothing on the page now pretends to be a material it is not.

His logo is an AI-generated navy-and-orange badge, which is part of why leaning
the palette on it went the way it did. It is now used small in the nav, the loader
and the footer, and it is the only colour on the page. If he can get the original
vector, ask for it.

## Confirm with the client before this goes live

- **The spelling is TrowelTech, not Trowl-Tech.** The call sheet says "Trowl-Tech";
  his logo and his email address both say TROWELTECH. Patrick confirmed on
  2026-09-01 to follow the logo. Worth one line to David to be certain, because it
  is the H1, the page title, the slug and the footer.
- **The owner's name is used nowhere on the page.** "David Veitch" came off the
  call sheet and is not public-facing anywhere, so the CTAs carry the number
  instead of "Call David". Easy to switch if he wants it.
- **Every photo is stock** (Pexels, plus two from `stock-library/gen-builder` and
  one from `stock-library/decorators`). All inspected: no people beyond a gloved
  hand on the skimming row, nothing that reads foreign. None of them are his jobs.
  Swap them as soon as the Instagram photos arrive, starting with the fold.
- **Reviews are placeholders** (Erdington, Quinton, Great Barr, Yardley). Replace
  before launch.
- **No insurance, accreditation, years trading or address is claimed** anywhere,
  because none was supplied. If he is insured or holds a CSCS card it can go
  straight into the trust strip.
- **The email is his own**, taken off the logo he sent. Nothing else about him is
  claimed.
- **The 25-area list is a proposal, not his answer.** The call notes say
  "surrounding coverage to be confirmed", so it runs out to Walsall and West
  Bromwich and needs trimming or extending once he says where he will travel.
- **Services 05 and 06 need a sanity check.** The call gave plastering, rendering,
  boarding and skimming; ceilings and coving and patch and crack repairs are the
  standard all-aspects additions. Confirm he does the coving.
- **"Two coats, ruled off, flat to a 2 metre rule"** is the spec line under the
  fold CTAs. It is a normal plastering tolerance, but it is a claim about his work,
  so check he is happy standing behind it.
- **No Instagram link anywhere** because the handle was never supplied.

## The logo edit

He wanted the number on the logo changed, and it now reads **07585 954713**.

The supplied file is an AI-generated badge carrying the old number 07836 370894.
Rather than redraw it, the original mark was kept and only the digits replaced:
the eleven old digits were connected-component labelled and erased along with
their antialias halo, the arc they sat on was circle-fitted from their centres
(centre 509.8, 128.7, radius 701.5, residuals under 2px), and the new number was
re-set on that same arc in Montserrat ExtraBold at 90% width, matched to the
sampled ink `#0c2041` and the original 51px digit height. The dashes either side,
the email line and the badge itself are untouched.

| File | Use |
|---|---|
| `logo.png` | the edited logo on its original white ground |
| `logo-transparent.png` | corner-flood alpha key |
| `logo-mark.png` | badge cropped above the contact lines, the one used on the page |

This is a raster repair of a raster file, so it will not scale forever.

## Design

The recipe and the full palette, loader and type arguments are in `SEED.txt` and
in the `recipe-ledger.json` entry.

The one idea: **the wall is the page.** The fold is a photograph of a real
plastered wall with raking window light across it, and the type sets straight onto
it. The loader is that same photograph with one hard band of light crossing it,
the way a plasterer shines a light along a wall to check it for flatness, so the
loader and the first screenful are one continuous image. Per Patrick's
jm-builders-white note, that trick happens once and is not repeated as a live band
under the hero.

`ld-rakewall` has **not** been added to `loader-lab` yet, because it is not a
drawn stage other builds can lift, it is a photograph plus one moving band. If it
is worth generalising, it belongs in the lab as a recipe rather than as markup.

## QC

Static sweep clean (no em dashes, no raw phone or email, no italics, no mono, no
"crew", no "proper" in the hero, site-by credit present). Playwright clean at both
1440x900 and 390x844: zero console errors, zero horizontal overflow, no broken
images, one service row per row at 390, fold gutters at 26px, mobile menu opens.

One overflow bug was found and fixed during QA: the areas list had no break
opportunities between names, which pushed the mobile layout viewport to 470px.
Each area is now its own nowrap span with the separator drawn as a `::before`.

## If it goes ahead

Homepage only at this stage. The call notes ask for around 25 SEO service and
location pages: six service pages (All Aspects of Plastering, Skimming and
Re-skims, External Rendering, Boarding and Dot-and-Dab, Ceilings and Coving, Patch
and Crack Repairs) plus location pages built from the areas list, trimmed to the
towns he confirms.
