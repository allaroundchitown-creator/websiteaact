import {settings} from './core.mjs';
export const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export function gate(request){if(request.method!=='POST')return json({error:'Method not allowed'},405);if(!settings().enabled)return json({error:'Online deposits are unavailable. Please contact us.'},503);if(request.headers.get('origin')!==settings().origin)return json({error:'Forbidden'},403);if(!request.headers.get('content-type')?.startsWith('application/json'))return json({error:'JSON required'},415);}
export async function body(request,max=16000){const reader=request.body?.getReader();if(!reader)throw new Error('Empty request');let size=0,chunks=[];while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>max){await reader.cancel();throw new Error('Request too large');}chunks.push(value);}return JSON.parse(Buffer.concat(chunks).toString('utf8'));}
export async function square(path,options={}){
 let response;
 try{
  response=await fetch(settings().api+'/v2/'+path,{...options,headers:{Authorization:`Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,'Content-Type':'application/json','Square-Version':'2026-07-15'},signal:AbortSignal.timeout(18000)});
  const data=await response.json();
  if(!response.ok){
   const safe=value=>typeof value==='string'&&/^[A-Z_0-9]{1,80}$/.test(value)?value:'UNKNOWN';
   console.error('square_api_rejected',JSON.stringify({status:response.status,operation:path==='payments'?'create_payment':'retrieve_payment',environment:settings().environment,errors:(Array.isArray(data.errors)?data.errors:[]).slice(0,5).map(error=>({category:safe(error.category),code:safe(error.code)}))}));
  }
  return {ok:response.ok,data};
 }catch(error){
  console.error('square_api_transport_error',JSON.stringify({status:response?.status||null,timeout:error?.name==='TimeoutError'}));
  throw error;
 }
}
export async function store(){const {getStore}=await import('@netlify/blobs');return getStore({name:settings().environment==='production'?'aact-bookings-production':'aact-bookings-sandbox',consistency:'strong'});}
export async function authenticate(input,s){const {uuid,hash,equal}=await import('./core.mjs');if(!uuid(input.id)||!uuid(input.secret))return null;const record=await s.get(input.id,{type:'json'});return record&&equal(record.secretHash,hash(input.secret))?record:null;}
