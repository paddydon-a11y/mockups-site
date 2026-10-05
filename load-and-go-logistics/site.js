(function(){
  var P=atob('MDc3NTQ2NTg5OTk='),Pf=atob('MDc3NTQgNjU4OTk5'),E=atob('aW5mb0Bsb2FkYW5kZ28udWs='),W=atob('NDQ3NzU0NjU4OTk5');
  var $=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
  $('[data-tel]').forEach(function(a){a.href='tel:'+P});
  $('[data-telt]').forEach(function(e){e.textContent=Pf});
  $('[data-mail]').forEach(function(a){a.href='mailto:'+E;a.textContent=E});
  $('[data-wa]').forEach(function(a){a.href='https://wa.me/'+W+'?text=Hi%2C%20seen%20your%20website%20-%20'});

  // loader (home only)
  var ld=document.getElementById('ld');
  if(ld){
    var done=false,off=function(){if(done)return;done=true;ld.classList.add('up');setTimeout(function(){ld.remove()},650)};
    setTimeout(off,1750);setTimeout(function(){if(ld.parentNode)ld.remove()},3000);
  }

  // nav
  var nav=document.querySelector('.nav'),bg=document.querySelector('.burger'),mm=document.querySelector('.mmenu');
  window.addEventListener('scroll',function(){nav.classList.toggle('scrolled',window.scrollY>8)},{passive:true});
  function closeM(){bg.classList.remove('on');mm.classList.remove('on');document.body.classList.remove('lock');bg.setAttribute('aria-expanded','false')}
  bg.addEventListener('click',function(){var o=!mm.classList.contains('on');bg.classList.toggle('on',o);mm.classList.toggle('on',o);document.body.classList.toggle('lock',o);bg.setAttribute('aria-expanded',o)});
  $('.mmenu a').forEach(function(a){a.addEventListener('click',closeM)});

  // reveal
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    $('.reveal').forEach(function(e){io.observe(e)});
  } else $('.reveal').forEach(function(e){e.classList.add('in')});

  // fabs appear once the hero CTAs leave view
  var fabs=document.querySelector('.fabs'),hc=document.querySelector('[data-herocta]');
  if(fabs&&hc&&'IntersectionObserver' in window){
    new IntersectionObserver(function(es){fabs.classList.toggle('on',!es[0].isIntersecting&&window.scrollY>200)}).observe(hc);
  }

  // mobile route strip: cycle destinations
  var rs=document.getElementById('rsDest');
  if(rs){
    var ds=['Manchester','Birmingham','Leeds','London','Glasgow','Bristol'],k=0;
    setInterval(function(){rs.style.opacity=0;setTimeout(function(){k=(k+1)%ds.length;rs.textContent=ds[k];rs.style.opacity=1},300)},3200);
  }

  // quote bar -> form prefill
  var qb=document.getElementById('qbar'),msg=document.getElementById('fMsg');
  if(qb&&msg){
    qb.addEventListener('submit',function(e){
      e.preventDefault();
      var a=qb.elements.from.value.trim(),b=qb.elements.to.value.trim(),t=[];
      if(a)t.push('Collection: '+a);if(b)t.push('Delivery: '+b);
      if(t.length&&msg.value.indexOf('Collection:')<0&&msg.value.indexOf('Delivery:')<0)msg.value=t.join('\n')+'\n'+msg.value;
      document.getElementById('quote').scrollIntoView({behavior:'smooth'});
      setTimeout(function(){document.getElementById('fName').focus({preventScroll:true})},700);
    });
  }

  // form
  var ts=document.getElementById('formTimestamp');if(ts)ts.value=Date.now();
  var ph=document.getElementById('fPhone');
  if(ph)ph.addEventListener('input',function(){var v=ph.value.replace(/[\s-]/g,'');ph.setCustomValidity(/^(0|\+44)\d{9,11}$/.test(v)?'':'Please enter a valid UK phone number')});
  var f=document.getElementById('qForm');
  if(f)f.addEventListener('submit',function(e){
    e.preventDefault();
    var b=f.querySelector('button');b.disabled=true;b.textContent='Sending...';
    fetch(f.action,{method:'POST',body:new FormData(f)}).catch(function(){}).then(function(){
      b.textContent='Request sent';document.getElementById('formOk').style.display='block';
    });
  });
})();
