import {hash,paymentBody,validPayment} from '../../payment-server/core.mjs';
import {json,gate,body,store,authenticate,square} from '../../payment-server/http.mjs';
export default async request=>{
 const denied=gate(request);if(denied)return denied;
 let input;try{input=await body(request);}catch{return json({error:'Invalid request'},400);}
 try{
  const s=await store(),record=await authenticate(input,s);if(!record)return json({error:'Checkout not found'},404);
  const paid=await s.get('payment/'+record.id,{type:'json'});if(paid?.status==='COMPLETED')return json({paid:true,reference:record.id});
  if(record.expiresAt<Date.now())return json({error:'Checkout expired. Contact us before retrying if you already submitted payment.'},409);
  if(typeof input.sourceId!=='string'||input.sourceId.length>256||input.sourceId.length<5)return json({error:'Invalid payment token'},400);
  // Atomically lock this booking to ONE card token. All retries use the same Square key and payload.
  const lock=await s.setJSON('attempt/'+record.id,{sourceHash:hash(input.sourceId)},{onlyIfNew:true});
  if(!lock.modified){const attempt=await s.get('attempt/'+record.id,{type:'json'});if(attempt?.sourceHash!==hash(input.sourceId))return json({error:'This checkout already has a payment attempt. Check its status or contact us before trying another card.'},409);}
  const {ok,data}=await square('payments',{method:'POST',body:JSON.stringify(paymentBody(record,input.sourceId))});
  if(!ok)return json({error:'Payment was not confirmed. Check status before starting another request. Contact (224) 234-1473 for help.'},422);
  if(!validPayment(data.payment,record.id,record.totalAmount??10000))return json({error:'Payment needs review. Please contact us; do not pay again.'},502);
  // The webhook provides recovery if this write fails after Square captured the payment.
  await s.setJSON('payment/'+record.id,{paymentId:data.payment.id,status:data.payment.status});
  return json({paid:data.payment.status==='COMPLETED',reference:record.id});
 }catch{return json({error:'Payment status is uncertain. Use Check payment status or contact us. Do not start a new payment.'},503);}
};
export const config={path:'/api/pay-deposit',rateLimit:{windowLimit:5,windowSize:180,aggregateBy:['ip','domain']}};
