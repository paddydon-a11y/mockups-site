(function(){
  var d=document, root=d.documentElement;
  var P=atob('MDEyMDIyODE5ODg='), Pf=atob('MDEyMDIgMjgxOTg4'), E=atob('aW5mb0BzYWZhcmlwcm9wZXJ0eXNlcnZpY2VzLmNvbQ=='), W=atob('NDQ3ODI4NjA3MDQy');
  d.querySelectorAll('[data-tel]').forEach(function(a){a.href='tel:'+P});
  d.querySelectorAll('[data-telt]').forEach(function(s){s.textContent=Pf});
  d.querySelectorAll('[data-mail]').forEach(function(a){a.href='mailto:'+E});
  d.querySelectorAll('[data-mailt]').forEach(function(s){s.textContent=E});
  d.querySelectorAll('[data-wa]').forEach(function(a){a.href='https://wa.me/'+W+'?text=Hi%2C%20seen%20your%20website%20-%20'});

  /* before and after sliders */
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setPos(ba,v){ba.style.setProperty('--pos',v)}
  d.querySelectorAll('.ba').forEach(function(ba){
    var r=ba.querySelector('.ba-range');
    if(r){r.addEventListener('input',function(){ba._touched=true;setPos(ba,r.value)})}
  });
  function wipe(ba){
    if(!ba||ba._played) return; ba._played=true;
    var r=ba.querySelector('.ba-range');
    if(reduce){setPos(ba,50);return}
    var keys=[[0,100],[350,100],[1750,6],[2150,6],[3000,50]], t0=null;
    function ease(x){return x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2}
    function step(t){
      if(ba._touched) return;
      if(t0===null) t0=t;
      var e=t-t0, v=50;
      for(var i=0;i<keys.length-1;i++){
        if(e>=keys[i][0]&&e<=keys[i+1][0]){var k=(e-keys[i][0])/(keys[i+1][0]-keys[i][0]);v=keys[i][1]+(keys[i+1][1]-keys[i][1])*ease(k);break}
      }
      if(e>keys[keys.length-1][0]) v=50;
      setPos(ba,v.toFixed(2)); if(r) r.value=Math.round(v);
      if(e<keys[keys.length-1][0]) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* loader: plain logo reveal, then the sheet lifts and the hero comparison plays */
  var ld=d.getElementById('loader'), heroBa=d.querySelector('.ba[data-auto]');
  if(heroBa) setPos(heroBa,100);
  function lift(){
    if(ld&&!ld.classList.contains('up')){ld.classList.add('up');setTimeout(function(){ld.classList.add('gone')},650)}
    wipe(heroBa);
  }
  if(ld){setTimeout(lift,reduce?350:1750)}else{setTimeout(lift,300)}

  /* mobile menu */
  var bg=d.getElementById('burger'), mm=d.getElementById('mmenu');
  function menu(open){
    bg.classList.toggle('open',open);mm.classList.toggle('open',open);
    bg.setAttribute('aria-expanded',open?'true':'false');
    root.classList.toggle('no-scroll',open);d.body.classList.toggle('no-scroll',open);
  }
  if(bg&&mm){
    bg.addEventListener('click',function(){menu(!mm.classList.contains('open'))});
    mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu(false)})});
  }

  /* reveals */
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -40px 0px'});
    d.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
    var bio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){wipe(e.target);bio.unobserve(e.target)}})},{threshold:.5});
    d.querySelectorAll('.ba:not([data-auto])').forEach(function(el){setPos(el,100);bio.observe(el)});
  }else{
    d.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in')});
  }

  /* floating buttons appear once the hero buttons leave the screen */
  var fabs=d.getElementById('fabs'), hc=d.querySelector('.hero-ctas')||d.querySelector('.ph');
  if(fabs&&hc&&'IntersectionObserver' in window){
    new IntersectionObserver(function(es){fabs.classList.toggle('on',!es[0].isIntersecting&&es[0].boundingClientRect.top<0)}).observe(hc);
  }

  /* case study stage viewers */
  d.querySelectorAll('.cs-view').forEach(function(v){
    var img=v.querySelector('.cs-stage img'), cap=v.querySelector('.cs-cap'), tabs=v.querySelectorAll('.cs-tab');
    tabs.forEach(function(t){
      t.addEventListener('click',function(){
        if(t.getAttribute('aria-selected')==='true') return;
        tabs.forEach(function(o){o.setAttribute('aria-selected','false')});
        t.setAttribute('aria-selected','true');
        img.classList.add('out');
        var n=new Image();
        n.onload=function(){img.src=n.src;img.alt=t.dataset.alt||'';img.classList.remove('out')};
        n.src=t.dataset.src;
        cap.innerHTML='<b>'+t.dataset.stage+'.</b> '+t.dataset.cap;
      });
    });
  });

  /* lightbox */
  var lb=d.getElementById('lb');
  if(lb){
    var li=lb.querySelector('img'), lp=lb.querySelector('p');
    d.querySelectorAll('[data-lb]').forEach(function(g){
      g.addEventListener('click',function(){
        var i=g.querySelector('img'), c=g.querySelector('figcaption');
        li.src=i.currentSrc||i.src;li.alt=i.alt;lp.textContent=c?c.textContent.replace(/\s+/g,' ').trim():'';
        lb.classList.add('on');
      });
    });
    function close(){lb.classList.remove('on')}
    lb.addEventListener('click',close);
    d.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  }

  /* form */
  var ts=d.getElementById('formTimestamp'); if(ts) ts.value=Date.now();
  var ph=d.getElementById('fPhone');
  if(ph){ph.addEventListener('input',function(){
    var v=ph.value.replace(/[\s()-]/g,'');
    ph.setCustomValidity(/^(0|\+44)\d{9,11}$/.test(v)?'':'Please enter a UK phone number');
  })}
  var yr=d.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();
})();
