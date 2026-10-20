(() => {
  'use strict';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const mainForm = document.querySelector('#availability-form');
  const designForm = document.querySelector('#design-form');
  const dialog = document.querySelector('#design-dialog');
  const dateBar = document.querySelector('#mobile-date-bar');
  const section = document.querySelector('#availability');
  const endpoint = 'https://formsubmit.co/ajax/allaroundchitown@gmail.com';
  const attributionKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'ttclid'];
  const attribution = {};
  const search = new URLSearchParams(location.search);
  attributionKeys.forEach(key => { const value = search.get(key); if (value) attribution[key] = value.slice(0, 500); });
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const today = ['year', 'month', 'day'].map(key => parts.find(part => part.type === key).value).join('-');
  const eventTypes = new Set(['Wedding', 'Quinceañera', 'Birthday', 'Sweet 16', 'Corporate Event', 'School Event', 'Other']);
  function track(name, values = {}) { if (typeof window.gtag === 'function') window.gtag('event', name, { landing_page: 'check_my_date', ...values }); }
  function validPhone(raw) {
    const digits = raw.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
    return /^[2-9]\d{2}[2-9]\d{6}$/.test(digits) && !/^(\d)\1{9}$/.test(digits) && !['1234567890', '9876543210', '5555555555'].includes(digits) ? digits : null;
  }
  let formInView = false;
  function syncDateBar() { dateBar.hidden = formInView || dialog.open; }
  document.querySelectorAll('[data-date-cta]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    track('availability_cta_click', { cta_location: link.dataset.dateCta });
    section.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
    mainForm.elements.firstName.focus({ preventScroll: true });
  }));
  document.querySelector('[data-open-design]').addEventListener('click', () => {
    if (typeof dialog.showModal !== 'function') { section.scrollIntoView({ behavior: 'auto' }); return; }
    dialog.showModal(); designForm.elements.firstName.focus(); document.body.classList.add('modal-open'); syncDateBar(); track('free_design_open');
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); syncDateBar(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
  document.querySelector('#year').textContent = String(new Date().getFullYear());
  [mainForm, designForm].forEach(form => {
    const fields = form.elements;
    const status = form.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');
    fields.eventDate.min = today;
    let sending = false, started = false;
    form.addEventListener('focusin', () => { if (!started) { started = true; track('lead_form_start', { lead_type: form.dataset.leadKind }); } });
    if (fields.phone) fields.phone.addEventListener('input', () => fields.phone.setCustomValidity(''));
    fields.eventDate.addEventListener('input', () => fields.eventDate.setCustomValidity(''));
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (sending || fields._honey.value) return;
      const phone = fields.phone ? validPhone(fields.phone.value) : null;
      if (fields.phone) fields.phone.setCustomValidity(phone ? '' : 'Please enter a valid 10-digit US phone number.');
      fields.eventDate.setCustomValidity(fields.eventDate.value && fields.eventDate.value < today ? 'Please select today or a future event date.' : '');
      if (!form.reportValidity() || !eventTypes.has(fields.eventType.value)) return;
      const data = new FormData(form);
      data.set('firstName', fields.firstName.value.trim());
      data.set('email', fields.email.value.trim());
      if (!data.get('firstName')) { fields.firstName.focus(); return; }
      if (phone) data.set('phone', phone);
      const kind = form.dataset.leadKind;
      data.set('_subject', `${kind === 'free_overlay' ? 'FREE OVERLAY PREVIEW' : 'CHECK MY DATE'} — ${fields.eventType.value} — ${fields.eventDate.value}`);
      data.set('_template', 'table'); data.set('_captcha', 'false');
      data.set('leadType', kind); data.set('source', 'AACT Check My Date landing page');
      data.set('landingPage', location.origin + location.pathname);
      data.set('submittedAt', new Date().toISOString());
      Object.entries(attribution).forEach(([key, value]) => data.set(key, value));
      const originalButton = button.innerHTML;
      sending = true; button.disabled = true; button.textContent = 'SENDING…'; form.setAttribute('aria-busy', 'true');
      status.className = 'form-status'; status.textContent = 'Sending your request…';
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      try {
        const response = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: data, signal: controller.signal });
        const result = await response.json();
        if (!response.ok || !(result.success === true || result.success === 'true')) throw new Error('Submission not confirmed');
        form.reset(); fields.eventDate.min = today;
        status.className = 'form-status success';
        status.textContent = kind === 'free_overlay' ? 'You’re on the list! We’ll email you to discuss your event’s design and create your free overlay preview. No booking required.' : 'You’re in! We’ll contact you with availability and options for your event. Your date is not reserved until availability is agreed and the deposit is received.';
        track('generate_lead', { lead_type: kind, lead_source: 'check_my_date' });
      } catch {
        status.className = 'form-status error';
        status.textContent = 'We couldn’t confirm delivery. Your details are still here. Please try again or call/text (224) 234-1473.';
      } finally {
        clearTimeout(timeout); sending = false; button.disabled = false; button.innerHTML = originalButton; form.removeAttribute('aria-busy');
      }
    });
  });
  const videos = [...document.querySelectorAll('video')];
  const userPaused = new WeakSet();
  function loadVideo(video) { const source = video.querySelector('source[data-src]'); if (source) { source.src = source.dataset.src; source.removeAttribute('data-src'); video.load(); } }
  function playVideo(video) { loadVideo(video); const result = video.play(); if (result && result.catch) result.catch(() => {}); }
  videos.forEach(video => {
    video.muted = true;
    const control = document.querySelector(`[data-video="${video.id}"]`);
    const update = () => { control.textContent = video.paused ? 'Play video ▶' : 'Pause video Ⅱ'; control.setAttribute('aria-label', `${video.paused ? 'Play' : 'Pause'} ${video.id === 'hero-video' ? 'background' : 'event'} video`); };
    video.addEventListener('play', update); video.addEventListener('pause', update);
    control.addEventListener('click', () => { if (video.paused) { userPaused.delete(video); playVideo(video); } else { userPaused.add(video); video.pause(); } });
    if (reducedMotion.matches) { video.autoplay = false; video.pause(); }
    update();
  });
  if ('IntersectionObserver' in window) {
    const formObserver = new IntersectionObserver(entries => { formInView = entries[0].isIntersecting; syncDateBar(); }, { threshold: 0 });
    formObserver.observe(mainForm);
    const videoObserver = new IntersectionObserver(entries => entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting && !reducedMotion.matches && !userPaused.has(target) && !document.hidden) playVideo(target);
      else if (!isIntersecting) target.pause();
    }), { threshold: 0.25 });
    videos.forEach(video => videoObserver.observe(video));
    if (!reducedMotion.matches) {
      document.body.classList.add('has-reveals');
      const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } }), { threshold: 0.08 });
      document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
    }
  }
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) { videos.forEach(video => video.pause()); document.body.classList.remove('has-reveals'); } });
  document.addEventListener('visibilitychange', () => {
    videos.forEach(video => {
      if (document.hidden) video.pause();
      else if (!reducedMotion.matches && !userPaused.has(video)) {
        const rect = video.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) playVideo(video);
      }
    });
  });
})();
