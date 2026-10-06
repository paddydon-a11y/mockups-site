(function(){
  var P  = atob('MDE1MTIwMzk4NDg=');
  var Pf = atob('MDE1MSAyMDMgOTg0OA==');
  var E  = atob('aW5mb0Bib2x0Z3JvdXBsdGQuY28udWs=');
  function $(id){ return document.getElementById(id); }

  ['navCall','heroCall','bandCall','mobCall','footCall','fabCall','infoCall','sideCall'].forEach(function(id){
    var e=$(id); if(e){ e.href='tel:'+P; }
  });
  var t={footCallTxt:Pf, infoPhone:Pf, infoEmail:E, footMailTxt:E};
  Object.keys(t).forEach(function(k){ var e=$(k); if(e){ e.textContent=t[k]; } });
  ['infoMail','footMail'].forEach(function(id){ var e=$(id); if(e){ e.href='mailto:'+E; } });

  if($('formTimestamp')){ $('formTimestamp').value=Date.now(); }
  if($('yr')){ $('yr').textContent=new Date().getFullYear(); }

  var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var loader=$('loader');
  function lit(){ document.body.classList.add('lit'); }
  function kill(){ if(loader && loader.parentNode){ loader.parentNode.removeChild(loader); } lit(); }
  if(!loader || reduce){ document.body.classList.add('nold'); lit(); }
  else { window.scrollTo(0,0); setTimeout(function(){ loader.classList.add('gone'); lit(); },1980); setTimeout(kill,2450); }
  setTimeout(kill,3000);

  var b=$('burger'), mob=$('mob');
  b.addEventListener('click',function(){ mob.classList.toggle('open'); });
  mob.querySelectorAll('a').forEach(function(a){ a.addEventListener('click',function(){ mob.classList.remove('open'); }); });

  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(e){ io.observe(e); });

  var hc=document.querySelector('.hero-cta'), fabs=$('fabs');
  if(hc && fabs){
    new IntersectionObserver(function(es){
      es.forEach(function(e){ fabs.classList.toggle('on', !e.isIntersecting && e.boundingClientRect.top<0); });
    },{threshold:0}).observe(hc);
  }

  var ph=$('ph');
  if(ph){ ph.addEventListener('input',function(){ ph.setCustomValidity(ph.validity.patternMismatch ? 'Please enter a UK phone number' : ''); }); }
})();
