(() => {
'use strict';
const hero=document.querySelector('.hero');
const video=hero?.querySelector('video');
const poster=hero?.querySelector('.hero-poster img');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
if(video&&poster){
 let started=false;
 const start=()=>{
  if(started||reduced.matches)return;
  started=true;
  video.muted=true;video.defaultMuted=true;
  video.poster=poster.currentSrc||poster.src;
  video.src=matchMedia('(max-width:700px)').matches?video.dataset.mobileSrc:video.dataset.desktopSrc;
  video.addEventListener('playing',()=>video.classList.add('is-playing'),{once:true});
  video.load();video.play().catch(()=>{});
 };
 const afterPoster=()=>{
  const schedule=()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{
   if('requestIdleCallback' in window)requestIdleCallback(start,{timeout:1200});else setTimeout(start,0);
  }));
  if(poster.decode)poster.decode().catch(()=>{}).then(schedule);else schedule();
 };
 if(poster.complete)afterPoster();else{
  poster.addEventListener('load',afterPoster,{once:true});
  poster.addEventListener('error',afterPoster,{once:true});
 }
 const toggle=document.getElementById('hero-toggle');
 if(toggle)toggle.addEventListener('click',()=>{if(!started)start();else if(video.paused)video.play().catch(()=>{});else video.pause();});
 hero.addEventListener('pointerdown',()=>{if(started&&video.paused&&!reduced.matches)video.play().catch(()=>{});},{once:true});
 document.addEventListener('visibilitychange',()=>{
  if(document.hidden)video.pause();
  else if(started&&!reduced.matches)video.play().catch(()=>{});
 });
 reduced.addEventListener('change',()=>{if(reduced.matches)video.pause();else start();});
}
const lazyVideos=[...document.querySelectorAll('video[data-lazy-video]')];
const loadVideo=target=>{
 if(target.dataset.mediaLoaded)return;
 target.dataset.mediaLoaded='true';
 if(target.dataset.poster)target.poster=target.dataset.poster;
 if(reduced.matches)return;
 target.querySelectorAll('source[data-src]').forEach(source=>{source.src=source.dataset.src;});
 target.muted=true;target.defaultMuted=true;target.loop=true;
 target.load();target.play().catch(()=>{});
};
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){loadVideo(entry.target);observer.unobserve(entry.target);}
 }),{rootMargin:'250px 0px',threshold:0});
 lazyVideos.forEach(target=>observer.observe(target));
}else{
 const near=()=>{
  lazyVideos.forEach(target=>{if(target.getBoundingClientRect().top<innerHeight+250)loadVideo(target);});
 };
 window.addEventListener('scroll',near,{passive:true});near();
}
})();