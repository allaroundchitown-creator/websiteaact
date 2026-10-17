'use strict';
const menu=document.querySelector('.menu'),links=document.querySelector('.mobile-links');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));links.hidden=!open;menu.textContent=open?'Close':'Menu';});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.hidden=true;menu.setAttribute('aria-expanded','false');menu.textContent='Menu';}));
const hero=document.querySelector('.hero video');if(matchMedia('(prefers-reduced-motion: reduce)').matches){hero.autoplay=false;hero.pause();}
const form=document.querySelector('#events-inquiry'),statusNote=document.querySelector('#events-status'),phone=form.elements.phone;
const dateParts=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
form.elements.date.min=['year','month','day'].map(k=>dateParts.find(p=>p.type===k).value).join('-');
phone.addEventListener('input',()=>phone.setCustomValidity(''));
document.querySelectorAll('.event-type-select').forEach(a=>a.addEventListener('click',()=>{form.elements.eventType.value=a.dataset.eventType;}));
document.querySelectorAll('.package-select').forEach(a=>a.addEventListener('click',()=>{form.elements.package.value=a.dataset.package;const note=document.querySelector('#event-package-choice');note.hidden=false;note.textContent=`Your choice: ${a.dataset.package}`;}));
let sending=false;
form.addEventListener('submit',async event=>{
 event.preventDefault();if(sending)return;
 const digits=phone.value.replace(/\D/g,'').replace(/^1(?=\d{10}$)/,'');
 const valid=/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)&&!/^(\d)\1{9}$/.test(digits)&&!['1234567890','9876543210','5555555555'].includes(digits);
 phone.setCustomValidity(valid?'':'Please enter a valid 10-digit US phone number.');
 if(!form.reportValidity()||form.elements._honey.value)return;
 const button=form.querySelector('button[type="submit"]'),data=new FormData(form);
 data.set('phone',digits);data.append('_subject',`AACT Booths event inquiry — ${data.get('eventType')} — ${data.get('date')}`);
 data.append('_template','table');data.append('_captcha','false');data.append('source','AACT general events page');data.append('landingPage',location.href);
 sending=true;button.disabled=true;button.textContent='Sending your request…';statusNote.className='form-note full-width';statusNote.textContent='Sending your event details…';
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
 try{
  const response=await fetch('https://formsubmit.co/ajax/allaroundchitown@gmail.com',{method:'POST',headers:{Accept:'application/json'},body:data,signal:controller.signal});
  const result=await response.json();if(!response.ok||!(result.success===true||result.success==='true'))throw new Error('Not accepted');
  form.reset();document.querySelector('#event-package-choice').hidden=true;statusNote.classList.add('success');statusNote.textContent='Thanks! Your request was sent. We’ll contact you with availability and pricing. Your date is not reserved yet.';
  if(typeof window.gtag==='function')window.gtag('event','generate_lead',{lead_source:'general_events_page'});
 }catch{statusNote.classList.add('error');statusNote.textContent='We couldn’t confirm delivery. Please try again or call/text (224) 234-1473.';}
 finally{clearTimeout(timeout);sending=false;button.disabled=false;button.textContent='Check Your Date & Get Pricing';}
});
