# Matt Aston Plastering, mockup notes

Slug: `matt-aston-plastering` · Built 2026-08-28 · **BUILT, NOT PUSHED**
Brief: Patrick, one WhatsApp line. Contact Matt Aston, phone 07909 607506, Birmingham
15 mile radius, plastering, "all aspects". Photos promised but not sent ("just longing
it out"), so the build uses stock throughout.

## Confirm with the client before this goes live

- **The trading name is an assumption.** No business name was in the brief, only
  "Matt Aston". Patrick chose **Matt Aston Plastering** and the wordmark, the MA tile,
  the loader payoff and the page title are all built on it. Easy to swap if he trades
  as something else.
- **No logo supplied.** The MA tile plus Readex Pro wordmark was created for this build.
- **Every photo is stock** (Pexels, all inspected, no people, nothing that reads foreign).
  Hero is a fresh-skim corner; the service cards and the gallery are stock interiors,
  boards, a UK rear extension with scaffold, and plaster textures. None of them are
  Matt's jobs. Swap the lot as soon as his photos arrive, starting with the hero.
- **Reviews are placeholders** (Kings Heath, Solihull, Sutton Coldfield, Halesowen).
  Replace before launch.
- **No email and no address anywhere on the page.** Neither was supplied, so neither is
  claimed. The form posts to /api/enquiry as usual.
- **No insurance, accreditation or years-trading claim is made.** Nothing was supplied.
  If he is insured or holds a CSCS card, say so and it can go in the trust strip.
- **Owner name is not used in the CTAs.** "Matt Aston" is the business name but the
  buttons carry the number. Change to "Call Matt" if he wants it.
- **Services 02 to 06 are the standard all-aspects set** (full house plastering, dot and
  dab, plasterboarding and ceilings, external rendering, coving and make good). The brief
  only said "all aspects", so confirm he does the rendering and the coving.
- **The 25-town areas grid is derived from "Birmingham 15 mile radius"**, his own words.
  Trim or extend once he confirms where he will actually travel.
- **"Calls and messages answered the same day"** in the contact cards is a reasonable
  default; check he is happy with it.

## Design

Archetype A (Modern Pro) on a bright surface. Recipe, loader and palette argument are in
`SEED.txt` and in the `recipe-ledger.json` entry.

The one idea: **plaster goes on pink and comes off white**. The berry accent is the wet
material, the pale set grey is the finish. The loader (Off the Hawk, new to loader-lab as
`ld-offthehawk`) lays four wet coats up a wall and trowels them off flat, and the band
under the hero carries the same move on `body.lit`, so on a phone the loader and the
first screenful are one continuous wall.

Stock photo IDs (Pexels): hero 8469950, 7031603, 8146158, 6474207, 11427094, 28885512,
5670765, 4947007, 5691493, 8469943, 27728635 (cropped to remove a partial figure),
7941435, 11427055. The gallery's lead tile is `work-render-house.jpg`, cropped from
`stock-library/gen-builder/new-build-house-render-brick.jpg` (rendered gable and bay on
a new build); it replaced a Pexels half-built extension shell that Patrick cut.

## If it goes ahead

Homepage only at this stage. For the live build the plan would be 6 service pages
(Skimming, Full House Plastering, Dot and Dab, Plasterboarding and Ceilings, External
Rendering, Coving and Make Good) plus location pages from the areas grid, trimmed to the
towns he confirms.
