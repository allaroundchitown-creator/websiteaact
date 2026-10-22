(() => {
'use strict';
const studio=document.querySelector('.overlay-studio');
if(!studio)return;
const banner=studio.querySelector('.overlay-banner'),copy=studio.querySelector('#overlay-copy'),date=studio.querySelector('#overlay-event-date');
const colors={Black:'#111111',White:'#ffffff',Pink:'#f3a6c4',Blue:'#78b6e8',Transparent:'transparent'};
const form=document.querySelector('#events-inquiry'),summary=form.querySelector('.overlay-saved-summary');
const key='aact-event-overlay-v1';
let background='White',ink='Black',saved=null;
const font=()=>studio.querySelector('[name="overlay-font"]:checked').value;
const design=()=>({text:copy.value.trim(),date:date.value,font:font(),background,textColor:ink});
function render(){
 banner.style.setProperty('--overlay-bg',colors[background]);
 banner.style.setProperty('--overlay-ink',colors[ink]);
 banner.dataset.font=font();banner.dataset.transparent=String(background==='Transparent');
 banner.querySelector('.overlay-title').textContent=copy.value||'Your text here';
 banner.querySelector('.overlay-date').textContent=date.value?date.value.split('-').slice(1).concat(date.value.split('-')[0]).join('.'):'';
 studio.querySelector('.overlay-contrast').hidden=background!==ink;
 studio.querySelectorAll('[data-colors]').forEach(group=>group.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.color===(group.dataset.colors==='text'?ink:background)))));
}
function attach(d){
 saved=d;
 const fields={overlayText:d.text,overlayDate:d.date,overlayFont:d.font,overlayBackground:d.background,overlayTextColor:d.textColor};
 Object.entries(fields).forEach(([name,value])=>{form.elements[name].value=value;});
 if(d.date)form.elements.date.value=d.date;
 summary.hidden=false;summary.textContent='Your saved overlay: '+d.text+(d.date?' • '+d.date:'')+'\n'+d.font+' lettering • '+d.background+' background • '+d.textColor+' text';
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
  studio.querySelector('[name="overlay-font"][value="'+d.font+'"]').checked=true;attach(d);
 }
}catch{}
studio.querySelector('.overlay-save').addEventListener('click',()=>{
 if(!copy.value.trim()){copy.focus();copy.setCustomValidity('Add your overlay text first.');copy.reportValidity();return;}
 if(!date.reportValidity())return;
 const d=design();attach(d);
 const json=JSON.stringify(d);
 try{localStorage.setItem(key,json);}catch{}
 try{sessionStorage.setItem(key,json);}catch{}
 studio.querySelector('.overlay-save-status').textContent='Opening your booking form…';
 location.assign('/book#overlay='+encodeURIComponent(json));
});
copy.addEventListener('input',()=>copy.setCustomValidity(''));
form.addEventListener('submit',()=>{if(saved)attach({...saved,date:form.elements.date.value});},true);
const video=studio.querySelector('video'),play=studio.querySelector('.overlay-playback');
video.muted=true;video.defaultMuted=true;video.autoplay=true;
const start=()=>video.play().catch(()=>{play.textContent='Play preview';});
play.addEventListener('click',()=>{if(video.paused)start();else video.pause();});
video.addEventListener('play',()=>{play.textContent='Pause preview';});
video.addEventListener('pause',()=>{play.textContent='Play preview';});
document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else start();});
video.addEventListener('canplay',start,{once:true});
studio.addEventListener('pointerdown',()=>{if(video.paused)start();},{once:true});
render();start();
})();