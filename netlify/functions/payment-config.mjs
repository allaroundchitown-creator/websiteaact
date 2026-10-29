import {settings} from '../../payment-server/core.mjs';
import {json} from '../../payment-server/http.mjs';
export default async request=>{if(request.method!=='GET')return json({error:'Method not allowed'},405);const s=settings();return json(s.enabled?{enabled:true,environment:s.environment,applicationId:s.applicationId,locationId:s.locationId,siteKey:s.siteKey}:{enabled:false});};
export const config={path:'/api/payment-config',rateLimit:{windowLimit:60,windowSize:60,aggregateBy:['ip','domain']}};
