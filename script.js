const typography = document.createElement('style');
typography.textContent = `
  :root {
    --ink: #202020;
    --gold: #d7be8a;
    --gold-dark: #9a7538;
    --cream: #faf7f0;
    --line: #ded5c5;
    --muted: #6f685d;
    --white: #fffdfa;
  }
  body { background: #fffdfa; }
  .site-header { background: rgba(250, 247, 240, .97); }
  .hero, .videos, .book { background: #fffdfa; }
  .site-header .brand { width: 285px; height: 70px; overflow: hidden; }
  .site-header .brand-logo { width: 100%; height: 100%; object-fit: contain; object-position: left center; }
  .footer-brand { display: inline-flex; flex-direction: column; align-items: flex-start; width: auto; height: auto; padding: 0; background: transparent; border: 0; border-radius: 0; }
  .footer-wordmark { font-family: var(--display); font-size: clamp(28px, 3vw, 42px); font-weight: 800; line-height: .95; letter-spacing: -.045em; }
  .footer-aact { color: #d7be8a; }
  .footer-booths { color: #fffdfa; }
  .footer-tagline { margin-top: 10px; color: #d7be8a; font-size: 11px; font-weight: 800; letter-spacing: .22em; }
  .hero h1 { font-size: clamp(40px, 4vw, 60px); }
  .section-title h2, .included-heading h2 { font-size: clamp(30px, 3.2vw, 44px); }
  .booking-card h2 { font-size: clamp(30px, 3.2vw, 42px); }
  .perfect-for { overflow: hidden; background: #202020; color: #faf7f0; border-top: 1px solid #4b453b; border-bottom: 1px solid #4b453b; }
  .perfect-for-track { display: flex; width: max-content; animation: perfectForRoll 28s linear infinite; }
  .perfect-for-group { display: flex; align-items: center; flex-shrink: 0; gap: 34px; padding: 21px 17px; white-space: nowrap; }
  .perfect-for-label { color: #d7be8a; font-size: 12px; font-weight: 800; letter-spacing: .14em; }
  .perfect-for-item { font-family: var(--display); font-size: 17px; font-weight: 700; letter-spacing: -.01em; }
  .perfect-for-dot { color: #d7be8a; font-size: 13px; }
  .real-event-gallery { padding: 90px 6%; background: #202020; color: #fffdfa; }
  .real-event-gallery-header { max-width: 1180px; margin: 0 auto 36px; display: flex; justify-content: space-between; align-items: end; gap: 32px; }
  .real-event-gallery-header h2 { margin: 7px 0 0; max-width: 680px; font-family: var(--display); font-size: clamp(34px, 4vw, 58px); line-height: 1; letter-spacing: -.045em; }
  .real-event-gallery-header p:last-child { max-width: 410px; color: #c9c1b4; line-height: 1.65; }
  .real-event-gallery-grid { max-width: 1180px; margin: auto; display: grid; grid-template-columns: .9fr 1.25fr; gap: 18px; }
  .real-event-photo { position: relative; min-height: 620px; overflow: hidden; background: #111; }
  .real-event-photo img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .7s ease; }
  .real-event-photo:hover img { transform: scale(1.025); }
  .real-event-photo figcaption { position: absolute; inset: auto 0 0; padding: 52px 28px 24px; background: linear-gradient(transparent, rgba(0,0,0,.88)); }
  .real-event-photo small { display: block; color: #d7be8a; font-weight: 800; letter-spacing: .14em; margin-bottom: 7px; }
  .real-event-photo b { font-family: var(--display); font-size: 24px; }
  @keyframes perfectForRoll { to { transform: translateX(-50%); } }
  @media (prefers-reduced-motion: reduce) { .perfect-for-track { animation: none; } }
  @media (max-width: 760px) {
    .site-header .brand { width: 220px; height: 58px; }
    .hero h1 { font-size: 34px; }
    .section-title h2, .included-heading h2 { font-size: 30px; }
    .real-event-gallery { padding: 68px 5%; }
    .real-event-gallery-header { display: block; }
    .real-event-gallery-grid { grid-template-columns: 1fr; }
    .real-event-photo { min-height: 470px; }
  }
  @media (max-width: 420px) {
    .hero h1 { font-size: 31px; }
  }
`;
document.head.append(typography);

const trackConversion = (eventName, parameters = {}) => {
  if (typeof window.gtag === 'function') window.gtag('event', eventName, parameters);
};

const perfectForItems = ['Weddings', 'Corporate Events', 'Quinceañeras', 'Birthdays', 'School Events', 'Brand Activations'];
const perfectForGroup = () => `
  <div class="perfect-for-group">
    <span class="perfect-for-label">PERFECT FOR</span>
    ${perfectForItems.map((item) => `<span class="perfect-for-dot">✦</span><span class="perfect-for-item">${item}</span>`).join('')}
    <span class="perfect-for-dot">✦</span>
  </div>
`;
const perfectForBar = document.createElement('div');
perfectForBar.className = 'perfect-for';
perfectForBar.setAttribute('aria-label', `Perfect for ${perfectForItems.join(', ')}`);
perfectForBar.innerHTML = `<div class="perfect-for-track">${perfectForGroup()}${perfectForGroup()}</div>`;
perfectForBar.querySelector('.perfect-for-group:last-child').setAttribute('aria-hidden', 'true');
document.querySelector('.hero').insertAdjacentElement('afterend', perfectForBar);

const reviewTrack = document.querySelector('.review-track');
const reviewGroup = document.querySelector('.review-group');
if (reviewTrack && reviewGroup) {
  const reviewClone = reviewGroup.cloneNode(true);
  reviewClone.setAttribute('aria-hidden', 'true');
  reviewTrack.append(reviewClone);
}

const videosSection = document.querySelector('.videos');
const eventGallery = document.createElement('section');
eventGallery.className = 'real-event-gallery';
eventGallery.setAttribute('aria-labelledby', 'real-event-gallery-title');
eventGallery.innerHTML = `
  <div class="real-event-gallery-header">
    <div><p class="eyebrow">REAL CHICAGOLAND EVENTS</p><h2 id="real-event-gallery-title">The energy looks even better in person.</h2></div>
    <p>From the booth setup to the finished wedding moment, these are real celebrations captured with AACT Booths.</p>
  </div>
  <div class="real-event-gallery-grid">
    <figure class="real-event-photo">
      <img src="https://all-around-chi-town-360.noah630.chatgpt.site/assets/real-360-booth.webp" width="1206" height="1309" loading="lazy" alt="Guest enjoying the AACT 360 photo booth with bubbles and event lighting">
      <figcaption><small>THE 360 EXPERIENCE</small><b>A full event setup guests notice</b></figcaption>
    </figure>
    <figure class="real-event-photo">
      <img src="https://all-around-chi-town-360.noah630.chatgpt.site/assets/wedding-360-moment.webp" width="941" height="1260" loading="lazy" alt="Newlyweds celebrating in confetti during their AACT 360 wedding video">
      <figcaption><small>REAL WEDDING</small><b>The kind of moment guests keep sharing</b></figcaption>
    </figure>
  </div>`;
videosSection.insertAdjacentElement('afterend', eventGallery);
const includedSection = document.createElement('section');
includedSection.className = 'details included';
document.querySelector('.reviews').insertAdjacentElement('afterend', includedSection);

const includedHeading = document.querySelector('.included-heading');
includedHeading.style.marginTop = '0';
includedSection.append(includedHeading, document.querySelector('.included-grid'));

const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu');

menu.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? '×' : '☰';
});

document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
  header.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.textContent = '☰';
}));

document.querySelectorAll('.accordion details').forEach((detail) => detail.addEventListener('toggle', () => {
  if (detail.open) document.querySelectorAll('.accordion details').forEach((other) => {
    if (other !== detail) other.open = false;
  });
}));

document.querySelectorAll('[data-track-contact]').forEach((link) => link.addEventListener('click', () => {
  trackConversion('contact_click', { method: link.dataset.trackContact });
}));

const phoneInput = document.querySelector('input[name="phone"]');
const fakePhoneNumbers = new Set([
  '0000000000', '1111111111', '1234567890', '0123456789',
  '9876543210', '0987654321', '1231231234', '5555555555'
]);

const validatePhone = () => {
  const digits = phoneInput.value.replace(/\D/g, '');
  const hasValidNanpShape = /^[2-9]\d{2}[2-9]\d{6}$/.test(digits);
  const isRepeatedNumber = /^(\d)\1{9}$/.test(digits);
  const isFake = fakePhoneNumbers.has(digits) || isRepeatedNumber;
  phoneInput.setCustomValidity(
    digits.length === 10 && hasValidNanpShape && !isFake
      ? ''
      : 'Enter a valid 10-digit phone number.'
  );
  return phoneInput.checkValidity();
};

phoneInput.addEventListener('input', () => phoneInput.setCustomValidity(''));
phoneInput.addEventListener('blur', validatePhone);

document.getElementById('quickQuoteForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!validatePhone()) {
    phoneInput.reportValidity();
    phoneInput.focus();
    return;
  }
  const note = document.getElementById('formNote');
  const button = form.querySelector('button[type="submit"]');
  const originalButtonText = button.innerHTML;
  const formData = new FormData(form);

  formData.append('_subject', `New website lead from ${formData.get('firstName')}`);
  formData.append('_template', 'table');
  formData.append('_captcha', 'false');
  formData.append('_honey', '');
  formData.append('submittedAt', new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    dateStyle: 'full',
    timeStyle: 'short'
  }));

  button.disabled = true;
  button.textContent = 'Sending…';
  note.textContent = 'Sending your request…';
  note.classList.remove('success');

  try {
    const response = await fetch('https://formsubmit.co/ajax/allaroundchitown@gmail.com', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData
    });

    if (!response.ok) throw new Error('Submission failed');

    form.reset();
    note.textContent = 'Thanks! Your request was sent. We’ll contact you shortly.';
    note.classList.add('success');
    trackConversion('generate_lead', {
      event_category: 'engagement',
      event_type: formData.get('eventType')
    });
  } catch (error) {
    note.textContent = 'We couldn’t send your request. Please call or text (224) 234-1473.';
    note.classList.remove('success');
  } finally {
    button.disabled = false;
    button.innerHTML = originalButtonText;
  }
});
