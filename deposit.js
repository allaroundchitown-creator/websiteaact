(async()=>{
'use strict';
const status=document.getElementById('status'),form=document.getElementById('depositForm'),pay=document.getElementById('pay'),check=document.getElementById('check-status');
const draftKey='aact-deposit-draft',intentKey='aact-deposit-intent';let draft,intent,card,widget,sourceId,busy=false;
const say=text=>status.textContent=text;
function finish(result){if(!result.paid)return false;if(intent?.paymentMode==='full'){document.querySelector('#complete h2').textContent='Payment received. Your booking is confirmed.';document.querySelector('#complete p').textContent='Thank you for booking AACT Booths! We will contact you to coordinate your event.';}if(result.refunded){say('This deposit has been refunded. Contact us about your booking.');form.hidden=true;return true;}document.getElementById('checkout').hidden=true;document.getElementById('complete').hidden=false;document.getElementById('reference').textContent='Booking request reference: '+result.reference;sessionStorage.removeItem(draftKey);return true;}
async function api(path,data){const r=await fetch('/api/'+path,{method:data?'POST':'GET',headers:data?{'Content-Type':'application/json'}:{},body:data?JSON.stringify(data):undefined,cache:'no-store'});let result;try{result=await r.json();}catch{throw Error('Checkout is temporarily unavailable. Please contact us.');}if(!r.ok)throw Error(result.error||'Unable to process request.');return result;}
function load(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(Error('Secure checkout could not load. Please refresh or contact us.'));document.head.append(s);});}
async function checkPayment(){if(!intent)return;say('Checking with Square…');try{const r=await api('payment-status',intent);if(!finish(r))say('Payment has not been confirmed yet. If you submitted payment, do not start another request. Check again or contact us.');}catch(e){say(e.message);}}
check.addEventListener('click',checkPayment);
try{
 draft=JSON.parse(sessionStorage.getItem(draftKey)||'null');intent=JSON.parse(sessionStorage.getItem(intentKey)||'null');
 if(intent){check.hidden=false;form.hidden=true;await checkPayment();return;}
 if(!draft){form.hidden=true;say('Start with your event details on the booking page.');return;}
 const full=draft.paymentMode==='full';
 if(full){
 const total=(draft.package==='The Premiere'?1195:695)+(draft.addOns||[]).filter(v=>v==='Floral wall — $200'||(v==='2 cold spark machines — $200'&&draft.package!=='The Premiere')).length*200;
 document.querySelector('#checkout h2').textContent='$'+total.toLocaleString('en-US')+' event total';
 pay.textContent='Pay $'+total.toLocaleString('en-US')+' & Book';
 document.querySelector('#checkout h2 + p').textContent='Pay in full for your package and add-ons. Your booking is confirmed when payment succeeds.';
 document.querySelector('#checkout h2 + p + p').textContent='We will contact you to coordinate your event.';
 form.querySelector('.check span').textContent='I agree to the Terms & Conditions and to pay the full selected total.';
 document.querySelector('#complete h2').textContent='Payment received. Your booking is confirmed.';
 document.querySelector('#complete p').textContent='Thank you for booking AACT Booths! We will contact you to coordinate your event.';
 }
 document.getElementById('summary').textContent=`${draft.package} · ${draft.eventDate} · ${draft.cityZip}`;
 const config=await api('payment-config');if(!config.enabled){form.hidden=true;say('Online deposits are not available yet. Please submit an inquiry on the booking page or contact us.');return;}
 if(config.environment==='sandbox')say('TEST CHECKOUT — no real payment will be taken.');
 await load(config.environment==='production'?'https://web.squarecdn.com/v1/square.js':'https://sandbox.web.squarecdn.com/v1/square.js');
 card=await window.Square.payments(config.applicationId,config.locationId).card();await card.attach('#card-container');
 await load('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit');
 widget=window.turnstile.render('#security',{sitekey:config.siteKey,action:'booking',callback:()=>{pay.disabled=false;},'expired-callback':()=>{pay.disabled=true;},'error-callback':()=>{pay.disabled=true;say('Security check failed. Refresh or contact us.');}});
 say(config.environment==='sandbox'?'TEST CHECKOUT — no real charge.':'Card details are handled securely by Square.');
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(busy||!form.reportValidity())return;busy=true;pay.disabled=true;
  try{
   const token=window.turnstile.getResponse(widget);if(!token)throw Error('Complete the security check.');
   intent=await api('booking-intent',{...draft,email:form.elements.email.value,consent:form.elements.consent.checked,website:form.elements.website.value,turnstileToken:token});
   const paymentToken=await card.tokenize({amount:(intent.totalAmount/100).toFixed(2),currencyCode:'USD',intent:'CHARGE',customerInitiated:true,sellerKeyedIn:false,billingContact:{givenName:draft.firstName,email:form.elements.email.value}});
   if(paymentToken.status!=='OK'){intent=null;throw Error('Please check your card details.');}sourceId=paymentToken.token;
   // Persist the checkout reference BEFORE making any charge, so refresh cannot silently create another intent.
   intent.paymentMode=draft.paymentMode;sessionStorage.setItem(intentKey,JSON.stringify(intent));check.hidden=false;form.hidden=true;
   say('Processing your payment…');
   const r=await api('pay-deposit',{...intent,sourceId});if(!finish(r))say('Payment is processing. Check payment status before trying again.');
  }catch(e){say(e.message);if(intent){form.hidden=true;check.hidden=false;}else{window.turnstile.reset(widget);pay.disabled=true;}}
  finally{busy=false;}
 });
}catch(e){say(e.message);pay.disabled=true;}
})();
