(() => {
  'use strict';
  const strip = document.querySelector('.event-strip');
  if (!strip) return;
  const viewport = strip.querySelector('.event-strip-viewport');
  const track = strip.querySelector('.event-strip-track');
  const button = strip.querySelector('.event-strip-toggle');
  const originals = [...track.children];
  originals.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');

    track.append(clone);
  });
  const videos = [...track.querySelectorAll('video')];
  videos.forEach(video => { video.muted = true; });
  const player = document.createElement('dialog');
  player.className = 'event-strip-player';
  player.setAttribute('aria-label', 'Event video player');
  player.innerHTML = '<button type="button" aria-label="Close video">Close ×</button><video controls playsinline preload="none"></video>';
  document.body.append(player);
  const playerVideo = player.querySelector('video');
  let resumeAfterPlayer = false;
  player.querySelector('button').addEventListener('click', () => player.close());
  player.addEventListener('click', event => { if (event.target === player) { const r = player.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) player.close(); } });
  player.addEventListener('close', () => { playerVideo.pause(); playerVideo.removeAttribute('src'); playerVideo.load(); setRunning(resumeAfterPlayer); });
  [...track.children].forEach((card, index) => {
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'event-strip-play';
    trigger.setAttribute('aria-label', `Play event video ${index % originals.length + 1}`);
    trigger.innerHTML = '<span aria-hidden="true">▶</span>';
    if (index >= originals.length) trigger.tabIndex = -1;
    card.append(trigger);
    trigger.addEventListener('keydown', () => { suppressClick = false; runningBeforePointer = null; });
    trigger.addEventListener('click', event => {
      if (suppressClick) { event.preventDefault(); return; }
      resumeAfterPlayer = runningBeforePointer ?? running;
      runningBeforePointer = null;
      setRunning(false);
      const video = card.querySelector('video');
      playerVideo.src = video.querySelector('source').dataset.src || video.querySelector('source').src;
      player.showModal();
      playerVideo.play().catch(() => {});
    });
  });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let running = !reduced.matches;
  let sectionVisible = false;
  let frame = null;
  let lastTime = null;
  let cycleWidth = 0;
  let scrollRemainder = 0;
  let drag = null;
  let suppressClick = false;
  let runningBeforePointer = null;
  function measure() { cycleWidth = track.children[originals.length].offsetLeft - track.children[0].offsetLeft; }
  function tick(now) {
    frame = null;
    if (!running || !sectionVisible || document.hidden || player.open) { lastTime = null; return; }
    if (lastTime !== null && cycleWidth > 0) {
      scrollRemainder += Math.min(now - lastTime, 64) * 0.028;
      const pixels = Math.floor(scrollRemainder);
      scrollRemainder -= pixels;
      viewport.scrollLeft += pixels;
      if (viewport.scrollLeft >= cycleWidth) viewport.scrollLeft -= cycleWidth;
    }
    lastTime = now;
    frame = requestAnimationFrame(tick);
  }
  function syncMotion() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null; lastTime = null;
    button.textContent = running ? 'Pause strip' : 'Play strip';
    button.setAttribute('aria-label', running ? 'Pause scrolling' : 'Resume scrolling');
    if (running && sectionVisible && !document.hidden) frame = requestAnimationFrame(tick);
  }
  function setRunning(value) { running = value; syncMotion(); }
  button.addEventListener('click', () => setRunning(!running));
  viewport.addEventListener('pointerdown', event => {
    runningBeforePointer = running;
    suppressClick = false;
    if (event.pointerType === 'mouse' && event.button === 0) {
      drag = { x: event.clientX, scroll: viewport.scrollLeft };

      viewport.setAttribute('data-dragging', '');
    }
  });
  viewport.addEventListener('pointermove', event => {
    if (!drag) return;
    if (Math.abs(drag.x - event.clientX) < 6 && !suppressClick) return;
    suppressClick = true;
    setRunning(false);
    viewport.scrollLeft = drag.scroll + drag.x - event.clientX;
    event.preventDefault();
  });
  const stopDragging = () => { drag = null; viewport.removeAttribute('data-dragging'); };
  window.addEventListener('pointerup', stopDragging);
  viewport.addEventListener('pointercancel', stopDragging);
  viewport.addEventListener('wheel', event => { if (Math.abs(event.deltaX) > 0 || event.shiftKey) setRunning(false); }, { passive: true });
  viewport.addEventListener('keydown', event => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) setRunning(false); });

  reduced.addEventListener('change', () => { if (reduced.matches) setRunning(false); });
  document.addEventListener('visibilitychange', syncMotion);
  measure();
  if ('ResizeObserver' in window) {
    const resize = new ResizeObserver(measure);
    resize.observe(track); resize.observe(viewport);
  } else window.addEventListener('resize', measure);
  if ('IntersectionObserver' in window) {
    const pageObserver = new IntersectionObserver(entries => { sectionVisible = entries[0].isIntersecting; syncMotion(); }, { threshold: 0.01 });
    pageObserver.observe(strip);
  } else {
    // Keep the strip manually scrollable when viewport observers are unavailable.
    running = false;
  }
  syncMotion();
})();
