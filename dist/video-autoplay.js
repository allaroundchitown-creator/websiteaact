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

const playVideo = (video) => {
  prepareVideo(video);
  const playback = video.play();
  if (playback && typeof playback.catch === 'function') playback.catch(() => {});
};

autoplayVideos.forEach((video) => {
  prepareVideo(video);
  video.addEventListener('canplay', () => playVideo(video), { once: true });
});

const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) playVideo(entry.target);
    else if (!entry.target.closest('.hero,.seo-hero')) entry.target.pause();
  });
}, { rootMargin: '180px 0px' }) : null;

autoplayVideos.forEach((video) => observer ? observer.observe(video) : playVideo(video));
window.addEventListener('pageshow', () => autoplayVideos.filter(video => video.getBoundingClientRect().top < innerHeight).forEach(playVideo));
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) autoplayVideos.filter(video => video.getBoundingClientRect().top < innerHeight).forEach(playVideo);
});

['pointerdown', 'touchstart', 'keydown'].forEach((eventName) => {
  document.addEventListener(eventName, () => autoplayVideos.filter(video => video.getBoundingClientRect().top < innerHeight).forEach(playVideo), { once: true, passive: true });
});
