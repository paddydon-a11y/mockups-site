(function(){
  // video: pick the cut for the screen shape, keep the poster if video is blocked
  var v=document.querySelector('.bvid');
  if(v){var wide=window.matchMedia('(min-width:881px)').matches;
    if(wide)v.poster=v.dataset.pwide;
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){v.src=wide?v.dataset.wide:v.dataset.tall;var p=v.play();if(p&&p.catch)p.catch(function(){});}}
  // trade moment: the cable runs down the services and switches each card on
  var sec=document.querySelector('.switched');
  if(sec){var w=sec.querySelector('.wrap'),c=document.createElement('div');c.className='cable';c.innerHTML='<i></i><b></b>';w.appendChild(c);
    var fill=c.querySelector('i'),dot=c.querySelector('b'),cards=[].slice.call(sec.querySelectorAll('.svc'));
    var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(rm){cards.forEach(function(k){k.classList.add('lit')});}
    else{var tick=false;function upd(){tick=false;var r=w.getBoundingClientRect(),h=r.height,line=innerHeight*0.62;
      var prog=Math.max(0,Math.min(1,(line-r.top)/h));fill.style.transform='scaleY('+prog+')';dot.style.transform='translateY('+(prog*h-6)+'px)';
      var y=r.top+prog*h;cards.forEach(function(k){if(k.getBoundingClientRect().top+40<y)k.classList.add('lit');});}
      addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd);}},{passive:true});addEventListener('resize',upd);upd();}}
  // bit: what do you need picker
  var pk=document.querySelector('.pk');
  if(pk){var kind='',job='',names={business:'a business or commercial site',landlord:'a rental or managed property',home:'your home'};
    var s=function(n){return pk.querySelector('[data-step="'+n+'"]');};
    pk.querySelectorAll('[data-k]').forEach(function(b){b.addEventListener('click',function(){kind=b.dataset.k;pk.querySelectorAll('[data-k]').forEach(function(x){x.classList.toggle('on',x===b)});s(2).hidden=false;});});
    pk.querySelectorAll('[data-s]').forEach(function(b){b.addEventListener('click',function(){job=b.dataset.s;pk.querySelectorAll('[data-s]').forEach(function(x){x.classList.toggle('on',x===b)});
      s(3).hidden=false;pk.querySelector('.pk-sum').innerHTML='<span class="k">'+job+'</span> for '+names[kind]+'. Our team can advise and quote.';});});
    pk.querySelector('.pk-form').addEventListener('click',function(){var t=document.getElementById('fd');if(t)t.value=job+' for '+names[kind]+'. ';});
    pk.querySelector('.pk-reset').addEventListener('click',function(){kind=job='';pk.querySelectorAll('.on').forEach(function(x){x.classList.remove('on')});s(2).hidden=true;s(3).hidden=true;});}
})();
