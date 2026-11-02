(function(){
  var P = atob('MDEyNjQzMTcwMTc='), Pf = atob('MDEyNjQgMzE3MDE3');
  var M = atob('MDczNDY4MDg1MDA='), Mf = atob('MDczNDYgODA4NTAw');
  var E = atob('MzYzZWxlY3RyaWNhbEBnbWFpbC5jb20=');
  var W = atob('NDQ3MzQ2ODA4NTAw');
  document.querySelectorAll('[data-call]').forEach(function(a){a.href='tel:'+P;});
  document.querySelectorAll('[data-pf]').forEach(function(s){s.textContent=Pf;});
  document.querySelectorAll('[data-mob]').forEach(function(a){a.href='tel:'+M;a.textContent=Mf;});
  document.querySelectorAll('[data-email]').forEach(function(a){a.href='mailto:'+E;a.textContent=E;});
  document.querySelectorAll('[data-wa]').forEach(function(a){a.href='https://wa.me/'+W+'?text=Hi%2C%20seen%20your%20website%20-%20';});
  var ts=document.getElementById('formTimestamp'); if(ts) ts.value=Date.now();
  var ph=document.querySelector('input[name=phone]');
  if(ph){ph.addEventListener('input',function(){var v=ph.value.replace(/\s/g,'');ph.setCustomValidity(/^(0|\+44)\d{9,11}$/.test(v)||!v?'':'Please enter a UK phone number');});}

  // mobile menu
  var tg=document.querySelector('.nav-toggle'), nl=document.querySelector('.nav-links');
  function setMenu(o){nl.classList.toggle('is-open',o);tg.setAttribute('aria-expanded',o);document.documentElement.classList.toggle('no-scroll',o);document.body.classList.toggle('no-scroll',o);}
  if(tg){tg.addEventListener('click',function(){setMenu(!nl.classList.contains('is-open'));});
    nl.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false);});});}

  // reveals
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  // FABs after hero CTAs leave view
  var fabs=document.querySelector('.fabs'), hc=document.querySelector('.hero-cta');
  if(fabs&&hc){new IntersectionObserver(function(es){fabs.classList.toggle('show',!es[0].isIntersecting&&es[0].boundingClientRect.top<0);}).observe(hc);}

  // lightbox
  var lb=document.querySelector('.lb');
  if(lb){var li=lb.querySelector('img');
    document.querySelectorAll('.gal figure').forEach(function(f){f.addEventListener('click',function(){li.src=f.querySelector('img').src;li.alt=f.querySelector('img').alt;lb.classList.add('open');});});
    lb.addEventListener('click',function(e){if(e.target!==li)lb.classList.remove('open');});}

  // loader
  var ld=document.querySelector('.loader');
  function lift(){if(!ld||ld.dataset.gone)return;ld.dataset.gone=1;ld.classList.add('lift');setTimeout(function(){ld.remove();document.dispatchEvent(new Event('loaderdone'));},600);}
  if(ld){var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;setTimeout(lift,rm?300:1950);setTimeout(lift,2500);}
  else{setTimeout(function(){document.dispatchEvent(new Event('loaderdone'));},50);}

  // strip nudge, once
  var st=document.querySelector('.strip');
  if(st&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.addEventListener('loaderdone',function(){setTimeout(function(){st.scrollBy({left:90,behavior:'smooth'});setTimeout(function(){st.scrollBy({left:-90,behavior:'smooth'});},700);},500);});
  }
})();
