const autoplayVideos = [...document.querySelectorAll('video')];

const prepareVideo = (video) => {
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.controls = false;
  video.setAttribute('autoplay', '');
  video.setAttribute('muted', '');
  video.setAttribute('loop', '');
  video.setAttribute('playsinline', '');
  video.removeAttribute('controls');
};

const startVideos = () => {
  autoplayVideos.forEach((video) => {
    prepareVideo(video);
    const playback = video.play();
    if (playback && typeof playback.catch === 'function') playback.catch(() => {});
  });
};

autoplayVideos.forEach((video) => {
  prepareVideo(video);
  video.addEventListener('canplay', startVideos, { once: true });
});

startVideos();
window.addEventListener('pageshow', startVideos);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) startVideos();
});

['pointerdown', 'touchstart', 'keydown'].forEach((eventName) => {
  document.addEventListener(eventName, startVideos, { once: true, passive: true });
});
