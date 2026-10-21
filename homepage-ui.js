(() => {
  'use strict';
  const video = document.querySelector('.hero video');
  const button = document.querySelector('#hero-toggle');
  if (!video || !button) return;
  function update() {
    button.textContent = video.paused ? 'Play video' : 'Pause video';
    button.setAttribute('aria-label', `${video.paused ? 'Play' : 'Pause'} background video`);
  }
  video.addEventListener('play', update);
  video.addEventListener('pause', update);
  button.addEventListener('click', () => {
    if (video.paused) {
      const promise = video.play();
      if (promise && promise.catch) promise.catch(update);
    } else video.pause();
  });
  update();
})();
