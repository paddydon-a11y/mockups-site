(function(){
  var C = window.LABOURLOK || {};
  var $ = function(s, r){ return (r||document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };

  /* Mobile: help button appears once the hero has been scrolled past (desktop: always visible) */
  (function(){ var fab = $('.help-fab'), hero = $('.hero, .page-hero'); if (!fab) return;
    var upd = function(){ var past = !hero || window.scrollY > hero.offsetHeight - 120 || window.innerWidth > 700; fab.classList.toggle('show', past); };
    window.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd(); })();

  /* Mobile nav */
  var burger = $('.burger'), panel = $('.mpanel');
  if (burger && panel) {
    burger.addEventListener('click', function(){
      var open = panel.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
      burger.innerHTML = open ? ICON.x : ICON.menu;
    });
  }
  /* Close desktop dropdowns on outside click */
  document.addEventListener('click', function(e){
    $$('.nav details[open]').forEach(function(d){ if (!d.contains(e.target)) d.removeAttribute('open'); });
  });

  /* Reveal on scroll */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(es){ es.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(function(el){ io.observe(el); });
  } else { $$('.reveal').forEach(function(el){ el.classList.add('in'); }); }

  /* Tabs (success stories) */
  $$('[data-tabs]').forEach(function(root){
    var btns = $$('[role=tab]', root), panes = $$('[role=tabpanel]', root);
    btns.forEach(function(b){ b.addEventListener('click', function(){
      btns.forEach(function(x){ x.setAttribute('aria-selected', x===b ? 'true' : 'false'); });
      panes.forEach(function(p){ p.hidden = p.id !== b.getAttribute('aria-controls'); });
    }); });
  });

  /* Careers table filter */
  var cf = $('#careerFilter');
  if (cf) {
    var rows = $$('#careersTable tbody tr'), count = $('#careerCount');
    var update = function(){
      var q = cf.value.trim().toLowerCase(), n = 0;
      rows.forEach(function(r){ var hit = !q || r.textContent.toLowerCase().indexOf(q) > -1; r.hidden = !hit; if (hit) n++; });
      if (count) count.textContent = n + ' of ' + rows.length + ' pathways';
    };
    cf.addEventListener('input', update); update();
  }

  /* Contact page: enquiry type preselect from ?type= and hash */
  var typeRadios = $$('input[name=enquiry_type]');
  if (typeRadios.length) {
    var want = new URLSearchParams(location.search).get('type') || (location.hash ? location.hash.slice(1) : '');
    typeRadios.forEach(function(r){ if (r.value === want) r.checked = true; });
    var syncFields = function(){
      var v = (typeRadios.filter(function(r){ return r.checked; })[0] || {}).value || '';
      $$('[data-for]').forEach(function(el){ el.hidden = el.getAttribute('data-for').split(' ').indexOf(v) === -1; });
    };
    typeRadios.forEach(function(r){ r.addEventListener('change', syncFields); }); syncFields();
  }

  /* Forms */
  $$('form[data-form]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var status = $('.status', form) || form.appendChild(Object.assign(document.createElement('div'), { className: 'status' }));
      if ($('.hp input', form) && $('.hp input', form).value) { return; }
      var data = {}; new FormData(form).forEach(function(v, k){ data[k] = v; });
      data._form = form.getAttribute('data-form'); data._page = location.pathname;
      status.className = 'status'; status.textContent = 'Sending…';
      var btn = $('button[type=submit]', form); if (btn) btn.disabled = true;
      var done = function(ok, msg){ status.className = 'status ' + (ok ? 'ok' : 'err'); status.textContent = msg; if (btn) btn.disabled = false; if (ok) form.reset(); status.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
      if (!C.formEndpoint) {
        /* Delivery not connected yet: open an email draft so nothing is lost. */
        var body = Object.keys(data).filter(function(k){ return k[0] !== '_'; }).map(function(k){ return k.replace(/_/g,' ') + ': ' + data[k]; }).join('\n');
        location.href = 'mailto:' + (C.email || '') + '?subject=' + encodeURIComponent('LabourLok website: ' + data._form) + '&body=' + encodeURIComponent(body);
        done(true, 'Thanks. Your email app should now open with your message ready to send. If it did not, email us at ' + (C.email || 'the address on our contact page') + '.');
        return;
      }
      fetch(C.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
        .then(function(r){ if (!r.ok) throw new Error(r.status); done(true, 'Thanks. We have your message and will come back to you as soon as we can, usually within one working day.'); })
        .catch(function(){ done(false, 'Something went wrong sending that. Please try again, or email ' + (C.email || 'us') + '.'); });
    });
  });

  /* Help widget */
  var fab = $('.help-fab'), hp = $('.help-panel');
  if (fab && hp) {
    var staffedNow = function(){
      var s = C.staffed || { days: [1,2,3,4,5], from: 8, to: 18 };
      var now = new Date(); var lon = new Date(now.toLocaleString('en-GB', { timeZone: 'Europe/London' }));
      return s.days.indexOf(lon.getDay()) > -1 && lon.getHours() >= s.from && lon.getHours() < s.to;
    };
    var on = staffedNow();
    var st = $('.status', hp);
    if (st) { st.classList.toggle('on', on); $('span', st).textContent = on ? 'Team available now' : 'Team unavailable right now. Leave a message.'; }
    var ooh = $('.ooh', hp); if (ooh) ooh.hidden = on;
    var ch = $('.channels', hp);
    if (ch) {
      ch.innerHTML = (C.whatsapp ? '<a href="https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent('Hi LabourLok, ') + '" target="_blank" rel="noopener">' + ICON.wa + 'WhatsApp</a>' : '<span>WhatsApp: number to be confirmed</span>')
        + (C.supportPhone ? '<a href="tel:' + C.supportPhone.replace(/\s/g,'') + '">' + ICON.phone + 'Call support</a>' : '<span>Support line: to be confirmed</span>');
    }
    var open = function(o){ hp.classList.toggle('open', o); fab.setAttribute('aria-expanded', o ? 'true' : 'false'); if (o) { showRoot(); } };
    fab.addEventListener('click', function(){ open(!hp.classList.contains('open')); });
    $('.close', hp).addEventListener('click', function(){ open(false); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') open(false); });
    var root = $('.root', hp), msg = $('.msgview', hp);
    var showRoot = function(){ root.hidden = false; msg.hidden = true; };
    $$('.help-opt[data-topic]', hp).forEach(function(b){ b.addEventListener('click', function(){
      var topic = b.getAttribute('data-topic');
      $('select[name=topic]', msg).value = topic;
      $('.msg-title', msg).textContent = b.textContent.trim();
      root.hidden = true; msg.hidden = false; $('textarea', msg).focus();
    }); });
    $('.back', hp).addEventListener('click', showRoot);
  }

  /* Analytics: only when an ID is configured */
  if (C.gaId) {
    var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + C.gaId; document.head.appendChild(s);
    window.dataLayer = window.dataLayer || []; window.gtag = function(){ dataLayer.push(arguments); }; gtag('js', new Date()); gtag('config', C.gaId, { anonymize_ip: true });
  }

  var ICON = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.6.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>'
  };
})();
