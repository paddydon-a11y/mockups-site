# First4Driveways, Colchester — mockup notes

Preview: https://previews.construction-sites.co.uk/first4driveways/ (after push)

## Brief
Patrick, 2026-08-27: "do a mockup just improving on this one https://first4driveways.co.uk/
looks super AI". Branded redesign on their own system (black + orange, their real logo,
Inter body kept), replacing the AI tells on their live site: dark navy page everywhere,
emoji service icons, stat tiles, zero photographs, contradictory copy.

## What is real (all taken off their live site, which is itself AI-built, so confirm)
- Logo: real, alpha-keyed from their logo.jpg (`logo-white.png` for black panels,
  `logo-dark.png` with the white recoloured to ink for the white nav). Nothing redrawn.
- Phone 07427 694766, email info@first4driveways.co.uk (both base64 in the page).
- Address 47 Butt Road, Colchester, CO3 3BZ; hours Mon-Fri 7:30-18:00, Sat 8:00-16:00
  (from their schema markup).
- Services: block paving, resin, tarmac, gravel, patios, landscaping (their six).
- "15+ years", "10 year workmanship guarantee", "fully insured", "free quotes": their
  own claims, kept. Their "2,000+ projects / 500+ 5-star reviews / 98% satisfaction /
  991 Essex locations" stats were dropped as AI filler.

## ⚠️ Flags — confirm with client before launch
- **Their whole site reads as AI-generated.** Treat every fact above as unverified:
  years trading, the guarantee, insurance, even the address.
- **Coverage contradiction:** their meta tags say "Essex & Wales", their body copy says
  "Essex & Hertfordshire". Mockup follows the body copy. Confirm.
- **Reviews are PLACEHOLDERS.** Their six on-site reviews look AI-written and were not
  reused. The four on the mockup are ours and must be swapped for real ones at launch.
- **ALL photos are stock** (stock-library groundwork-landscaping set + Pexels, no people,
  checked for US tells). They have no work photos anywhere. Ask for real ones.
- No owner name anywhere, so CTAs are "Call us".
- No accreditations claimed (none on their site).
- Some stock-library shots are small (612-760px); fine in cards, not for a hero.

## Recipe
See SEED.txt. Exo 2 + Inter. Whacker Pass loader (ld-whackerpass, added to loader-lab).
H-DRIVEBAND hero: loader hands off into a black drive band under the hero on both
breakpoints; 390 fold is black with a ghost of their own swoosh behind the H1.
