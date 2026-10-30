(function () {
  var DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var KEY = '4a-ts-draft';
  var $ = function (id) { return document.getElementById(id); };

  function mondayOf(d) { d = new Date(d); var k = (d.getDay() + 6) % 7; d.setDate(d.getDate() - k); return d; }
  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function uk(s) { if (!s) return ''; var p = s.split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }
  function dayDate(i) { if (!state.wc) return ''; var d = new Date(state.wc + 'T12:00:00'); d.setDate(d.getDate() + i); return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }); }
  function pdfDate(i) { if (!state.wc) return ''; var d = new Date(state.wc + 'T12:00:00'); d.setDate(d.getDate() + i); return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0'); }
  function hrsTxt(h) { return (Math.round(h * 100) / 100) + (h === 1 ? ' hr' : ' hrs'); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function mins(t) { if (!/^\d{1,2}:\d{2}$/.test(t || '')) return null; var p = t.split(':'); return +p[0] * 60 + +p[1]; }
  function onSite(d) { var a = mins(d.start), b = mins(d.finish); return a == null || b == null || b <= a ? 0 : (b - a) / 60; }
  // fixed break deduction: 7 hrs or more on site = 1 hr, over 3 and under 7 hrs = 30 mins, 3 hrs or less = nothing
  function brk(d) { var s = onSite(d); return s >= 7 ? 1 : s > 3 ? 0.5 : 0; }
  function brkTxt(b) { return b === 1 ? '1 hr' : b ? '30 mins' : 'None'; }
  function brkWhy(d) { var s = onSite(d); return s >= 7 ? '7 hrs or more on site' : s > 3 ? 'over 3 hrs on site' : '3 hrs or less on site'; }
  function worked(d) { return Math.max(0, onSite(d) - brk(d)); }
  function fresh() { return { name: '', trade: '', site: '', email: '', wc: iso(mondayOf(new Date())), days: [null, null, null, null, null, null, null] }; }

  var state = fresh();
  try { var saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved && saved.days) state = saved; } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  // a new day starts with the times last used, so most days need no typing
  function lastTimes() { for (var i = 6; i >= 0; i--) if (state.days[i]) return { start: state.days[i].start, finish: state.days[i].finish }; return { start: state.lastStart || '08:00', finish: state.lastFinish || '16:00' }; }

  /* ---------- days ---------- */
  function hrsLine(d) {
    var s = onSite(d);
    if (!s) return '<div class="net"><span>Hours worked</span><b>0 hrs</b></div>';
    return '<div><span>Time on site</span><span>' + hrsTxt(s) + '</span></div>' +
      '<div class="fix"><span>Fixed break deduction<small>' + brkWhy(d) + '</small></span><b>' + (brk(d) ? '− ' : '') + brkTxt(brk(d)) + '</b></div>' +
      '<div class="net"><span>Hours worked</span><b>' + hrsTxt(worked(d)) + '</b></div>';
  }
  function renderDays() {
    var h = '';
    DAYS.forEach(function (name, di) {
      var d = state.days[di];
      h += '<section class="card day' + (d ? '' : ' off') + '" data-day="' + di + '"><h2><span>' + name + ' <span class="date">' + dayDate(di) + '</span></span>' + (d ? '<button type="button" class="rm" data-act="rm">Remove</button>' : '') + '</h2>';
      if (!d) h += '<div class="none"><button type="button" class="chipbtn" data-act="add">+ Worked this day</button></div>';
      else h += '<div class="row2"><label class="f"><span>Start</span><input type="time" data-k="start" value="' + esc(d.start) + '"></label>' +
        '<label class="f"><span>Finish</span><input type="time" data-k="finish" value="' + esc(d.finish) + '"></label></div>' +
        '<div class="brk">' + hrsLine(d) + '</div>';
      h += '</section>';
    });
    $('days').innerHTML = h;
  }
  $('days').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var di = +b.closest('.day').dataset.day;
    if (b.dataset.act === 'add') state.days[di] = lastTimes();
    else if (b.dataset.act === 'rm') state.days[di] = null;
    else return;
    renderDays(); totals(); save();
  });
  $('days').addEventListener('input', function (e) {
    var k = e.target.dataset.k; if (!k) return;
    var card = e.target.closest('.day'), d = state.days[+card.dataset.day];
    d[k] = e.target.value; e.target.classList.remove('bad');
    state.lastStart = d.start; state.lastFinish = d.finish;
    card.querySelector('.brk').innerHTML = hrsLine(d); totals(); save();
  });

  /* ---------- totals ---------- */
  function calc() {
    var days = 0, site = 0, breaks = 0, hours = 0;
    state.days.forEach(function (d) { if (d) { days++; site += onSite(d); breaks += brk(d); hours += worked(d); } });
    return { days: days, site: site, breaks: breaks, hours: hours };
  }
  function totals() { var t = calc(); $('tdays').textContent = t.days; $('tsite').textContent = hrsTxt(t.site); $('tbreak').textContent = hrsTxt(t.breaks); $('tgrand').textContent = hrsTxt(t.hours); }

  /* ---------- header fields ---------- */
  ['name', 'trade', 'site', 'email'].forEach(function (k) {
    $(k).value = state[k] || '';
    $(k).oninput = function () { state[k] = this.value; this.classList.remove('bad'); save(); };
  });
  $('wc').value = state.wc;
  $('wc').onchange = function () { if (this.value) this.value = iso(mondayOf(this.value + 'T12:00:00')); state.wc = this.value; renderDays(); save(); };

  /* ---------- signature ---------- */
  var cv = $('sig'), cx = cv.getContext('2d'), drawing = false, signed = false, last = null;
  function sizeSig() { var r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1; cv.width = r.width * dpr; cv.height = r.height * dpr; cx.scale(dpr, dpr); cx.lineWidth = 2.2; cx.lineCap = 'round'; cx.lineJoin = 'round'; cx.strokeStyle = '#1a1a1a'; signed = false; }
  function pt(e) { var r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  cv.addEventListener('pointerdown', function (e) { drawing = true; last = pt(e); cv.setPointerCapture(e.pointerId); cv.parentNode.classList.remove('bad'); });
  cv.addEventListener('pointermove', function (e) { if (!drawing) return; var p = pt(e); cx.beginPath(); cx.moveTo(last.x, last.y); cx.lineTo(p.x, p.y); cx.stroke(); last = p; signed = true; });
  ['pointerup', 'pointercancel'].forEach(function (t) { cv.addEventListener(t, function () { drawing = false; }); });
  $('sigclear').onclick = function () { cx.clearRect(0, 0, cv.width, cv.height); signed = false; };
  sizeSig();

  /* ---------- send ---------- */
  function validate() {
    var errs = [];
    document.querySelectorAll('.bad').forEach(function (el) { el.classList.remove('bad'); });
    if (!state.name.trim()) { errs.push('Your name'); $('name').classList.add('bad'); }
    if (!(state.trade || '').trim()) { errs.push('Your trade'); $('trade').classList.add('bad'); }
    if (!state.site.trim()) { errs.push('Site'); $('site').classList.add('bad'); }
    if (!state.wc) errs.push('Week commencing');
    if (state.email.trim() && !/^\S+@\S+\.\S+$/.test(state.email.trim())) { errs.push('Your email does not look right'); $('email').classList.add('bad'); }
    var any = false;
    state.days.forEach(function (d, di) {
      if (!d) return; any = true;
      if (!onSite(d)) { errs.push(DAYS[di] + ': finish time must be after start'); document.querySelector('.day[data-day="' + di + '"] [data-k="finish"]').classList.add('bad'); }
    });
    if (!any) errs.push('At least one day worked');
    if (!signed) { errs.push('Your signature'); cv.parentNode.classList.add('bad'); }
    return errs;
  }
  function savePdf(blob, fname) {
    var file = null;
    try { file = new File([blob], fname, { type: 'application/pdf' }); } catch (e) {}
    if (file && window.matchMedia('(pointer:coarse)').matches && navigator.canShare && navigator.canShare({ files: [file] })) { navigator.share({ files: [file], title: fname }).catch(function () {}); return; }
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = fname; document.body.appendChild(a); a.click(); a.remove();
  }
  $('send').onclick = function () {
    var errs = validate(), box = $('err');
    if (errs.length) { box.innerHTML = '<b>Still needed:</b><ul>' + errs.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; box.style.display = 'block'; box.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    box.style.display = 'none';
    var blob = buildPdf(), url = URL.createObjectURL(blob), mail = state.email.trim();
    var fname = '4A timesheet ' + state.name.trim() + ' wc ' + state.wc + '.pdf';
    $('main').innerHTML = '<div class="card done"><div class="tick">✓</div><h2>Timesheet sent</h2>' +
      '<p>It has gone to Chris at 4A Trades with the PDF attached' + (mail ? ', and a copy has gone to <b>' + esc(mail) + '</b>' : '') + '.</p>' +
      '<p style="font-size:13px;color:#7a5400">Preview only: nothing has actually been emailed.</p>' +
      '<a class="btn" style="display:block;text-decoration:none" href="' + url + '" target="_blank" rel="noopener">Open the PDF</a>' +
      '<button class="btn sec" type="button" id="savepdf">Save to Files</button>' +
      '<button class="btn sec" type="button" id="again">Start a new timesheet</button></div>' +
      '<iframe class="pdfframe" src="' + url + '" title="Timesheet PDF"></iframe>';
    window.scrollTo(0, 0);
    $('savepdf').onclick = function () { savePdf(blob, fname); };
    // name, trade, site and email carry over; the hours are cleared so a reload cannot send the week twice
    var keep = state; state = fresh(); ['name', 'trade', 'site', 'email', 'lastStart', 'lastFinish'].forEach(function (k) { state[k] = keep[k]; }); save();
    $('again').onclick = function () { location.reload(); };
  };

  /* ---------- PDF ---------- */
  function buildPdf() {
    var jsPDF = window.jspdf.jsPDF, doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
    var W = 210, M = 12, ACC = [255, 107, 0], DARK = [17, 17, 17], INK = [31, 33, 36], t = calc();
    doc.setFillColor.apply(doc, DARK); doc.rect(0, 0, W, 24, 'F'); doc.setFillColor.apply(doc, ACC); doc.rect(0, 24, W, 1.2, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(20); doc.setTextColor(255, 255, 255); doc.text('4A', M, 15.5);
    doc.setTextColor.apply(doc, ACC); doc.text('TRADES', M + doc.getTextWidth('4A') + 1, 15.5);
    doc.setFontSize(14); doc.setTextColor(255, 255, 255); doc.text('DAY WORK TIMESHEET', W - M, 15.5, { align: 'right' });

    var info = [['Name', state.name.trim()], ['Trade', (state.trade || '').trim()], ['Site', state.site.trim()], ['Week commencing', uk(state.wc)], ['Submitted', new Date().toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })]];
    doc.setFontSize(10);
    info.forEach(function (r, i) { var y = 35 + i * 6; doc.setFont('helvetica', 'normal'); doc.setTextColor(110, 115, 120); doc.text(r[0], M, y); doc.setFont('helvetica', 'bold'); doc.setTextColor.apply(doc, INK); doc.text(doc.splitTextToSize(r[1], W - 2 * M - 40)[0], M + 40, y); });

    var body = DAYS.map(function (d, di) {
      var x = state.days[di], label = d + ' ' + pdfDate(di), grey = { textColor: [165, 170, 175] };
      if (!x) return [{ content: label, styles: grey }, '', '', '', '', ''];
      var R = { halign: 'right' };
      return [label, x.start, x.finish, { content: hrsTxt(onSite(x)), styles: R }, { content: brk(x) ? '- ' + brkTxt(brk(x)) : 'None', styles: R }, { content: hrsTxt(worked(x)), styles: { halign: 'right', fontStyle: 'bold' } }];
    });
    var R = { halign: 'right' };
    doc.autoTable({ startY: 68, margin: { left: M, right: M }, theme: 'grid',
      head: [['Day', 'Start', 'Finish', { content: 'On site', styles: R }, { content: 'Fixed break', styles: R }, { content: 'Hours worked', styles: R }]], body: body,
      foot: [[{ content: t.days + (t.days === 1 ? ' day' : ' days'), colSpan: 3 }, { content: hrsTxt(t.site), styles: R }, { content: t.breaks ? '- ' + hrsTxt(t.breaks) : 'None', styles: R }, { content: hrsTxt(t.hours), styles: R }]],
      styles: { font: 'helvetica', fontSize: 10, cellPadding: 2.6, lineColor: [205, 210, 215], lineWidth: 0.2, textColor: INK, valign: 'middle' },
      headStyles: { fillColor: DARK, textColor: 255, fontStyle: 'bold', fontSize: 9 },
      footStyles: { fillColor: ACC, textColor: 255, fontStyle: 'bold', fontSize: 11 },
      columnStyles: { 0: { cellWidth: 44 }, 5: { cellWidth: 32 } } });
    var y = doc.lastAutoTable.finalY + 5;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); doc.setTextColor(110, 115, 120);
    doc.text('Fixed break deductions: 7 hrs or more on site = 1 hr, over 3 hrs = 30 mins, 3 hrs or less = none.', M, y); y += 8;

    var bw = (W - 2 * M - 8) / 2, bh = 32;
    doc.setDrawColor(205, 210, 215); doc.setLineWidth(0.3); doc.rect(M, y, bw, bh); doc.rect(M + bw + 8, y, bw, bh);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(110, 115, 120);
    doc.text('WORKER SIGNATURE', M + 3, y + 5); doc.text('OFFICE USE: APPROVED', M + bw + 11, y + 5);
    var sig = cv.toDataURL('image/png'), sr = cv.height / cv.width, sw = Math.min(bw - 6, (bh - 14) / sr);
    doc.addImage(sig, 'PNG', M + 3, y + 7, sw, sw * sr);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor.apply(doc, INK);
    doc.text(state.name.trim() + '   ·   ' + new Date().toLocaleDateString('en-GB'), M + 3, y + bh - 3);
    var rx = M + bw + 11; doc.setTextColor(110, 115, 120);
    doc.text('Name', rx, y + 15); doc.line(rx + 12, y + 15.5, rx + bw - 6, y + 15.5);
    doc.text('Signature', rx, y + 25); doc.line(rx + 17, y + 25.5, rx + bw - 6, y + 25.5);

    doc.setFontSize(8); doc.setTextColor(140, 145, 150);
    doc.text('4A Trades  ·  0330 133 7901  ·  4atrades.co.uk', W / 2, 290, { align: 'center' });
    return doc.output('blob');
  }

  renderDays(); totals();
})();
