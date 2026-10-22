/* The shared navigation definition for every public website page. */
(()=>{
 'use strict';
 const header=document.querySelector('.aact-header');
 if(!header)return;
 header.innerHTML="<nav class=\"aact-nav\" aria-label=\"Main navigation\"><div class=\"aact-nav-links aact-nav-left\"><a href=\"/\">Home</a></div><a class=\"aact-brand\" href=\"/\" aria-label=\"AACT Booths home\"><span>AACT</span><small>BOOTHS</small></a><div class=\"aact-nav-links aact-nav-right\"><a href=\"/#packages\">Packages</a><a href=\"/book\" class=\"aact-nav-cta\">Check Your Date</a></div><button class=\"menu aact-menu\" type=\"button\" aria-label=\"Open navigation\" aria-expanded=\"false\" aria-controls=\"aact-mobile-navigation\">Menu</button></nav><div class=\"mobile-links aact-mobile-links\" id=\"aact-mobile-navigation\" hidden><a href=\"/\">Home</a><a href=\"/#packages\">Packages</a><a href=\"/book\" class=\"aact-nav-cta\">Check Your Date</a></div>";
 // Send booking calls to action to the booking page.
 document.querySelectorAll('a.button,a.btn,a.cta,a.aact-nav-cta,a.hero-quote-link,a.booking-package-cta,a[href="#book"],a[href="/#book"]').forEach(link=>{
  const href=link.getAttribute('href')||'';
  if(!href||/^(?:https?:|tel:|sms:|mailto:)/i.test(href))return;
  link.setAttribute('href',location.pathname==='/book'?'/book#bookingForm':'/book');
 });
 const button=header.querySelector('.aact-menu');
 const panel=header.querySelector('.aact-mobile-links');
 const close=()=>{panel.hidden=true;button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Open navigation');button.textContent='Menu';};
 button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';panel.hidden=!open;button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Close navigation':'Open navigation');button.textContent=open?'Close':'Menu';});
 panel.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
 header.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){close();button.focus();}});
 document.addEventListener('click',event=>{if(!header.contains(event.target))close();});
 const desktop=matchMedia('(min-width:1001px)');
 desktop.addEventListener('change',()=>{if(desktop.matches)close();});
 const path=location.pathname.replace(/\/index\.html$/,'/').replace(/\/$/,'')||'/';
 header.querySelectorAll('a').forEach(link=>{const url=new URL(link.getAttribute('href'),location.origin);if(!url.hash&&url.pathname===path&&!link.classList.contains('aact-brand'))link.setAttribute('aria-current','page');});

 // Keep navigation out of the way while visitors explore the page.
 let lastScroll=Math.max(0,window.scrollY),scrollFrame=false;
 function revealHeader(){header.classList.remove('aact-header-hidden');}
 function updateHeader(){
  scrollFrame=false;
  const current=Math.max(0,window.scrollY),delta=current-lastScroll;
  if(current<90||!panel.hidden||header.contains(document.activeElement)){
   revealHeader();lastScroll=current;return;
  }
  if(Math.abs(delta)<8)return;
  header.classList.toggle('aact-header-hidden',delta>0);
  lastScroll=current;
 }
 window.addEventListener('scroll',()=>{if(!scrollFrame){scrollFrame=true;requestAnimationFrame(updateHeader);}},{passive:true});
 header.addEventListener('focusin',revealHeader);
 window.addEventListener('pageshow',()=>{lastScroll=Math.max(0,window.scrollY);revealHeader();});

})();