(function(){
  var P = atob('MDc1NTI3MjEwMjQ=');
  var Pf = atob('MDc1NTIgNzIxIDAyNA==');
  var E = atob('aW5mb0BlbHNjYWZmb2xkaW5nLmNvLnVr');
  var W = atob('NDQ3NTUyNzIxMDI0');
  var waHref = 'https://wa.me/' + W + '?text=' + encodeURIComponent('Hi, seen your website - ');
  document.querySelectorAll('[data-call]').forEach(function(a){ a.href = 'tel:' + P; });
  document.querySelectorAll('[data-wa]').forEach(function(a){ a.href = waHref; a.target = '_blank'; a.rel = 'noopener'; });
  document.querySelectorAll('[data-mail]').forEach(function(a){ a.href = 'mailto:' + E; });
  document.querySelectorAll('[data-phone-text]').forEach(function(el){ el.textContent = Pf; });
  document.querySelectorAll('[data-mail-text]').forEach(function(el){ el.textContent = E; });

  // nav
  var tgl = document.querySelector('.nav-toggle'), links = document.querySelector('.nav-links');
  function setMenu(open){
    links.classList.toggle('is-open', open);
    tgl.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.classList.toggle('no-scroll', open);
    document.body.classList.toggle('no-scroll', open);
  }
  if (tgl) {
    tgl.addEventListener('click', function(){ setMenu(!links.classList.contains('is-open')); });
    links.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ setMenu(false); }); });
  }

  // FABs appear once the hero buttons have scrolled away
  var fabs = document.querySelectorAll('.fab'), heroCta = document.querySelector('.hero-cta');
  if (fabs.length && heroCta && 'IntersectionObserver' in window) {
    new IntersectionObserver(function(en){ var past = !en[0].isIntersecting && en[0].boundingClientRect.top < 0; fabs.forEach(function(f){ f.classList.toggle('show', past); }); }).observe(heroCta);
  } else { fabs.forEach(function(f){ f.classList.add('show'); }); }

  // reveals
  var rv = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, {rootMargin:'0px 0px -8% 0px'});
    rv.forEach(function(el){ io.observe(el); });
  } else { rv.forEach(function(el){ el.classList.add('in'); }); }

  // forms
  document.querySelectorAll('form.enq').forEach(function(f){
    var ts = f.querySelector('[name="_timestamp"]'); if (ts) ts.value = Date.now();
    var ph = f.querySelector('input[name="phone"]');
    if (ph) ph.addEventListener('input', function(){
      var v = ph.value.replace(/\s+/g,'');
      ph.setCustomValidity(/^(0|\+44)\d{9,11}$/.test(v) || v === '' ? '' : 'Please enter a UK phone number');
    });
  });

  // A: page strip, the clamp on the tube follows the swipe
  var strip = document.querySelector('.pstrip'), clamp = document.querySelector('.ptube i');
  if (strip && clamp) {
    var upd = function(){
      var max = strip.scrollWidth - strip.clientWidth, tube = clamp.parentNode.clientWidth;
      var ratio = max > 0 ? strip.scrollLeft / max : 0;
      clamp.style.width = Math.max(18, tube * strip.clientWidth / strip.scrollWidth) + 'px';
      clamp.style.transform = 'translateX(' + (ratio * (tube - clamp.offsetWidth)).toFixed(1) + 'px)';
    };
    strip.addEventListener('scroll', upd, {passive:true}); addEventListener('resize', upd); upd();
    // one gentle nudge after the cards land, to show the row swipes
    if (strip.scrollWidth > strip.clientWidth + 10 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTimeout(function(){
        if (strip.scrollLeft > 0) return;
        strip.style.scrollSnapType = 'none';
        strip.scrollTo({left: 70, behavior: 'smooth'});
        setTimeout(function(){ strip.scrollTo({left: 0, behavior: 'smooth'}); setTimeout(function(){ strip.style.scrollSnapType = ''; }, 500); }, 650);
      }, 2300);
    }
  }

  // lightbox
  var lb = document.querySelector('.lb');
  if (lb) {
    var lbImg = lb.querySelector('img'), lbCap = lb.querySelector('p');
    document.querySelectorAll('[data-lb] .g-img').forEach(function(g){
      g.addEventListener('click', function(){
        var im = g.querySelector('img'), cap = g.parentNode.querySelector('figcaption');
        lbImg.src = im.src; lbImg.alt = im.alt; lbCap.textContent = cap ? cap.textContent : '';
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', function(e){ if (e.target === lb || e.target.closest('button')) lb.classList.remove('open'); });
    addEventListener('keydown', function(e){ if (e.key === 'Escape') lb.classList.remove('open'); });
  }

  // B: counters count up as they enter
  var counts = document.querySelectorAll('[data-count]');
  if (counts.length) {
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var run = function(el){
      var to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = null, dur = 1400;
      if (reduce) { el.innerHTML = to + suf; return; }
      var step = function(t){ if (!t0) t0 = t; var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        el.innerHTML = Math.round(to * e) + (p === 1 ? suf : ''); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      var co = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { run(e.target); co.unobserve(e.target); } }); }, {threshold:.6});
      counts.forEach(function(c){ c.textContent = '0'; co.observe(c); });
    } else counts.forEach(run);
  }

  // B: pinned safety steps, each step puts another lift on the scaffold
  var pin = document.getElementById('pin');
  if (pin && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var steps = pin.querySelectorAll('.pstep'), lifts = pin.querySelectorAll('.r-lift'), cnt = pin.querySelector('.rig-count span'), bar = pin.querySelector('.pin-bar i'), last = -1;
    var tick = function(){
      var r = pin.getBoundingClientRect(), total = pin.offsetHeight - innerHeight * 0.75;
      var prog = Math.min(1, Math.max(0, (-r.top + innerHeight * 0.15) / total));
      var i = Math.min(steps.length - 1, Math.floor(prog * steps.length));
      bar.style.transform = 'scaleX(' + prog.toFixed(3) + ')';
      if (i !== last) {
        steps.forEach(function(s, k){ s.classList.toggle('on', k === i); });
        lifts.forEach(function(l, k){ l.classList.toggle('up', k <= i); });
        cnt.textContent = i + 1; last = i;
      }
    };
    addEventListener('scroll', tick, {passive:true}); addEventListener('resize', tick); tick();
  } else if (pin) { pin.querySelectorAll('.r-lift').forEach(function(l){ l.classList.add('up'); }); }
})();
