(function(){
  var d=document,P=atob('MDc0Njk5MjE0NDM='),Pf=atob('MDc0NjkgOTIxNDQz'),E=atob('ZW5xdWlyaWVzQHNwZWN0cnVtc2NhZmZvbGQuY28udWs='),W=atob('NDQ3NDY5OTIxNDQz');
  d.querySelectorAll('[data-tel]').forEach(function(a){a.href='tel:'+P});
  d.querySelectorAll('[data-telt]').forEach(function(e){e.textContent=Pf});
  d.querySelectorAll('[data-mail]').forEach(function(a){a.href='mailto:'+E;if(a.hasAttribute('data-mailt'))a.textContent=E});
  d.querySelectorAll('[data-wa]').forEach(function(a){a.href='https://wa.me/'+W+'?text=Hi%2C%20seen%20your%20website%20-%20'});

  var ld=d.getElementById('ld');
  if(ld){var kill=function(){ld.classList.add('gone')};setTimeout(kill,2780);setTimeout(kill,3200)}

  var b=d.getElementById('burger'),m=d.getElementById('mmenu');
  function setMenu(o){b.classList.toggle('open',o);m.classList.toggle('open',o);d.documentElement.classList.toggle('no-scroll',o);d.body.classList.toggle('no-scroll',o);b.setAttribute('aria-expanded',o)}
  if(b){b.addEventListener('click',function(){setMenu(!m.classList.contains('open'))});m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})})}

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  d.querySelectorAll('.reveal').forEach(function(e){io.observe(e)});

  var fabs=d.getElementById('fabs'),hc=d.querySelector('.hero .hero-cta');
  if(fabs&&hc){new IntersectionObserver(function(es){fabs.classList.toggle('show',!es[0].isIntersecting&&es[0].boundingClientRect.top<0)}).observe(hc)}

  var lb=d.getElementById('lb');
  if(lb){var li=lb.querySelector('img');d.querySelectorAll('[data-lb]').forEach(function(i){i.addEventListener('click',function(){li.src=i.getAttribute('src');li.alt=i.alt;lb.classList.add('open')})});lb.addEventListener('click',function(){lb.classList.remove('open')});d.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('open')})}

  d.querySelectorAll('form[data-enq]').forEach(function(f){
    var ts=f.querySelector('[name=_timestamp]');if(ts)ts.value=Date.now();
    var ph=f.querySelector('[name=phone]');
    ph.addEventListener('input',function(){var v=ph.value.replace(/[\s()-]/g,'');ph.setCustomValidity(/^(0|\+44)\d{9,11}$/.test(v)?'':'Please enter a valid UK phone number')});
    f.addEventListener('submit',function(e){e.preventDefault();if(!f.reportValidity())return;var ok=f.querySelector('.ok');
      fetch(f.action,{method:'POST',body:new FormData(f)}).catch(function(){}).then(function(){ok.style.display='block';f.reset()})});
  });
  d.querySelectorAll('[data-role]').forEach(function(a){a.addEventListener('click',function(){var s=d.getElementById('role');if(s)s.value=a.getAttribute('data-role')})});
})();
