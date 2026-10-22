(() => {
'use strict';
const form=document.getElementById('bookingForm');
if(!form)return;
const money=n=>'$'+n.toLocaleString('en-US');
function update(){
 const eventType=form.elements.eventType.value;
 const quoted=['Quinceañera','Corporate Event','Brand Activation'].includes(eventType);
 const prices=eventType==='Wedding'?{signature:800,premiere:1200}:{signature:500,premiere:800};
 document.querySelectorAll('[data-package-price]').forEach(el=>el.textContent=quoted?'Custom quote':money(prices[el.dataset.packagePrice]));
 const selected=form.querySelector('[name="package"]:checked');
 const extras=Array.from(form.querySelectorAll('[name="addOns"]:checked')).length*200;
 const base=selected?prices[selected.value==='The Signature'?'signature':'premiere']:null;
 const estimate=document.getElementById('booking-estimate');
 estimate.textContent=!selected?'Select a package':quoted?'Custom quote'+(extras?' + '+money(extras)+' add-ons':''):money(base+extras);
 form.elements.packagePrice.value=selected?(quoted?'Custom quote':money(base)):'';
 form.elements.addOnsTotal.value=money(extras);
 form.elements.estimatedTotal.value=selected?(quoted?'Custom package quote + '+money(extras)+' add-ons':money(base+extras)+' before any travel fees'):'';
 const invite=document.getElementById('booking-overlay-invite');
 invite.hidden=Boolean(window.aactBookingOverlay?.design);
}
form.addEventListener('change',update);
form.addEventListener('reset',()=>setTimeout(update,0));
update();
})();