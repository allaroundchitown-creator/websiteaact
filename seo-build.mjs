import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const domain = 'https://allaroundchitown.com';
const today = '2026-09-21';

const faq = [
  ['How much does a 360 photo booth rental cost in Chicago?', 'AACT Booths packages currently start at $350 for two hours. Four-hour and six-hour options are also available. Final pricing can depend on the event location, date, rental length and any special branding needs.'],
  ['How many people can use a 360 photo booth?', 'Small groups can stand on the platform together, as long as everyone can do so comfortably and safely. Our attendant helps organize each group and keeps the line moving throughout the event.'],
  ['How much space does a 360 photo booth need?', 'Plan for a clear 10-by-10-foot area with a standard electrical outlet nearby. We also need safe access for setup and enough room for guests to enter and exit the platform.'],
  ['How long should I rent a 360 booth for a wedding?', 'Four hours is the most popular choice for a wedding reception because it covers the busiest part of the celebration. A two-hour rental can work for cocktail hour or a shorter reception, while six hours is a better fit for extended coverage.'],
  ['Is a 360 photo booth worth it for a wedding?', 'A 360 booth works especially well when you want interactive guest entertainment and videos people can share right away. It gives guests something to do between formal moments and creates a different type of keepsake than traditional posed photos.'],
  ['Do guests receive their videos instantly?', 'Yes. When the venue has reliable internet or cellular service, guests can receive and share their completed videos during the event.'],
  ['Do you provide an attendant?', 'Yes. Every AACT Booths rental includes a professional attendant who runs the booth, guides guests and helps the experience stay organized.'],
  ['What areas around Chicago do you serve?', 'We serve Chicago and surrounding Chicagoland communities, including Skokie, Evanston, Naperville, Schaumburg, Arlington Heights, Oak Brook and Des Plaines. Ask us about your venue when you request availability.'],
  ['Do you provide 360 booths for corporate events?', 'Yes. We provide 360 video booths for company parties, conferences, employee events and brand activations, with custom branded overlays and guest sharing options.']
];

const pages = [
  {
    slug:'360-photo-booth-rental-chicago', type:'service',
    title:'360 Photo Booth Rental Chicago | AACT Booths',
    description:'Book a Chicago 360 photo booth rental with an attendant, unlimited videos, custom overlays, props and instant sharing. Check your date with AACT Booths.',
    h1:'360 Photo Booth Rental Chicago', kicker:'CHICAGO EVENT ENTERTAINMENT',
    intro:'Give guests an experience they can step into, enjoy together and share before the night is over. AACT Booths provides full-service 360 video booth rentals for events throughout Chicago and the surrounding suburbs.',
    why:'Chicago events move quickly, from downtown receptions and rooftop celebrations to neighborhood halls and company gatherings. Our service is designed to arrive organized, fit smoothly into your timeline and give guests an easy activity without adding more work for the host.',
    eventHeading:'A flexible 360 booth for Chicago celebrations',
    events:'Weddings, quinceañeras, birthdays, graduations, school events, private parties, company celebrations and brand activations all use the booth differently. We customize the video overlay for your event, help guests plan their clips and keep the station moving with an on-site attendant.',
    local:'We serve venues across the city as well as nearby communities such as Skokie, Evanston, Oak Brook, Des Plaines and the wider Chicagoland area. Tell us the venue or neighborhood when you inquire so we can confirm timing, access and travel details.',
    nearby:['Skokie','Evanston','Oak Brook','Des Plaines'],
    faqs:[faq[0],faq[2],faq[5],faq[6]]
  },
  {
    slug:'wedding-photo-booth-chicago', type:'wedding',
    title:'Wedding Photo Booth Chicago | 360 Booth Rental | AACT',
    description:'Make your reception unforgettable with a Chicago wedding 360 photo booth. Unlimited videos, custom wedding overlay, attendant, props and instant sharing.',
    h1:'Wedding Photo Booth Rental Chicago', kicker:'FOR CHICAGO WEDDINGS',
    intro:'Turn cocktail hour or your reception into an interactive experience guests will keep talking about. AACT Booths brings a polished 360 photo booth setup, a helpful attendant and share-ready wedding videos to celebrations across Chicago and the suburbs.',
    why:'A wedding day already has enough moving pieces. We coordinate arrival and setup around your venue schedule, keep equipment organized and handle the booth from the first guest through the final video. Your wedding party gets the fun without having to manage the experience.',
    eventHeading:'Guest entertainment that fits your reception',
    events:'Use the 360 booth during cocktail hour to keep guests entertained while photos are being taken, or open it during the reception for a high-energy activity between dances. Every rental includes unlimited 360 videos, a custom wedding overlay, props, instant sharing when connection allows, a professional attendant, setup and breakdown.',
    local:'Our four-hour package is a popular fit for the main portion of a reception. Two hours can work well for cocktail hour or a shorter celebration, while six hours covers longer wedding timelines. We serve Chicago wedding venues and surrounding suburbs including Evanston, Oak Brook, Naperville and Schaumburg.',
    nearby:['Evanston','Oak Brook','Naperville','Schaumburg'],
    faqs:[faq[3],faq[4],faq[5],faq[6]]
  },
  {
    slug:'corporate-photo-booth-chicago', type:'corporate',
    title:'Corporate Photo Booth Chicago | Branded 360 Booth | AACT',
    description:'Chicago corporate 360 photo booth rentals for company parties, conferences and brand activations. Branded overlays, attendant and social sharing included.',
    h1:'Corporate Photo Booth Chicago', kicker:'BRANDED EVENT EXPERIENCES',
    intro:'Create event content employees, clients and guests actually want to share. AACT Booths provides professional 360 photo booth rentals for Chicago company parties, conferences, employee events and brand activations.',
    why:'Corporate events need an attraction that feels polished, runs reliably and supports the purpose of the event. We provide an attendant to manage guest flow, a clean setup and custom video overlays that can feature your company name, campaign or event branding.',
    eventHeading:'Built for company events and brand activations',
    events:'A 360 video booth can energize a holiday party, give conference attendees a natural networking break or create branded social content at a product launch. Guests receive short-form videos designed for easy sharing, while your organization gets a consistent visual treatment across every clip.',
    local:'We work across Chicago and nearby business hubs, including Oak Brook, Schaumburg, Naperville, Arlington Heights and Rosemont-area venues near Des Plaines. Share your load-in window, venue requirements and branding deadline so we can plan a smooth activation.',
    nearby:['Oak Brook','Schaumburg','Naperville','Arlington Heights'],
    faqs:[faq[8],faq[5],faq[6],faq[2]]
  },
  {
    slug:'360-photo-booth-rental-skokie', city:'Skokie',
    title:'360 Photo Booth Rental Skokie, IL | AACT Booths',
    description:'Reserve a 360 photo booth rental in Skokie for weddings, quinceañeras, birthdays and company events. Attendant, custom overlay and sharing included.',
    h1:'360 Photo Booth Rental Skokie', kicker:'SKOKIE EVENT RENTALS',
    intro:'Planning a celebration in Skokie? AACT Booths brings a complete 360 video booth experience to local weddings, quinceañeras, birthdays, school events and private parties.',
    why:'Skokie hosts everything from family celebrations to cultural events and school gatherings. Our flexible rental lengths make it easy to match the booth to a banquet-hall reception, community celebration or shorter private event without paying for time you do not need.',
    eventHeading:'A shareable attraction for Skokie events',
    events:'Guests step onto the platform while the camera moves around them to create a short, energetic video. Our attendant explains the process, helps groups safely position themselves and keeps the experience moving. Unlimited videos, props, a custom event overlay and setup and breakdown are included.',
    local:'Skokie is close to many of the North Shore and northwest suburban communities we serve. We regularly plan routes for events near Chicago, Evanston, Lincolnwood, Morton Grove and Niles. Provide your venue address when checking availability so we can confirm the event-day schedule.',
    nearby:['Chicago','Evanston','Lincolnwood','Morton Grove'],
    faqs:[faq[0],faq[1],faq[2],faq[5]]
  },
  {
    slug:'360-photo-booth-rental-evanston', city:'Evanston',
    title:'360 Photo Booth Rental Evanston, IL | AACT Booths',
    description:'Evanston 360 photo booth rentals for weddings, campus events, birthdays and corporate celebrations. Get unlimited videos and a custom overlay.',
    h1:'360 Photo Booth Rental Evanston', kicker:'EVANSTON CELEBRATIONS',
    intro:'Bring a modern, interactive video experience to your Evanston celebration. AACT Booths serves wedding receptions, campus and school events, milestone parties, company gatherings and private events throughout the area.',
    why:'Evanston events often bring together guests from the North Shore and Chicago. A 360 booth gives different age groups an easy activity to enjoy together, and the short videos are ready for sharing without waiting for a gallery after the event.',
    eventHeading:'From receptions to campus celebrations',
    events:'The booth can open during cocktail hour, after dinner or at the busiest point of your party. We include a professional attendant, unlimited sessions during the rental period, themed props, a personalized video overlay and complete setup and breakdown.',
    local:'We serve venues throughout Evanston and can also cover nearby Skokie, Wilmette, Rogers Park, Lincolnwood and Chicago. Because venue access and parking can vary, sending the location early helps us plan arrival and setup around your event timeline.',
    nearby:['Skokie','Wilmette','Chicago','Lincolnwood'],
    faqs:[faq[1],faq[2],faq[3],faq[6]]
  },
  {
    slug:'360-photo-booth-rental-naperville', city:'Naperville',
    title:'360 Photo Booth Rental Naperville, IL | AACT Booths',
    description:'Book a premium 360 photo booth in Naperville for weddings, graduations, birthdays and corporate events. Check availability and pricing today.',
    h1:'360 Photo Booth Rental Naperville', kicker:'NAPERVILLE EVENT ENTERTAINMENT',
    intro:'AACT Booths brings full-service 360 photo booth entertainment to Naperville weddings, graduations, birthdays, corporate events and private celebrations.',
    why:'Naperville celebrations range from elegant wedding receptions to large graduation and company events. Our two-, four- and six-hour options let hosts choose coverage that fits the schedule, while the included attendant manages the booth for the full rental.',
    eventHeading:'A polished experience for larger celebrations',
    events:'Every guest can create a short 360 video with music-ready movement, props and a custom overlay made for your event. There is no per-video limit during the rental period, so groups can return for another take as the celebration builds.',
    local:'We plan Naperville bookings with travel and setup time built into the schedule. Nearby communities we can serve include Aurora, Lisle, Woodridge and Downers Grove, along with other western suburbs. Share your venue address to receive the most accurate availability details.',
    nearby:['Aurora','Lisle','Woodridge','Downers Grove'],
    faqs:[faq[0],faq[2],faq[3],faq[7]]
  },
  {
    slug:'360-photo-booth-rental-schaumburg', city:'Schaumburg',
    title:'360 Photo Booth Rental Schaumburg, IL | AACT Booths',
    description:'Schaumburg 360 booth rental for corporate events, weddings, quinceañeras and parties. Branded overlays, attendant and instant sharing included.',
    h1:'360 Photo Booth Rental Schaumburg', kicker:'SCHAUMBURG EVENTS',
    intro:'Add a high-energy 360 video booth to your Schaumburg company event, wedding, quinceañera, birthday or private party. AACT Booths handles the equipment and guest experience from setup through breakdown.',
    why:'With many hotels, banquet spaces and corporate gathering locations, Schaumburg is a natural fit for both social and business events. We tailor the booth presentation to the occasion, from elegant wedding overlays to branded corporate graphics.',
    eventHeading:'Social content for parties and company events',
    events:'Guests can record unlimited videos during the booked time and receive them at the event when internet or cellular service is available. A professional attendant keeps the platform organized, explains each session and helps guests make the most of their turn.',
    local:'Our Schaumburg service area also reaches Hoffman Estates, Elk Grove Village, Rolling Meadows and Arlington Heights. Let us know your venue, guest schedule and whether the event requires a specific load-in window when you request pricing.',
    nearby:['Hoffman Estates','Elk Grove Village','Rolling Meadows','Arlington Heights'],
    faqs:[faq[8],faq[1],faq[5],faq[6]]
  },
  {
    slug:'360-photo-booth-rental-arlington-heights', city:'Arlington Heights',
    title:'360 Photo Booth Rental Arlington Heights | AACT Booths',
    description:'Rent a 360 photo booth in Arlington Heights for weddings, school events, birthdays and business celebrations. Get pricing from AACT Booths.',
    h1:'360 Photo Booth Rental Arlington Heights', kicker:'ARLINGTON HEIGHTS CELEBRATIONS',
    intro:'AACT Booths provides 360 photo booth rentals for Arlington Heights weddings, birthday parties, school celebrations, graduations and corporate gatherings.',
    why:'A 360 booth gives hosts a compact entertainment feature that works for mixed-age guest lists. The attendant helps first-time guests feel comfortable, while repeat groups can return for fresh videos throughout the rental period.',
    eventHeading:'Easy entertainment with a personal finish',
    events:'We personalize every video with an overlay featuring your names, date, colors or company identity. Rentals include props, unlimited 360 sessions, guest sharing, a trained attendant and all standard setup and breakdown tasks.',
    local:'We serve Arlington Heights and neighboring communities such as Mount Prospect, Rolling Meadows, Palatine and Schaumburg. For the smoothest setup, reserve a clear 10-by-10-foot area and share any venue access instructions before event day.',
    nearby:['Mount Prospect','Rolling Meadows','Palatine','Schaumburg'],
    faqs:[faq[2],faq[5],faq[6],faq[7]]
  },
  {
    slug:'360-photo-booth-rental-oak-brook', city:'Oak Brook',
    title:'360 Photo Booth Rental Oak Brook, IL | AACT Booths',
    description:'Premium Oak Brook 360 photo booth rentals for weddings, galas, company parties and brand events. Custom overlays and attendant included.',
    h1:'360 Photo Booth Rental Oak Brook', kicker:'OAK BROOK EVENT EXPERIENCES',
    intro:'Create polished, shareable moments at your Oak Brook wedding, gala, company party or private celebration with a professionally managed 360 video booth.',
    why:'Oak Brook events often call for a clean presentation and careful coordination with venue teams. We arrive with a clear setup plan, keep the booth area organized and can create an overlay that complements formal event styling or company branding.',
    eventHeading:'A premium fit for social and business events',
    events:'The 360 booth works as a reception feature, a networking break activity or a branded content station. Guests get an easy, guided experience while hosts receive one complete service that includes delivery, setup, a booth attendant, props and breakdown.',
    local:'AACT Booths serves Oak Brook and nearby western suburbs including Lombard, Hinsdale, Elmhurst and Downers Grove. Send your event date and venue location to confirm availability and determine whether any travel considerations apply.',
    nearby:['Lombard','Hinsdale','Elmhurst','Downers Grove'],
    faqs:[faq[0],faq[3],faq[8],faq[6]]
  },
  {
    slug:'360-photo-booth-rental-des-plaines', city:'Des Plaines',
    title:'360 Photo Booth Rental Des Plaines, IL | AACT Booths',
    description:'Des Plaines 360 photo booth rental for weddings, quinceañeras, graduations and corporate events. Unlimited videos and custom overlay included.',
    h1:'360 Photo Booth Rental Des Plaines', kicker:'DES PLAINES EVENTS',
    intro:'Bring guests together with a 360 photo booth rental for your Des Plaines wedding, quinceañera, graduation, birthday or company celebration.',
    why:'Des Plaines is convenient for guests coming from Chicago, the northwest suburbs and the airport area. Our booth gives those mixed guest groups a simple activity that needs no special experience—just step on, move to the music and share the result.',
    eventHeading:'A complete booth experience, handled for you',
    events:'Your rental includes unlimited 360 videos during the reserved time, a personalized overlay, props, instant sharing when the connection permits and an attendant who manages each session. We take care of setup and removal so the host can focus on the event.',
    local:'Nearby service areas include Park Ridge, Rosemont, Mount Prospect and Niles. Venue layouts and loading access can differ, so we ask for the event address in advance and recommend a level 10-by-10-foot booth area near a standard outlet.',
    nearby:['Park Ridge','Rosemont','Mount Prospect','Niles'],
    faqs:[faq[1],faq[2],faq[5],faq[7]]
  }
];

const links = pages.map(p => `<a href="/${p.slug}">${p.city ? `${p.city} 360 photo booth` : p.h1}</a>`).join('');
const form = `<div class="seo-form" id="pricing"><p class="eyebrow">CHECK AVAILABILITY &amp; GET PRICING</p><h2>Tell us about your date.</h2><form class="lead-form"><label>First name<input name="firstName" autocomplete="given-name" required></label><label>Phone number<input name="phone" type="tel" inputmode="tel" autocomplete="tel" required placeholder="(224) 234-1473"></label><label>Event date<input name="date" type="date" required></label><label>Event type<select name="eventType" required><option value="" selected disabled>Select event type</option><option>Wedding</option><option>Quinceañera</option><option>Birthday</option><option>Corporate Event</option><option>School Event</option><option>Graduation</option><option>Brand Activation</option><option>Private Party</option></select></label><button class="button" type="submit">Check Availability &amp; Get Pricing</button></form><p class="form-note" aria-live="polite">No obligation. Your date is reserved after the deposit is received.</p></div>`;

const schemaFor = p => JSON.stringify({
  '@context':'https://schema.org','@graph':[
    {'@type':'LocalBusiness','@id':`${domain}/#business`,name:'AACT Booths',alternateName:'All Around Chi Town',url:`${domain}/`,telephone:'+1-224-234-1473',email:'allaroundchitown@gmail.com',logo:`${domain}/assets/all-around-chi-town-logo-transparent.png`,areaServed:p.city ? p.city : 'Chicagoland'},
    {'@type':'Service','@id':`${domain}/${p.slug}#service`,name:p.h1,serviceType:p.type==='wedding'?'Wedding 360 photo booth rental':p.type==='corporate'?'Corporate 360 photo booth rental':'360 photo booth rental',provider:{'@id':`${domain}/#business`},areaServed:{'@type':'City',name:p.city || 'Chicago'},description:p.description},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:`${domain}/`},{'@type':'ListItem',position:2,name:p.h1,item:`${domain}/${p.slug}`}]}
  ]
});

const pageHtml = p => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${p.title}</title><meta name="description" content="${p.description}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><link rel="canonical" href="${domain}/${p.slug}"><meta property="og:type" content="website"><meta property="og:site_name" content="AACT Booths"><meta property="og:title" content="${p.title}"><meta property="og:description" content="${p.description}"><meta property="og:url" content="${domain}/${p.slug}"><meta property="og:image" content="${domain}/assets/360-hero.webp"><meta name="theme-color" content="#202020"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/seo-pages.css"><script type="application/ld+json">${schemaFor(p)}</script></head><body><header class="seo-header"><a class="nav-wordmark" href="/" aria-label="AACT Booths home"><span class="nav-wordmark-main"><b>AACT</b> BOOTHS</span><span class="nav-wordmark-tagline">360 DEGREES OF FUN</span></a><nav aria-label="Primary"><a href="/#videos">Videos</a><a href="/#packages">Packages</a><a href="/#faq">FAQ</a><a href="/book.html">Book</a></nav><a class="button" href="#pricing">Check Availability</a></header><main><section class="seo-hero"><div><p class="eyebrow">${p.kicker}</p><h1>${p.h1}</h1><p class="seo-lede">${p.intro}</p><ul><li>Professional booth attendant</li><li>Unlimited 360 videos</li><li>Custom event overlay</li><li>Instant guest sharing</li><li>Props, setup and breakdown</li></ul><a class="button" href="#pricing">Check Availability &amp; Get Pricing</a></div><div class="seo-video"><video autoplay muted loop playsinline preload="metadata" poster="/assets/360-hero.webp" aria-label="AACT Booths 360 video booth at a real event"><source src="/assets/aac-hero-video.mp4" type="video/mp4"></video><span>REAL EVENT VIDEO</span></div></section><section class="seo-trust" aria-label="Service highlights"><span>2+ Years Experience</span><span>Chicago &amp; Suburbs</span><span>Attendant Included</span><span>Free Standard Delivery</span></section><section class="seo-content"><article><h2>${p.eventHeading}</h2><p>${p.events}</p><h2>Why book AACT Booths?</h2><p>${p.why}</p><p>${p.local}</p><h3>What every rental includes</h3><p>We arrive with the 360 platform, camera system and lighting needed for the experience. Your attendant guides guests, monitors the equipment and helps groups create better clips. The custom overlay makes every video feel connected to your celebration rather than like a generic rental. After the event, we handle breakdown and leave the booth area clear.</p><h3>Choose the rental length that fits</h3><p>Our two-hour option works well for focused entertainment windows and smaller parties. Four hours is the most popular choice for weddings, quinceañeras and company events. Six hours provides extended coverage for longer celebrations. <a href="/#packages">Compare all 360 booth packages</a>, then check your date for exact availability.</p><h3>Nearby areas served</h3><p>We also serve ${p.nearby.join(', ')} and other Chicagoland communities. Travel details are confirmed before booking so you know what to expect.</p></article>${form}</section><section class="seo-faq"><p class="eyebrow">COMMON QUESTIONS</p><h2>${p.city || p.type === 'wedding' ? (p.city ? `${p.city} 360 booth FAQ` : 'Chicago wedding photo booth FAQ') : 'Chicago 360 booth FAQ'}</h2><div class="accordion">${p.faqs.map(([q,a])=>`<details><summary>${q}<span>+</span></summary><p>${a}</p></details>`).join('')}</div></section><section class="seo-links"><h2>Explore AACT Booths</h2><div>${links}</div></section></main><footer><div class="footer-about"><a class="footer-brand" href="/"><span class="footer-wordmark"><span class="footer-aact">AACT</span> <span class="footer-booths">BOOTHS</span></span><span class="footer-tagline">360 DEGREES OF FUN</span></a><p>Professional 360 photo booth rentals for Chicago and the surrounding suburbs.</p></div><div><small>CONTACT</small><a href="tel:+12242341473">(224) 234-1473</a><a href="mailto:allaroundchitown@gmail.com">allaroundchitown@gmail.com</a><a href="/book.html">Request pricing</a></div><p class="copyright">© 2026 AACT Booths. All rights reserved.</p></footer><script src="/video-autoplay.js" defer></script><script src="/seo-pages.js" defer></script></body></html>`;

for (const page of pages) fs.writeFileSync(path.join(out, `${page.slug}.html`), pageHtml(page));

const indexPath = path.join(out, 'index.html');
let index = fs.readFileSync(indexPath, 'utf8');
index = index
  .replaceAll('https://all-around-chi-town-360.noah630.chatgpt.site', domain)
  .replace('<h1 id="hero-title">Make your event <em>the one guests remember.</em></h1>', '<h1 id="hero-title">Chicago 360 Photo Booth Rental</h1><p class="hero-subheadline">Make your event <em>the one guests remember.</em></p>')
  .replace('poster="360-hero.png"', 'poster="assets/360-hero.webp"')
  .replace('</main>', `<section class="home-seo" aria-labelledby="home-seo-title"><div><p class="eyebrow">CHICAGO EVENT ENTERTAINMENT</p><h2 id="home-seo-title">360 Photo Booth Rentals for Chicago Events</h2><p>AACT Booths provides professional <strong>360 photo booth rentals in Chicago</strong> and surrounding suburbs for celebrations of every size. Guests step onto the platform while the camera moves around them, creating a short 360 video they can receive and share during the event. Every rental includes a trained attendant, unlimited videos, a custom event overlay, props, lighting, delivery, setup and breakdown.</p><p>Our 360 video booth is a strong fit for <a href="/wedding-photo-booth-chicago">weddings</a>, quinceañeras, birthdays, graduations, school events, private parties and <a href="/corporate-photo-booth-chicago">corporate events</a>. Couples use it as interactive reception entertainment, companies use branded overlays for employee parties and brand activations, and families use it to give guests a keepsake that feels more dynamic than a traditional event photo booth.</p><p>We serve venues throughout Chicago and Chicagoland, including <a href="/360-photo-booth-rental-skokie">Skokie</a>, <a href="/360-photo-booth-rental-evanston">Evanston</a>, <a href="/360-photo-booth-rental-naperville">Naperville</a>, <a href="/360-photo-booth-rental-schaumburg">Schaumburg</a>, <a href="/360-photo-booth-rental-arlington-heights">Arlington Heights</a>, <a href="/360-photo-booth-rental-oak-brook">Oak Brook</a> and <a href="/360-photo-booth-rental-des-plaines">Des Plaines</a>. When you request pricing, share your event date and type. We will confirm availability, recommend the right rental length and review any venue or travel details before you reserve.</p><p>Our two-hour package is ideal for shorter celebrations and focused entertainment windows. Four hours is the most popular choice for wedding receptions, quinceañeras and company parties, while six hours gives larger events extended coverage. Explore our <a href="#packages">360 booth packages</a> or <a href="#book">check your date</a> to get started.</p></div></section></main>`)
  .replace('<a href="#faq">FAQ</a></nav>', '<a href="#faq">FAQ</a><a href="/360-photo-booth-rental-chicago">Service Areas</a></nav>')
  .replace('<a href="#faq">FAQs</a></div>', `<a href="#faq">FAQs</a><a href="/wedding-photo-booth-chicago">Weddings</a><a href="/corporate-photo-booth-chicago">Corporate Events</a><a href="/360-photo-booth-rental-chicago">Chicago Service</a></div>`);

const oldFaq = /<section class="faq" id="faq">[\s\S]*?<\/section>/;
const faqSection = `<section class="faq" id="faq"><div class="section-title"><p class="eyebrow">CHICAGO 360 PHOTO BOOTH FAQ</p><h2>Planning your 360 booth rental</h2></div><div class="accordion">${faq.map(([q,a])=>`<details><summary>${q}<span>+</span></summary><p>${a}</p></details>`).join('')}</div></section>`;
index = index.replace(oldFaq, faqSection);

const indexSchema = {'@context':'https://schema.org','@graph':[
  {'@type':['LocalBusiness','Organization'],'@id':`${domain}/#business`,name:'AACT Booths',alternateName:'All Around Chi Town',url:`${domain}/`,logo:`${domain}/assets/all-around-chi-town-logo-transparent.png`,image:`${domain}/assets/360-hero.webp`,telephone:'+1-224-234-1473',email:'allaroundchitown@gmail.com',description:'Professional 360 photo booth rentals for weddings, corporate events, birthdays, school events and celebrations across Chicagoland.',areaServed:['Chicago','Skokie','Evanston','Naperville','Schaumburg','Arlington Heights','Oak Brook','Des Plaines'],sameAs:['https://www.instagram.com/allaroundchitown360/']},
  {'@type':'Service','@id':`${domain}/#service`,name:'Chicago 360 Photo Booth Rental',serviceType:'360 photo booth rental',provider:{'@id':`${domain}/#business`},areaServed:{'@type':'AdministrativeArea',name:'Chicagoland'},description:'Full-service 360 video booth rental with a professional attendant, custom event overlay, instant sharing, delivery, setup and breakdown.'}
]};
index = index.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(indexSchema)}</script>`);
fs.writeFileSync(indexPath, index);

const urls = ['', ...pages.map(p=>p.slug), 'book.html'];
fs.writeFileSync(path.join(out,'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u,i)=>`  <url><loc>${domain}/${u}</loc><lastmod>${today}</lastmod><changefreq>${i===0?'weekly':'monthly'}</changefreq><priority>${i===0?'1.0':i<4?'0.9':'0.8'}</priority></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(out,'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /confirmation.html\nDisallow: /raffle.html\n\nSitemap: ${domain}/sitemap.xml\n`);

for (const file of ['book.html','confirmation.html','raffle.html']) {
  const fp=path.join(out,file); let html=fs.readFileSync(fp,'utf8');
  if(file==='book.html') html=html.replace('</title>', `</title><link rel="canonical" href="${domain}/book.html">`);
  else html=html.replace('</title>', '</title><meta name="robots" content="noindex,follow">');
  fs.writeFileSync(fp,html);
}
