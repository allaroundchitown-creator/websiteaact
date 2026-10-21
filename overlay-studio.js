(() => {
'use strict';
const studio = document.querySelector('.overlay-studio');
if (!studio) return;
const banner = studio.querySelector('.overlay-banner');
const copy = studio.querySelector('#overlay-copy');
const colors = {Black:'#111111',White:'#ffffff',Pink:'#f3a6c4',Blue:'#78b6e8'};
let background = 'White', ink = 'Black';
function render() {
 banner.style.setProperty('--overlay-bg', colors[background]);
 banner.style.setProperty('--overlay-ink', colors[ink]);
 banner.querySelector('span').textContent = copy.value || 'Your text here';
 studio.querySelector('.overlay-contrast').hidden = background !== ink;
}
studio.querySelectorAll('[data-colors]').forEach(group => {
 const type = group.dataset.colors;
 Object.entries(colors).forEach(([name,color]) => {
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'overlay-swatch';
  button.setAttribute('aria-label', name + (type === 'text' ? ' text' : ' background'));
  button.setAttribute('aria-pressed', String(name === (type === 'text' ? ink : background)));
  const circle = document.createElement('i'); circle.setAttribute('aria-hidden','true');
  circle.style.setProperty('--swatch',color);
  button.append(circle, document.createTextNode(name));
  button.addEventListener('click', () => {
   if (type === 'text') ink = name; else background = name;
   group.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
   render();
  });
  group.append(button);
 });
});
copy.addEventListener('input',render);
studio.querySelectorAll('[name="overlay-font"]').forEach(input => input.addEventListener('change', () => { banner.dataset.font = input.value; }));
const video = studio.querySelector('video');
const play = studio.querySelector('.overlay-playback');
play.addEventListener('click', () => {
 if (video.paused) video.play().catch(() => { play.textContent = 'Try playing again'; });
 else video.pause();
});
video.addEventListener('play', () => { play.textContent = 'Pause preview'; });
video.addEventListener('pause', () => { play.textContent = 'Play preview'; });
document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); });
render();
})();