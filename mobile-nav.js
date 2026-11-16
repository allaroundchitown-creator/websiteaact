/* Mobile navigation for the pink-theme pages: adds a menu button that opens the header links on small screens. */
(() => {
  'use strict';
  const header = document.querySelector('body > header');
  const nav = header && header.querySelector('.nav');
  if (!nav || header.querySelector('.nav-toggle')) return;

  nav.id = nav.id || 'site-nav';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'nav-toggle';
  button.setAttribute('aria-controls', nav.id);
  button.innerHTML = '<span></span><span></span><span></span>';
  nav.parentNode.appendChild(button);

  // The header button is hidden on narrow phones, so the menu carries its own.
  const cta = header.querySelector('.wrap > a.btn');
  if (cta) {
    const link = document.createElement('a');
    link.className = 'nav-cta';
    link.href = cta.getAttribute('href');
    link.textContent = cta.textContent;
    nav.appendChild(link);
  }

  const setOpen = (open) => {
    header.classList.toggle('nav-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  setOpen(false);
  header.classList.add('nav-ready');

  button.addEventListener('click', () => setOpen(!header.classList.contains('nav-open')));
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('click', (event) => { if (!header.contains(event.target)) setOpen(false); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('nav-open')) { setOpen(false); button.focus(); }
  });
  const desktop = matchMedia('(min-width:901px)');
  desktop.addEventListener('change', () => { if (desktop.matches) setOpen(false); });
})();
