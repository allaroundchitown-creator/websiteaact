(() => {
'use strict';
const studio=document.querySelector('.overlay-studio');
if(!studio)return;
const banner=studio.querySelector('.overlay-banner'),copy=studio.querySelector('#overlay-copy'),date=studio.querySelector('#overlay-event-date');
const colors={Black:'#111111',White:'#ffffff',Pink:'#f3a6c4',Blue:'#78b6e8',Transparent:'transparent'};
const key='aact-event-overlay-v1';
let background='White',ink='Black';
const font=()=>studio.querySelector('[name="overlay-font"]:checked').value;
const design=()=>({text:copy.value.trim(),date:date.value,font:font(),background,textColor:ink});
function fitLettering(){
 const title=banner.querySelector('.overlay-title');
 title.style.fontSize='';
 let size=parseFloat(getComputedStyle(title).fontSize);
 while(banner.scrollHeight>banner.clientHeight+1&&size>10){
  size-=1;title.style.fontSize=size+'px';
 }
}
function render(){
 banner.style.setProperty('--overlay-bg',colors[background]);
 banner.style.setProperty('--overlay-ink',colors[ink]);
 banner.dataset.font=font();banner.dataset.transparent=String(background==='Transparent');
 banner.querySelector('.overlay-title').textContent=copy.value||'Your text here';
 banner.querySelector('.overlay-date').textContent=date.value?date.value.split('-').slice(1).concat(date.value.split('-')[0]).join('.'):'';
 studio.querySelector('.overlay-contrast').hidden=background!==ink;
 studio.querySelectorAll('[data-colors]').forEach(group=>group.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.color===(group.dataset.colors==='text'?ink:background)))));
 requestAnimationFrame(fitLettering);
}
studio.querySelectorAll('[data-colors]').forEach(group=>{
 const type=group.dataset.colors;
 Object.entries(colors).filter(([name])=>type==='background'||name!=='Transparent').forEach(([name,color])=>{
  const button=document.createElement('button');button.type='button';button.className='overlay-swatch';button.dataset.color=name;
  button.setAttribute('aria-label',name+(type==='text'?' text':' background'));
  if(name==='Transparent')button.dataset.transparent='';
  const circle=document.createElement('i');circle.setAttribute('aria-hidden','true');circle.style.setProperty('--swatch',color);
  button.append(circle,document.createTextNode(name));
  button.addEventListener('click',()=>{if(type==='text')ink=name;else background=name;render();});
  group.append(button);
 });
});
copy.addEventListener('input',render);date.addEventListener('input',render);
studio.querySelectorAll('[name="overlay-font"]').forEach(input=>input.addEventListener('change',render));
try{
 const d=JSON.parse(localStorage.getItem(key));
 if(d&&typeof d.text==='string'&&d.text.length<=70&&['cursive','block'].includes(d.font)&&Object.hasOwn(colors,d.background)&&Object.hasOwn(colors,d.textColor)&&d.textColor!=='Transparent'&&typeof d.date==='string'&&(/^\d{4}-\d{2}-\d{2}$/.test(d.date)||d.date==='')){
  copy.value=d.text;date.value=d.date;background=d.background;ink=d.textColor;
  studio.querySelector('[name="overlay-font"][value="'+d.font+'"]').checked=true;
 }
}catch{}
studio.querySelector('.overlay-save').addEventListener('click',()=>{
 if(!copy.value.trim()){copy.focus();copy.setCustomValidity('Add your overlay text first.');copy.reportValidity();return;}
 if(!date.reportValidity())return;
 const d=design();
 const json=JSON.stringify(d);
 try{localStorage.setItem(key,json);}catch{}
 try{sessionStorage.setItem(key,json);}catch{}
 studio.querySelector('.overlay-save-status').textContent='Opening your booking form…';
 location.assign('/book#overlay='+encodeURIComponent(json));
});
copy.addEventListener('input',()=>copy.setCustomValidity(''));
const video=studio.querySelector('video'),play=studio.querySelector('.overlay-playback');
video.muted=true;video.defaultMuted=true;video.autoplay=true;
const start=()=>video.play().catch(()=>{play.textContent='Play preview';});
play.addEventListener('click',()=>{if(video.paused)start();else video.pause();});
video.addEventListener('play',()=>{play.textContent='Pause preview';});
video.addEventListener('pause',()=>{play.textContent='Play preview';});
document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else start();});
video.addEventListener('canplay',start,{once:true});
studio.addEventListener('pointerdown',()=>{if(video.paused)start();},{once:true});
new ResizeObserver(fitLettering).observe(banner);
if(document.fonts)document.fonts.ready.then(fitLettering);
render();start();
})();