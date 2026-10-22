(() => {
'use strict';
const bookingForm=document.getElementById('bookingForm'),bookingStatus=document.getElementById('bookingStatus');
if(!bookingForm)return;
const phoneInput=bookingForm.elements.phone,dateInput=bookingForm.elements.eventDate;
const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
dateInput.min=['year','month','day'].map(k=>parts.find(p=>p.type===k).value).join('-');
const validatePhone=()=>{
 const digits=phoneInput.value.replace(/\D/g,'').replace(/^1(?=\d{10}$)/,'');
 const valid=/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)&&!/^(\d)\1{9}$/.test(digits)&&!['1234567890','9876543210','5555555555'].includes(digits);
 phoneInput.setCustomValidity(valid?'':'Enter a valid 10-digit US phone number.');return valid;
};
phoneInput.addEventListener('input',()=>phoneInput.setCustomValidity(''));
phoneInput.addEventListener('blur',validatePhone);
let sending=false;
bookingForm.addEventListener('submit',async event=>{
 event.preventDefault();if(sending)return;
 bookingStatus.className='form-status';
 if(!validatePhone()||!bookingForm.checkValidity()){bookingForm.reportValidity();return;}
 const button=bookingForm.querySelector('button[type="submit"]'),original=button.innerHTML;
 const overlay=window.aactBookingOverlay;
 const data=new FormData(bookingForm);
 data.set('addOns',data.getAll('addOns').join('; ')||'None');
 data.set('phone',phoneInput.value.replace(/\D/g,'').replace(/^1(?=\d{10}$)/,''));
 data.set('_subject','AACT event inquiry — '+data.get('firstName')+' — '+data.get('eventDate')+(overlay?.design?' — custom overlay':''));
 data.set('_template','table');data.set('_captcha','false');data.set('_honey','');
 data.set('leadSubmittedAt',new Date().toLocaleString('en-US',{timeZone:'America/Chicago',dateStyle:'full',timeStyle:'short'}));
 sending=true;button.disabled=true;button.textContent='Sending…';
 bookingStatus.textContent=overlay?.design?'Preparing your overlay and event details…':'Sending your event details…';
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),30000);
 try{
  if(overlay?.design){
   if(!overlay.getAttachment)throw new Error('Overlay is not ready');
   const png=await overlay.getAttachment();
   const first=String(data.get('firstName')).replace(/[^a-z0-9]/gi,'-').slice(0,40)||'event';
   data.set('attachment',png,'AACT-'+first+'-overlay.png');
   data.set('overlayConfirmed','Yes');
   data.set('overlayImage','Attached PNG: 720 × 1280. Full-frame overlay with transparent video area.');
  }
  const response=await fetch('https://formsubmit.co/ajax/allaroundchitown@gmail.com',{method:'POST',headers:{Accept:'application/json'},body:data,signal:controller.signal});
  const result=await response.json();
  if(!response.ok||!(result.success===true||result.success==='true'))throw new Error('Submission was not accepted');
  bookingForm.reset();
  bookingStatus.textContent=overlay?.design?'Thanks! Your event details and overlay were submitted. We’ll contact you with availability and pricing.':'Thanks! Your event details were submitted. We’ll contact you with availability and pricing.';
  bookingStatus.className='form-status success';
  if(typeof window.gtag==='function')window.gtag('event','generate_lead',{lead_source:'booking_page',has_overlay:Boolean(overlay?.design)});
 }catch{
  bookingStatus.textContent='We couldn’t confirm delivery. Your saved overlay is still here. Please try again or call/text (224) 234-1473.';
  bookingStatus.className='form-status error';
 }finally{clearTimeout(timeout);sending=false;button.disabled=false;button.innerHTML=original;}
});
})();