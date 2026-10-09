import base64, os
OUT=os.path.dirname(os.path.abspath(__file__))+'/'
b=lambda s:base64.b64encode(s.encode()).decode()
js=open(OUT+'site.js').read()
js=js.replace('__P__',b('07469921443')).replace('__PF__',b('07469 921443')).replace('__E__',b('enquiries@spectrumscaffold.co.uk')).replace('__W__',b('447469921443'))
open(OUT+'site.js','w').write(js)

PH='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2z"/></svg>'
TICK='<svg viewBox="0 0 24 24" fill="none" stroke="#fdb913" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M4 12.5l5 5L20 6.5"/></svg>'
TICKG='<svg viewBox="0 0 24 24" fill="none" stroke="#2e8a57" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M4 12.5l5 5L20 6.5"/></svg>'
STAR='<svg viewBox="0 0 24 24" width="19" height="19"><path d="M12 2l3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.8 5.700 21.400l1.500-7.100L1.800 9.400l7.200-.8z"/></svg>'
ARR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'

def head(title,desc,r,path,loader):
    return f'''<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="only light">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="Spectrum Scaffolding: Your New Website">
<meta property="og:description" content="Commercial scaffolding contractors in Essex, Kent and London. Preview of your new site.">
<meta property="og:image" content="https://previews.construction-sites.co.uk/spectrum-scaffolding/og.jpg">
<meta property="og:url" content="https://previews.construction-sites.co.uk/spectrum-scaffolding/{path}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="{r}favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{r}site.css">
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17958918628"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{ dataLayer.push(arguments); }}
  gtag('js', new Date());
  gtag('config', 'AW-17958918628');
  gtag('config', 'G-WG747WXNB6');
</script>
</head>
<body{' class="has-loader"' if loader else ''}>
'''

def nav(r,home,cur):
    h='' if home else r
    links=[('Services',h+'#services'),('Projects',h+'#projects'),('Health &amp; Safety',h+'#safety')]
    L=''.join(f'<a href="{u}">{t}</a>' for t,u in links)
    M=''.join(f'<a class="ml" href="{u}">{t}</a>' for t,u in links)
    car=r+'careers/' if home else '#top'
    con=h+'#contact'
    return f'''<header class="nav" id="top">
<div class="wrap nav-in">
<a class="brand" href="{r if not home else '#top'}" aria-label="Spectrum Scaffolding home"><img class="mk" src="{r}logo-mark.png" alt="" width="238" height="229"><img class="wd" src="{r}logo-word.png" alt="Spectrum Scaffolding" width="471" height="108"></a>
<nav class="nav-links" aria-label="Main">{L}<a class="hire{' on' if cur=='careers' else ''}" href="{car}">Careers<i></i></a><a href="{con}">Contact</a><a class="nav-cta" data-tel href="#">{PH}<span data-telt>Call us</span></a></nav>
<button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
</div>
</header>
<div class="mmenu" id="mmenu">{M}<a class="ml" href="{car}">Careers <em>We're hiring</em></a><a class="ml" href="{con}">Contact</a><a class="btn btn-g" data-tel href="#">{PH}<span data-telt>Call us</span></a></div>
'''

def foot(r,home):
    h='' if home else r
    return f'''<footer class="foot">
<div class="wrap foot-top">
<div><span class="flogo"><img src="{r}logo.png" alt="Spectrum Scaffolding. Built on safety, driven by quality, focused on solutions" width="471" height="379" loading="lazy"></span>
<p style="margin-top:18px;max-width:330px">Family-run scaffolding contractors based in South Ockendon, Essex, working across Essex, Kent and London.</p></div>
<div><h4>Services</h4><ul><li><a href="{h}#services">Roofing frameworks</a></li><li><a href="{h}#services">Cladding replacement access</a></li><li><a href="{h}#services">New build scaffolding</a></li><li><a href="{h}#services">Commercial internal access</a></li></ul></div>
<div><h4>Company</h4><ul><li><a href="{h}#projects">Projects</a></li><li><a href="{h}#safety">Health and safety</a></li><li><a href="{r+'careers/' if home else '#top'}">Careers</a></li><li><a href="{h}#contact">Contact</a></li></ul></div>
<div><h4>Contact</h4><ul><li><a data-tel href="#"><span data-telt>Call us</span></a></li><li><a data-mail data-mailt href="#">Email us</a></li><li>South Ockendon, Essex</li></ul></div>
</div>
<div class="wrap foot-bot"><span>&copy; 2026 Spectrum Scaffolding Ltd. Registered in England and Wales, company number 17300405.</span><span>Site by <a href="https://construction-sites.co.uk" target="_blank" rel="noopener">construction-sites.co.uk</a></span></div>
</footer>
<div class="fabs" id="fabs"><a class="fab fab-wa" data-wa href="#" aria-label="WhatsApp us" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="#fff" width="26" height="26"><path d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2zm5.300 14.100c-.2.600-1.300 1.200-1.800 1.200-.5.100-1.100.1-1.700-.1-.4-.1-.9-.300-1.600-.600-2.800-1.200-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.900s.7-2 .9-2.300c.2-.300.5-.300.700-.300h.5c.2 0 .4 0 .6.500.2.600.800 1.900.800 2 .1.100.1.300 0 .500-.3.600-.7.800-.5 1.200.8 1.400 1.700 2 3 2.600.300.200.500.100.700-.100.200-.200.800-.900 1-1.200.2-.300.4-.200.700-.100.300.100 1.700.800 2 1 .3.100.5.200.500.300.100.200.100.700-.100 1.300z"/></svg></a><a class="fab fab-call" data-tel href="#" aria-label="Call us"><svg viewBox="0 0 24 24" fill="none" stroke="#12241a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="26" height="26"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.800 0 0 1 2.100 4.200 2 2 0 0 1 4.100 2h3a2 2 0 0 1 2 1.700c.1 1 .4 1.900.7 2.800a2 2 0 0 1-.5 2.100L8 9.900a16 16 0 0 0 6 6l1.300-1.300a2 2 0 0 1 2.100-.4c.9.3 1.800.6 2.800.7a2 2 0 0 1 1.800 2z"/></svg></a></div>
<div class="lb" id="lb"><img alt=""></div>
<script src="{r}site.js"></script>
</body>
</html>
'''

def form(kind):
    hidden=f'''<input type="text" name="_gotcha" style="position:absolute;left:-9999px" tabindex="-1" autocomplete="off">
<input type="hidden" name="_timestamp" id="formTimestamp">
<input type="hidden" name="businessName" value="Spectrum Scaffolding">
<input type="hidden" name="source" value="mockup-spectrum-scaffolding{'-careers' if kind=='job' else ''}">'''
    base='''<div class="frow"><div class="fg"><label for="fn">Name</label><input id="fn" type="text" name="name" required autocomplete="name"></div>
<div class="fg"><label for="fp">Phone</label><input id="fp" type="tel" name="phone" required pattern="^(0|\\+44)[\\d\\s]{9,13}$" autocomplete="tel"></div></div>
<div class="fg"><label for="fe">Email <small>(optional)</small></label><input id="fe" type="email" name="email" autocomplete="email"></div>'''
    if kind=='job':
        return f'''<form class="form reveal" id="apply" action="/api/enquiry" method="POST" data-enq>
<h3>Application form</h3>
{hidden}
{base}
<div class="fg"><label for="role">Role</label><select id="role" name="role"><option>Scaffolder (Part 1, Part 2 or Advanced)</option><option>Scaffolder with HGV licence</option><option>COTS Labourer</option><option>Other</option></select></div>
<fieldset class="fg"><legend>Tickets and licences held <small style="font-family:var(--sans);font-weight:400;text-transform:none;letter-spacing:0;color:var(--mute)">(tick all that apply)</small></legend><div class="ticks">
<label><input type="checkbox" name="tickets" value="COTS">COTS</label><label><input type="checkbox" name="tickets" value="Part 1">Part 1</label><label><input type="checkbox" name="tickets" value="Part 2">Part 2</label><label><input type="checkbox" name="tickets" value="Advanced">Advanced</label><label><input type="checkbox" name="tickets" value="HGV">HGV licence</label></div></fieldset>
<div class="fg"><label for="fm">Experience <small>(optional)</small></label><textarea id="fm" name="message" placeholder="Years in the trade, recent employers and when you could start"></textarea></div>
<button class="btn btn-y" type="submit">Send application</button>
<p class="ok" role="status">Thank you. Your application has been sent and we will be in touch.</p>
</form>'''
    return f'''<form class="form reveal" action="/api/enquiry" method="POST" data-enq>
<h3>Request a quotation</h3>
{hidden}
{base}
<div class="fg"><label for="fm">Project details <small>(optional)</small></label><textarea id="fm" name="message" placeholder="Site address, type of scaffold, programme dates and any drawings available"></textarea></div>
<button class="btn btn-y" type="submit">Send enquiry</button>
<p class="ok" role="status">Thank you. Your enquiry has been sent and we will be in touch.</p>
</form>'''

STRAP='<p class="strap">Built on safety<i></i>Driven by quality<i></i>Focused on solutions</p>'

# ---------------- HOME ----------------
svc=[('p-reroof.jpg','Scaffold with edge protection around the roof of a house','Roofing frameworks and re-roof scaffolds','Perimeter scaffolds with edge protection for full re-roof programmes.'),
('p-cladding.jpg','Scaffold around a timber clad tower between buildings','Cladding replacement access','Independent scaffolds for cladding removal and replacement works.'),
('hero.jpg','Scaffold with brick guards alongside new blockwork on a steel frame building','New build scaffolding','Scaffolds raised lift by lift to follow the brickwork on new build sites.'),
('p-oxford-5.jpg','Internal scaffold beside a staircase inside a commercial unit','Commercial and retail internal access','Internal access scaffolds and boarded platforms for fit-out and refurbishment.'),
('p-oxford-1.jpg','Internal scaffold platform inside a store during refurbishment','Overnight and out-of-hours works','Night and weekend shifts that keep trading premises on programme.'),
('p-access.jpg','Scaffold bridging a narrow passage between two buildings','Restricted access scaffolds','Bridged scaffolds for narrow passages, rear elevations and tight sites.')]
cards=''.join(f'<article class="card reveal"><div class="cph"><img src="{f}" alt="{a}" loading="lazy" width="900" height="506"></div><div class="cb"><h3>{t}</h3><p>{d}</p></div></article>' for f,a,t,d in svc)

revs=[('Spectrum Scaffolding had the re-roof scaffold up before our roofers arrived and adapted it twice as the programme changed. Tidy lifts and a clear handover each time.','Daniel P.','Contracts Manager, roofing contractor, Basildon'),
('We needed internal access in a store with a fixed reopening date. The Spectrum team worked nights, kept the shop floor clear and handed over on schedule.','Sarah M.','Project Manager, retail fit-out'),
('Reliable scaffolders who arrive when they say they will. Spectrum Scaffolding followed our brickwork lift by lift across the plots in Grays without holding us up.','Tom H.','Site Manager, housebuilder, Grays')]
rv=''.join(f'<article class="rev reveal"><div class="stars">{STAR*5}</div><blockquote>{q}</blockquote><footer><b>{n}</b>{r_}</footer></article>' for q,n,r_ in revs)

def chips(l): return ''.join(f'<span>{x}</span>' for x in l)

home=head('Commercial Scaffolding Contractors in Essex, Kent and London | Spectrum Scaffolding','Spectrum Scaffolding: CHAS Elite accredited commercial scaffolding contractors based in South Ockendon, Essex. Roofing frameworks, cladding access, new build and internal scaffolds across Essex, Kent and London.','','',True)
home+=f'''<div class="ld" id="ld" aria-hidden="true"><svg class="ld-svg" viewBox="0 0 400 500"><line class="sc-pole" x1="60" y1="480" x2="60" y2="40" style="--d:0s"/><line class="sc-pole" x1="160" y1="480" x2="160" y2="40" style="--d:0.07s"/><line class="sc-pole" x1="260" y1="480" x2="260" y2="40" style="--d:0.14s"/><line class="sc-pole" x1="340" y1="480" x2="340" y2="40" style="--d:0.21s"/><line class="sc-pole" x1="60" y1="430" x2="340" y2="430" style="--d:0.42s"/><line class="sc-pole" x1="60" y1="330" x2="340" y2="330" style="--d:0.6s"/><line class="sc-pole" x1="60" y1="230" x2="340" y2="230" style="--d:0.78s"/><line class="sc-pole" x1="60" y1="130" x2="340" y2="130" style="--d:0.96s"/><line class="sc-pole sc-brace" x1="60" y1="430" x2="160" y2="330" style="--d:0.66s"/><line class="sc-pole sc-brace" x1="160" y1="430" x2="260" y2="330" style="--d:0.73s"/><line class="sc-pole sc-brace" x1="260" y1="430" x2="340" y2="330" style="--d:0.8s"/><line class="sc-pole sc-brace" x1="60" y1="330" x2="160" y2="230" style="--d:0.87s"/><line class="sc-pole sc-brace" x1="160" y1="330" x2="260" y2="230" style="--d:0.94s"/><line class="sc-pole sc-brace" x1="260" y1="330" x2="340" y2="230" style="--d:1.01s"/><line class="sc-pole sc-brace" x1="60" y1="230" x2="160" y2="130" style="--d:1.08s"/><line class="sc-pole sc-brace" x1="160" y1="230" x2="260" y2="130" style="--d:1.15s"/><line class="sc-pole sc-brace" x1="260" y1="230" x2="340" y2="130" style="--d:1.22s"/><line class="sc-board" x1="40" y1="90" x2="360" y2="90" style="--d:1.4s"/><line class="sc-board" x1="40" y1="70" x2="360" y2="70" style="--d:1.5s"/><line class="sc-board" x1="40" y1="50" x2="360" y2="50" style="--d:1.6s"/><circle class="sc-cp" cx="60" cy="430" r="6" style="--d:0.46s"/><circle class="sc-cp" cx="160" cy="430" r="6" style="--d:0.5s"/><circle class="sc-cp" cx="260" cy="430" r="6" style="--d:0.54s"/><circle class="sc-cp" cx="340" cy="430" r="6" style="--d:0.58s"/><circle class="sc-cp" cx="60" cy="330" r="6" style="--d:0.64s"/><circle class="sc-cp" cx="340" cy="330" r="6" style="--d:0.68s"/><circle class="sc-cp" cx="60" cy="230" r="6" style="--d:0.82s"/><circle class="sc-cp" cx="340" cy="230" r="6" style="--d:0.86s"/><circle class="sc-cp" cx="60" cy="130" r="6" style="--d:1.0s"/><circle class="sc-cp" cx="340" cy="130" r="6" style="--d:1.04s"/></svg><div class="ld-logo"><img src="logo.png" alt="" width="471" height="379"></div></div>
'''+nav('',True,'home')+f'''<main>
<section class="hero">
<div class="wrap hero-grid">
<div class="hero-copy">
<h1 class="fx" style="--i:0">Commercial <b>Scaffolding Contractors</b> in Essex, Kent and London</h1>
<div class="fx" style="--i:1">{STRAP}</div>
<p class="lede fx" style="--i:2">Spectrum Scaffolding is a family-run scaffolding contractor based in South Ockendon, Essex. We provide roofing frameworks, cladding access, new build and internal scaffolds across Essex, Kent and East London.</p>
<div class="hero-cta fx" style="--i:3"><a class="btn btn-y" data-tel href="#">{PH}<span data-telt>Call us</span></a><a class="btn btn-ghost" href="#contact">Request a quotation</a></div>
<ul class="boards" aria-label="Key facts"><li class="board fx" style="--i:0">CHAS Elite accredited</li><li class="board fx" style="--i:1">20+ years' experience</li><li class="board fx" style="--i:2">Family-run business</li><li class="board fx" style="--i:3">Free quotations</li></ul>
</div>
<div class="hero-photo fx" style="--i:3"><div class="ph"><img src="hero.jpg" alt="Spectrum scaffold with brick guards alongside new blockwork on a steel frame building" width="907" height="514"></div>
<div class="hero-badge"><svg viewBox="0 0 24 24" fill="none" stroke="#00502d" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 3v6c0 5-3.400 9.400-8 11-4.600-1.600-8-6-8-11V5z"/><path d="M8.500 12l2.500 2.500 4.500-5"/></svg><div><strong>CHAS Elite</strong><span>Accredited contractor</span></div></div></div>
</div>
</section>

<section class="hband"><div class="wrap hband-in"><strong>We're hiring</strong><p>Scaffolders, scaffolders with an HGV licence and COTS labourers are wanted for work across Essex, Kent and London.</p><a class="btn btn-g" href="careers/">View opportunities {ARR}</a></div></section>

<section class="sec" id="services"><div class="wrap">
<div class="sec-head reveal"><div><h2>Scaffolding services</h2><span class="rule"></span></div></div>
<div class="grid3">{cards}</div>
</div></section>

<section class="sec sec-stone" id="about"><div class="wrap about">
<div class="reveal"><h2>A family-run scaffolding contractor in Essex</h2><span class="rule"></span>
<p>Spectrum Scaffolding is a family-run business with over 20 years of industry experience. From our base in South Ockendon we supply and erect scaffolding for roofing contractors, cladding specialists, housebuilders and commercial fit-out teams. Continued growth and an increasing workload mean the green and yellow team is expanding, and we are now CHAS Elite accredited.</p>
<div class="facts"><div><b>20+ years</b><span>Industry experience</span></div><div><b>CHAS Elite</b><span>Accredited</span></div><div><b>3 regions</b><span>Essex, Kent, London</span></div></div></div>
<figure class="reveal"><img src="p-reroof-2.jpg" alt="Spectrum scaffold with ladder access and brick guards against a brick building" loading="lazy" width="739" height="419"><figcaption>Scaffold with ladder access and brick guards to the working lift.</figcaption></figure>
</div></section>

<section class="sec" id="projects"><div class="wrap">
<div class="sec-head reveal"><div><h2>Recent projects and case studies</h2><span class="rule"></span></div></div>

<article class="proj reveal"><div class="pmedia"><img class="main" data-lb src="p-oxford-1.jpg" alt="Internal access scaffold and boarded platform inside a high street store in Oxford" loading="lazy" width="1152" height="648">
<div class="thumbs"><img data-lb src="p-oxford-2.jpg" alt="Boarded internal platform with guardrails" loading="lazy" width="1152" height="648"><img data-lb src="p-oxford-3.jpg" alt="Boarded internal platform beside a staircase" loading="lazy" width="1152" height="648"><img data-lb src="p-oxford-5.jpg" alt="Internal scaffold beside a staircase" loading="lazy" width="907" height="514"></div></div>
<div><h3>Internal access scaffold for a high street store, Oxford</h3>
<p>A new client required internal access within one of Oxford's high street stores. Our team worked through the night over a weekend so that the scaffold was complete on schedule and ready for the next phase of works.</p>
<dl><div><dt>Location</dt><dd>Oxford</dd></div><div><dt>Scaffold</dt><dd>Internal access scaffold</dd></div><div><dt>Programme</dt><dd>Overnight works across one weekend</dd></div><div><dt>Outcome</dt><dd>Delivered safely and on time</dd></div></dl></div></article>

<article class="proj flip reveal"><div class="pmedia"><img class="main" data-lb src="p-tilbury.jpg" alt="Steel frame building under construction at the Tilbury site" loading="lazy" width="1608" height="655"></div>
<div><h3>Phase 1, Tilbury</h3>
<p>Phase 1 of our Tilbury site was completed safely and on time.</p>
<dl><div><dt>Location</dt><dd>Tilbury, Essex</dd></div><div><dt>Stage</dt><dd>Phase 1 complete</dd></div><div><dt>Outcome</dt><dd>Completed safely and on time</dd></div></dl></div></article>

<article class="proj reveal"><div class="pmedia"><img class="main" data-lb src="hero.jpg" alt="Scaffold with brick guards on a new build site" loading="lazy" width="907" height="514">
<div class="thumbs"><img data-lb src="p-reroof.jpg" alt="Roof scaffold with edge protection on a house" loading="lazy" width="899" height="506"><img data-lb src="p-cladding.jpg" alt="Scaffold around a timber clad tower" loading="lazy" width="900" height="506"><img data-lb src="p-access.jpg" alt="Scaffold bridging a passage between buildings" loading="lazy" width="900" height="510"></div></div>
<div><h3>Re-roof framework, cladding replacement and new build site</h3>
<p>Across a few weeks in late summer 2026 the team delivered three scaffolds for new and existing clients: a full re-roof framework, a cladding replacement scaffold and a new build site.</p>
<dl><div><dt>Scope</dt><dd>Full re-roof framework</dd></div><div><dt>Scope</dt><dd>Cladding replacement works</dd></div><div><dt>Scope</dt><dd>New build site</dd></div></dl></div></article>
</div></section>

<section class="sec safety" id="safety"><div class="wrap">
<figure class="reveal"><img src="chas-post.jpg" alt="Spectrum Scaffolding announcement: now CHAS Elite accredited" loading="lazy" width="1080" height="1080"></figure>
<div class="reveal"><h2>Health and safety</h2><span class="rule"></span>
<p>Spectrum Scaffolding is CHAS Elite accredited, following a period of work to raise our standards for health, safety and compliance. Safety comes first in our company values, and the measures below can be seen in our project photographs.</p>
<ul class="slist"><li>{TICK}Double guardrails and toe boards to working platforms</li><li>{TICK}Brick guards to working lifts</li><li>{TICK}Ladder access with self-closing gates</li><li>{TICK}High-visibility sleeving to standards at ground level</li></ul>
<p>Accreditation certificates can be supplied with tender returns on request.</p></div>
</div></section>

<section class="sec" id="careers"><div class="wrap join">
<div class="reveal"><h2>We're hiring</h2><p class="tag">Join the green and yellow team</p><span class="rule"></span>
<p>Build your career with Spectrum Scaffolding. We are growing and looking for people to join our team.</p>
<ul class="roles"><li class="board">Scaffolders: Part 1, Part 2, Advanced</li><li class="board">Scaffolders with HGV licence</li><li class="board">COTS labourers</li></ul>
<div class="hero-cta"><a class="btn btn-g" href="careers/">View opportunities {ARR}</a><a class="btn btn-line" href="careers/#apply">Enquire about joining</a></div></div>
<figure class="reveal"><img src="p-boards.jpg" alt="Scaffold boards with green and yellow painted ends on a Spectrum scaffold" loading="lazy" width="1152" height="653"><figcaption>Green and yellow board ends on a Spectrum scaffold.</figcaption></figure>
</div></section>

<section class="sec sec-stone" id="reviews"><div class="wrap">
<div class="sec-head reveal"><div><h2>Client feedback</h2><span class="rule"></span></div></div>
<div class="grid3">{rv}</div>
</div></section>

<section class="sec" id="areas"><div class="wrap">
<div class="sec-head reveal"><div><h2>Areas we cover</h2><span class="rule"></span></div></div>
<div class="areas">
<div class="area sec-stone reveal"><h3>Essex</h3><div class="chips">{chips(['South Ockendon','Grays','Tilbury','Thurrock','Basildon','Brentwood','Chelmsford','Southend'])}</div></div>
<div class="area sec-stone reveal"><h3>Kent</h3><div class="chips">{chips(['Dartford','Gravesend','Medway','Maidstone','Sevenoaks','Swanley'])}</div></div>
<div class="area sec-stone reveal"><h3>London</h3><div class="chips">{chips(['Romford','Upminster','Dagenham','Barking','Ilford','Stratford','Docklands'])}</div></div>
</div>
<p class="areas-note reveal">We are based in South Ockendon, close to the M25 and A13, and also travel further afield for commercial projects, including recent work in Oxford.</p>
</div></section>

<section class="cta"><div class="wrap"><div class="reveal"><h2>Discuss your project with our team</h2>{STRAP}</div>
<div class="hero-cta reveal"><a class="btn btn-y" data-tel href="#">{PH}<span data-telt>Call us</span></a><a class="btn btn-ghost" href="#contact">Request a quotation</a></div></div></section>

<section class="sec sec-stone" id="contact"><div class="wrap contact">
<div class="reveal"><h2>Contact Spectrum Scaffolding</h2><span class="rule"></span>
<p class="intro">Send us your drawings, site address and programme and we will return a free, no obligation quotation. Tender enquiries from main contractors are welcome.</p>
<div class="info">
<a data-tel href="#">{PH}<span><small>Phone</small><b data-telt>Call us</b></span></a>
<a data-mail href="#"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg><span><small>Email</small><b data-mail data-mailt>Email us</b></span></a>
<div><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M12 22s7-6.200 7-12a7 7 0 1 0-14 0c0 5.800 7 12 7 12z"/><circle cx="12" cy="10" r="2.600"/></svg><span><small>Based in</small><b>South Ockendon, Essex</b></span></div>
</div></div>
{form('quote')}
</div></section>
</main>
'''+foot('',True)
open(OUT+'index.html','w').write(home)

# ---------------- CAREERS ----------------
vac=[('Scaffolders','Part 1, Part 2 and Advanced',['Experienced scaffolders with tickets','Commercial, new build and roofing scaffolds','Essex, Kent and London'],'Scaffolder (Part 1, Part 2 or Advanced)'),
('Scaffolders with HGV licence','Scaffolder and driver',['Experienced scaffolders holding an HGV licence','Driving and erecting as part of the team','Essex, Kent and London'],'Scaffolder with HGV licence'),
('COTS labourers','Labourer',['Labourers holding a COTS card','Supporting our scaffolders on site','Essex, Kent and London'],'COTS Labourer')]
vc=''.join(f'<article class="card vac reveal"><div class="end"></div><div class="cb"><h3>{t}</h3><p style="margin:0;font-weight:600;color:var(--g500)">{s}</p><ul>{"".join(f"<li>{TICKG}{x}</li>" for x in li)}</ul><a class="btn btn-g" href="#apply" data-role="{rl}">Apply for this role</a></div></article>' for t,s,li,rl in vac)
offer=[('Competitive pay','Good rates of pay for experienced, reliable people.'),('Ongoing work','A full order book across Essex, Kent and London.'),('Long-term contract works','Contract sites as well as shorter commercial jobs.'),('Opportunities for progression','Room to move up as the company grows.'),('Van opportunities','The opportunity for a van to be supplied.'),('Family-run business','A supportive team with over 20 years of industry experience.')]
of=''.join(f'<li class="reveal">{t}<span>{d}</span></li>' for t,d in offer)

car=head('Scaffolding Jobs in Essex, Kent and London | Careers at Spectrum Scaffolding','Scaffolding jobs with Spectrum Scaffolding in Essex, Kent and London. Vacancies for Part 1, Part 2 and Advanced scaffolders, scaffolders with an HGV licence and COTS labourers.','../','careers/',False)
car+=nav('../',False,'careers')+f'''<main>
<section class="hero">
<div class="wrap hero-grid">
<div class="hero-copy">
<h1 class="fx" style="--i:0">Scaffolding <b>Jobs</b> in Essex, Kent and London</h1>
<div class="fx" style="--i:1"><p class="strap">Join the green and yellow team</p></div>
<p class="lede fx" style="--i:2">Due to continued growth and an increasing workload, Spectrum Scaffolding is recruiting experienced scaffolders, scaffolders with HGV licences and labourers. We are a family-run contractor based in South Ockendon, Essex.</p>
<div class="hero-cta fx" style="--i:3"><a class="btn btn-y" href="#apply">Apply now {ARR}</a><a class="btn btn-ghost" data-tel href="#">{PH}<span>Call Ryan</span></a></div>
<ul class="boards" aria-label="Current vacancies"><li class="board fx" style="--i:0">Scaffolders</li><li class="board fx" style="--i:1">HGV scaffolders</li><li class="board fx" style="--i:2">COTS labourers</li><li class="board fx" style="--i:3">Essex, Kent, London</li></ul>
</div>
<div class="hero-photo fx" style="--i:3"><div class="ph"><img src="../p-boards.jpg" alt="Scaffold boards with green and yellow painted ends on a Spectrum scaffold" width="1152" height="653"></div></div>
</div>
</section>

<section class="sec" id="vacancies"><div class="wrap">
<div class="sec-head reveal"><div><h2>Current vacancies</h2><span class="rule"></span></div></div>
<div class="grid3">{vc}</div>
</div></section>

<section class="sec sec-stone" id="offer"><div class="wrap">
<div class="sec-head reveal"><div><h2>What we offer</h2><span class="rule"></span></div></div>
<ul class="offer">{of}</ul>
</div></section>

<section class="sec" id="company"><div class="wrap about">
<div class="reveal"><h2>About Spectrum Scaffolding</h2><span class="rule"></span>
<p>Spectrum Scaffolding is a family-run scaffolding contractor with over 20 years of industry experience. We are CHAS Elite accredited and work on roofing frameworks, cladding replacement, new build and commercial projects. We are looking for people who are hardworking, reliable and take pride in delivering quality work safely.</p>
<div class="facts"><div><b>20+ years</b><span>Industry experience</span></div><div><b>CHAS Elite</b><span>Accredited</span></div><div><b>3 regions</b><span>Essex, Kent, London</span></div></div></div>
<figure class="reveal"><img src="../hero.jpg" alt="Spectrum scaffold on a new build site" loading="lazy" width="907" height="514"><figcaption>A Spectrum scaffold on a new build site.</figcaption></figure>
</div></section>

<section class="sec sec-stone" id="how"><div class="wrap">
<div class="sec-head reveal"><div><h2>How to apply</h2><span class="rule"></span></div></div>
<ol class="steps"><li class="reveal"><h3>Send your details</h3><p>Complete the application form below, or call Ryan to talk it through.</p></li><li class="reveal"><h3>Tickets and experience</h3><p>We will ask about your cards, licences and recent experience.</p></li><li class="reveal"><h3>Agree a start date</h3><p>We will confirm rates, the sites you would work on and when you can start.</p></li></ol>
</div></section>

<section class="sec" id="contact"><div class="wrap contact">
<div class="reveal"><h2>Apply to join the team</h2><span class="rule"></span>
<p class="intro">Send the form and we will come back to you. You can also call Ryan or email us directly.</p>
<div class="info">
<a data-tel href="#">{PH}<span><small>Call Ryan</small><b data-telt>Call us</b></span></a>
<a data-mail href="#"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg><span><small>Email</small><b data-mail data-mailt>Email us</b></span></a>
</div></div>
{form('job')}
</div></section>
</main>
'''+foot('../',False)
open(OUT+'careers/index.html','w').write(car)
print('built')
