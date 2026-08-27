# John Van Sales & Commercials — mockup notes

**Slug:** `john-van-sales-commercials` · **Preview:** https://previews.construction-sites.co.uk/john-van-sales-commercials/
**Business:** vehicle BUYER (not a trade). Buys cars, vans and commercial vehicles from anyone, anywhere in the UK.
**Contact:** John Ward · **Phone:** 07733 931581 · **Email:** NONE supplied · **Address:** NONE (Nottingham area)
**Online presence:** Facebook page "John Van Sales & Commercials" only. Previously a Google presence as "John's Removals, Leicester".

## What is real vs assumed

| Item | Status |
|---|---|
| Business name, contact name, phone | REAL, from the brief |
| Nottingham based, buys UK-wide, buys all vehicle types | REAL, from the brief |
| "Call John" CTAs | The business name leads with John and the brief names him as the contact, so John is used publicly. Confirm he is happy with first-name CTAs. |
| Vehicle categories (cars, vans, commercials, pickups, minibuses/Luton/box, non-runners, fleets) | ASSUMED from "buys all types of vehicles". Confirm anything he does NOT buy (e.g. HGVs, campers, plant). |
| "Paid on collection", "collection arranged anywhere in the UK", "quick decision", "same-day reply" | REASONABLE motor-trade wording, NOT confirmed. Confirm how he pays and whether collection is free. |
| Makes grid | Generic list of UK makes, nothing claimed. |
| All photos | Pexels stock, no people. NONE are John's vehicles. |
| Reviews | PLACEHOLDER x4 (Beeston, Derby, Mansfield, Leicester). Must be replaced or removed at launch. |

## ⚠️ Flags — confirm with the client before launch

- **NO logo existed.** The plate-style "JVS" tile + "JOHN VAN SALES / & COMMERCIALS" wordmark (Titillium Web) were **created for this mockup** at the client's request. `logo-pack/` holds PNG exports (on white, on blue, tile only). Ask if he wants the initials tile or a different mark.
- **NO email, NO address.** Contact section shows the phone and "Nottingham" only. Ask for a business email for the form to deliver to.
- **NO reviews anywhere.** The previous Google presence was under "John's Removals, Leicester"; ask whether any of those reviews are reusable or whether a new Google Business Profile is needed for the vehicle-buying business.
- **No accreditations / no years trading claimed** because none were supplied.
- **Around 25 SEO service/location pages** were requested. The mockup is the homepage only; at go-live build service pages (sell my car / sell my van / sell my commercial vehicle / sell my pickup / sell my non-runner / fleet disposal) x location pages (Nottingham, Derby, Leicester, Mansfield, Sheffield, Birmingham, Leeds, Manchester, London + UK-wide).
- **Form field:** the four-field rule is kept; the textarea is labelled "Tell us about the vehicle" and the hero plate prefills it with `Reg: XXXX XXX`. At go-live consider whether a reg-lookup API (DVLA VES) is worth adding to auto-fill make/model.
- The hero plate widget is decoration plus prefill; it does NOT look anything up.

## Design

See `SEED.txt`. Loader `ld-plateread` (Plate Read) added to `loader-lab` this session. Footer credit links to the root (no dedicated page for motor trade).
