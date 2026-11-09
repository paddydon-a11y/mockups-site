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

  // call FAB appears once the hero buttons have scrolled away
  var fab = document.querySelector('.fab-call'), heroCta = document.querySelector('.hero-cta');
  if (fab && heroCta && 'IntersectionObserver' in window) {
    new IntersectionObserver(function(en){ fab.classList.toggle('show', !en[0].isIntersecting && en[0].boundingClientRect.top < 0); }).observe(heroCta);
  } else if (fab) { fab.classList.add('show'); }

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

  // the scaffold going up behind the poster word
  var lift = document.querySelector('.lift');
  if (lift) {
    var w = lift.clientWidth, h = lift.clientHeight;
    var bays = w < 560 ? 4 : (w < 900 ? 5 : 8);
    var t = 6; // tube thickness
    var levels = [h - t, Math.round(h * 0.56), 20];
    var html = '';
    var xs = [];
    for (var i = 0; i <= bays; i++) xs.push(Math.round(i * (w - t) / bays));
    xs.forEach(function(x, i){ html += '<i class="std" style="left:' + x + 'px;animation-delay:' + (0.12 + i * 0.07).toFixed(2) + 's"></i>'; });
    levels.forEach(function(y, li){
      var d = 0.5 + li * 0.2;
      html += '<i class="led" style="top:' + y + 'px;animation-delay:' + d.toFixed(2) + 's"></i>';
      xs.forEach(function(x, i){ html += '<i class="clp" style="left:' + x + 'px;top:' + y + 'px;animation-delay:' + (d + 0.12 + i * 0.04).toFixed(2) + 's"></i>'; });
      if (li > 0) {
        for (var b = 0; b < bays; b++) {
          var bx = xs[b] + t + 2, bw = xs[b + 1] - xs[b] - t - 4;
          html += '<i class="brd" style="left:' + bx + 'px;width:' + bw + 'px;top:' + (y - 9) + 'px;animation-delay:' + (d + 0.3 + b * 0.05).toFixed(2) + 's"></i>';
          html += '<i class="toe" style="left:' + bx + 'px;width:' + bw + 'px;top:' + (y - 13) + 'px;animation-delay:' + (d + 0.45 + b * 0.05).toFixed(2) + 's"></i>';
        }
      }
    });
    // facade brace across the last bay, both lifts
    var bx0 = xs[bays - 1] + 3, bx1 = xs[bays] + 3, y0 = h - t, y1 = 20;
    var len = Math.hypot(bx1 - bx0, y1 - y0), ang = Math.atan2(y1 - y0, bx1 - bx0) * 180 / Math.PI;
    html += '<i class="brace" style="left:' + bx0 + 'px;top:' + y0 + 'px;width:' + len + 'px;transform:rotate(' + ang + 'deg);animation-delay:1.35s"></i>';
    lift.innerHTML = html;
  }
})();
