(() => {
const track=document.querySelector('.guest-reviews-grid');
if(!track)return;
const cards=[...track.children];
cards.forEach(card=>{const clone=card.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.inert=true;track.append(clone);});
track.tabIndex=0;track.setAttribute('aria-label','Guest reviews. Scroll horizontally to read more.');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let visible=false,hover=false,focused=false,last=0,remainder=0,until=0;
const pause=()=>{until=performance.now()+5000;};
track.addEventListener('pointerenter',()=>{hover=true;});
track.addEventListener('pointerleave',()=>{hover=false;});
track.addEventListener('focusin',()=>{focused=true;});
track.addEventListener('focusout',()=>{focused=false;});
track.addEventListener('touchstart',pause,{passive:true});
track.addEventListener('wheel',pause,{passive:true});
track.addEventListener('keydown',pause);
document.querySelector('.review-next').addEventListener('click',()=>{pause();const card=track.children[0];track.scrollBy({left:card.getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap),behavior:reduced.matches?'auto':'smooth'});});
document.querySelector('.review-previous').addEventListener('click',()=>{pause();const card=track.children[0];if(track.scrollLeft<1)track.scrollLeft=track.children[cards.length].offsetLeft-track.children[0].offsetLeft;track.scrollBy({left:-(card.getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap)),behavior:reduced.matches?'auto':'smooth'});});
if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}).observe(track);else visible=true;
function frame(now){
const delta=last?Math.min(now-last,64):0;last=now;
if(visible&&!document.hidden&&!hover&&!focused&&!reduced.matches&&now>until){
 remainder+=delta*.025;const pixels=Math.floor(remainder);remainder-=pixels;
 track.scrollLeft+=pixels;
 const width=track.children[cards.length].offsetLeft-track.children[0].offsetLeft;
 if(width&&track.scrollLeft>=width)track.scrollLeft-=width;
}
requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
})();