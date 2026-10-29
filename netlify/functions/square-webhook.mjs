import {validSignature,uuid,validPayment} from '../../payment-server/core.mjs';
import {json,body,store,square} from '../../payment-server/http.mjs';
export default async request=>{
 if(request.method!=='POST')return json({error:'Method not allowed'},405);
 try{
  // Preserve exact raw bytes for signature verification and bound request size.
  const raw=await request.text();if(Buffer.byteLength(raw)>65536)return json({error:'Too large'},413);
  if(!validSignature(raw,request.headers.get('x-square-hmacsha256-signature')))return json({error:'Invalid signature'},403);
  const event=JSON.parse(raw);if(!['payment.created','payment.updated'].includes(event.type))return json({received:true});
  const paymentId=event.data?.object?.payment?.id;if(typeof paymentId!=='string')return json({received:true});
  const {ok,data}=await square('payments/'+encodeURIComponent(paymentId));if(!ok)return json({error:'Retry later'},503);
  const p=data.payment;if(!uuid(p?.reference_id)||!validPayment(p,p.reference_id))return json({received:true});
  const s=await store();if(!await s.get(p.reference_id,{type:'json'}))return json({received:true});
  // Refresh from Square instead of trusting webhook order; duplicate delivery is harmless.
  await s.setJSON('payment/'+p.reference_id,{paymentId:p.id,status:p.status});
  return json({received:true});
 }catch{return json({error:'Retry later'},503);}
};
export const config={path:'/api/square-webhook'};
