import {randomUUID} from 'node:crypto';
import {settings,hash,validateBooking} from '../../payment-server/core.mjs';
import {json,gate,body,store} from '../../payment-server/http.mjs';
export default async request=>{
 const denied=gate(request);if(denied)return denied;
 let input,booking;try{input=await body(request);booking=validateBooking(input);}catch{return json({error:'Please check your event details and accept the deposit terms.'},400);}
 try{
  if(typeof input.turnstileToken!=='string'||input.turnstileToken.length>2048)return json({error:'Complete the security check.'},400);
  const response=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:process.env.TURNSTILE_SECRET_KEY,response:input.turnstileToken}),signal:AbortSignal.timeout(10000)});
  const v=await response.json();if(!response.ok||!v.success||v.hostname!==new URL(settings().origin).hostname||v.action!=='booking')return json({error:'Security check expired. Please try again.'},403);
  const id=randomUUID(),secret=randomUUID();const s=await store();
  await s.setJSON(id,{id,secretHash:hash(secret),booking,createdAt:new Date().toISOString(),expiresAt:Date.now()+3600000,consentVersion:'deposit-v1',status:'awaiting_payment'});
  return json({id,secret});
 }catch{return json({error:'Unable to prepare checkout. Please try again.'},503);}
};
export const config={path:'/api/booking-intent',rateLimit:{windowLimit:5,windowSize:180,aggregateBy:['ip','domain']}};
