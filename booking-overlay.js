(() => {
'use strict';
const form=document.getElementById('bookingForm');
if(!form)return;
const key='aact-event-overlay-v1';
const colors={Black:'#111111',White:'#ffffff',Pink:'#f3a6c4',Blue:'#78b6e8',Transparent:'transparent'};
function validate(d){
 return d&&typeof d.text==='string'&&d.text.trim().length>0&&d.text.length<=70&&['cursive','block'].includes(d.font)&&Object.hasOwn(colors,d.background)&&Object.hasOwn(colors,d.textColor)&&d.textColor!=='Transparent'&&typeof d.date==='string'&&(d.date===''||/^\d{4}-\d{2}-\d{2}$/.test(d.date));
}
let design=null;
try{
 const fragment=new URLSearchParams(location.hash.slice(1)).get('overlay');
 const value=fragment||sessionStorage.getItem(key)||localStorage.getItem(key);
 const parsed=value?JSON.parse(value):null;
 if(validate(parsed))design=parsed;
 if(fragment&&design){
  try{localStorage.setItem(key,JSON.stringify(design));}catch{}
  history.replaceState(null,'',location.pathname+location.search+'#bookingForm');
 }
}catch{
 try{const parsed=JSON.parse(localStorage.getItem(key));if(validate(parsed))design=parsed;}catch{}
}
const panel=document.getElementById('booking-overlay');
const state={design,ready:Promise.resolve(),getAttachment:null};
window.aactBookingOverlay=state;
if(!design)return;
panel.hidden=false;
const canvas=panel.querySelector('canvas'),ctx=canvas.getContext('2d');
const description=panel.querySelector('.booking-overlay-description');
description.textContent=design.text+(design.date?' · '+design.date:'')+' — '+(design.font==='cursive'?'Cursive':'Block')+' · '+design.background+' background · '+design.textColor+' text';
const confirm=panel.querySelector('[name="overlayConfirmed"]');
confirm.required=true;
if(design.date)form.elements.eventDate.value=design.date;
const hidden={overlayText:design.text,overlayDate:design.date,overlayFont:design.font,overlayBackground:design.background,overlayTextColor:design.textColor};
Object.entries(hidden).forEach(([name,value])=>{
 const input=document.createElement('input');input.type='hidden';input.name=name;input.value=value;form.append(input);
});
function linesFor(text,maxWidth){
 const result=[];
 text.split(/\r?\n/).slice(0,5).forEach(part=>{
  let line='';
  for(const char of part){
   if(line&&ctx.measureText(line+char).width>maxWidth){result.push(line.trim());line=char;}else line+=char;
  }
  result.push(line.trim());
 });
 return result;
}
function draw(){
 ctx.clearRect(0,0,720,1280);
 const bottom=1280,barHeight=166;
 if(design.background!=='Transparent'){ctx.fillStyle=colors[design.background];ctx.fillRect(0,bottom-barHeight,720,barHeight);}
 const family=design.font==='cursive'?'"Great Vibes",cursive':'"Montserrat",Arial,sans-serif';
 const text=design.font==='block'?design.text.toUpperCase():design.text;
 let size=design.font==='cursive'?80:55,lines=[];
 do{ctx.font=(design.font==='block'?'800 ':'400 ')+size+'px '+family;lines=linesFor(text,660);if(lines.length*size*1.18+(design.date?40:0)<=140)break;size-=2;}while(size>=22);
 ctx.fillStyle=colors[design.textColor];ctx.textAlign='center';ctx.textBaseline='middle';
 if(design.background==='Transparent'){ctx.shadowColor=design.textColor==='Black'?'#ffffff':'#000000';ctx.shadowBlur=5;}
 const textHeight=lines.length*size*1.18;
 const total=textHeight+(design.date?38:0);
 const start=bottom-barHeight+(barHeight-total)/2+size*.59;
 lines.forEach((line,index)=>ctx.fillText(line,360,start+index*size*1.18,660));
 if(design.date){
  ctx.font='500 28px "DM Sans",Arial,sans-serif';
  ctx.fillText(design.date.split('-').slice(1).concat(design.date.split('-')[0]).join('.'),360,start+textHeight+10);
 }
 ctx.shadowBlur=0;
}
draw();
state.ready=(async()=>{
 if(document.fonts){
  await Promise.all([document.fonts.load('80px "Great Vibes"'),document.fonts.load('800 55px "Montserrat"'),document.fonts.load('500 28px "DM Sans"')]);
 }
 draw();
})().catch(()=>draw());
state.getAttachment=async()=>{
 await state.ready;
 return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Overlay image could not be created')),'image/png'));
};
form.addEventListener('reset',()=>{confirm.checked=false;});
})();