(function(){
  var P='MDc0NzA2MzgwMDg=', Pf='MDc0NzAgNjM4MDA4';
  var num=atob(P), fmt=atob(Pf);
  document.querySelectorAll('.js-phone').forEach(function(a){a.href='tel:'+num;});
  document.querySelectorAll('.js-phone-text').forEach(function(s){s.textContent=fmt;});
  document.querySelectorAll('.js-phone-call').forEach(function(s){s.textContent='Call '+fmt;});
  var wa=document.getElementById('fabWa');
  if(wa){wa.href='https://wa.me/44'+num.replace(/^0/,'')+'?text='+encodeURIComponent('Hi, seen your website - ');}

  var ts=document.getElementById('formTimestamp');
  if(ts){ts.value=Date.now();}
  var ph=document.getElementById('fPhone');
  if(ph){
    ph.addEventListener('input',function(){ph.setCustomValidity('');});
    ph.addEventListener('invalid',function(){ph.setCustomValidity('Please enter a UK phone number, for example 07700 900123');});
  }

  // menu
  var t=document.getElementById('navToggle'), l=document.getElementById('navLinks'), de=document.documentElement;
  function setMenu(o){l.classList.toggle('is-open',o);t.setAttribute('aria-expanded',o);t.setAttribute('aria-label',o?'Close menu':'Open menu');de.classList.toggle('no-scroll',o);document.body.classList.toggle('no-scroll',o);}
  t.addEventListener('click',function(){setMenu(!l.classList.contains('is-open'));});
  l.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false);});});
  window.addEventListener('resize',function(){if(window.innerWidth>880)setMenu(false);});

  // reveals
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in');});
  }

  // floating buttons appear once the first call buttons have scrolled away
  var fabs=document.getElementById('fabs'), cta=document.querySelector('.hero-cta');
  if(fabs && cta && 'IntersectionObserver' in window){
    new IntersectionObserver(function(es){fabs.classList.toggle('show',!es[0].isIntersecting && es[0].boundingClientRect.top<0);}).observe(cta);
  }

  // lightbox (projects page)
  var lb=document.getElementById('lightbox');
  if(lb){
    var lbi=lb.querySelector('img');
    document.querySelectorAll('[data-full]').forEach(function(b){b.addEventListener('click',function(){lbi.src=b.dataset.full;lbi.alt=b.querySelector('img').alt;lb.classList.add('open');lb.setAttribute('aria-hidden','false');});});
    lb.addEventListener('click',function(e){if(e.target!==lbi){lb.classList.remove('open');lb.setAttribute('aria-hidden','true');}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){lb.classList.remove('open');}});
  }
})();
