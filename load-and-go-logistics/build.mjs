// Generates every page of the LoadAndGo preview from the data below.
// Run: node build.mjs   (from this folder)
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const OUT = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://previews.construction-sites.co.uk/load-and-go-logistics/';

/* ---------- icons ---------- */
const I = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25c1.1.37 2.3.57 3.6.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z"/></svg>',
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  tick: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 4.6-3.2 7.9-8 9-4.800-1.100-8-4.400-8-9V6z"/><path d="M9 12l2.200 2.200L15 10.500"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.200 7-11.500A7 7 0 005 9.500C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 14l2 2 3.500-4"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.500l2.900 6 6.600.900-4.800 4.600 1.200 6.500L12 17.400l-5.900 3.100 1.200-6.500L2.500 9.400l6.600-.900z"/></svg>',
  van: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7h11v9H2zM13 10h4.500L21 13v3h-8z"/><circle cx="6.500" cy="17.500" r="1.800"/><circle cx="17" cy="17.500" r="1.800"/></svg>',
  shop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10v10h16V10M3 6l1.500-3h15L21 6v2a3 3 0 01-6 0 3 3 0 01-6 0 3 3 0 01-6 0zM10 20v-5h4v5"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  cog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20V10l6 4v-4l6 4V5h6v15z"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16v15H4zM4 10h16M8 3v4M16 3v4M9 15l2 2 4-4"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.600 15.100L2 22l5-1.300A10 10 0 1012 2zm0 18.200a8.200 8.200 0 01-4.200-1.150l-.300-.180-3 .790.800-2.900-.200-.300A8.200 8.200 0 1112 20.200zm4.500-6.100c-.250-.120-1.460-.720-1.690-.800s-.390-.120-.560.120-.640.800-.790.970-.290.180-.540.060a6.700 6.700 0 01-3.350-2.930c-.250-.440.250-.400.720-1.350a.450.450 0 00-.020-.430c-.060-.120-.560-1.340-.760-1.840s-.400-.420-.560-.430h-.480a.920.920 0 00-.660.310 2.800 2.800 0 00-.870 2.080 4.860 4.860 0 001.020 2.580 11.100 11.100 0 004.260 3.760c1.590.690 2.210.750 3 .630a2.560 2.560 0 001.680-1.190 2.080 2.080 0 00.150-1.190c-.060-.110-.230-.170-.480-.290z"/></svg>',
  g: '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.500 12.200c0-.800-.070-1.500-.200-2.200H12v4.200h5.900a5 5 0 01-2.200 3.300v2.700h3.500c2.100-1.900 3.300-4.700 3.300-8z"/><path fill="#34A853" d="M12 23c3 0 5.400-1 7.200-2.700l-3.500-2.700c-1 .700-2.200 1.100-3.700 1.100-2.900 0-5.300-1.900-6.200-4.500H2.200V17A11 11 0 0012 23z"/><path fill="#FBBC05" d="M5.800 14.200a6.600 6.600 0 010-4.300V7H2.200a11 11 0 000 10z"/><path fill="#EA4335" d="M12 5.400c1.600 0 3.100.600 4.200 1.600l3.100-3.100A11 11 0 002.200 7l3.600 2.800C6.700 7.200 9.100 5.400 12 5.400z"/></svg>',
};
const stars = `<div class="stars" aria-label="5 out of 5">${I.star.repeat(5)}</div>`;

/* ---------- route network ---------- */
const HUB = [205, 250];
const NODES = [['Glasgow', 170, 60, 'e'], ['Newcastle', 345, 120, 'e'], ['Leeds', 325, 212, 'e'], ['Manchester', 276, 268, 'e'], ['Birmingham', 300, 362, 'e'], ['Cardiff', 172, 452, 'w'], ['Bristol', 244, 478, 'e'], ['London', 428, 455, 'e']];
function net() {
  let s = `<svg class="net" viewBox="0 0 520 560" aria-hidden="true">`;
  NODES.forEach(([n, x, y, side], k) => {
    const mx = (HUB[0] + x) / 2 + (y - HUB[1]) * 0.12, my = (HUB[1] + y) / 2 - (x - HUB[0]) * 0.12;
    const d = `M${HUB[0]} ${HUB[1]} Q${mx.toFixed(0)} ${my.toFixed(0)} ${x} ${y}`;
    s += `<path class="rt" d="${d}"/><circle class="mv" r="4"><animateMotion dur="${(3.2 + (k % 4) * 0.9).toFixed(1)}s" begin="-${(k * 0.55).toFixed(2)}s" repeatCount="indefinite" path="${d}"/></circle>`;
    s += `<circle class="nd" cx="${x}" cy="${y}" r="4.500"/><text x="${side === 'e' ? x + 11 : x - 11}" y="${y + 4.500}" text-anchor="${side === 'e' ? 'start' : 'end'}">${n}</text>`;
  });
  s += `<circle class="ring" cx="${HUB[0]}" cy="${HUB[1]}" r="9"/><circle class="hub" cx="${HUB[0]}" cy="${HUB[1]}" r="8"/><text class="hubt" x="${HUB[0] - 15}" y="${HUB[1] + 5}" text-anchor="end">Liverpool</text></svg>`;
  return s;
}

/* ---------- data ---------- */
const REVIEWS = [
  { n: 'Keith Lynch', t: 'Used this logistics company as was let down at the last minute by our usual company, all I can say is we could not of asked for better, we needed a lot of AWP machines moving from Preston to Liverpool, and Liverpool to Shrewsbury, and it was dealt with professionally and on time as we had an exhibition starting Friday, we dealt with a person called Shaun, who coordinated it all on my behalf, and the price surprised me, excellent Service company who’s number is in my phone book for future jobs, cannot recommend enough!' },
  { n: 'Rob Brown', t: 'Load and Go are brilliant! Efficient and helpful. Shawn has gone the extra mile (literally!) a good few times. In good hands booking Load and Go for transport, if he says he will be there, he\'ll be there with a smile and a good attitude. Highly recommend!' },
  { n: 'Maddy', t: 'Great reliable affordable courier services. Nothing too much trouble, really helpful on a really big job I had to sort. Clean van & all our goods secured well wrapped. Highly recommend' },
  { n: 'Emma Bourne', t: 'Highly recommend Sean, always goes out of his way to help and try and fit my jobs in. No one else I would use now. Really fairly priced too. Thanks Sean' },
  { n: 'Michael Byrne', t: 'Fast responding, efficient removal. Nice guy. Always goes above and beyond. He is now on speed dial !!! Can’t recommend enough !!!! Thanks to all at L&G logistics' },
  { n: 'K S', t: 'Very helpful and polite lads and very fairly priced. Was able to get to me quickly and execute the job efficiently.' },
];

const SERVICES = [
  { slug: 'same-day-courier-liverpool', nav: 'Same Day Courier', img: 'svc-same-day.jpg', alt: 'Boxed consignment loaded in the back of a courier van',
    card: 'Collected within hours and driven straight to the delivery point.',
    title: 'Same Day Courier Liverpool | Collected Within Hours | LoadAndGo',
    meta: 'Same day courier in Liverpool for businesses. A dedicated driver collects within hours and delivers direct anywhere in the UK, GPS tracked with proof of delivery.',
    h1: 'Same Day Courier <b>Liverpool</b>', chips: ['Collected within hours', 'Dedicated driver', 'GPS tracked', 'Proof of delivery'],
    lede: 'When it has to move today, a dedicated driver collects from your door and takes it straight there. No depot, no hub, no waiting for tomorrow\'s round.',
    h2: 'A direct run, not a place on someone else\'s <b>route</b>',
    p: ['A same day courier job is the simplest thing we do and the one people need most urgently. You call or send the details, we confirm a fixed price and a collection window, and a driver is assigned to your consignment alone.',
      'Your goods stay on one vehicle from collection to delivery. That is the difference between a dedicated same day run and a parcel network: nothing is unloaded, sorted or reloaded on the way, so there is far less to go wrong and you always know where it is.'],
    ben: [['Collected within hours', 'Same day jobs are planned around your deadline, not a fixed daily cut-off.'], ['One dedicated driver', 'One vehicle and one driver, with no hand-offs between depots.'], ['Live GPS tracking', 'See where your delivery is at any point in the journey.'], ['Digital proof of delivery', 'Sent to you as soon as the job is signed for.']],
    jobsH: 'Same day jobs we are booked for', jobs: ['A part a production line is waiting on', 'Stock a customer was promised today', 'Tender documents and samples with a deadline', 'Exhibition and event kit that missed the lorry', 'Returns and transfers between your own sites'],
    faq: [['How quickly can you collect in Liverpool?', 'For same day jobs we aim to collect within a few hours of booking. Call us with the collection postcode and we will tell you exactly how soon a driver can be with you.'], ['Can a same day delivery go outside the North West?', 'Yes. Same day runs go anywhere in the UK from our Liverpool base. Distance sets the delivery time, so the earlier you book, the further it can go in a working day.'], ['How is a same day courier job priced?', 'You get a clear fixed price before collection, based on the route and what is being moved. There are no hidden fees added afterwards.']],
    rev: 1 },
  { slug: 'urgent-courier', nav: 'Urgent Courier', img: 'svc-urgent.jpg', alt: 'Light trails on a motorway junction at dusk',
    card: 'Time-critical runs with a driver assigned within the hour.',
    title: 'Urgent Courier Service Liverpool | Time-Critical Delivery | LoadAndGo',
    meta: 'Urgent courier service from Liverpool. Time-critical deliveries with a driver assigned within the hour, direct to the door with GPS tracking and proof of delivery.',
    h1: 'Urgent Courier <b>Service</b>', chips: ['Driver assigned within the hour', '15 to 30 minute reply', 'Direct to the door'],
    lede: 'Let down by your usual carrier, or a deadline that cannot slip? Call or WhatsApp and you speak to the person who will handle the job.',
    h2: 'Built for the call that starts with <b>"how soon?"</b>',
    p: ['Urgent work is decided in the first ten minutes. That is why there is no call centre and no booking portal between you and the driver. You tell us what it is, where it is and when it has to land, and you get a straight answer.',
      'A lot of our urgent work comes from businesses whose regular transport has fallen through late in the day. We pick the job up, run it direct and keep you updated, so the only person who knows there was a problem is you.'],
    ben: [['A straight answer, fast', 'We reply within 15 to 30 minutes with a price and a realistic time.'], ['Driver assigned within the hour', 'Urgent jobs go to the front of the queue.'], ['Run direct', 'No other drops between your collection and your delivery.'], ['Updates you can pass on', 'GPS tracking and proof of delivery for your own customer.']],
    jobsH: 'When people call us urgently', jobs: ['The usual haulier has cancelled at the last minute', 'A breakdown part needed on site this afternoon', 'A missed collection that still has to arrive today', 'A show or event opening tomorrow morning', 'An order promised to a customer before close of business'],
    faq: [['Can you take an urgent job the same hour?', 'In most cases, yes. Call or WhatsApp rather than emailing if it is urgent, and we will aim to have a driver assigned within the hour.'], ['Do you run urgent jobs out of hours?', 'Tell us what you need and when. Early, late and weekend runs are arranged job by job, so the quickest way to find out is to call.'], ['We already have a courier. Can we use you as a backup?', 'Yes. Plenty of businesses and logistics firms keep our number for overflow and for the days their regular transport cannot cover.']],
    rev: 0 },
  { slug: 'pallet-delivery', nav: 'Pallet Delivery', img: 'svc-pallet.jpg', alt: 'Stacked blue and timber pallets',
    card: 'Single or multi-pallet loads, strapped and delivered at a fixed price.',
    title: 'Pallet Delivery Liverpool | Single & Multi-Pallet Courier | LoadAndGo',
    meta: 'Pallet delivery from Liverpool across the UK. Single and multi-pallet consignments, strapped and tracked, with fixed pricing and proof of delivery on every job.',
    h1: 'Pallet Delivery <b>Liverpool</b> and UK', chips: ['Single or multi-pallet', 'Fixed pricing', 'Insured to £100,000'],
    lede: 'Single pallets and multi-pallet consignments collected, strapped and delivered direct, with the price agreed before the vehicle arrives.',
    h2: 'Pallets that arrive the way they <b>left</b>',
    p: ['Pallet networks are built for volume. Your pallet is trunked to a hub, sorted overnight and sent out on a second vehicle the next day. A dedicated pallet delivery skips all of that: it goes on at your site and comes off at the other end.',
      'That matters when the load is heavy, awkward or valuable, or when the delivery point has a booking slot that cannot be missed. Tell us the pallet count, sizes and weights and what handling equipment is at each end, and the job is planned around it.'],
    ben: [['Fixed, clear pricing', 'Priced per job before collection, with no surprises on the invoice.'], ['Strapped and secured', 'Every consignment is secured for transit, not just stacked.'], ['Booked delivery slots', 'Timed to the receiving site\'s goods-in window.'], ['Insured in transit', 'Cover up to £100,000 per consignment as standard.']],
    jobsH: 'Typical pallet work', jobs: ['Single pallets that need to be there the same day', 'Multi-pallet stock transfers between warehouses', 'Supplier deliveries into goods-in with a booked slot', 'Palletised machinery, tooling and components', 'Trade counter and wholesale restocks'],
    faq: [['How many pallets can you take in one go?', 'Single and multi-pallet consignments are both everyday work. Give us the pallet count, dimensions and weights and we will confirm the right vehicle and a fixed price.'], ['Do you need a forklift at each end?', 'Tell us what is available at collection and delivery when you ask for a quote, so the job can be planned around how the pallets will be loaded and unloaded.'], ['Is pallet delivery next day or same day?', 'Either. Same day pallet runs go direct, and scheduled pallet deliveries can be booked ahead for a set day and time.']],
    rev: 2 },
  { slug: 'nationwide-courier', nav: 'Nationwide Courier', img: 'svc-nationwide.jpg', alt: 'Vans and lorries on a UK motorway',
    card: 'Long-distance and multi-drop runs to any UK postcode.',
    title: 'Nationwide Courier from Liverpool | Long-Distance UK Delivery | LoadAndGo',
    meta: 'Nationwide courier from Liverpool. Long-distance, multi-drop and pallet deliveries to any UK postcode, tracked every step of the way with one dedicated driver.',
    h1: 'Nationwide Courier from <b>Liverpool</b>', chips: ['Any UK postcode', 'Multi-drop', 'Tracked door to door'],
    lede: 'Long hauls, multi-drop runs and pallet deliveries the full length and breadth of the UK, tracked from our Liverpool base to the delivery door.',
    h2: 'The whole of the UK is one <b>drive</b> away',
    p: ['Liverpool sits at the end of the M62 with the M6 a short run east, which puts Manchester, Leeds, Birmingham and the Scottish border on a straight motorway run. For a business sending goods out of the North West, that means one driver and one vehicle can cover almost any UK delivery.',
      'Long-distance work is priced per job and planned in advance where it can be. Multi-drop runs are routed so each stop gets a realistic time, and you can follow the vehicle on GPS for the whole journey.'],
    ben: [['One driver, door to door', 'Your goods are not passed between regional depots.'], ['Multi-drop routing', 'Several deliveries planned into a single efficient run.'], ['Tracked the whole way', 'Live GPS from collection to the final drop.'], ['Fixed price per job', 'Agreed up front, whatever the distance.']],
    jobsH: 'Long-distance jobs we run', jobs: ['Liverpool to London and the Home Counties', 'Birmingham, Nottingham and the wider Midlands', 'Leeds, Sheffield and across Yorkshire', 'Bristol and the South West', 'Collections elsewhere in the UK brought back to the North West'],
    faq: [['Do you cover all of the UK?', 'Yes. We are based in Liverpool and cover the full UK, from the North West to London, Scotland and everywhere in between.'], ['Can you collect outside Liverpool and deliver elsewhere?', 'Yes. Collections and deliveries can both be anywhere in the UK. One of our own reviews is for a job from Preston to Liverpool and on to Shrewsbury.'], ['Can I track a long-distance delivery?', 'Every job is GPS tracked in real time and you receive digital proof of delivery when it is completed.']],
    rev: 0 },
  { slug: 'scheduled-contract-deliveries', nav: 'Scheduled & Contract Deliveries', img: 'svc-scheduled.jpg', alt: 'Loading bays at a distribution warehouse',
    card: 'Weekly, fortnightly or monthly routes at a fixed price.',
    title: 'Scheduled & Contract Deliveries Liverpool | Regular Courier Runs | LoadAndGo',
    meta: 'Scheduled and contract deliveries from Liverpool. Fixed-price weekly, fortnightly or monthly courier runs with consistent timing and a dedicated driver.',
    h1: 'Scheduled and Contract <b>Deliveries</b>', chips: ['Weekly, fortnightly or monthly', 'Fixed price', 'Same driver'],
    lede: 'Regular routes run at the same time, at the same price, by a driver who already knows your sites, your goods-in team and your customers.',
    h2: 'Transport you stop having to <b>think about</b>',
    p: ['If the same goods go to the same places every week, booking a courier each time is wasted effort. A contract run fixes the day, the time window and the price, so the transport simply happens.',
      'Because it is the same driver, the details get learned once: which gate to use, who signs, what has to be kept upright. Over a few weeks we stop being a supplier you book and become the transport side of your business.'],
    ben: [['Fixed pricing', 'One agreed rate per run, so the cost is known for the year.'], ['Consistent timing', 'The same day and window, week after week.'], ['A driver who knows the route', 'No re-explaining your site or your customer every time.'], ['Flexible when it changes', 'Extra drops and urgent jobs added around the regular run.']],
    jobsH: 'Regular runs businesses set up', jobs: ['Weekly stock runs from a warehouse to branches', 'Supplier collections on a fixed day', 'Trunking between two of your own sites', 'Scheduled deliveries to a key customer', 'Monthly multi-drop rounds across a region'],
    faq: [['Do you offer contract or scheduled services?', 'Yes. Weekly, fortnightly or monthly runs with fixed pricing. We act as your dedicated transport partner on an ongoing basis.'], ['Is there a minimum term?', 'Tell us the route and how often it runs and we will set out the terms with the price. The arrangement is built around what your business needs.'], ['What if we need an extra delivery outside the schedule?', 'Call us. One-off and urgent jobs are fitted in around a contract run, and you are already dealing with the people who know your work.']],
    rev: 3 },
  { slug: 'business-courier-services', nav: 'Business Courier Services', img: 'svc-business.jpg', alt: 'Two white courier vans',
    card: 'A courier your team can ring direct, on account or ad hoc.',
    title: 'Business Courier Services Liverpool | B2B Courier | LoadAndGo',
    meta: 'Business courier services in Liverpool and across the UK. Same day and next day collections for businesses, logistics firms and suppliers, handled directly with no call centre.',
    h1: 'Business Courier <b>Services</b>', chips: ['Same day and next day', 'No call centre', 'Overflow and subcontract'],
    lede: 'Dependable transport for businesses, logistics companies and suppliers that cannot afford delays. Same day and next day, with one number to call.',
    h2: 'The courier your office already has on <b>speed dial</b>',
    p: ['Most businesses do not need a transport department. They need someone reliable to ring when something has to go: a customer order, a set of samples, a pallet for a site, a box of paperwork for a signing.',
      'That is what a business courier is for. You deal with the person handling the job every time, you get a price before anything moves, and the delivery is tracked and signed for. Logistics companies use the same service for overflow and urgent subcontract work they cannot cover in-house.'],
    ben: [['One direct contact', 'The person you speak to is the person handling the job.'], ['Same day and next day', 'Collections and deliveries booked around your working day.'], ['Subcontract support', 'Overflow capacity for logistics firms and hauliers.'], ['Paperwork that stands up', 'Digital proof of delivery on every single job.']],
    jobsH: 'How businesses use us', jobs: ['Customer orders that cannot wait for the parcel network', 'Stock and equipment moved between offices and sites', 'Overflow jobs for other logistics companies', 'Supplier collections on behalf of a buyer', 'Exhibition stands and event equipment'],
    faq: [['Do you only work with businesses?', 'Our work is built around businesses, logistics firms, suppliers and production teams. If you are not sure whether a job fits, call and ask.'], ['Can other couriers and hauliers subcontract to you?', 'Yes. Overflow and urgent subcontract support for logistics companies is a regular part of what we do.'], ['How do we get a price?', 'Call, WhatsApp or use the quote form with the collection and delivery details. You will have a fixed price within 15 to 30 minutes.']],
    rev: 3 },
  { slug: 'fragile-specialist-freight', nav: 'Fragile & Specialist Freight', img: 'svc-fragile.jpg', alt: 'Cardboard boxes marked fragile loaded for delivery',
    card: 'Wrapped, strapped and carefully loaded on every consignment.',
    title: 'Fragile & Specialist Freight Courier Liverpool | LoadAndGo',
    meta: 'Fragile and specialist freight courier from Liverpool. Protective wrapping, full strapping and careful loading for high-value, fragile and bulky goods, insured to £100,000.',
    h1: 'Fragile and Specialist <b>Freight</b>', chips: ['Protective wrapping', 'Full strapping', 'Insured to £100,000'],
    lede: 'High-value, fragile and awkward goods moved with protective blankets, full strapping and careful loading on every job.',
    h2: 'Handled as if it were <b>ours</b>',
    p: ['Some goods cannot go through a sortation belt. Display units, glazed items, finished joinery, electronics, artwork and one-off pieces need to be loaded by someone who has looked at them properly and decided how they should travel.',
      'Fragile jobs are wrapped, strapped and placed, not stacked. The consignment stays on the same vehicle for the whole journey, so the only people who handle it are the driver who loaded it and the person who receives it.'],
    ben: [['Protective blankets', 'Surfaces and edges covered before anything is strapped.'], ['Full strapping', 'Loads restrained so they cannot shift in transit.'], ['One vehicle throughout', 'No depot handling between collection and delivery.'], ['Higher cover on request', '£100,000 per consignment as standard, more if needed.']],
    jobsH: 'Fragile and specialist loads', jobs: ['Shop fittings, display units and signage', 'Finished joinery, worktops and furniture', 'Electronics, screens and IT equipment', 'Bulky or awkward items that will not palletise', 'High-value one-off pieces'],
    faq: [['Can you handle fragile or oversized items?', 'Absolutely. We specialise in fragile, bulky and high-value goods using protective blankets, full strapping and careful loading on every job.'], ['Are fragile goods insured?', 'Yes. All consignments are covered up to £100,000 as standard. Higher cover is available on request for high-value items.'], ['Do we need to package items ourselves?', 'Tell us how the goods are currently packed when you ask for a quote. We bring blankets and strapping, and will say if anything needs more protection before it travels.']],
    rev: 2 },
  { slug: 'production-supplier-support', nav: 'Production & Supplier Support', img: 'svc-production.jpg', alt: 'Warehouse racking stacked with boxed stock',
    card: 'Parts, stock and equipment kept moving between sites.',
    title: 'Production & Supplier Transport Support Liverpool | LoadAndGo',
    meta: 'Transport support for manufacturers, suppliers and production teams in Liverpool and the North West. Time-critical deliveries, stock transfers and urgent collections.',
    h1: 'Production and Supplier <b>Support</b>', chips: ['Time-critical parts', 'Stock transfers', 'Urgent collections'],
    lede: 'Time-critical deliveries, stock transfers and urgent collections that keep manufacturers, suppliers and production teams moving.',
    h2: 'When a delay costs more than the <b>delivery</b>',
    p: ['A stopped line, a team waiting on set or a site with no materials costs far more per hour than any courier. Production and supplier support is transport planned around that fact: the question is not the cheapest way to move it, but the surest way to have it there on time.',
      'We move parts, props, tooling, components and stock between suppliers, warehouses and production sites, on one-off urgent runs and on regular scheduled collections. You get one contact who understands what is riding on the delivery.'],
    ben: [['Planned around your deadline', 'Collection and delivery times set by when you need it.'], ['Supplier collections', 'We collect from your suppliers so you do not have to chase them.'], ['Site to site transfers', 'Stock and equipment moved between your own locations.'], ['Reliable under pressure', 'Direct runs with tracking, for the jobs that cannot be late.']],
    jobsH: 'What we move for production teams', jobs: ['Machine parts and tooling for a line that is down', 'Components from a supplier to an assembly site', 'Props, sets and equipment between production sites', 'Finished goods out to customers and distributors', 'Regular scheduled collections from key suppliers'],
    faq: [['Can you collect from our supplier and deliver to us?', 'Yes. Give us the supplier\'s details and what is being collected, and we will arrange the collection with them and deliver direct to your site.'], ['Can you work to a production schedule?', 'Yes. Regular runs can be fixed to your schedule, with urgent one-off jobs added around them when something changes.'], ['Do you work with film and event production teams?', 'Yes. Urgent transport of parts, props and equipment between production sites is one of the sectors we support.']],
    rev: 0 },
];

const LOCS = [
  { slug: 'courier-liverpool', name: 'Liverpool', miles: 'Home base', road: 'M62, M57, M58',
    title: 'Courier Services Liverpool | Same Day & Business Courier | LoadAndGo',
    meta: 'Liverpool courier based at the Cotton Exchange. Same day, urgent, pallet and contract deliveries for businesses across Liverpool and Merseyside, direct to any UK postcode.',
    lede: 'Liverpool is home. Collections across the city and Merseyside every day, delivered direct to anywhere in the UK.',
    h2: 'A Liverpool courier that is actually <b>in Liverpool</b>',
    p: ['We are based in the city centre, which means a collection in Liverpool is a short drive rather than a booking with a depot somewhere else. From the business district around Old Hall Street to the port at Seaforth and the industrial estates at Speke and Aintree, we are usually close by.',
      'Liverpool businesses use us for same day runs across the city, daily work into Manchester, Warrington and Cheshire, and long-distance deliveries that leave the M62 for the rest of the UK.'],
    places: ['City centre and the business district', 'Speke and Liverpool International Business Park', 'Seaforth and the Port of Liverpool', 'Aintree and Bootle', 'Baltic Triangle and Brunswick', 'Wirral via the tunnels'],
    faq: [['Where in Liverpool do you collect from?', 'All Liverpool postcodes and across Merseyside. Call with the collection postcode and we will tell you how soon a driver can be there.'], ['Can you deliver from Liverpool to anywhere in the UK?', 'Yes. Liverpool is our base, and we cover the full length and breadth of the UK from here.']] },
  { slug: 'courier-knowsley', name: 'Knowsley', miles: 'Around 8 miles', road: 'M57, A580 East Lancs Road',
    title: 'Courier Services Knowsley | Kirkby, Huyton & Prescot | LoadAndGo',
    meta: 'Courier services in Knowsley, Kirkby, Huyton and Prescot. Same day, pallet and contract deliveries from a member of Knowsley Chamber of Commerce.',
    lede: 'Same day, pallet and contract transport for businesses across Knowsley, from a member of Knowsley Chamber of Commerce.',
    h2: 'On the doorstep of Knowsley\'s <b>business parks</b>',
    p: ['Knowsley is one of the busiest manufacturing and distribution areas in the North West, with Knowsley Business Park and the industrial estates around Kirkby, Huyton and Prescot all sitting beside the M57 and the East Lancs Road.',
      'LoadAndGo is a member of Knowsley Chamber of Commerce and part of the local business network. For firms here that means urgent collections without a long wait, and a regular contact for supplier runs, stock transfers and scheduled deliveries.'],
    places: ['Knowsley Business Park', 'Kirkby', 'Huyton', 'Prescot', 'Halewood', 'Whiston'],
    faq: [['Do you collect from Knowsley Business Park?', 'Yes. Knowsley Business Park and the estates around Kirkby, Huyton and Prescot are all within a short drive of our Liverpool base.'], ['Are you a local Knowsley business contact?', 'LoadAndGo Ltd is a member of Knowsley Chamber of Commerce.']] },
  { slug: 'courier-st-helens', name: 'St Helens', miles: 'Around 13 miles', road: 'A580, M62 J7, M6 J23',
    title: 'Courier Services St Helens | Same Day & Pallet Courier | LoadAndGo',
    meta: 'Courier services in St Helens and Haydock. Same day, urgent, pallet and scheduled deliveries for businesses, with fixed prices and proof of delivery.',
    lede: 'Same day and scheduled transport for St Helens businesses, from the town centre out to Haydock and the M6.',
    h2: 'Between the M62 and the M6, <b>St Helens</b> ships everywhere',
    p: ['St Helens sits between the East Lancs Road and the M62, with Haydock and junction 23 of the M6 on its eastern edge. It is a town built on manufacturing and it still moves a great deal of freight, much of it at short notice.',
      'We collect across St Helens for same day and next day delivery, run pallets out of the industrial estates at Haydock, and set up regular routes for suppliers who deliver to the same customers every week.'],
    places: ['Haydock Industrial Estate', 'St Helens town centre', 'Sutton and Sherdley', 'Rainford', 'Newton-le-Willows', 'Rainhill'],
    faq: [['How quickly can you collect in St Helens?', 'St Helens is around 13 miles from our base. For same day jobs we aim to collect within a few hours of booking, so call for an exact time.'], ['Do you collect pallets from Haydock?', 'Yes. Single and multi-pallet consignments are collected from Haydock and across St Helens.']] },
  { slug: 'courier-warrington', name: 'Warrington', miles: 'Around 20 miles', road: 'M62, M6, M56',
    title: 'Courier Services Warrington | Same Day Courier & Pallets | LoadAndGo',
    meta: 'Courier services in Warrington and Cheshire. Same day, urgent and pallet deliveries from Birchwood, Omega and Gemini, direct to any UK postcode.',
    lede: 'Daily coverage of Warrington and Cheshire, where the M62, M6 and M56 meet and half the North West\'s freight changes direction.',
    h2: 'Warrington: the North West\'s <b>crossroads</b>',
    p: ['Three motorways meet at Warrington, which is why so many distribution centres and head offices are there. Birchwood Park, Omega and Gemini are all a straight run along the M62 from Liverpool.',
      'Warrington businesses book us for urgent same day runs when a pallet network is too slow, for dedicated deliveries into distribution centres with booked slots, and for scheduled routes into Liverpool, Manchester and Cheshire.'],
    places: ['Birchwood Park', 'Omega', 'Gemini', 'Winwick Quay', 'Woolston Grange', 'Appleton and Stretton'],
    faq: [['Do you cover Warrington every day?', 'Yes. Warrington and Cheshire are part of our daily North West coverage.'], ['Can you deliver into a distribution centre with a booked slot?', 'Yes. Give us the booking reference and time window and the run is planned to arrive for it.']] },
  { slug: 'courier-wigan', name: 'Wigan', miles: 'Around 22 miles', road: 'M58, M6 J25 to J27',
    title: 'Courier Services Wigan | Same Day & Contract Courier | LoadAndGo',
    meta: 'Courier services in Wigan, Leigh and Skelmersdale. Same day, urgent, pallet and contract deliveries for businesses along the M6 and M58.',
    lede: 'Urgent collections and regular runs for businesses in Wigan and the towns along the M6 and M58.',
    h2: 'Wigan, straight down the <b>M58</b>',
    p: ['The M58 runs from the edge of Liverpool directly to the M6 at Orrell, which makes Wigan one of the quickest towns for us to reach. Its industrial estates along the M6 corridor are home to engineering firms, food producers and distributors.',
      'We collect in Wigan, Leigh and Skelmersdale for same day delivery anywhere in the UK, and run scheduled routes for businesses that supply customers across Lancashire and Greater Manchester.'],
    places: ['Martland Park', 'Wigan town centre', 'Ince and Hindley', 'Leigh', 'Skelmersdale', 'Standish'],
    faq: [['Do you cover Wigan and St Helens?', 'Yes. Wigan and St Helens are both part of our daily North West coverage.'], ['Can you run a regular route from Wigan?', 'Yes. Weekly, fortnightly or monthly contract runs are available at a fixed price.']] },
  { slug: 'courier-manchester', name: 'Manchester', miles: 'Around 35 miles', road: 'M62, M602',
    title: 'Courier Services Manchester | Liverpool to Manchester Courier | LoadAndGo',
    meta: 'Courier services between Liverpool and Manchester. Same day, urgent and pallet deliveries to Trafford Park, Salford and Manchester Airport, with daily coverage.',
    lede: 'Liverpool to Manchester is our busiest corridor. Daily same day, pallet and scheduled runs along the M62 into Manchester and Salford.',
    h2: 'Liverpool to <b>Manchester</b>, every day',
    p: ['The two cities are around 35 miles apart on the M62, and a great deal of business moves between them. A dedicated run from Liverpool reaches Trafford Park, Salford Quays or the city centre without the overnight delay of a parcel network.',
      'We deliver into Manchester for Liverpool businesses and collect from Manchester for delivery back to Merseyside or on to the rest of the UK. For regular traffic between the two cities, a scheduled run fixes the day and the price.'],
    places: ['Trafford Park', 'Salford Quays and MediaCity', 'Manchester city centre', 'Manchester Airport', 'Stretford and Old Trafford', 'Eccles and Irlam'],
    faq: [['Do you deliver from Liverpool to Manchester the same day?', 'Yes. Manchester and Salford are part of our daily coverage, and it is one of the shortest same day runs we do.'], ['Can you collect in Manchester and deliver to Liverpool?', 'Yes. Collections and deliveries run in both directions, and onward to anywhere in the UK.']] },
  { slug: 'courier-preston', name: 'Preston', miles: 'Around 35 miles', road: 'M58, M6 J29 to J31',
    title: 'Courier Services Preston | Same Day Courier Lancashire | LoadAndGo',
    meta: 'Courier services in Preston and Lancashire. Same day, urgent, pallet and scheduled deliveries from Walton Summit, Red Scar and across the M6 corridor.',
    lede: 'Same day and scheduled transport for Preston and Lancashire, up the M6 from our Liverpool base.',
    h2: 'Preston and Lancashire, up the <b>M6</b>',
    p: ['Preston is where the M6, M55, M61 and M65 come together, so it works as the distribution point for most of Lancashire. Walton Summit at Bamber Bridge and Red Scar on the east side of the city are the main employment areas for logistics and manufacturing.',
      'One of our own Google reviews is for exactly this kind of work: machines collected in Preston, brought to Liverpool and then taken on to Shrewsbury in time for an exhibition, after the customer\'s usual company let them down.'],
    places: ['Walton Summit', 'Red Scar Business Park', 'Preston city centre and the Docks', 'Bamber Bridge and Leyland', 'Chorley', 'Blackburn via the M65'],
    faq: [['Do you cover Preston and Lancashire?', 'Yes. Preston and Lancashire are part of our daily North West coverage.'], ['Can you collect in Preston and deliver outside the North West?', 'Yes. Collections in Preston can be delivered direct to any UK postcode.']] },
  { slug: 'courier-chester', name: 'Chester', miles: 'Around 25 miles', road: 'M53, M56, A55',
    title: 'Courier Services Chester | Same Day Courier Cheshire | LoadAndGo',
    meta: 'Courier services in Chester and Cheshire. Same day, urgent, pallet and fragile deliveries for businesses in Chester, Ellesmere Port and Deeside.',
    lede: 'Dedicated transport for Chester, Ellesmere Port and the Deeside estates, across the river from Liverpool.',
    h2: 'Chester, Ellesmere Port and <b>Deeside</b>',
    p: ['Chester and its business parks are reached from Liverpool through the Mersey tunnels and down the M53, with Ellesmere Port on the way and Deeside Industrial Park a few miles beyond on the A55.',
      'Work here is a mix of office and professional deliveries into Chester Business Park, industrial and automotive freight around Ellesmere Port, and manufacturing collections from Deeside that need to reach customers the same day.'],
    places: ['Chester Business Park', 'Sealand Industrial Estate', 'Ellesmere Port', 'Deeside Industrial Park', 'Chester city centre', 'Saltney and Broughton'],
    faq: [['Do you cover Chester and Cheshire?', 'Yes. Cheshire is part of our daily North West coverage from Liverpool.'], ['Can you take fragile goods into Chester city centre?', 'Yes. Fragile and high-value items are wrapped, strapped and delivered direct, with the delivery timed for city centre access.']] },
];

const HOME_FAQ = [
  ['How quickly can you collect?', 'For same-day jobs we aim to collect within a few hours of booking. Give us a call and we\'ll tell you exactly how soon we can be with you.'],
  ['Do you cover all of the UK?', 'Yes. We\'re based in Liverpool and cover the full UK, from the North West to London, Scotland, and everywhere in between.'],
  ['Are you fully insured?', 'Yes. All consignments are covered up to £100,000 as standard. Higher cover is available on request for high-value items.'],
  ['Do you offer contract or scheduled services?', 'Yes. Weekly, fortnightly or monthly runs with fixed pricing. We act as your dedicated transport partner on an ongoing basis.'],
  ['Can you handle fragile or oversized items?', 'Absolutely. We specialise in fragile, bulky and high-value goods using protective blankets, full strapping and careful loading on every job.'],
  ['Do you provide proof of delivery?', 'Yes. Digital proof of delivery is sent to you on every single job, every time. No exceptions.'],
];

/* ---------- shared chrome ---------- */
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const strip = s => s.replace(/<[^>]+>/g, '');
const ld = o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;
const BIZ = { '@type': 'LocalBusiness', name: 'LoadAndGo Ltd', url: 'https://www.loadandgo.uk/', address: { '@type': 'PostalAddress', streetAddress: '307 International House, Cotton Exchange, Old Hall Street', addressLocality: 'Liverpool', postalCode: 'L3 9LQ', addressCountry: 'GB' }, areaServed: 'United Kingdom', aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '14' } };

function head({ title, meta, path, root, schema }) {
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(meta)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(meta)}">
<meta property="og:image" content="${BASE}og.jpg">
<meta property="og:url" content="${BASE}${path}">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="${root}logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@600;700&family=Yantramanav:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}site.css">
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17958918628"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'AW-17958918628');
  gtag('config', 'G-WG747WXNB6');
</script>
${schema.map(ld).join('\n')}
</head>`;
}

function nav(root) {
  const sv = SERVICES.map(s => `<a href="${root}${s.slug}/">${s.nav}</a>`).join('');
  const lc = LOCS.map(l => `<a href="${root}${l.slug}/">${l.name}</a>`).join('');
  return `<header class="nav">
  <div class="wrap nav-in">
    <a class="nav-logo" href="${root || './'}" aria-label="LoadAndGo Logistics home"><img src="${root}logo.png" alt="L&amp;G Logistics" width="480" height="304"></a>
    <ul class="nav-links">
      <li><a href="${root}#services">Services ${I.chev}</a><div class="drop">${sv}</div></li>
      <li><a href="${root}#areas">Areas ${I.chev}</a><div class="drop">${lc}</div></li>
      <li><a href="${root}#who">Who We Help</a></li>
      <li><a href="${root}#reviews">Reviews</a></li>
      <li><a href="#quote">Contact</a></li>
    </ul>
    <a class="btn btn-red nav-cta" data-tel href="#">${I.phone}<span data-telt>Call us</span></a>
    <button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
</header>
<div class="mmenu">
  <h5>Services</h5>
  ${SERVICES.map(s => `<a class="l" href="${root}${s.slug}/">${s.nav}</a>`).join('\n  ')}
  <h5>Areas</h5>
  ${LOCS.map(l => `<a class="l" href="${root}${l.slug}/">Courier ${l.name}</a>`).join('\n  ')}
  <h5>Company</h5>
  <a class="l" href="${root}#who">Who We Help</a>
  <a class="l" href="${root}#reviews">Reviews</a>
  <a class="l" href="#quote">Get a Free Quote</a>
  <a class="btn btn-red" data-tel href="#">${I.phone}<span data-telt>Call us</span></a>
</div>`;
}

function faqBlock(items) {
  return `<div class="faq">${items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`;
}
const faqSchema = items => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const crumbSchema = (name, path) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: BASE }, { '@type': 'ListItem', position: 2, name, item: BASE + path }] });

function contact(source, heading) {
  return `<section class="sec" id="quote">
  <div class="wrap contact">
    <div class="reveal">
      <span class="label">Get in Touch</span>
      <h2>${heading}</h2>
      <p>Same-day, scheduled and time-critical transport across the UK. Fill in the form and we'll reply within 15 to 30 minutes.</p>
      <div class="info"><span class="ti">${I.phone}</span><div><small>Call or WhatsApp</small><a data-tel href="#"><span data-telt>Call us</span></a></div></div>
      <div class="info"><span class="ti">${I.doc}</span><div><small>Email</small><a data-mail href="#">&nbsp;</a></div></div>
      <div class="info"><span class="ti">${I.pin}</span><div><small>Based in</small><b>Liverpool, UK</b></div></div>
    </div>
    <form class="q reveal" id="qForm" action="/api/enquiry" method="POST">
      <h3>Get a Fast Quote</h3>
      <p>A clear, fixed price and collection window. No obligation.</p>
      <input type="text" name="_gotcha" style="position:absolute;left:-9999px" tabindex="-1" autocomplete="off">
      <input type="hidden" name="_timestamp" id="formTimestamp">
      <input type="hidden" name="businessName" value="Load and Go Logistics">
      <input type="hidden" name="source" value="mockup-load-and-go-logistics${source}">
      <div class="f"><label for="fName">Name</label><input id="fName" name="name" required autocomplete="name"></div>
      <div class="f"><label for="fPhone">Phone</label><input id="fPhone" name="phone" type="tel" required pattern="^(0|\\+44)\\d{9,11}$" autocomplete="tel"></div>
      <div class="f"><label for="fEmail">Email <i>(optional)</i></label><input id="fEmail" name="email" type="email" autocomplete="email"></div>
      <div class="f"><label for="fMsg">What needs moving? <i>(optional)</i></label><textarea id="fMsg" name="message" placeholder="Collection and delivery postcodes, what it is, and when it needs to be there"></textarea></div>
      <button class="btn btn-red" type="submit">Send Request ${I.arrow}</button>
      <div class="form-ok" id="formOk">Thanks. We'll come back to you with a price shortly.</div>
    </form>
  </div>
</section>`;
}

function footer(root) {
  return `<footer>
  <div class="wrap">
    <div class="foot">
      <div><img src="${root}logo.png" alt="L&amp;G Logistics" width="480" height="304" loading="lazy"><p>Dedicated courier and logistics support for businesses across the UK. Liverpool-based with nationwide coverage.</p></div>
      <div><h4>Services</h4><ul>${SERVICES.map(s => `<li><a href="${root}${s.slug}/">${s.nav}</a></li>`).join('')}</ul></div>
      <div><h4>Areas</h4><ul>${LOCS.map(l => `<li><a href="${root}${l.slug}/">Courier ${l.name}</a></li>`).join('')}</ul></div>
      <div><h4>Get in Touch</h4><ul><li><a data-tel href="#"><span data-telt>Call us</span></a></li><li><a data-mail href="#">&nbsp;</a></li><li>Liverpool, UK</li><li>Knowsley Chamber Member</li><li>Fully Insured</li></ul></div>
    </div>
    <div class="foot-b"><span>&copy; 2026 LoadAndGo Ltd. All rights reserved.</span><span>Site by <a href="https://construction-sites.co.uk" target="_blank" rel="noopener">Construction Sites</a></span></div>
  </div>
</footer>
<div class="fabs"><a class="fab wa" data-wa href="#" aria-label="WhatsApp us" target="_blank" rel="noopener">${I.wa}</a><a class="fab call" data-tel href="#" aria-label="Call us">${I.phone}</a></div>
<script src="${root}site.js"></script>
</body>
</html>`;
}

const band = `<section class="band"><div class="band-in reveal"><div><h2>Need urgent transport today?</h2><p>Call or WhatsApp and we'll have a driver assigned within the hour.</p></div><a class="btn" data-tel href="#">${I.phone}<span data-telt>Call us</span></a></div></section>`;

function revCard(r) {
  return `<div class="rev">${stars}<p>${r.t}</p><div class="who-r"><span class="av">${r.n[0]}</span><div><strong>${r.n}</strong><span>Google Review</span></div>${I.g}</div></div>`;
}

/* ---------- home ---------- */
function home() {
  const root = '';
  const schema = [{ '@context': 'https://schema.org', ...BIZ }, faqSchema(HOME_FAQ)];
  return `${head({ title: 'Logistics Company Liverpool | Same Day Courier & Nationwide Transport | LoadAndGo', meta: 'LoadAndGo is a Liverpool-based logistics company offering same day courier, nationwide delivery, pallet transport and scheduled contract runs across the UK.', path: '', root, schema })}
<body>
<div id="ld"><div class="ld-b"><img src="logo.png" alt="L&amp;G Logistics"><div class="ld-track"><div class="ld-line"></div><div class="ld-fill"></div><span class="ld-pin a"></span><span class="ld-pin b"></span><span class="ld-van"></span></div><div class="ld-cap"><span>Collected</span><span>Delivered</span></div></div></div>
${nav(root)}
<main>
<section class="hero">
  <div class="hero-panel">
    <div class="hero-photo"></div>
    <div class="hero-net">${net()}</div>
    <div class="wrap hero-inner">
      <div class="hero-copy">
        <div class="pill fade d1"><span class="dot"></span>Liverpool-Based &middot; Nationwide UK</div>
        <h1 class="fade d2">Logistics Company Liverpool. <b>Same Day Courier</b> and Transport for Business.</h1>
        <p class="hero-lede fade d3">Liverpool-based transport for businesses, logistics firms, suppliers and production teams. Same-day, scheduled and time-critical deliveries handled directly, with no call centres.</p>
        <form class="qbar fade d4" id="qbar" data-herocta>
          <label><span>Collection</span><input name="from" placeholder="Postcode or town" autocomplete="off"></label>
          <label><span>Delivery</span><input name="to" placeholder="Postcode or town" autocomplete="off"></label>
          <button class="btn btn-red" type="submit">Get a Free Quote ${I.arrow}</button>
        </form>
        <div class="hero-sub fade d5"><a class="btn btn-ghost" data-tel href="#">${I.phone}<span data-telt>Call us</span></a><small>Reply within 15 to 30 minutes</small></div>
        <div class="route-strip fade d5"><span>Liverpool</span><i></i><em id="rsDest">Manchester</em></div>
      </div>
    </div>
    <div class="hero-mphoto" role="img" aria-label="Shipping containers"></div>
  </div>
</section>

<section class="trust">
  <div class="wrap trust-in">
    <div class="trust-item"><span class="ti">${I.shield}</span><div><strong>Fully Insured</strong><span>Up to £100,000 per consignment</span></div></div>
    <div class="trust-item"><span class="ti">${I.pin}</span><div><strong>GPS Tracked</strong><span>Every job, in real time</span></div></div>
    <div class="trust-item"><span class="ti">${I.doc}</span><div><strong>Proof of Delivery</strong><span>Sent on completion</span></div></div>
    <div class="trust-item"><span class="ti">${I.clock}</span><div><strong>15 to 30 Min Reply</strong><span>Fixed price, no hidden fees</span></div></div>
    <div class="trust-item"><span class="ti">${I.star}</span><div><strong>5.0 on Google</strong><span>14 reviews</span></div></div>
  </div>
</section>

<section class="sec" id="services">
  <div class="wrap">
    <div class="sec-head reveal"><span class="label">Our Services</span><h2>Courier services built around <b>you.</b></h2></div>
    <div class="svc-grid">
      ${SERVICES.map(s => `<a class="svc reveal" href="${s.slug}/"><img src="${s.img}" alt="${esc(s.alt)}" loading="lazy" width="1000" height="667"><div class="svc-b"><h3>${s.nav}</h3><p>${s.card}</p><span class="more">View service ${I.arrow}</span></div></a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="about" id="why">
  <div class="about-panel reveal">
    <div class="about-b">
      <span class="label">Why Choose LoadAndGo</span>
      <h2>Your Transport.<br><b>Our Responsibility.</b></h2>
      <p>We don't operate a call centre or automated system. When you contact LoadAndGo, you speak directly with the person handling your job, every time. No guesswork, no hidden fees, no surprises.</p>
      <ul class="ticks">${['Based in Liverpool', 'Real-time GPS tracking', 'Proof of delivery every job', 'No hidden fees', 'Same-day collections', 'Contract runs available'].map(t => `<li>${I.tick}${t}</li>`).join('')}</ul>
      <div class="chamber"><img src="knowsley-chamber.jpg" alt="Knowsley Chamber" loading="lazy" width="700" height="317"><div><strong>Chamber Member</strong><span>Knowsley Chamber of Commerce</span></div></div>
    </div>
    <div class="about-img"><img src="about.jpg" alt="Boxed goods strapped and ready for delivery" loading="lazy"></div>
  </div>
</section>

<section class="sec" id="who">
  <div class="wrap">
    <div class="sec-head reveal"><span class="label">Who We Support</span><h2>Businesses that <b>rely on us</b></h2></div>
    <div class="who reveal">
      <div><span class="ti">${I.van}</span><h3>Logistics Companies</h3><p>Overflow and urgent subcontract support for jobs you can't cover in-house.</p></div>
      <div><span class="ti">${I.shop}</span><h3>Businesses</h3><p>Same-day and next-day collections and deliveries, handled with care.</p></div>
      <div><span class="ti">${I.box}</span><h3>Suppliers</h3><p>Reliable scheduled collections to customers, warehouses and sites.</p></div>
      <div><span class="ti">${I.cog}</span><h3>Production Teams</h3><p>Urgent transport of parts, props and equipment between sites.</p></div>
      <div><span class="ti">${I.cal}</span><h3>Scheduled Runs</h3><p>Regular fixed-schedule transport, week after week.</p></div>
    </div>
  </div>
</section>

<section class="sec stone" id="areas">
  <div class="wrap">
    <div class="sec-head reveal"><span class="label">Coverage</span><h2>Areas we <b>cover</b></h2></div>
    <div class="areas">
      <div class="reveal">
        <div class="loc-grid">
          ${LOCS.map(l => `<a class="loc" href="${l.slug}/"><div><strong>Courier ${l.name}</strong><span>${l.miles === 'Home base' ? 'Home base' : l.miles + ' from base'}</span></div>${I.arrow}</a>`).join('\n          ')}
        </div>
        <div class="wider"><h3>Midlands, Yorkshire and the South</h3><p>Birmingham and the West Midlands, Nottingham and Leicester, Leeds, Sheffield and Yorkshire, London and the Home Counties, Bristol and the South West. Scheduled and same-day routes.</p></div>
      </div>
      <div class="uk-card reveal">
        <span class="label" style="color:#ff8a80">Full Coverage</span>
        <h3>UK Nationwide</h3>
        <p>Call us with your postcode and we'll give you a price on the spot. Same day if needed.</p>
        ${net()}
        <a class="btn btn-red" href="#quote">Check Your Route ${I.arrow}</a>
      </div>
    </div>
  </div>
</section>

<section class="sec" id="process">
  <div class="wrap">
    <div class="sec-head c reveal"><span class="label">How It Works</span><h2>Simple and <b>transparent</b></h2></div>
    <div class="steps reveal">
      <div class="step"><i>01</i><h3>Send a Quote Request</h3><p>Fill in the form or call us with your pickup and delivery details. Takes under two minutes.</p></div>
      <div class="step"><i>02</i><h3>We Confirm Price and Time</h3><p>A clear, fixed price and collection window within 15 to 30 minutes. No obligation.</p></div>
      <div class="step"><i>03</i><h3>Collected and Delivered</h3><p>Your driver arrives on time, handles with care, and sends proof of delivery on completion.</p></div>
    </div>
  </div>
</section>

<section class="sec stone" id="reviews">
  <div class="wrap">
    <div class="rev-top reveal"><div><span class="label">Client Reviews</span><h2>What our clients <b>say</b></h2></div><div class="score">${I.g.replace('<svg', '<svg width="30" height="30"')}<div><b>5.0</b></div><div>${stars}<span>14 Google reviews</span></div></div></div>
    <div class="rev-grid reveal">
      ${REVIEWS.map(revCard).join('\n      ')}
    </div>
  </div>
</section>

<section class="sec" id="faq">
  <div class="wrap">
    <div class="sec-head c reveal"><span class="label">Common Questions</span><h2>Frequently asked <b>questions</b></h2></div>
    <div class="reveal">${faqBlock(HOME_FAQ)}</div>
  </div>
</section>

${band}
${contact('', 'Let\'s make your next delivery <b>effortless.</b>')}
</main>
${footer(root)}`;
}

/* ---------- service page ---------- */
function servicePage(s) {
  const root = '../', path = s.slug + '/';
  const others = SERVICES.filter(x => x !== s);
  const schema = [{ '@context': 'https://schema.org', '@type': 'Service', name: strip(s.h1), serviceType: s.nav, description: s.meta, areaServed: 'United Kingdom', provider: BIZ }, crumbSchema(s.nav, path), faqSchema(s.faq)];
  const r = REVIEWS[s.rev];
  return `${head({ title: s.title, meta: s.meta, path, root, schema })}
<body class="sub">
${nav(root)}
<main>
<div class="wrap crumbs"><a href="../">Home</a><span>/</span><a href="../#services">Services</a><span>/</span>${s.nav}</div>
<section class="hero">
  <div class="hero-panel">
    <div class="hero-net">${net()}</div>
    <div class="wrap hero-inner">
      <div class="hero-copy">
        <div class="pill fade d1"><span class="dot"></span>Liverpool-Based &middot; Nationwide UK</div>
        <h1 class="fade d2">${s.h1}</h1>
        <p class="hero-lede fade d3">${s.lede}</p>
        <div class="chips fade d4">${s.chips.map(c => `<span>${c}</span>`).join('')}</div>
        <div class="hero-cta fade d5" data-herocta><a class="btn btn-red" href="#quote">Get a Free Quote ${I.arrow}</a><a class="btn btn-ghost" data-tel href="#">${I.phone}<span data-telt>Call us</span></a></div>
      </div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="ben">
      ${s.ben.map(([t, d], k) => `<div class="reveal"><span class="ti">${[I.clock, I.van, I.pin, I.doc][k]}</span><h3>${t}</h3><p>${d}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="sec stone">
  <div class="wrap two">
    <div class="prose reveal"><span class="label">${s.nav}</span><h2>${s.h2}</h2>${s.p.map(p => `<p>${p}</p>`).join('')}</div>
    <img class="reveal" src="../${s.img}" alt="${esc(s.alt)}" loading="lazy" width="1000" height="667">
  </div>
</section>

<section class="sec">
  <div class="wrap jobs">
    <div class="reveal"><span class="label">Typical Work</span><h2 class="h3s">${s.jobsH}</h2><ul>${s.jobs.map(j => `<li>${I.tick}${j}</li>`).join('')}</ul></div>
    <div class="quote-card reveal">${stars}<p>${r.t}</p><strong>${r.n}</strong><span>Google Review</span></div>
  </div>
</section>

<section class="sec stone">
  <div class="wrap">
    <div class="sec-head reveal"><span class="label">Where We Run It</span><h2>${s.nav} across the <b>North West</b></h2></div>
    <div class="links reveal">${LOCS.map(l => `<a href="../${l.slug}/">${I.pin}Courier ${l.name}</a>`).join('')}</div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head c reveal"><span class="label">Common Questions</span><h2>${s.nav}: your <b>questions</b></h2></div>
    <div class="reveal">${faqBlock(s.faq)}</div>
  </div>
</section>

<section class="sec stone">
  <div class="wrap">
    <div class="sec-head reveal"><span class="label">More Services</span><h2>Other ways we <b>help</b></h2></div>
    <div class="links reveal">${others.map(o => `<a href="../${o.slug}/">${o.nav} ${I.arrow}</a>`).join('')}</div>
  </div>
</section>

<div style="height:88px"></div>
${band}
${contact('-' + s.slug, `Get a price for <b>${s.nav.toLowerCase()}</b>`)}
</main>
${footer(root)}`;
}

/* ---------- location page ---------- */
function locPage(l) {
  const root = '../', path = l.slug + '/';
  const near = LOCS.filter(x => x !== l);
  const schema = [{ '@context': 'https://schema.org', '@type': 'Service', name: `Courier services in ${l.name}`, serviceType: 'Courier service', description: l.meta, areaServed: { '@type': 'Place', name: l.name }, provider: BIZ }, crumbSchema(`Courier ${l.name}`, path), faqSchema(l.faq)];
  const home = l.name === 'Liverpool';
  return `${head({ title: l.title, meta: l.meta, path, root, schema })}
<body class="sub">
${nav(root)}
<main>
<div class="wrap crumbs"><a href="../">Home</a><span>/</span><a href="../#areas">Areas</a><span>/</span>Courier ${l.name}</div>
<section class="hero">
  <div class="hero-panel">
    <div class="hero-net">${net()}</div>
    <div class="wrap hero-inner">
      <div class="hero-copy">
        <div class="pill fade d1"><span class="dot"></span>${home ? 'Home Base &middot; Liverpool' : l.miles + ' from Liverpool'}</div>
        <h1 class="fade d2">Courier Services in <b>${l.name}</b></h1>
        <p class="hero-lede fade d3">${l.lede}</p>
        <div class="chips fade d4"><span>Same day collections</span><span>GPS tracked</span><span>Insured to £100,000</span></div>
        <div class="hero-cta fade d5" data-herocta><a class="btn btn-red" href="#quote">Get a Free Quote ${I.arrow}</a><a class="btn btn-ghost" data-tel href="#">${I.phone}<span data-telt>Call us</span></a></div>
      </div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap two">
    <div class="prose reveal"><span class="label">Courier ${l.name}</span><h2>${l.h2}</h2>${l.p.map(p => `<p>${p}</p>`).join('')}</div>
    <div class="route-card reveal">
      <span class="label">${home ? 'Where we run from' : 'The route'}</span>
      <div class="rline"><b>Liverpool</b><i></i><b>${home ? 'UK' : l.name}</b></div>
      <dl><dt>Distance</dt><dd>${home ? 'Based in the city centre' : l.miles + ' from our base'}</dd><dt>Main roads</dt><dd>${l.road}</dd><dt>Coverage</dt><dd>Daily, same day available</dd><dt>Reply time</dt><dd>15 to 30 minutes</dd></dl>
    </div>
  </div>
</section>

<section class="sec stone">
  <div class="wrap">
    <div class="sec-head reveal"><span class="label">Services in ${l.name}</span><h2>What we run in <b>${l.name}</b></h2></div>
    <div class="svc-grid">
      ${SERVICES.map(s => `<a class="svc reveal" href="../${s.slug}/"><img src="../${s.img}" alt="${esc(s.alt)}" loading="lazy" width="1000" height="667"><div class="svc-b"><h3>${s.nav}</h3><p>${s.card}</p><span class="more">View service ${I.arrow}</span></div></a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap jobs">
    <div class="reveal"><span class="label">Where We Collect</span><h2 class="h3s">Collections and deliveries across ${l.name}</h2><ul>${l.places.map(j => `<li>${I.pin}${j}</li>`).join('')}</ul></div>
    <div class="reveal"><span class="label">Common Questions</span><h2 class="h3s">Courier ${l.name}: your questions</h2>${faqBlock(l.faq)}</div>
  </div>
</section>

<section class="sec stone">
  <div class="wrap">
    <div class="sec-head reveal"><span class="label">Nearby</span><h2>Other areas we <b>cover</b></h2></div>
    <div class="links reveal">${near.map(o => `<a href="../${o.slug}/">${I.pin}Courier ${o.name}</a>`).join('')}</div>
  </div>
</section>

<div style="height:88px"></div>
${band}
${contact('-' + l.slug, `Get a courier price in <b>${l.name}</b>`)}
</main>
${footer(root)}`;
}

/* ---------- write ---------- */
const w = (p, s) => { mkdirSync(dirname(join(OUT, p)), { recursive: true }); writeFileSync(join(OUT, p), s); };
w('index.html', home());
SERVICES.forEach(s => w(s.slug + '/index.html', servicePage(s)));
LOCS.forEach(l => w(l.slug + '/index.html', locPage(l)));
console.log('built', 1 + SERVICES.length + LOCS.length, 'pages');
