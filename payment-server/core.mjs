import {createHash,timingSafeEqual,createHmac} from 'node:crypto';
export const amount=10000;
export const hash=value=>createHash('sha256').update(value).digest('hex');
export function equal(a,b){const x=Buffer.from(String(a)),y=Buffer.from(String(b));return x.length===y.length&&timingSafeEqual(x,y);}
export const uuid=value=>typeof value==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
export function settings(){
 const e=process.env;const environment=e.SQUARE_ENVIRONMENT;
 const origin=e.PAYMENTS_ORIGIN||'';
 let validOrigin=false;try{validOrigin=new URL(origin).origin===origin&&origin.startsWith('https://');}catch{}
 const enabled=e.PAYMENTS_ENABLED==='true'&&['sandbox','production'].includes(environment)&&validOrigin&&Boolean(e.SQUARE_APPLICATION_ID&&e.SQUARE_LOCATION_ID&&e.SQUARE_ACCESS_TOKEN&&e.TURNSTILE_SITE_KEY&&e.TURNSTILE_SECRET_KEY&&e.SQUARE_WEBHOOK_SIGNATURE_KEY);
 return {enabled,environment,origin,applicationId:e.SQUARE_APPLICATION_ID,locationId:e.SQUARE_LOCATION_ID,siteKey:e.TURNSTILE_SITE_KEY,api:environment==='production'?'https://connect.squareup.com':'https://connect.squareupsandbox.com'};
}
export function validateBooking(input){
 const clean=(name,max)=>{const v=input[name];if(typeof v!=='string'||!v.trim()||v.length>max||/[\x00-\x1f\x7f]/.test(v))throw new Error('Invalid '+name);return v.trim();};
 const b={firstName:clean('firstName',80),phone:clean('phone',18).replace(/\D/g,''),email:clean('email',254).toLowerCase(),eventDate:clean('eventDate',10),eventType:clean('eventType',40),cityZip:clean('cityZip',80),package:clean('package',30)};
 if(!/^[2-9]\d{2}[2-9]\d{6}$/.test(b.phone)||!/^\S+@[^\s@]+\.[^\s@]+$/.test(b.email))throw new Error('Invalid contact information');
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 if(!/^\d{4}-\d{2}-\d{2}$/.test(b.eventDate)||!Number.isFinite(Date.parse(b.eventDate))||new Date(b.eventDate).toISOString().slice(0,10)!==b.eventDate||b.eventDate<today||Number(b.eventDate.slice(0,4))>new Date().getFullYear()+5)throw new Error('Invalid event date');
 if(!['Wedding','Quinceañera','Birthday','Corporate Event','School Event','Brand Activation','Other'].includes(b.eventType)||!['The Signature','The Premiere'].includes(b.package))throw new Error('Invalid event selection');
 if(input.consent!==true||input.website)throw new Error('Consent required');
 const allowed=['2 cold spark machines — $200','Floral wall — $200'];
 if(!Array.isArray(input.addOns)||input.addOns.length>2||input.addOns.some(v=>!allowed.includes(v)))throw new Error('Invalid add-ons');
 b.addOns=[...new Set(input.addOns)];
 b.overlay={};for(const key of ['overlayText','overlayDate','overlayFont','overlayBackground','overlayTextColor']){if(typeof input[key]==='string'&&input[key].length<=100)b.overlay[key]=input[key];}
 return b;
}
export function bookingTotal(booking){const base=booking.package==='The Signature'?69500:booking.package==='The Premiere'?119500:0;if(!base)throw Error('Invalid package');return base+(booking.addOns||[]).reduce((sum,item)=>sum+(item==='Floral wall — $200'||(item==='2 cold spark machines — $200'&&booking.package!=='The Premiere')?20000:0),0);}
export function paymentBody(record,sourceId){return {source_id:sourceId,idempotency_key:record.id,amount_money:{amount:record.totalAmount??amount,currency:'USD'},location_id:settings().locationId,autocomplete:true,reference_id:record.id,buyer_email_address:record.booking.email,note:`${record.totalAmount&&record.totalAmount!==10000?'CONFIRMED | Full payment':'PENDING APPROVAL | $100 deposit'} | ${record.booking.firstName} | ${record.booking.phone} | ${record.booking.eventDate} | ${record.booking.eventType} | ${record.booking.cityZip} | ${record.booking.package} | ${record.booking.addOns.join(', ')}`.slice(0,500)};}
export function validPayment(p,id,expectedAmount=amount){return p?.reference_id===id&&p?.location_id===settings().locationId&&p?.amount_money?.amount===expectedAmount&&p?.amount_money?.currency==='USD';}
export function validSignature(raw,signature){const e=process.env;const expected=createHmac('sha256',e.SQUARE_WEBHOOK_SIGNATURE_KEY||'').update(`${settings().origin}/api/square-webhook`+raw).digest('base64');return Boolean(e.SQUARE_WEBHOOK_SIGNATURE_KEY)&&equal(expected,signature||'');}
