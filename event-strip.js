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
    clone.inert = true;
    track.append(clone);
  });
  const videos = [...track.querySelectorAll('video')];
  videos.forEach(video => { video.muted = true; });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let running = !reduced.matches;
  let sectionVisible = false;
  let frame = null;
  let lastTime = null;
  let cycleWidth = 0;
  let drag = null;
  const visible = new Set();
  function measure() { cycleWidth = track.children[originals.length].offsetLeft - track.children[0].offsetLeft; }
  function play(video) {
    const source = video.querySelector('source[data-src]');
    if (source) { source.src = source.dataset.src; source.removeAttribute('data-src'); video.load(); }
    const promise = video.play();
    if (promise && promise.catch) promise.catch(() => {});
  }
  function syncVideos() {
    videos.forEach(video => {
      if (running && sectionVisible && !document.hidden && visible.has(video)) play(video);
      else video.pause();
    });
  }
  function tick(now) {
    frame = null;
    if (!running || !sectionVisible || document.hidden) { lastTime = null; return; }
    if (lastTime !== null && cycleWidth > 0) {
      viewport.scrollLeft += Math.min(now - lastTime, 64) * 0.028;
      if (viewport.scrollLeft >= cycleWidth) viewport.scrollLeft -= cycleWidth;
    }
    lastTime = now;
    frame = requestAnimationFrame(tick);
  }
  function syncMotion() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null; lastTime = null;
    button.textContent = running ? 'Pause strip' : 'Play strip';
    button.setAttribute('aria-label', running ? 'Pause scrolling and videos' : 'Play scrolling video strip');
    syncVideos();
    if (running && sectionVisible && !document.hidden) frame = requestAnimationFrame(tick);
  }
  function setRunning(value) { running = value; syncMotion(); }
  button.addEventListener('click', () => setRunning(!running));
  viewport.addEventListener('pointerdown', event => {
    setRunning(false);
    if (event.pointerType === 'mouse' && event.button === 0) {
      drag = { x: event.clientX, scroll: viewport.scrollLeft };
      viewport.setPointerCapture(event.pointerId);
      viewport.setAttribute('data-dragging', '');
    }
  });
  viewport.addEventListener('pointermove', event => {
    if (!drag) return;
    viewport.scrollLeft = drag.scroll + drag.x - event.clientX;
    event.preventDefault();
  });
  const stopDragging = () => { drag = null; viewport.removeAttribute('data-dragging'); };
  viewport.addEventListener('pointerup', stopDragging);
  viewport.addEventListener('pointercancel', stopDragging);
  viewport.addEventListener('wheel', event => { if (Math.abs(event.deltaX) > 0 || event.shiftKey) setRunning(false); }, { passive: true });
  viewport.addEventListener('keydown', event => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) setRunning(false); });
  viewport.addEventListener('focus', () => setRunning(false));
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
    const clipObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target); });
      syncVideos();
    }, { root: viewport, rootMargin: '0px 100px', threshold: 0.01 });
    videos.forEach(video => clipObserver.observe(video));
  } else {
    // Keep the strip manually scrollable when viewport observers are unavailable.
    running = false;
  }
  syncMotion();
})();
