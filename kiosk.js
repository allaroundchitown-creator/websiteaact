'use strict';
const phoneMode = new URLSearchParams(location.search).get('phone') === '1';
if (phoneMode) document.body.classList.add('phone-mode');
const form = document.querySelector('#quote-form');
const entry = document.querySelector('#entry');
const success = document.querySelector('#success');
const status = document.querySelector('#status');
const submit = form.querySelector('[type="submit"]');
const warning = document.querySelector('#idle-warning');
const phone = form.elements.phone;
let sending = false, resetTimer, idleTimer, warnTimer, seconds = 15;
const dateParts = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Chicago', year:'numeric', month:'2-digit', day:'2-digit'}).formatToParts(new Date());
form.elements.eventDate.min = ['year','month','day'].map(key => dateParts.find(x => x.type === key).value).join('-');
function stopTimers() { clearInterval(resetTimer); clearTimeout(idleTimer); clearTimeout(warnTimer); warning.hidden = true; }
function reset() {
  stopTimers(); form.reset(); phone.setCustomValidity(''); entry.hidden = false; success.hidden = true; sending = false;
  submit.disabled = false; submit.innerHTML = '<span>Get my quote</span><span aria-hidden="true">→</span>';
  status.className = 'status'; status.textContent = 'Takes less than 30 seconds. No payment required.';
}
function touch() {
  if (phoneMode || sending || !success.hidden) return;
  clearTimeout(idleTimer); clearTimeout(warnTimer); warning.hidden = true;
  if (!Array.from(form.elements).some(e => e.name && e.value)) return;
  warnTimer = setTimeout(() => { warning.hidden = false; }, 105000);
  idleTimer = setTimeout(reset, 120000);
}
form.addEventListener('input', touch);
form.addEventListener('change', touch);
phone.addEventListener('input', () => phone.setCustomValidity(''));
document.querySelector('#keep-going').addEventListener('click', touch);
document.querySelector('#start-over').addEventListener('click', () => { reset(); form.elements.firstName.focus(); });
if (phoneMode) {
  document.querySelector('#start-over').firstElementChild.textContent = 'Send another inquiry';
  document.querySelector('#reset-note').hidden = true;
}
const full = document.querySelector('#fullscreen');
if (!document.fullscreenEnabled) full.hidden = true;
full.addEventListener('click', async () => {
  try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); } catch { full.textContent = 'Use Chrome full screen'; }
});
document.addEventListener('fullscreenchange', () => { full.textContent = document.fullscreenElement ? 'Exit full screen ↙' : 'Full screen ↗'; });
const video = document.querySelector('#event-video');
if (matchMedia('(prefers-reduced-motion: reduce)').matches) { video.autoplay = false; video.pause(); }
form.addEventListener('submit', async event => {
  event.preventDefault(); if (sending) return;
  const digits = phone.value.replace(/\D/g,'').replace(/^1(?=\d{10}$)/,'');
  const valid = /^[2-9]\d{2}[2-9]\d{6}$/.test(digits) && !/^(\d)\1{9}$/.test(digits) && !['1234567890','9876543210','5555555555'].includes(digits);
  phone.setCustomValidity(valid ? '' : 'Please enter a valid 10-digit US phone number.');
  if (!form.reportValidity() || form.elements.website.value) return;
  stopTimers(); sending = true; submit.disabled = true; submit.firstElementChild.textContent = 'Sending…';
  status.className = 'status'; status.textContent = 'Sending your request…';
  const data = new FormData(form); data.delete('website');
  data.set('phone',digits); data.set('_subject',`AACT Booths expo inquiry — ${data.get('eventType')} — ${data.get('eventDate')}`);
  data.set('_template','table'); data.set('_captcha','false');
  data.set('source',phoneMode ? 'Expo QR / phone' : 'Expo Chromebook kiosk');
  data.set('offer','EVENT50 — $50 off when booked within 48 hours of inquiry');
  data.set('submittedAt',new Date().toISOString());
  if (data.get('email')) data.set('_replyto',data.get('email'));
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch('https://formsubmit.co/ajax/allaroundchitown@gmail.com',{method:'POST',headers:{Accept:'application/json'},body:data,signal:controller.signal});
    const result = await response.json();
    if (!response.ok || !(result.success === true || result.success === 'true')) throw new Error('Submission not accepted');
    form.reset(); phone.setCustomValidity(''); entry.hidden = true; success.hidden = false; success.focus();
    if (!phoneMode) { seconds = 15; document.querySelector('#countdown').textContent = seconds; resetTimer = setInterval(() => { seconds--; document.querySelector('#countdown').textContent = seconds; if (seconds <= 0) reset(); },1000); }
  } catch {
    status.className = 'status error'; status.textContent = 'We couldn’t confirm delivery. Please retry, scan the QR code, or call/text (224) 234-1473.';
  } finally {
    clearTimeout(timeout); sending = false; submit.disabled = false; submit.firstElementChild.textContent = 'Get my quote'; touch();
  }
});
window.addEventListener('pagehide', () => { stopTimers(); form.reset(); });
window.addEventListener('pageshow', event => { if (event.persisted) reset(); });
reset();
