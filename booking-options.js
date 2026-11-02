(() => {
'use strict';
const form=document.getElementById('bookingForm');
if(!form)return;
const money=n=>'$'+n.toLocaleString('en-US');
function update(){
 const prices={signature:695,premiere:1195};
 document.querySelectorAll('[data-package-price]').forEach(el=>el.textContent=money(prices[el.dataset.packagePrice]));
 const selected=form.querySelector('[name="package"]:checked');
 const premiere=selected?.value==='The Premiere';
 const sparks=form.querySelector('[name="addOns"][value^="2 cold spark"]');
 if(sparks){if(premiere)sparks.checked=false;sparks.disabled=Boolean(premiere);}
 const sparkPrice=document.querySelector('[data-addon-price="sparks"]');
 if(sparkPrice)sparkPrice.textContent=premiere?'Included':'$200';
 const extras=Array.from(form.querySelectorAll('[name="addOns"]:checked')).length*200;
 const base=selected?prices[premiere?'premiere':'signature']:null;
 document.getElementById('booking-estimate').textContent=selected?money(base+extras):'Select a package';
 form.elements.packagePrice.value=selected?money(base):'';
 form.elements.addOnsTotal.value=money(extras);
 form.elements.estimatedTotal.value=selected?money(base+extras)+' before any travel fees':'';
 const invite=document.getElementById('booking-overlay-invite');
 invite.hidden=Boolean(window.aactBookingOverlay?.design);
}
form.addEventListener('change',update);
form.addEventListener('reset',()=>setTimeout(update,0));
update();
})();