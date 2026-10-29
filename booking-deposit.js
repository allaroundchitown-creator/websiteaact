(async()=>{
const form=document.getElementById('bookingForm');if(!form)return;
let enabled=false;
// Capture before the legacy inquiry handler. Disabled checkout leaves that handler intact.
form.addEventListener('submit',event=>{
 if(!enabled)return;event.preventDefault();event.stopImmediatePropagation();
 const phone=form.elements.phone.value.replace(/\D/g,'').replace(/^1(?=\d{10}$)/,'');
 if(!/^[2-9]\d{2}[2-9]\d{6}$/.test(phone)){form.elements.phone.setCustomValidity('Enter a valid 10-digit US phone number.');form.reportValidity();return;}
 form.elements.phone.setCustomValidity('');if(!form.reportValidity())return;
 try{
  const data=new FormData(form),draft=Object.fromEntries(data);draft.phone=phone;draft.addOns=data.getAll('addOns');
  sessionStorage.setItem('aact-deposit-draft',JSON.stringify(draft));
  if(sessionStorage.getItem('aact-deposit-intent')){document.getElementById('bookingStatus').textContent='Opening your existing payment request. Contact us before making another deposit.';}
  location.assign('/deposit');
 }catch{document.getElementById('bookingStatus').textContent='Your browser could not prepare checkout. Please call/text (224) 234-1473.';}
},true);
try{const response=await fetch('/api/payment-config',{cache:'no-store'});if(!response.ok)return;const config=await response.json();if(!config.enabled)return;enabled=true;
 form.querySelector('button[type=submit]').textContent='Continue to $100 Deposit';
 document.querySelector('.form-heading p:last-child').textContent='Submit your event details and a $100 deposit. Your booking is pending approval; we refund the deposit if we decline.';
 document.getElementById('bookingStatus').textContent='Your date is confirmed only after approval. Your deposit counts toward your event total.';
}catch{}
})();
