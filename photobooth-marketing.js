'use strict';
const form=document.querySelector('#growth-form');
const planInput=document.querySelector('#selected-plan');
const planChoice=document.querySelector('#plan-choice');
const statusNote=document.querySelector('#growth-status');
const submit=form.querySelector('button[type="submit"]');
let sending=false;
document.querySelectorAll('.plan-link').forEach(link=>link.addEventListener('click',()=>{
 planInput.value=link.dataset.plan;
 planChoice.textContent=`Interested in: ${link.dataset.plan}`;
 planChoice.hidden=false;
}));
form.elements.phone.addEventListener('input',()=>form.elements.phone.setCustomValidity(''));
form.addEventListener('submit',async event=>{
 event.preventDefault();if(sending)return;
 const phone=form.elements.phone, digits=phone.value.replace(/\D/g,'');
 phone.setCustomValidity(!phone.value.trim()||/^(?:1)?[2-9]\d{2}[2-9]\d{6}$/.test(digits)?'':'Please enter a valid US phone number, or leave this optional field blank.');
 if(!form.reportValidity()||form.elements.companySite.value)return;
 const data=new FormData(form);
 data.delete('companySite');data.set('_subject',`AACT Marketing inquiry — ${data.get('business')}`);
 data.set('_replyto',data.get('email'));data.set('_template','table');data.set('_captcha','false');
 data.set('source','Photo booth marketing services');data.set('landingPage',location.href);
 sending=true;submit.disabled=true;submit.textContent='Sending your request…';statusNote.className='form-status';statusNote.textContent='Sending your business details…';
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),20000);
 try{
  const response=await fetch('https://formsubmit.co/ajax/allaroundchitown@gmail.com',{method:'POST',headers:{Accept:'application/json'},body:data,signal:controller.signal});
  const result=await response.json();if(!response.ok||!(result.success===true||result.success==='true'))throw new Error('Not accepted');
  form.reset();planChoice.hidden=true;planInput.value='Help me choose';
  statusNote.className='form-status success';statusNote.textContent='Thanks! Your request was sent. We’ll contact you to talk through your business and the right next step.';
 }catch{
  statusNote.className='form-status error';statusNote.textContent='We couldn’t confirm delivery. Please try again or email allaroundchitown@gmail.com.';
 }finally{clearTimeout(timeout);sending=false;submit.disabled=false;submit.innerHTML='Start growing <span aria-hidden="true">↗</span>';}
});
