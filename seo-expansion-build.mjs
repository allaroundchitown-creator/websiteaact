import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const out = join(process.cwd(), 'dist');
const origin = 'https://allaroundchitown.com';
const phone = '+1-224-234-1473';
const displayPhone = '(224) 234-1473';
const email = 'allaroundchitown@gmail.com';
const today = '2026-09-22';

const pages = [
  {
    slug: '360-photo-booth-chicago',
    type: 'service',
    keyword: '360 photo booth rental Chicago',
    title: 'Chicago 360 Booth Service & Pricing | AACT Booths',
    description: 'Book a Chicago 360 photo booth rental with an attendant, unlimited videos, a custom overlay, props and instant sharing for weddings, parties and events.',
    eyebrow: '360 PHOTO BOOTH RENTAL CHICAGO',
    h1: 'Chicago 360 Photo Booth Rentals for Unforgettable Events',
    lede: 'Bring a shareable, high-energy video experience to your Chicago event. AACT Booths provides the platform, lighting, props, custom overlay, guest sharing and a professional attendant from setup through breakdown.',
    eventType: '360 photo booth rental',
    area: 'Chicago',
    sections: [
      ['A complete 360 video booth experience', `A 360 booth gives guests more than a still photo. They step onto the platform while the camera moves around them, creating a short slow-motion video that can be shared from the event. Our Chicago 360 photo booth rental includes the equipment and on-site help needed to keep the experience organized, safe and easy to enjoy. The custom overlay can feature names, a date, event colors or a company logo so each clip feels connected to the occasion.`],
      ['Built for Chicago celebrations', `AACT Booths serves weddings, quinceañeras, birthdays, graduations, school events, private parties, company celebrations and brand activations throughout Chicago and the surrounding suburbs. The booth works well during cocktail hour, as a reception activity, beside a dance floor or as a branded content station. We coordinate arrival with your event timeline and confirm venue access, space and power needs before your date.`],
      ['What is included with every rental', `Every package includes a professional attendant, unlimited 360 videos during the rental, a custom event overlay, props, lighting, instant sharing when the venue has a reliable connection, delivery, setup and breakdown. A clear 10-by-10-foot space and one standard electrical outlet are recommended. Your attendant guides each group, monitors the platform and helps the line move without putting that responsibility on the host.`],
      ['Choose the right rental length', `Two hours is a practical choice for a shorter party or a focused entertainment window. Four hours is our most popular option for weddings, quinceañeras and company events because it covers the busiest part of the celebration. Six hours is designed for longer timelines and larger guest lists. Review our <a href="/#packages">Chicago 360 booth packages and pricing</a>, or use the form on this page to check your date.`],
      ['Serving the city and Chicagoland', `We travel throughout Chicago and nearby communities, including <a href="/photo-booth-rental-skokie">Skokie</a>, <a href="/photo-booth-rental-evanston">Evanston</a>, <a href="/photo-booth-rental-naperville">Naperville</a> and <a href="/photo-booth-rental-schaumburg">Schaumburg</a>. Share your venue or city when you request pricing so we can confirm delivery details before you reserve.`]
    ],
    faqs: [
      ['How much does a 360 photo booth cost in Chicago?', 'AACT Booths packages currently start at $350 for two hours. Four-hour and six-hour options are available. Final pricing can depend on the date, venue location, rental length and any special branding needs.'],
      ['How much space does the booth need?', 'Plan for a clear 10-by-10-foot area with one standard electrical outlet nearby and enough room for guests to enter and exit safely.'],
      ['Do guests get their videos immediately?', 'Yes. When the venue has reliable internet or cellular service, guests can receive and share their completed videos during the event.'],
      ['Is an attendant included?', 'Yes. Every rental includes a professional attendant to operate the booth, guide guests and keep the experience moving.']
    ]
  },
  {
    slug: 'wedding-photo-booth-chicago',
    type: 'service',
    keyword: 'wedding photo booth Chicago',
    title: 'Wedding Photo Booth Chicago | AACT Booths',
    description: 'Create a wedding reception guests remember with a Chicago 360 photo booth, unlimited videos, a custom wedding overlay, attendant, props and instant sharing.',
    eyebrow: 'CHICAGO WEDDING PHOTO BOOTH',
    h1: 'Wedding 360 Photo Booth Rentals in Chicago',
    lede: 'Give guests an interactive experience between the formal moments. AACT Booths brings a polished 360 video booth, custom wedding graphics and an attentive operator to receptions across Chicago and Chicagoland.',
    eventType: 'Wedding 360 photo booth rental',
    area: 'Chicago',
    sections: [
      ['Reception entertainment guests can join together', `A wedding 360 booth turns small groups into short, shareable videos and gives guests a reason to mingle. Couples often open the booth during cocktail hour, after dinner or alongside dancing. It fills the natural pauses in a reception without competing with the ceremony, speeches or first dance. Guests can step on with friends and family, choose props and receive their video while the celebration is still happening.`],
      ['A custom look for your wedding', `Your videos should feel like part of the wedding, not a generic rental. We create a custom overlay that can include the couple’s names, wedding date, colors or a simple design that matches the reception. The overlay appears on every clip, giving guests a personal keepsake and making shared videos recognizable when they appear on social media.`],
      ['What your wedding rental includes', `Every wedding package includes unlimited 360 videos during the reserved time, a professional booth attendant, a custom wedding overlay, props, lighting, guest sharing, delivery, setup and breakdown. The attendant welcomes guests, explains how to stand on the platform and keeps the line organized. Your family and wedding party can enjoy the booth instead of managing it.`],
      ['Planning the best time and package', `Four hours is the most popular wedding option because it usually covers the highest-energy portion of a reception. Two hours can be enough for cocktail hour or a smaller celebration. Six hours works for an extended reception or a larger guest list. We confirm the setup window with you and recommend placing the booth where guests can see it without blocking venue traffic.`],
      ['Wedding service throughout Chicagoland', `AACT Booths serves Chicago wedding venues and surrounding communities, including <a href="/photo-booth-rental-evanston">Evanston</a>, <a href="/photo-booth-rental-skokie">Skokie</a>, <a href="/photo-booth-rental-naperville">Naperville</a> and <a href="/photo-booth-rental-schaumburg">Schaumburg</a>. For broader event options, explore our <a href="/360-photo-booth-chicago">Chicago 360 booth service</a> or compare <a href="/#packages">rental packages</a>.`]
    ],
    faqs: [
      ['Are 360 photo booths good for weddings?', 'Yes. They provide interactive reception entertainment and a video keepsake guests can share. They are especially useful during cocktail hour, after dinner and between formal moments.'],
      ['How long should I rent a 360 booth for a wedding?', 'Four hours is the most popular choice for the main reception. Two hours can fit cocktail hour or a smaller reception, while six hours covers longer timelines.'],
      ['Can the videos match our wedding style?', 'Yes. A custom overlay with your names, date, colors or a simple wedding design is included.'],
      ['Does the venue need to provide anything?', 'We recommend a clear 10-by-10-foot area, one standard outlet and reliable internet or cellular service for instant sharing.']
    ]
  },
  {
    slug: 'corporate-photo-booth-chicago',
    type: 'service',
    keyword: 'corporate photo booth Chicago',
    title: 'Corporate Photo Booth Chicago | AACT Booths',
    description: 'Book a Chicago corporate 360 photo booth for company parties, conferences and brand activations with branded overlays, an attendant and social sharing.',
    eyebrow: 'CHICAGO CORPORATE PHOTO BOOTH',
    h1: 'Corporate 360 Photo Booth Rentals in Chicago',
    lede: 'Create branded event content without adding another task for your team. AACT Booths provides a staffed 360 video experience for Chicago company parties, conferences, employee events and activations.',
    eventType: 'Corporate 360 photo booth rental',
    area: 'Chicago',
    sections: [
      ['A social activity for company events', `A corporate photo booth gives employees, clients and attendees a low-pressure activity they can enjoy in small groups. It works at holiday parties, team celebrations, awards nights, conferences, networking events and employee appreciation programs. The 360 format creates movement and energy that a standard step-and-repeat cannot, while still producing polished content guests can share.`],
      ['Custom branding on every video', `Add your company name, event title, campaign colors or logo to the video overlay. Consistent branding makes clips useful after the event and helps guests connect the experience with your organization. For brand activations, the booth can serve as a content station that encourages participation while keeping the visual identity of the campaign present in every finished video.`],
      ['Professional operation from setup to breakdown', `Our attendant arrives with the booth, lighting and sharing equipment, guides participants and monitors the experience throughout the rental. Unlimited 360 videos, props, a custom branded overlay, delivery, setup and breakdown are included. We recommend a clear 10-by-10-foot footprint, nearby standard power and a reliable connection when instant sharing is important.`],
      ['Plan around the event schedule', `For a shorter reception or networking window, two hours can be enough. Four hours is a strong fit for company parties and conferences with steady attendance. Six hours works for longer activations or events with a larger guest count. We can discuss load-in timing, venue access and the best service window before you reserve.`],
      ['Corporate service across Chicagoland', `AACT Booths serves offices, hotels and event venues in Chicago and surrounding business hubs, including <a href="/photo-booth-rental-schaumburg">Schaumburg</a>, <a href="/photo-booth-rental-naperville">Naperville</a>, <a href="/photo-booth-rental-evanston">Evanston</a> and nearby suburbs. Explore our complete <a href="/360-photo-booth-chicago">Chicago 360 photo booth service</a> or <a href="/book.html">request corporate event pricing</a>.`]
    ],
    faqs: [
      ['Do you provide 360 booths for corporate events?', 'Yes. We serve company parties, conferences, networking events, employee celebrations and brand activations throughout Chicago and Chicagoland.'],
      ['Can our logo appear on the videos?', 'Yes. A custom branded overlay is included and can feature your logo, event name, campaign colors or other approved branding.'],
      ['Can attendees share videos during the event?', 'Yes, when the venue has reliable internet or cellular service. We recommend confirming venue connectivity when sharing is a priority.'],
      ['Do you handle setup and operation?', 'Yes. Delivery, setup, a dedicated attendant and breakdown are included so your team does not need to manage the booth.']
    ]
  },
  {
    slug: 'birthday-photo-booth-chicago',
    type: 'service',
    keyword: 'birthday photo booth Chicago',
    title: 'Birthday Photo Booth Chicago | AACT Booths',
    description: 'Add a 360 photo booth to your Chicago birthday party with unlimited videos, a custom birthday overlay, props, an attendant and instant sharing.',
    eyebrow: 'CHICAGO BIRTHDAY PHOTO BOOTH',
    h1: 'Birthday 360 Photo Booth Rentals in Chicago',
    lede: 'Turn a birthday party into a stream of shareable moments. AACT Booths brings the 360 platform, custom birthday graphics, props and an attendant to celebrations across Chicago and nearby suburbs.',
    eventType: 'Birthday 360 photo booth rental',
    area: 'Chicago',
    sections: [
      ['A party activity that keeps guests involved', `A 360 booth gives friends and family an activity they can repeat throughout the party. Guests can record solo clips, bring a group onto the platform or return later with different props. The result is a collection of short videos that captures the energy of the celebration instead of pulling everyone away from the dance floor for posed photos.`],
      ['Personalized for the guest of honor', `Every birthday rental includes a custom overlay. Add the guest of honor’s name, age, event date or party colors so each finished clip looks intentional. The overlay is included on unlimited videos during the rental, giving guests something personal to save and share from the event.`],
      ['Everything needed for the experience', `AACT Booths provides the 360 platform, camera system, lighting, props, a professional attendant, guest sharing, delivery, setup and breakdown. The attendant demonstrates how the platform works, helps groups position themselves and keeps the equipment organized. Hosts can focus on the party while we handle the booth.`],
      ['Packages for small and large birthday parties', `Two hours is a popular fit for a focused birthday celebration or a specific entertainment window. Four hours works for longer parties with dinner and dancing, while six hours gives larger events more time for every guest to participate. Review <a href="/#packages">current package pricing</a> and check availability before finalizing your event schedule.`],
      ['Birthday rentals around Chicago', `We serve birthday venues, banquet halls and private events throughout Chicago and communities such as <a href="/photo-booth-rental-skokie">Skokie</a>, <a href="/photo-booth-rental-evanston">Evanston</a>, <a href="/photo-booth-rental-naperville">Naperville</a> and <a href="/photo-booth-rental-schaumburg">Schaumburg</a>. Visit our <a href="/360-photo-booth-chicago">main Chicago 360 booth page</a> for full service details.`]
    ],
    faqs: [
      ['What ages are birthday 360 booths good for?', 'The booth can work for teen and adult celebrations as long as guests can safely stand on the platform and follow the attendant’s directions.'],
      ['Can the birthday design include a name and age?', 'Yes. The included custom overlay can feature the guest of honor’s name, age, date and party colors.'],
      ['How long should I rent the booth for a birthday?', 'Two hours often works for a shorter party. Four hours is better when the celebration includes dinner, dancing and a larger guest list.'],
      ['Are props included?', 'Yes. Props are included along with unlimited videos, an attendant, lighting, setup, sharing and breakdown.']
    ]
  },
  {
    slug: 'quinceanera-photo-booth-chicago',
    type: 'service',
    keyword: 'quinceañera photo booth Chicago',
    title: 'Quinceañera Photo Booth Chicago | AACT Booths',
    description: 'Book a Chicago quinceañera 360 photo booth with unlimited videos, a custom quince overlay, props, an attendant and instant guest sharing.',
    eyebrow: 'CHICAGO QUINCEAÑERA PHOTO BOOTH',
    h1: 'Quinceañera 360 Photo Booth Rentals in Chicago',
    lede: 'Give family and friends a celebration experience they can enjoy together. AACT Booths provides a customized, attended 360 video booth for quinceañeras throughout Chicago and Chicagoland.',
    eventType: 'Quinceañera 360 photo booth rental',
    area: 'Chicago',
    sections: [
      ['An experience for every generation', `A quinceañera brings together friends, cousins, parents and extended family. The 360 booth gives groups an easy way to create a memory together without stopping the flow of the reception. Guests can visit between formal traditions, after dinner or while the dance floor is open, and the attendant helps first-time users feel comfortable.`],
      ['Designed around the celebration', `We customize the video overlay with the quinceañera’s name, date, colors or event theme. That design appears on every finished clip, creating a consistent look across the videos guests save and post. Props and lighting add energy while the overlay keeps the experience connected to the style of the event.`],
      ['A full-service rental', `Every package includes the 360 booth, unlimited videos during the reserved time, a custom overlay, a professional attendant, props, lighting, instant sharing when connectivity allows, delivery, setup and breakdown. We recommend a clear 10-by-10-foot space and a standard outlet. Our attendant guides groups and keeps the booth running while the family enjoys the celebration.`],
      ['Timing the booth for your reception', `Four hours is often the best fit for a quinceañera because it covers a substantial part of the reception after key traditions. Two hours can work for a smaller celebration or a focused period after dinner. Six hours offers extended access for a larger guest list or an all-evening event. We can recommend a package after learning your schedule and estimated attendance.`],
      ['Quinceañera service across Chicagoland', `AACT Booths serves banquet halls and event venues throughout Chicago and suburbs including <a href="/photo-booth-rental-skokie">Skokie</a>, <a href="/photo-booth-rental-evanston">Evanston</a>, <a href="/photo-booth-rental-naperville">Naperville</a> and <a href="/photo-booth-rental-schaumburg">Schaumburg</a>. Compare <a href="/#packages">rental packages</a> or <a href="/book.html">check your event date</a>.`]
    ],
    faqs: [
      ['How long should I book a 360 booth for a quinceañera?', 'Four hours is a popular choice because it covers the busiest part of the reception. Two hours suits a shorter window, while six hours is better for extended celebrations.'],
      ['Can the overlay match the quinceañera theme?', 'Yes. The custom overlay can include the celebrant’s name, date, colors or a design aligned with the event theme.'],
      ['Can family groups use the booth together?', 'Small groups can use the platform together when everyone can stand comfortably and safely. The attendant helps organize each group.'],
      ['Is setup included?', 'Yes. Delivery, setup, operation and breakdown are included with every package.']
    ]
  },
  {
    slug: 'photo-booth-rental-skokie',
    type: 'location',
    keyword: 'photo booth rental Skokie',
    title: '360 Photo Booth Rental Skokie | AACT Booths',
    description: 'Book a 360 photo booth rental in Skokie for weddings, quinceañeras, birthdays and company events with an attendant, custom overlay and sharing.',
    eyebrow: 'SKOKIE 360 PHOTO BOOTH RENTAL',
    h1: '360 Photo Booth Rentals in Skokie, Illinois',
    lede: 'Planning an event close to home? AACT Booths brings a complete 360 video experience to Skokie venues, banquet halls, schools and private celebrations.',
    eventType: '360 photo booth rental',
    area: 'Skokie',
    sections: [
      ['Local event entertainment for Skokie celebrations', `Skokie hosts everything from family celebrations and school events to weddings and community gatherings. A 360 booth adds a modern activity that works across different age groups and gives guests a video they can take with them. Because AACT Booths serves Skokie as a core local area, planning delivery and setup is straightforward once we know the venue and event timeline.`],
      ['Weddings, quinceañeras and birthdays', `For a wedding reception, the booth can open during cocktail hour or after dinner. At a quinceañera, it gives family and friends an activity between traditions and dancing. Birthday hosts can customize the overlay with a name, age and party colors. We also serve graduations, school celebrations and private parties throughout Skokie.`],
      ['What comes with a Skokie rental', `Every rental includes unlimited 360 videos during the reserved period, a professional attendant, a custom event overlay, props, lighting, instant sharing when connectivity allows, delivery, setup and breakdown. We recommend a clear 10-by-10-foot area and one standard electrical outlet. The attendant manages the booth so the host and venue team do not have to.`],
      ['Choosing your package and setup area', `Two hours works well for smaller events or a specific entertainment window. Four hours is our most popular option for receptions and larger parties. Six hours provides extended coverage. A visible location near the main event space usually encourages participation, but the booth should not block entrances, catering paths or emergency exits.`],
      ['Nearby areas we serve', `In addition to Skokie, we serve <a href="/photo-booth-rental-evanston">Evanston</a>, Lincolnwood, Morton Grove, Niles, Wilmette and Chicago’s North Side. Explore our <a href="/wedding-photo-booth-chicago">wedding service</a>, <a href="/quinceanera-photo-booth-chicago">quinceañera rentals</a> or complete <a href="/360-photo-booth-chicago">Chicago 360 booth experience</a>.`]
    ],
    faqs: [
      ['Do you deliver 360 booths to Skokie?', 'Yes. Skokie is within our core Chicagoland service area. Share the venue when requesting pricing so we can confirm access and timing.'],
      ['What events do you serve in Skokie?', 'We serve weddings, quinceañeras, birthdays, graduations, school events, private parties and company celebrations.'],
      ['How much space is required?', 'Plan for a clear 10-by-10-foot area, safe guest access and one standard electrical outlet nearby.'],
      ['How far ahead should I book?', 'Popular weekend dates can fill early. Check availability as soon as your date and venue are reasonably firm.']
    ]
  },
  {
    slug: 'photo-booth-rental-evanston',
    type: 'location',
    keyword: 'photo booth rental Evanston',
    title: '360 Photo Booth Rental Evanston | AACT Booths',
    description: 'Reserve an Evanston 360 photo booth for weddings, university events, birthdays and corporate celebrations with an attendant and custom overlay.',
    eyebrow: 'EVANSTON 360 PHOTO BOOTH RENTAL',
    h1: '360 Photo Booth Rentals in Evanston, Illinois',
    lede: 'AACT Booths brings attended 360 video entertainment to Evanston weddings, campus celebrations, birthdays, company events and private parties.',
    eventType: '360 photo booth rental',
    area: 'Evanston',
    sections: [
      ['A flexible fit for Evanston events', `Evanston’s mix of lakefront celebrations, university gatherings, hotels and neighborhood venues calls for entertainment that can adapt to different timelines. The 360 booth can run during cocktail hour, a reception, an alumni gathering or a company party. Guests create short videos in small groups and can share them while the event is still active when the venue has a reliable connection.`],
      ['Weddings, campus events and private parties', `Couples use the booth as reception entertainment that brings both families together. Student groups and schools can add it to formal events, graduations and celebrations. Birthday and private-party hosts can personalize every clip with an event-specific overlay. Corporate organizers can add logos and campaign colors for a more branded experience.`],
      ['Included with your Evanston rental', `AACT Booths provides unlimited 360 videos, a custom overlay, a professional attendant, props, lighting, guest sharing, delivery, setup and breakdown. The attendant directs groups, watches the platform and keeps the line moving. We recommend a clear 10-by-10-foot footprint, nearby power and venue approval for the selected setup area.`],
      ['Planning for the venue and timeline', `Two hours can cover a cocktail hour or smaller event. Four hours is a strong fit for a full reception or company party. Six hours works for extended programs and larger guest lists. We confirm access and setup time before the date, including any loading instructions or restrictions shared by the venue.`],
      ['Serving the North Shore and Chicago', `We serve Evanston and nearby communities including <a href="/photo-booth-rental-skokie">Skokie</a>, Wilmette, Rogers Park, Lincolnwood and Chicago. Learn more about our <a href="/corporate-photo-booth-chicago">corporate photo booth</a>, <a href="/birthday-photo-booth-chicago">birthday rentals</a> or main <a href="/360-photo-booth-chicago">Chicago 360 booth service</a>.`]
    ],
    faqs: [
      ['Do you provide 360 booths for Evanston weddings?', 'Yes. Wedding rentals include unlimited videos, a custom wedding overlay, props, an attendant, sharing, setup and breakdown.'],
      ['Can you serve university or school events?', 'Yes. We serve campus and school celebrations when the organizer and venue approve the setup location and event requirements.'],
      ['Can we add a school or company logo?', 'Yes. A custom overlay can include an approved logo, event name, date and colors.'],
      ['What does the venue need to provide?', 'We recommend a clear 10-by-10-foot area, one standard outlet and reliable connectivity if instant sharing is important.']
    ]
  },
  {
    slug: 'photo-booth-rental-naperville',
    type: 'location',
    keyword: 'photo booth rental Naperville',
    title: '360 Photo Booth Rental Naperville | AACT Booths',
    description: 'Book a Naperville 360 photo booth for weddings, quinceañeras, birthdays and corporate events with unlimited videos and a professional attendant.',
    eyebrow: 'NAPERVILLE 360 PHOTO BOOTH RENTAL',
    h1: '360 Photo Booth Rentals in Naperville, Illinois',
    lede: 'AACT Booths provides full-service 360 video booth rentals for Naperville receptions, family celebrations, school events and company gatherings.',
    eventType: '360 photo booth rental',
    area: 'Naperville',
    sections: [
      ['Memorable entertainment for Naperville venues', `Naperville has a wide range of banquet spaces, hotels and private-event venues. A 360 booth fits celebrations where guests need an activity that feels social, modern and easy to join. Each group gets a short video instead of a traditional print, making the experience especially useful for receptions and parties built around music, dancing and sharing.`],
      ['From weddings to company celebrations', `Wedding couples can open the booth during cocktail hour or the reception. Quinceañera and birthday hosts can customize the design around the guest of honor. Schools can use it for dances and graduation celebrations, while companies can add branded overlays for employee events, holiday parties and conferences.`],
      ['A staffed, complete rental', `Your package includes the 360 platform, lighting, props, unlimited videos, a custom overlay, an attendant, guest sharing, delivery, setup and breakdown. Our attendant guides guests and monitors the platform throughout the rental. A clear 10-by-10-foot space and standard power are recommended, and we confirm venue details before the event.`],
      ['Select a rental length that matches attendance', `Two hours can work for a shorter party or dedicated booth window. Four hours gives most wedding and company receptions enough coverage for steady guest participation. Six hours is useful for longer events and larger guest counts. We can recommend an option after reviewing your event type, timeline and expected attendance.`],
      ['Naperville and nearby western suburbs', `AACT Booths serves Naperville and nearby communities including Aurora, Lisle, Wheaton, Downers Grove and Oak Brook. We also travel throughout Chicago and Chicagoland. Compare our <a href="/#packages">current packages</a>, explore <a href="/wedding-photo-booth-chicago">Chicago wedding booth options</a> or <a href="/book.html">check availability</a>.`]
    ],
    faqs: [
      ['Do you travel to Naperville?', 'Yes. We serve Naperville and nearby western suburbs. Any travel details are confirmed before you reserve.'],
      ['What events can use the booth?', 'The booth works for weddings, quinceañeras, birthdays, school events, graduations, company events and private parties.'],
      ['Is a custom overlay included?', 'Yes. Every rental includes an overlay designed for the event with names, a date, colors or approved branding.'],
      ['When should setup happen?', 'We coordinate an arrival window before guest use begins and confirm venue access instructions in advance.']
    ]
  },
  {
    slug: 'photo-booth-rental-schaumburg',
    type: 'location',
    keyword: 'photo booth rental Schaumburg',
    title: '360 Photo Booth Rental Schaumburg | AACT Booths',
    description: 'Add a Schaumburg 360 photo booth to a wedding, birthday, quinceañera, conference or company party with custom branding and an attendant.',
    eyebrow: 'SCHAUMBURG 360 PHOTO BOOTH RENTAL',
    h1: '360 Photo Booth Rentals in Schaumburg, Illinois',
    lede: 'From hotel conferences to family receptions, AACT Booths brings a professional 360 video booth experience to events throughout Schaumburg and the northwest suburbs.',
    eventType: '360 photo booth rental',
    area: 'Schaumburg',
    sections: [
      ['A strong fit for Schaumburg event spaces', `Schaumburg is home to large hotels, conference spaces, banquet halls and company venues. The 360 booth gives planners a flexible entertainment feature that works for a formal reception, employee party, conference social or family celebration. It creates visible energy in the room and produces short videos guests can keep after the event.`],
      ['Corporate events and brand activations', `For a conference, company party or activation, we can place approved branding on every video through a custom overlay. The booth provides an informal activity that makes networking and employee events feel less passive. Guests can participate with coworkers and share finished clips when the venue has dependable connectivity.`],
      ['Weddings, quinceañeras and birthdays', `Family celebrations benefit from an activity that different groups can enjoy together. Wedding parties can use the booth after dinner, quinceañera guests can visit between traditions and dancing, and birthday hosts can add a personalized name-and-date design. Unlimited videos let guests return throughout the reserved time.`],
      ['What the rental includes', `Every Schaumburg rental includes a professional attendant, unlimited 360 videos, a custom overlay, props, lighting, instant sharing when available, delivery, setup and breakdown. We recommend a clear 10-by-10-foot space, one standard outlet and a setup location that is visible without interrupting venue traffic.`],
      ['Serving Schaumburg and the northwest suburbs', `We serve Schaumburg, Arlington Heights, Hoffman Estates, Elk Grove Village, Rolling Meadows and other Chicagoland communities. Explore our <a href="/corporate-photo-booth-chicago">corporate event service</a>, <a href="/quinceanera-photo-booth-chicago">quinceañera rentals</a> and <a href="/360-photo-booth-chicago">Chicago 360 booth overview</a>, or <a href="/book.html">request pricing</a>.`]
    ],
    faqs: [
      ['Do you serve Schaumburg corporate events?', 'Yes. We provide staffed 360 booths for company parties, conferences, employee events and brand activations.'],
      ['Can the videos include company branding?', 'Yes. The included custom overlay can feature an approved logo, event title and brand colors.'],
      ['Do you also serve weddings and family events?', 'Yes. We serve weddings, quinceañeras, birthdays, graduations and private parties throughout Schaumburg.'],
      ['Is delivery and breakdown included?', 'Yes. Delivery, setup, operation and breakdown are included; any travel details are confirmed before booking.']
    ]
  }
];

const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const faqSchema = faqs => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(([name, answer]) => ({'@type':'Question', name, acceptedAnswer:{'@type':'Answer', text:answer}}))
});

function schema(page) {
  const url = `${origin}/${page.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {'@type':'Organization','@id':`${origin}/#organization`,name:'AACT Booths',alternateName:'All Around Chi-Town',url:`${origin}/`,logo:`${origin}/assets/all-around-chi-town-logo-transparent.png`,sameAs:['https://www.instagram.com/allaroundchitown360/']},
      {'@type':'LocalBusiness','@id':`${origin}/#business`,name:'AACT Booths',alternateName:'All Around Chi-Town',url:`${origin}/`,telephone:phone,email,image:`${origin}/360-hero.webp`,parentOrganization:{'@id':`${origin}/#organization`},areaServed:{'@type':page.area === 'Chicago' ? 'City' : 'Place',name:page.area}},
      {'@type':'Service','@id':`${url}#service`,name:page.h1,serviceType:page.eventType,provider:{'@id':`${origin}/#business`},areaServed:{'@type':page.area === 'Chicago' ? 'City' : 'Place',name:page.area},description:page.description,url},
      {'@type':'BreadcrumbList','@id':`${url}#breadcrumbs`,itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:`${origin}/`},{'@type':'ListItem',position:2,name:page.h1,item:url}]},
      faqSchema(page.faqs)
    ]
  };
}

const serviceLinks = [
  ['/360-photo-booth-chicago','Chicago 360 Photo Booth'],
  ['/wedding-photo-booth-chicago','Wedding Photo Booth'],
  ['/corporate-photo-booth-chicago','Corporate Photo Booth'],
  ['/birthday-photo-booth-chicago','Birthday Photo Booth'],
  ['/quinceanera-photo-booth-chicago','Quinceañera Photo Booth']
];
const locationLinks = [
  ['/photo-booth-rental-skokie','Skokie Photo Booth Rental'],
  ['/photo-booth-rental-evanston','Evanston Photo Booth Rental'],
  ['/photo-booth-rental-naperville','Naperville Photo Booth Rental'],
  ['/photo-booth-rental-schaumburg','Schaumburg Photo Booth Rental']
];

function render(page) {
  const url = `${origin}/${page.slug}`;
  const links = [...serviceLinks, ...locationLinks].filter(([href]) => href !== `/${page.slug}`);
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png"><link rel="shortcut icon" href="/favicon.ico">
<title>${esc(page.title)}</title><meta name="description" content="${esc(page.description)}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:locale" content="en_US"><meta property="og:site_name" content="AACT Booths"><meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/360-hero.webp"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="AACT Booths 360 photo booth experience in Chicagoland">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(page.title)}"><meta name="twitter:description" content="${esc(page.description)}"><meta name="twitter:image" content="${origin}/360-hero.webp"><meta name="theme-color" content="#202020">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/seo-pages.css">
<script type="application/ld+json">${JSON.stringify(schema(page))}</script></head><body>
<header class="seo-header"><a class="nav-wordmark" href="/" aria-label="AACT Booths home"><span class="nav-wordmark-main"><b>AACT</b> BOOTHS</span><span class="nav-wordmark-tagline">360 DEGREES OF FUN</span></a><nav aria-label="Primary"><a href="/360-photo-booth-chicago">Services</a><a href="/#videos">Videos</a><a href="/#packages">Packages</a><a href="/#faq">FAQ</a><a href="/book.html">Book</a></nav><a class="button" href="#pricing">Check Availability</a></header>
<main><section class="seo-hero"><div><p class="eyebrow">${page.eyebrow}</p><h1>${page.h1}</h1><p class="seo-lede">${page.lede}</p><ul><li>Professional booth attendant</li><li>Unlimited 360 videos</li><li>Custom event overlay</li><li>Instant guest sharing</li><li>Props, setup and breakdown</li></ul><a class="button" href="#pricing">Check Availability &amp; Get Pricing</a></div><div class="seo-video"><video autoplay muted loop playsinline preload="metadata" poster="/360-hero.webp" width="720" height="968" aria-label="Real AACT Booths 360 video from a Chicagoland event"><source src="https://all-around-chi-town-360.noah630.chatgpt.site/assets/aac-hero-video.mp4" type="video/mp4"></video><span>REAL EVENT VIDEO</span></div></section>
<section class="seo-trust" aria-label="Service highlights"><span>2+ Years Experience</span><span>Chicago &amp; Suburbs</span><span>Attendant Included</span><span>Free Standard Delivery</span></section>
<section class="seo-content"><article>${page.sections.map(([heading,body],i)=>`<h2>${heading}</h2><p>${body}</p>`).join('')}</article><aside class="seo-form" id="pricing"><p class="eyebrow">CHECK AVAILABILITY &amp; GET PRICING</p><h2>Tell us about your date.</h2><form class="lead-form"><label>First name<input name="firstName" autocomplete="given-name" required></label><label>Phone number<input name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="18" required placeholder="${displayPhone}"></label><label>Event date<input name="date" type="date" required></label><label>Event type<select name="eventType" required><option value="" selected disabled>Select event type</option><option>Wedding</option><option>Quinceañera</option><option>Birthday</option><option>Corporate Event</option><option>School Event</option><option>Graduation</option><option>Brand Activation</option><option>Private Party</option></select></label><button class="button" type="submit">Check Availability &amp; Get Pricing</button></form><p class="form-note" aria-live="polite">No obligation. Your date is reserved after the deposit is received.</p></aside></section>
<section class="seo-faq"><p class="eyebrow">COMMON QUESTIONS</p><h2>${page.area} 360 photo booth FAQ</h2><div class="accordion">${page.faqs.map(([q,a])=>`<details><summary>${q}<span>+</span></summary><p>${a}</p></details>`).join('')}</div></section>
<section class="seo-links"><h2>Explore AACT Booths services and locations</h2><div>${links.map(([href,label])=>`<a href="${href}">${label}</a>`).join('')}<a href="/#packages">360 Booth Packages &amp; Pricing</a><a href="/book.html">Check Availability</a></div></section></main>
<footer><div class="footer-about"><a class="footer-brand" href="/"><span class="footer-wordmark"><span class="footer-aact">AACT</span> <span class="footer-booths">BOOTHS</span></span><span class="footer-tagline">360 DEGREES OF FUN</span></a><p>Professional 360 photo booth rentals for Chicago and the surrounding suburbs.</p></div><div><small>CONTACT</small><a href="tel:${phone}">${displayPhone}</a><a href="mailto:${email}">${email}</a><a href="/book.html">Request pricing</a></div><p class="copyright">© 2026 AACT Booths. All rights reserved.</p></footer><script src="/analytics.js" defer></script><script src="/video-autoplay.js" defer></script><script src="/seo-pages.js" defer></script></body></html>`;
}

for (const page of pages) {
  const html = render(page);
  writeFileSync(join(out, `${page.slug}.html`), html);
  mkdirSync(join(out, page.slug), { recursive: true });
  writeFileSync(join(out, page.slug, 'index.html'), html);
}

let home = readFileSync(join(out, 'index.html'), 'utf8');
home = home
  .replace('<h1 id="hero-title">Chicago 360 Photo Booth Rentals That Guests Remember</h1>', '<h1 id="hero-title">Chicago 360 Photo Booth Rental</h1>')
  .replace('<h2>Simple packages for <em>every celebration.</em></h2>', '<h2>Chicago 360 Photo Booth Rental <em>Packages &amp; Pricing</em></h2>')
  .replace('<article class="event-type-card"><span>02</span><div><p>QUINCEAÑERAS</p><h3>A spotlight-worthy experience</h3><small>Custom colors, names and event date</small></div></article>', '<a class="event-type-card" href="/quinceanera-photo-booth-chicago"><span>02</span><div><p>QUINCEAÑERAS</p><h3>A spotlight-worthy experience</h3><small>Custom colors, names and event date</small></div><b>Explore quinceañeras →</b></a>')
  .replace('<article class="event-type-card"><span>04</span><div><p>CELEBRATIONS</p><h3>Keep the whole party involved</h3><small>Birthdays, graduations and school events</small></div></article>', '<a class="event-type-card" href="/birthday-photo-booth-chicago"><span>04</span><div><p>BIRTHDAYS</p><h3>Keep the whole party involved</h3><small>Birthdays, graduations and private events</small></div><b>Explore birthdays →</b></a>')
  .replaceAll('/360-photo-booth-rental-chicago', '/360-photo-booth-chicago')
  .replaceAll('/360-photo-booth-rental-skokie', '/photo-booth-rental-skokie')
  .replaceAll('/360-photo-booth-rental-evanston', '/photo-booth-rental-evanston')
  .replaceAll('/360-photo-booth-rental-naperville', '/photo-booth-rental-naperville')
  .replaceAll('/360-photo-booth-rental-schaumburg', '/photo-booth-rental-schaumburg')
  .replace('https://allaroundchitown.com/all-around-chi-town-logo-transparent.png', 'https://allaroundchitown.com/assets/all-around-chi-town-logo-transparent.png')
  .replace('preload="metadata" poster="assets/360-hero.webp" aria-label="A real wedding 360 photo booth video"', 'preload="metadata" poster="/360-hero.webp" width="720" height="968" aria-label="A real wedding 360 photo booth video"')
  .replace('poster="assets/360-hero.webp" width="720" height="968"', 'poster="/360-hero.webp" width="720" height="968"')
  .replaceAll('preload="metadata" aria-label="Corporate event 360 video"', 'preload="none" width="540" height="968" aria-label="Corporate event 360 video"')
  .replaceAll('preload="metadata" aria-label="Wedding 360 video"', 'preload="none" width="720" height="1280" aria-label="Wedding 360 video"')
  .replaceAll('preload="metadata" aria-label="Celebration 360 video"', 'preload="none" width="540" height="968" aria-label="Celebration 360 video"');

home = home.replace(/<video data-lazy-video muted loop playsinline preload="none"([^>]*)>([\s\S]*?)<\/video>/g, (_, attrs, sources) =>
  `<video autoplay muted loop playsinline preload="metadata"${attrs}>${sources.replace(/\sdata-src=/g, ' src=')}</video>`
);
home = home.replace(/<section class="details" id="details"><div class="section-title"><p class="eyebrow">THE SPECS<\/p><h2>360 photo booth specs <em>at a glance\.<\/em><\/h2><\/div><div class="spec-grid">[\s\S]*?<\/div><div class="included-heading">/, '<section class="details" id="details"><div class="included-heading">');
home = home.replace('<a href="#details">360 Booth Details</a>', '<a href="#packages">Packages &amp; Pricing</a>');
home = home.replace('<a href="#included">What’s Included</a>', '<a href="#packages">Packages &amp; Pricing</a>');

const advanceFaq = '<details><summary>How far in advance should I book a 360 photo booth?<span>+</span></summary><p>Popular Friday and Saturday dates can fill early, especially during wedding and graduation seasons. Check availability as soon as your event date and venue are reasonably firm.</p></details>';
home = home.replaceAll(advanceFaq, '');
home = home.replace('</div></section>\n<section class="home-final-cta"', `${advanceFaq}</div></section>\n<section class="home-final-cta"`);

const ldMatch = home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (ldMatch) {
  const ld = JSON.parse(ldMatch[1]);
  ld['@graph'] = ld['@graph'].filter(item => item['@type'] !== 'FAQPage');
  ld['@graph'].push(faqSchema([
    ['How much does a 360 photo booth rental cost in Chicago?', 'AACT Booths packages currently start at $350 for two hours. Four-hour and six-hour options are also available. Final pricing can depend on the event location, date, rental length and special branding needs.'],
    ['How far in advance should I book a 360 photo booth?', 'Popular Friday and Saturday dates can fill early, especially during wedding and graduation seasons. Check availability as soon as your event date and venue are reasonably firm.'],
    ['Are 360 photo booths good for weddings?', 'A 360 booth provides interactive reception entertainment and shareable video keepsakes for guests.'],
    ['What is included with a Chicago 360 photo booth rental?', 'Every AACT Booths rental includes an attendant, unlimited videos, a custom overlay, props, lighting, sharing, delivery, setup and breakdown.'],
    ['Do you provide 360 booths for corporate events?', 'Yes. AACT Booths serves company parties, conferences, employee events and brand activations.'],
    ['Do you travel to Chicago suburbs?', 'Yes. AACT Booths serves Chicago and surrounding Chicagoland communities, including Skokie, Evanston, Naperville and Schaumburg.']
  ]));
  home = home.replace(ldMatch[0], `<script type="application/ld+json">${JSON.stringify(ld)}</script>`);
}
writeFileSync(join(out, 'index.html'), home);

const redirects = [
  ...pages.map(p => `/${p.slug} /${p.slug}.html 200`),
  '/360-photo-booth-rental-chicago /360-photo-booth-chicago 301',
  '/360-photo-booth-rental-skokie /photo-booth-rental-skokie 301',
  '/360-photo-booth-rental-evanston /photo-booth-rental-evanston 301',
  '/360-photo-booth-rental-naperville /photo-booth-rental-naperville 301',
  '/360-photo-booth-rental-schaumburg /photo-booth-rental-schaumburg 301',
  '/book /book.html 200'
];
writeFileSync(join(out, '_redirects'), redirects.join('\n') + '\n');

const sitemapPages = [
  ['', '1.0'],
  ...pages.map(p => [p.slug, p.type === 'service' ? '0.9' : '0.8']),
  ['360-photo-booth-rental-arlington-heights', '0.7'],
  ['360-photo-booth-rental-oak-brook', '0.7'],
  ['360-photo-booth-rental-des-plaines', '0.7'],
  ['book.html', '0.8']
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPages.map(([slug,priority])=>`  <url><loc>${origin}/${slug}</loc><lastmod>${today}</lastmod><changefreq>${slug ? 'monthly' : 'weekly'}</changefreq><priority>${priority}</priority></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(join(out, 'sitemap.xml'), sitemap);

writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /confirmation.html\nDisallow: /raffle.html\n\nSitemap: ${origin}/sitemap.xml\n`);

const legacyCanonicals = {
  '360-photo-booth-rental-chicago.html': '/360-photo-booth-chicago',
  '360-photo-booth-rental-skokie.html': '/photo-booth-rental-skokie',
  '360-photo-booth-rental-evanston.html': '/photo-booth-rental-evanston',
  '360-photo-booth-rental-naperville.html': '/photo-booth-rental-naperville',
  '360-photo-booth-rental-schaumburg.html': '/photo-booth-rental-schaumburg'
};
for (const [file, canonical] of Object.entries(legacyCanonicals)) {
  const path = join(out, file);
  let legacy = readFileSync(path, 'utf8');
  legacy = legacy
    .replace(/<meta name="robots" content="[^"]+">/, '<meta name="robots" content="noindex,follow">')
    .replace(/<link rel="canonical" href="[^"]+">/, `<link rel="canonical" href="${origin}${canonical}">`);
  writeFileSync(path, legacy);
  const legacySlug = file.replace(/\.html$/, '');
  mkdirSync(join(out, legacySlug), { recursive: true });
  writeFileSync(join(out, legacySlug, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow"><link rel="canonical" href="${origin}${canonical}"><meta http-equiv="refresh" content="0;url=${canonical}"><title>Page moved | AACT Booths</title></head><body><p>This page has moved to <a href="${canonical}">${origin}${canonical}</a>.</p></body></html>`);
}

for (const file of readdirSync(out).filter(name => name.endsWith('.html') && name !== 'googled7918341aa0ef9d9.html')) {
  const path = join(out, file);
  let html = readFileSync(path, 'utf8');
  html = html
    .replace(/<source src="\/?aac-(?:hero-video|wedding-reel|wedding-video|reel-3)\.mp4" type="video\/mp4">/g, '')
    .replaceAll(`${origin}/all-around-chi-town-logo-transparent.png`, `${origin}/assets/all-around-chi-town-logo-transparent.png`);
  writeFileSync(path, html);
}

console.log(`Generated ${pages.length} SEO pages and updated homepage, redirects, sitemap and robots.txt.`);
