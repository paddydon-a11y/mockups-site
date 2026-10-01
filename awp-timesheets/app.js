(function () {
  var DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var STAGES = ['De Grit', 'Strip', 'Primer', 'VCL', 'Insulation', 'Underlay', 'Mineral', 'Flashings', 'Fascia / gutter', 'Timber'];
  var UNITS = ['m²', 'lin m', 'each'];
  var SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var KEY = 'awp-ts-draft';
  var $ = function (id) { return document.getElementById(id); };

  function mondayOf(d) { d = new Date(d); var k = (d.getDay() + 6) % 7; d.setDate(d.getDate() - k); return d; }
  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function uk(s) { if (!s) return ''; var p = s.split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }
  function dayDate(i) { if (!state.wc) return ''; var d = new Date(state.wc + 'T12:00:00'); d.setDate(d.getDate() + i); return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }); }
  function pdfDate(i) { if (!state.wc) return ''; var d = new Date(state.wc + 'T12:00:00'); d.setDate(d.getDate() + i); return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0'); }
  function num(v) { var n = parseFloat(String(v || '').replace(/[^0-9.]/g, '')); return isNaN(n) ? 0 : n; }
  function gbp(n) { return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function blankJob() { return { wp: '', project: '', roof: '', rate: '' }; }
  function blankPw() { return { wp: '', project: '', roof: '', stages: [], note: '', qty: '', unit: 'm²', rate: '', days: [] }; }
  function fresh() { return { name: '', email: '', wc: iso(mondayOf(new Date())), days: [[], [], [], [], [], [], []], pw: [], extras: [] }; }
  function pwAmt(p) { return Math.round(num(p.qty) * num(p.rate) * 100) / 100; }
  function pwWork(p) { var w = p.stages.join(', '), n = String(p.note || '').trim(); return w && n ? w + '. ' + n : w || n; }
  function allJobs() { var out = []; state.days.forEach(function (d) { out = out.concat(d); }); return out.concat(state.pw); }

  var state = fresh();
  try { var saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved && saved.days) { state = saved; state.pw = state.pw || []; state.email = state.email || ''; } } catch (e) {}
  // receipt photos can fill the phone's storage: keep the rest of the draft if they do
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { try { localStorage.setItem(KEY, JSON.stringify(state, function (k, v) { return k === 'photo' ? undefined : v; })); } catch (e2) {} } }

  /* ---------- jobs this phone has been on ---------- */
  var HKEY = 'awp-ts-jobs', history = [];
  try { history = JSON.parse(localStorage.getItem(HKEY) || '[]') || []; } catch (e) {}
  function wpKey(v) { return String(v || '').replace(/^wp/i, '').trim().toUpperCase(); }
  function wpText(j) { var k = wpKey(j.wp); return k ? 'WP' + k : ''; }
  function knownJobs() {
    var seen = {}, out = [];
    // jobs already on this week's sheet first, then past weeks
    allJobs().reverse().forEach(add);
    history.forEach(add);
    function add(j) { var p = String(j.project || '').trim(), w = wpKey(j.wp), k = w || 'p:' + p.toLowerCase(); if (!p || seen[k]) return; seen[k] = 1; out.push({ key: k, wp: w, project: p, roof: String(j.roof || '').trim() }); }
    // a job typed without its WP is the same job as one that has it
    return out.filter(function (r) { return r.wp || !out.some(function (o) { return o.wp && o.project.toLowerCase() === r.project.toLowerCase(); }); });
  }
  function remember() {
    history = knownJobs().slice(0, 30).map(function (r) { return { wp: r.wp, project: r.project, roof: r.roof }; });
    try { localStorage.setItem(HKEY, JSON.stringify(history)); } catch (e) {}
  }

  /* ---------- days ---------- */
  function renderDays() {
    var h = '';
    DAYS.forEach(function (name, di) {
      var jobs = state.days[di];
      h += '<section class="card day' + (jobs.length ? '' : ' off') + '" data-day="' + di + '"><h2>' + name + ' <span class="date">' + dayDate(di) + '</span></h2>';
      if (!jobs.length) {
        h += '<div class="none"><button type="button" class="chipbtn" data-act="add">+ Worked this day</button>';
        if (di > 0 && state.days[di - 1].length) h += '<button type="button" class="chipbtn" data-act="copy">Same job as ' + DAYS[di - 1] + '</button>';
        h += '</div>';
      } else {
        jobs.forEach(function (j, ji) {
          h += '<div class="job" data-job="' + ji + '"><div class="jh"><span>' + (jobs.length > 1 ? 'Job ' + (ji + 1) : 'Job') + '</span><button type="button" class="rm" data-act="rm">Remove</button></div>' +
            jobFields(j) +
            '<label class="f" style="margin-bottom:0"><span>Day rate claimed</span><div class="money"><input type="text" inputmode="decimal" data-k="rate" value="' + esc(j.rate) + '" placeholder="0.00"></div></label></div>';
        });
      }
      h += '</section>';
    });
    $('days').innerHTML = h;
  }

  function jobFields(j) {
    return recent(j) +
      '<label class="f"><span>Project name</span><input type="text" data-k="project" value="' + esc(j.project) + '" autocapitalize="words"></label>' +
      '<div class="row2"><div class="f"><span>WP number <small>if known</small></span><div class="pfx"><b>WP</b><input type="text" inputmode="numeric" data-k="wp" value="' + esc(j.wp) + '"></div></div>' +
      '<label class="f"><span>Roof no.</span><input type="text" data-k="roof" value="' + esc(j.roof) + '"></label></div>';
  }
  // typing a WP this phone knows fills project + roof
  function wpTyped(j, input) {
    var r = knownJobs().filter(function (x) { return x.wp && x.wp === wpKey(input.value); })[0], el = input.closest('.job');
    if (r && !String(j.project).trim()) { fillFrom(j, r); el.querySelector('[data-k="project"]').value = j.project; el.querySelector('[data-k="roof"]').value = j.roof; }
    hideRecent(el, input);
  }
  function hideRecent(el, input) { var rc = el.querySelector('.recent'); if (rc && input.value.trim()) rc.parentNode.remove(); }
  // a project name this phone knows fills its WP + roof once the name is finished
  function projectDone(j, input) {
    var name = input.value.trim().toLowerCase(), el = input.closest('.job');
    if (!name || wpKey(j.wp)) return;
    var r = knownJobs().filter(function (x) { return x.wp && x.project.toLowerCase() === name; })[0];
    if (r) { fillFrom(j, r); input.value = j.project; el.querySelector('[data-k="wp"]').value = j.wp; el.querySelector('[data-k="roof"]').value = j.roof; save(); }
  }

  function recent(j) {
    if (wpKey(j.wp) || String(j.project).trim()) return '';
    var list = knownJobs().slice(0, 6); if (!list.length) return '';
    return '<div class="f"><span>Your recent jobs</span><div class="chips recent">' + list.map(function (r) { return '<button type="button" data-rec="' + esc(r.key) + '">' + (r.wp ? '<b>WP' + esc(r.wp) + '</b> ' : '') + esc(r.project) + '</button>'; }).join('') + '</div></div>';
  }
  function byKey(k) { return knownJobs().filter(function (x) { return x.key === k; })[0]; }
  function fillFrom(j, r) { j.wp = r.wp; j.project = r.project; if (!String(j.roof).trim()) j.roof = r.roof; }

  $('days').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var di = +b.closest('.day').dataset.day, jobs = state.days[di];
    var jobEl = b.closest('.job'), ji = jobEl ? +jobEl.dataset.job : -1;
    if (b.dataset.act === 'add') { jobs.push(blankJob()); }
    else if (b.dataset.act === 'copy') { state.days[di - 1].forEach(function (p) { var j = blankJob(); j.wp = p.wp; j.project = p.project; j.roof = p.roof; j.rate = p.rate; jobs.push(j); }); }
    else if (b.dataset.act === 'rm') { jobs.splice(ji, 1); }
    else if (b.dataset.rec) { var r = byKey(b.dataset.rec); if (r) fillFrom(jobs[ji], r); renderDays(); save(); return; }
    else return;
    renderDays(); totals(); save();
    if (b.dataset.act !== 'rm') { var card = document.querySelector('.day[data-day="' + di + '"]'), inp = card.querySelectorAll('.job')[b.dataset.act === 'copy' ? 0 : jobs.length - 1]; if (inp) inp.querySelector('input').focus({ preventScroll: true }); }
  });
  $('days').addEventListener('input', function (e) {
    var k = e.target.dataset.k; if (!k) return;
    var di = +e.target.closest('.day').dataset.day, ji = +e.target.closest('.job').dataset.job;
    state.days[di][ji][k] = e.target.value; e.target.classList.remove('bad');
    if (k === 'wp') wpTyped(state.days[di][ji], e.target);
    if (k === 'project') hideRecent(e.target.closest('.job'), e.target);
    if (k === 'rate') totals(); save();
  });
  $('days').addEventListener('change', function (e) { if (e.target.dataset.k === 'project') projectDone(state.days[+e.target.closest('.day').dataset.day][+e.target.closest('.job').dataset.job], e.target); });

  /* ---------- price work ---------- */
  function chips(list, on, attr) { return list.map(function (s) { return '<button type="button" class="' + (on(s) ? 'on' : '') + '" data-' + attr + '="' + esc(s) + '">' + esc(s) + '</button>'; }).join(''); }
  function renderPw() {
    $('pw').innerHTML = state.pw.map(function (p, i) {
      var a = pwAmt(p);
      return '<div class="job" data-job="' + i + '"><div class="jh"><span>' + (state.pw.length > 1 ? 'Price work ' + (i + 1) : 'Price work') + '</span><button type="button" class="rm" data-act="rm">Remove</button></div>' +
        jobFields(p) +
        '<div class="f"><span>Work done</span><div class="chips">' + chips(STAGES, function (s) { return p.stages.indexOf(s) > -1; }, 'stage') + '</div></div>' +
        '<label class="f"><span>Details <small style="text-transform:none;font-weight:500;color:var(--mid)">optional</small></span><textarea data-k="note" rows="2" placeholder="e.g. Main roof area, 2 underlayers">' + esc(p.note) + '</textarea></label>' +
        '<div class="pwcalc"><label class="f"><span>Quantity</span><input type="text" inputmode="decimal" data-k="qty" value="' + esc(p.qty) + '" placeholder="0"></label>' +
        '<label class="f"><span>Rate per ' + esc(p.unit === 'each' ? 'item' : p.unit) + '</span><div class="money"><input type="text" inputmode="decimal" data-k="rate" value="' + esc(p.rate) + '" placeholder="0.00"></div></label></div>' +
        '<div class="f"><span>Measured in</span><div class="chips">' + chips(UNITS, function (u) { return p.unit === u; }, 'unit') + '</div></div>' +
        '<div class="f"><span>Days on it <small style="text-transform:none;font-weight:500;color:var(--mid)">optional</small></span><div class="chips days">' + chips(SHORT, function (d) { return p.days.indexOf(d) > -1; }, 'pday') + '</div></div>' +
        '<div class="pwamt"><span>' + (a ? esc(p.qty) + ' ' + esc(p.unit) + ' × ' + gbp(num(p.rate)) : 'Amount') + '</span><b>' + gbp(a) + '</b></div></div>';
    }).join('');
  }
  $('addpw').onclick = function () { state.pw.push(blankPw()); renderPw(); totals(); save(); var l = $('pw').lastChild; if (l) l.querySelector('input').focus({ preventScroll: true }); };
  $('pw').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var i = +b.closest('.job').dataset.job, p = state.pw[i];
    if (b.dataset.act === 'rm') state.pw.splice(i, 1);
    else if (b.dataset.rec) { var r = byKey(b.dataset.rec); if (r) fillFrom(p, r); }
    else if (b.dataset.stage) { var k = p.stages.indexOf(b.dataset.stage); k > -1 ? p.stages.splice(k, 1) : p.stages.push(b.dataset.stage); p.stages.sort(function (x, y) { return STAGES.indexOf(x) - STAGES.indexOf(y); }); }
    else if (b.dataset.unit) p.unit = b.dataset.unit;
    else if (b.dataset.pday) { var d = p.days.indexOf(b.dataset.pday); d > -1 ? p.days.splice(d, 1) : p.days.push(b.dataset.pday); p.days.sort(function (x, y) { return SHORT.indexOf(x) - SHORT.indexOf(y); }); }
    else return;
    renderPw(); totals(); save();
  });
  $('pw').addEventListener('input', function (e) {
    var k = e.target.dataset.k; if (!k) return;
    var el = e.target.closest('.job'), p = state.pw[+el.dataset.job];
    p[k] = e.target.value; e.target.classList.remove('bad');
    if (k === 'wp') wpTyped(p, e.target);
    if (k === 'project') hideRecent(el, e.target);
    if (k === 'qty' || k === 'rate') { var a = pwAmt(p); el.querySelector('.pwamt').innerHTML = '<span>' + (a ? esc(p.qty) + ' ' + esc(p.unit) + ' × ' + gbp(num(p.rate)) : 'Amount') + '</span><b>' + gbp(a) + '</b>'; totals(); }
    save();
  });

  $('pw').addEventListener('change', function (e) { if (e.target.dataset.k === 'project') projectDone(state.pw[+e.target.closest('.job').dataset.job], e.target); });

  /* ---------- extras ---------- */
  function renderExtras() {
    $('extras').innerHTML = state.extras.map(function (x, i) {
      return '<div class="extra" data-i="' + i + '"><input type="text" data-k="desc" placeholder="What for" value="' + esc(x.desc) + '"><div class="money"><input type="text" inputmode="decimal" data-k="amt" placeholder="0.00" value="' + esc(x.amt) + '"></div><button type="button" class="rm" aria-label="Remove">×</button>' +
        (x.photo ? '<div class="rcpt has"><img src="' + x.photo.data + '" alt="Receipt"><span>Receipt attached</span><button type="button" class="rmphoto">Remove photo</button></div>'
          : '<label class="rcpt"><input type="file" accept="image/*" hidden><span>+ Add receipt photo</span></label>') + '</div>';
    }).join('');
  }
  // shrunk on the phone so the PDF stays small enough to email
  function readPhoto(file) {
    return new Promise(function (res, rej) {
      var url = URL.createObjectURL(file), im = new Image();
      im.onload = function () {
        var s = Math.min(1, 1400 / Math.max(im.naturalWidth, im.naturalHeight)), c = document.createElement('canvas'), g = c.getContext('2d');
        c.width = Math.round(im.naturalWidth * s); c.height = Math.round(im.naturalHeight * s);
        g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(im, 0, 0, c.width, c.height);
        // step the quality down until a busy photo is under ~220KB, so ten receipts still email easily
        var data = c.toDataURL('image/jpeg', 0.72); [0.6, 0.5, 0.4].forEach(function (q) { if (data.length > 300000) data = c.toDataURL('image/jpeg', q); });
        URL.revokeObjectURL(url); res({ data: data, w: c.width, h: c.height });
      };
      im.onerror = function () { URL.revokeObjectURL(url); rej(new Error('Could not read that photo')); };
      im.src = url;
    });
  }
  $('addextra').onclick = function () { state.extras.push({ desc: '', amt: '' }); renderExtras(); save(); var l = $('extras').lastChild; if (l) l.querySelector('input').focus(); };
  $('extras').addEventListener('input', function (e) { var k = e.target.dataset.k; if (!k) return; state.extras[+e.target.closest('.extra').dataset.i][k] = e.target.value; totals(); save(); });
  $('extras').addEventListener('change', function (e) {
    if (e.target.type !== 'file' || !e.target.files[0]) return;
    var x = state.extras[+e.target.closest('.extra').dataset.i];
    readPhoto(e.target.files[0]).then(function (ph) { x.photo = ph; renderExtras(); save(); }).catch(function (err) { e.target.value = ''; alert(err.message + '. Try taking the photo again.'); });
  });
  $('extras').addEventListener('click', function (e) {
    var i = e.target.closest('.extra') && +e.target.closest('.extra').dataset.i;
    if (e.target.classList.contains('rmphoto')) delete state.extras[i].photo;
    else if (e.target.classList.contains('rm')) state.extras.splice(i, 1);
    else return;
    renderExtras(); totals(); save();
  });

  /* ---------- totals ---------- */
  function calc() {
    var days = 0, rates = 0, pw = 0, extras = 0;
    state.days.forEach(function (jobs) { if (jobs.length) days++; jobs.forEach(function (j) { rates += num(j.rate); }); });
    state.pw.forEach(function (p) { pw += pwAmt(p); });
    state.extras.forEach(function (x) { extras += num(x.amt); });
    return { days: days, rates: rates, pw: pw, extras: extras, total: rates + pw + extras };
  }
  function totals() { var t = calc(); $('tdays').textContent = t.days + (t.days === 1 ? ' day' : ' days'); $('trates').textContent = gbp(t.rates); $('tpw').textContent = gbp(t.pw); $('textras').textContent = gbp(t.extras); $('tgrand').textContent = gbp(t.total); }

  /* ---------- header fields ---------- */
  $('name').value = state.name; $('wc').value = state.wc;
  $('name').oninput = function () { state.name = this.value; this.classList.remove('bad'); save(); };
  $('email').value = state.email;
  $('email').oninput = function () { state.email = this.value; this.classList.remove('bad'); save(); };
  $('wc').onchange = function () { if (this.value) { this.value = iso(mondayOf(this.value + 'T12:00:00')); } state.wc = this.value; renderDays(); save(); };

  /* ---------- signature ---------- */
  var cv = $('sig'), cx = cv.getContext('2d'), drawing = false, signed = false, last = null;
  function sizeSig() { var r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1; cv.width = r.width * dpr; cv.height = r.height * dpr; cx.scale(dpr, dpr); cx.lineWidth = 2.2; cx.lineCap = 'round'; cx.lineJoin = 'round'; cx.strokeStyle = '#1a2a6c'; signed = false; }
  function pt(e) { var r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  cv.addEventListener('pointerdown', function (e) { drawing = true; last = pt(e); cv.setPointerCapture(e.pointerId); cv.parentNode.classList.remove('bad'); });
  cv.addEventListener('pointermove', function (e) { if (!drawing) return; var p = pt(e); cx.beginPath(); cx.moveTo(last.x, last.y); cx.lineTo(p.x, p.y); cx.stroke(); last = p; signed = true; });
  ['pointerup', 'pointercancel'].forEach(function (t) { cv.addEventListener(t, function () { drawing = false; }); });
  $('sigclear').onclick = function () { cx.clearRect(0, 0, cv.width, cv.height); signed = false; };
  sizeSig();

  // earlier previews kept sent timesheets on the phone: clear them
  try { indexedDB.deleteDatabase('awp-ts'); } catch (e) {}

  /* ---------- send ---------- */
  function validate() {
    var errs = [];
    document.querySelectorAll('.bad').forEach(function (el) { el.classList.remove('bad'); });
    if (!state.name.trim()) { errs.push('Your name'); $('name').classList.add('bad'); }
    if (state.email.trim() && !/^\S+@\S+\.\S+$/.test(state.email.trim())) { errs.push('Your email does not look right'); $('email').classList.add('bad'); }
    if (!state.wc) errs.push('Week commencing');
    var any = false;
    state.days.forEach(function (jobs, di) {
      jobs.forEach(function (j, ji) {
        any = true;
        var el = document.querySelectorAll('.day[data-day="' + di + '"] .job')[ji];
        ['project', 'rate'].forEach(function (k) {
          var v = k === 'rate' ? num(j[k]) : String(j[k]).trim();
          if (!v) { el.querySelector('[data-k="' + k + '"]').classList.add('bad'); var lbl = { project: 'project name', rate: 'day rate' }[k]; errs.push(DAYS[di] + ': ' + lbl); }
        });
      });
    });
    state.pw.forEach(function (p, i) {
      any = true;
      var el = document.querySelectorAll('#pw .job')[i], lab = 'Price work' + (state.pw.length > 1 ? ' ' + (i + 1) : '') + ': ';
      [['project', 'project name'], ['qty', 'quantity'], ['rate', 'rate']].forEach(function (f) {
        var v = f[0] === 'qty' || f[0] === 'rate' ? num(p[f[0]]) : String(p[f[0]]).trim();
        if (!v) { el.querySelector('[data-k="' + f[0] + '"]').classList.add('bad'); errs.push(lab + f[1]); }
      });
      if (!pwWork(p)) { el.querySelector('[data-k="note"]').classList.add('bad'); errs.push(lab + 'work done'); }
    });
    if (!any) errs.push('At least one day worked or one price work job');
    if (!signed) { errs.push('Your signature'); cv.parentNode.classList.add('bad'); }
    return errs;
  }

  // phones get the share sheet (Save to Files, WhatsApp...), a computer gets a download
  function savePdf(blob) {
    var fname = 'AWP timesheet ' + state.name.trim() + ' wc ' + state.wc + '.pdf', file = null;
    try { file = new File([blob], fname, { type: 'application/pdf' }); } catch (e) {}
    if (file && window.matchMedia('(pointer:coarse)').matches && navigator.canShare && navigator.canShare({ files: [file] })) { navigator.share({ files: [file], title: fname }).catch(function () {}); return; }
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = fname; document.body.appendChild(a); a.click(); a.remove();
  }
  function ready() {
    var errs = validate(), box = $('err');
    if (errs.length) { box.innerHTML = '<b>Still needed:</b><ul>' + errs.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; box.style.display = 'block'; box.scrollIntoView({ behavior: 'smooth', block: 'center' }); return false; }
    box.style.display = 'none'; return true;
  }
  $('send').onclick = function () {
    if (!ready()) return;
    var box = $('err');
    var btn = this; btn.disabled = true; btn.textContent = 'Sending…';
    buildPdf().then(function (blob) {
      remember();
      var t = calc(), url = URL.createObjectURL(blob), subj = 'Timesheet: ' + state.name.trim() + ', w/c ' + uk(state.wc) + ', ' + gbp(t.total), mail = state.email.trim();
      $('main').innerHTML = '<div class="card done"><div class="tick">✓</div><h2>Timesheet sent</h2>' +
        '<p>In the live app this goes straight to Absolute\'s invoicing inbox with the PDF attached' + (mail ? ', and a copy goes to <b>' + esc(mail) + '</b>' : '') + '.</p>' +
        '<p style="font-size:14px;color:var(--mid)">Subject: <b style="color:var(--ink)">' + esc(subj) + '</b></p>' +
        '<a class="btn" style="display:block;text-decoration:none" href="' + url + '" target="_blank" rel="noopener">Open the PDF</a>' +
        '<button class="btn sec" type="button" id="savepdf">Save to Files</button>' +
        '<button class="btn sec" type="button" id="again">Start a new timesheet</button></div>' +
        '<iframe class="pdfframe" src="' + url + '" title="Timesheet PDF"></iframe>';
      window.scrollTo(0, 0);
      $('savepdf').onclick = function () { savePdf(blob); };
      $('again').onclick = function () { var n = state.name, m = state.email; state = fresh(); state.name = n; state.email = m; save(); location.reload(); };
    }).catch(function (e) { btn.disabled = false; btn.textContent = 'Send timesheet'; box.textContent = 'Could not build the PDF: ' + e.message; box.style.display = 'block'; });
  };

  /* ---------- PDF ---------- */
  function loadLogo() {
    return new Promise(function (res) {
      var im = new Image(); im.onload = function () { var c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight; c.getContext('2d').drawImage(im, 0, 0); res({ data: c.toDataURL('image/png'), r: im.naturalHeight / im.naturalWidth }); }; im.onerror = function () { res(null); }; im.src = 'logo.png';
    });
  }
  // the email goes out through Microsoft, which refuses attachments over 3MB: keep all receipts inside 2.3MB
  var PHOTO_BUDGET = 2300000;
  function fitPhotos() {
    var list = state.extras.filter(function (x) { return x.photo; }).map(function (x) { return x.photo; }), each = PHOTO_BUDGET / list.length;
    function bytes(p) { return p.data.length * 0.75; }
    if (list.reduce(function (n, p) { return n + bytes(p); }, 0) <= PHOTO_BUDGET) return Promise.resolve(list);
    return Promise.all(list.map(function (ph) {
      if (bytes(ph) <= each) return ph;
      return new Promise(function (res) {
        var im = new Image();
        im.onload = function () {
          var out = ph;
          [[1200, 0.6], [1000, 0.55], [800, 0.5], [640, 0.45]].some(function (t) {
            var k = Math.min(1, t[0] / Math.max(im.naturalWidth, im.naturalHeight)), c = document.createElement('canvas');
            c.width = Math.round(im.naturalWidth * k); c.height = Math.round(im.naturalHeight * k); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
            out = { data: c.toDataURL('image/jpeg', t[1]), w: c.width, h: c.height }; return bytes(out) <= each;
          });
          res(out);
        };
        im.onerror = function () { res(ph); }; im.src = ph.data;
      });
    }));
  }
  function buildPdf() {
    return Promise.all([loadLogo(), fitPhotos()]).then(function (got) {
      var logo = got[0], fit = got[1];
      var jsPDF = window.jspdf.jsPDF, doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true });
      var W = 297, M = 10, BLUE = [0, 143, 213], INK = [38, 41, 44], t = calc();
      if (logo) doc.addImage(logo.data, 'PNG', M, 9, 52, 52 * logo.r);
      doc.setFont('helvetica', 'bold'); doc.setFontSize(17); doc.setTextColor.apply(doc, BLUE); doc.text('TIME SHEET', W - M, 16, { align: 'right' });
      doc.setFontSize(9.5); doc.setTextColor.apply(doc, INK);
      var info = [['Installer', state.name.trim()], ['Week commencing', uk(state.wc)], ['Submitted', new Date().toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })]];
      info.forEach(function (r, i) { var y = 22 + i * 5; doc.setFont('helvetica', 'normal'); doc.setTextColor(110, 115, 120); doc.text(r[0] + ':', W - M - 48, y, { align: 'right' }); doc.setFont('helvetica', 'bold'); doc.setTextColor.apply(doc, INK); doc.text(r[1], W - M - 46, y); });

      var TSTYLE = { font: 'helvetica', fontSize: 8.5, cellPadding: 1.8, lineColor: [205, 210, 215], lineWidth: 0.2, textColor: INK, valign: 'middle' },
        HSTYLE = { fillColor: BLUE, textColor: 255, fontSize: 7.5, fontStyle: 'bold', valign: 'middle' }, y = 40;
      function heading(txt) { doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor.apply(doc, BLUE); doc.text(txt, M, y); y += 2; }
      var COLS = { wp: 22, project: 60, roof: 20, amt: 28 };
      if (state.pw.length) {
        heading('PRICE WORK');
        doc.autoTable({ startY: y, head: [['WP No.', 'Project', 'Roof No.', 'Work done', 'Days', 'Qty', 'Rate', { content: 'Amount', styles: { halign: 'right' } }]],
          body: state.pw.map(function (p) { return [wpText(p), p.project.trim(), p.roof.trim(), pwWork(p), p.days.join(', '), num(p.qty) + ' ' + p.unit, gbp(num(p.rate)) + (p.unit === 'each' ? ' each' : ' / ' + p.unit), { content: gbp(pwAmt(p)), styles: { halign: 'right', fontStyle: 'bold' } }]; }),
          margin: { left: M, right: M }, theme: 'grid', styles: TSTYLE, headStyles: HSTYLE,
          columnStyles: { 0: { cellWidth: COLS.wp }, 1: { cellWidth: COLS.project }, 2: { cellWidth: COLS.roof }, 4: { cellWidth: 26 }, 5: { cellWidth: 20 }, 6: { cellWidth: 26 }, 7: { cellWidth: COLS.amt } } });
        y = doc.lastAutoTable.finalY + 8;
      }
      var hasDays = state.days.some(function (j) { return j.length; });
      if (hasDays) {
        if (y > 150) { doc.addPage(); y = 15; }
        heading('DAY WORK');
        var body = [];
        DAYS.forEach(function (d, di) {
          var jobs = state.days[di], label = d.slice(0, 3) + ' ' + pdfDate(di);
          if (!jobs.length) { body.push(['', '', '', { content: label, styles: { textColor: [160, 165, 170] } }, '']); return; }
          jobs.forEach(function (j) { body.push([wpText(j), j.project.trim(), j.roof.trim(), label, { content: gbp(num(j.rate)), styles: { halign: 'right', fontStyle: 'bold' } }]); });
        });
        // WP / Project / Roof match the price work table; Day rate lines up with Amount
        doc.autoTable({ startY: y, head: [['WP No.', 'Project', 'Roof No.', 'Day', { content: 'Day rate', styles: { halign: 'right' } }]], body: body, margin: { left: M, right: M }, theme: 'grid', styles: TSTYLE, headStyles: HSTYLE,
          columnStyles: { 0: { cellWidth: COLS.wp }, 1: { cellWidth: COLS.project }, 2: { cellWidth: COLS.roof }, 4: { cellWidth: COLS.amt } } });
        y = doc.lastAutoTable.finalY + 8;
      }
      y -= 3;
      if (y > 150) { doc.addPage(); y = 15; }

      // extras (left) + totals (right)
      var ex = state.extras.filter(function (x) { return x.desc.trim() || num(x.amt) || x.photo; }), rcpts = ex.filter(function (x) { return x.photo; });
      doc.autoTable({
        startY: y, margin: { left: M, right: W / 2 + 4 }, theme: 'grid', head: [['Extras', 'Amount']],
        body: ex.length ? ex.map(function (x) { return [x.desc.trim() + (x.photo ? (x.desc.trim() ? '  ' : '') + '(receipt ' + (rcpts.indexOf(x) + 1) + ')' : ''), { content: gbp(num(x.amt)), styles: { halign: 'right' } }]; }) : [[{ content: 'None', styles: { textColor: [160, 165, 170] } }, '']],
        styles: { fontSize: 8.5, cellPadding: 1.8, lineColor: [205, 210, 215], lineWidth: 0.2, textColor: INK },
        headStyles: { fillColor: [242, 244, 246], textColor: INK, fontStyle: 'bold' }, columnStyles: { 1: { cellWidth: 24 } }
      });
      var exEnd = doc.lastAutoTable.finalY;
      doc.autoTable({
        startY: y, margin: { left: W / 2 + 40, right: M }, theme: 'grid',
        body: [['Price work', gbp(t.pw)], ['Day work (' + t.days + (t.days === 1 ? ' day)' : ' days)'), gbp(t.rates)], ['Extras', gbp(t.extras)], [{ content: 'TOTAL CLAIMED', styles: { fillColor: BLUE, textColor: 255, fontStyle: 'bold' } }, { content: gbp(t.total), styles: { fillColor: BLUE, textColor: 255, fontStyle: 'bold', fontSize: 11 } }]],
        styles: { fontSize: 9, cellPadding: 2, lineColor: [205, 210, 215], lineWidth: 0.2, textColor: INK }, columnStyles: { 1: { halign: 'right', cellWidth: 32 } }
      });
      y = Math.max(exEnd, doc.lastAutoTable.finalY) + 6;
      if (y > 170) { doc.addPage(); y = 15; }

      // signatures
      var bw = (W - 2 * M - 8) / 2, bh = 28;
      doc.setDrawColor(205, 210, 215); doc.setLineWidth(0.3);
      doc.rect(M, y, bw, bh); doc.rect(M + bw + 8, y, bw, bh);
      doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(110, 115, 120);
      doc.text('EMPLOYEE SIGNATURE', M + 3, y + 5); doc.text('OFFICE USE: SURVEYOR / MANAGER SIGN-OFF FOR PAYMENT', M + bw + 11, y + 5);
      var sig = cv.toDataURL('image/png'), sr = cv.height / cv.width, sw = Math.min(70, (bh - 12) / sr);
      doc.addImage(sig, 'PNG', M + 3, y + 7, sw, sw * sr);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); doc.setTextColor.apply(doc, INK);
      doc.text(state.name.trim() + '   ·   ' + new Date().toLocaleDateString('en-GB'), M + 3, y + bh - 3);
      var rx = M + bw + 11; doc.setTextColor(110, 115, 120);
      doc.text('Name', rx, y + 13); doc.line(rx + 12, y + 13.5, rx + bw - 6, y + 13.5);
      doc.text('Signature', rx, y + 20); doc.line(rx + 17, y + 20.5, rx + bw - 50, y + 20.5);
      doc.text('Date', rx + bw - 46, y + 20); doc.line(rx + bw - 37, y + 20.5, rx + bw - 6, y + 20.5);

      // receipt photos, three to a page, whole photo always shown
      var gw = (W - 2 * M - 12) / 3, gt = 27, gh = 195 - gt;
      rcpts.forEach(function (x, i) {
        if (i % 3 === 0) {
          doc.addPage(); doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor.apply(doc, BLUE); doc.text('RECEIPTS', M, 15);
          doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(110, 115, 120); doc.text(state.name.trim() + '  ·  w/c ' + uk(state.wc), W - M, 15, { align: 'right' });
        }
        var pic = fit[i], gx = M + (i % 3) * (gw + 6), r = Math.min(gw / pic.w, gh / pic.h), pw = pic.w * r, ph = pic.h * r;
        doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5); doc.setTextColor.apply(doc, INK);
        doc.text(doc.splitTextToSize('Receipt ' + (i + 1) + (x.desc.trim() ? ': ' + x.desc.trim() : ''), gw - 24)[0], gx, gt - 3); doc.text(gbp(num(x.amt)), gx + gw, gt - 3, { align: 'right' });
        doc.addImage(pic.data, 'JPEG', gx + (gw - pw) / 2, gt, pw, ph);
      });

      var pages = doc.getNumberOfPages();
      for (var p = 1; p <= pages; p++) { doc.setPage(p); doc.setFontSize(7.5); doc.setTextColor(140, 145, 150); doc.text('Absolute Waterproofing Ltd  ·  Birmingham 0121 268 3213  ·  Congleton 01260 218 928  ·  absolutewaterproofing.co.uk', W / 2, 203, { align: 'center' }); }
      return doc.output('blob');
    });
  }

  renderDays(); renderPw(); renderExtras(); totals();
})();
