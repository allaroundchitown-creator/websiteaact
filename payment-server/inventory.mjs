// One daily claim per physical booth. Claims remain for manual review on failed or
// uncertain payments; they are never expired while Square may still capture.
export async function reserveBooths(s, record) {
 const types=['360'];
 const slots={'360':['360-1','360-2']};
 const reserved=[];
 for(const type of [...types].sort()) {
  let selected;
  for(const slot of slots[type]) {
   const key=`reservation/${record.booking.eventDate}/${slot}`;
   const existing=await s.get(key,{type:'json'});
   if(existing?.bookingId===record.id){selected=slot;break;}
   if(existing)continue;
   await s.setJSON(key,{bookingId:record.id,eventDate:record.booking.eventDate,resource:slot,status:'payment_review',createdAt:new Date().toISOString()},{onlyIfNew:true});
   // Read back ownership, including after an uncertain conditional-write response.
   if((await s.get(key,{type:'json'}))?.bookingId===record.id){selected=slot;break;}
  }
  if(!selected)throw Error('Availability changed. No payment was submitted. Please contact us to check your date.');
  reserved.push(selected);
 }
 return reserved;
}
