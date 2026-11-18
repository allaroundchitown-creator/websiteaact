// Content for the SEO landing pages. Each page targets one search phrase.
// Edit text here, then run:  node scripts/build-seo-pages.mjs
// Facts used everywhere must match the homepage (pricing, what's included).

export const PRICES = { signature: 440, elite: 660, premiere: 880 };
// Corporate events are priced separately from private events.
export const CORPORATE = { two: 1200, four: 2200 };
// Weddings are priced separately too.
export const WEDDING = { two: 849, four: 1295 };
// Quinceañeras use the wedding structure (2 / 4 hours) at $200 less.
export const QUINCE = { two: WEDDING.two - 200, four: WEDDING.four - 200 };
const usd = n => '$' + n.toLocaleString('en-US');
const WED_LINK = `Weddings have their own pricing, from ${usd(WEDDING.two)}: <a href="/wedding-photo-booth-chicago">see wedding packages</a>.`;

const QUINCE_LINK = `Quinceañeras have their own pricing, from ${usd(QUINCE.two)}: <a href="/quinceanera-photo-booth-chicago">see quinceañera packages</a>.`;

const P = PRICES;

export const pages = [
  // ───────────────────────── MAIN SERVICE / PRICING ─────────────────────────
  {
    slug: '360-photo-booth-chicago',
    nav: '360 Booth Prices',
    title: 'Chicago 360 Photo Booth Prices & Packages | AACT Booths',
    description: `What a 360 photo booth rental costs in Chicago: 2 hours $${P.signature}, 3 hours $${P.elite}, 4 hours $${P.premiere}. Attendant, unlimited videos and custom overlay included.`,
    script: 'Straight Pricing',
    h1: '360 Photo Booth Rental Prices in Chicago',
    intro: `No "call for a quote" games. Here's exactly what a 360 video booth costs in Chicago, what's included, and how to pick the right package for your event.`,
    hero: { src: '/event-hero-upright.webp', alt: 'Two guests posing on the AACT 360 video booth at a Chicago party' },
    area: 'Chicago',
    service: '360 photo booth rental',
    sections: [
      ['How much does a 360 photo booth cost in Chicago?',
        `<p>Our 360 booth packages run <strong>$${P.signature} for 2 hours</strong>, <strong>$${P.elite} for 3 hours</strong> and <strong>$${P.premiere} for 4 hours</strong>. That price includes the booth, the platform, an on-site attendant, unlimited videos, a custom video overlay, props, instant sharing, and delivery, setup and breakdown. There's no separate "attendant fee" or "setup fee" added at the end.</p>
         <p>Setup and pack-down don't eat into your time either. We arrive early so the booth is spinning when your package starts, and every hour you pay for is booth time for your guests.</p>`],
      ['Which package should you pick?',
        `<p><strong>Signature (2 hours)</strong> works for birthdays, smaller parties and events where the booth is one activity among many. Two hours is enough for most guests to take a few spins.</p>
         <p><strong>Elite (3 hours)</strong> fits bigger birthdays and graduation parties where guests arrive over a longer window and you want the booth running for most of the night.</p>
         <p><strong>Premiere (4 hours)</strong> is our go-to for sweet 16s and big parties. It adds cold spark machines, professional lighting, stanchions and a carpet so the booth looks like part of the décor.</p>`],
      ['What you get at every Chicago event',
        `<p>Guests step onto the platform, the camera arm spins around them, and a few seconds later they have a slow-motion video set to music with your custom overlay on it. They scan a QR code at the booth and the video lands on their phone, ready for TikTok, Instagram Reels or the group chat.</p>
         <p>Your attendant runs everything: coaching poses, handing out props, keeping the line moving and making sure every group gets their video. You don't have to babysit the booth.</p>`],
      ['What affects the final price?',
        `<p>For most events in Chicago and the nearby suburbs, the package price is the price. Events farther out may have a travel fee, and you can add extra hours if your timeline runs long. Tell us your venue and date in the form below and we'll send back a clear quote, usually the same day.</p>`],
    ],
    faqs: [
      ['How much is a 360 photo booth rental in Chicago?', `AACT packages are $${P.signature} for 2 hours, $${P.elite} for 3 hours and $${P.premiere} for 4 hours, with an attendant, unlimited videos, a custom overlay and setup included.`],
      ['Are there hidden fees?', 'No. Setup, breakdown, the attendant and the custom overlay are all included. Events far outside the Chicago area may have a travel fee, which we tell you up front.'],
      ['Can I add more time?', 'Yes. Mention it in your request and we will quote extra hours with your package.'],
    ],
  },

  // ───────────────────────── EVENT TYPES ─────────────────────────
  {
    slug: 'wedding-photo-booth-chicago',
    nav: 'Wedding Photo Booth',
    title: 'Wedding 360 Photo Booth Rental Chicago | AACT Booths',
    description: `Add a 360 video booth to your Chicago wedding. Custom names-and-date overlay, slow-motion videos, an attendant all night. 2 hours ${usd(WEDDING.two)}, 4 hours ${usd(WEDDING.four)}.`,
    script: 'Spin Into Forever',
    h1: 'Wedding 360 Photo Booth Rental in Chicago',
    intro: `Give your guests the moment they'll post the next morning. Our 360 video booth turns your reception into slow-motion clips with your names and wedding date on every one.`,
    hero: { src: '/strip-wedding-confetti.webp', alt: 'Bride and groom celebrating on the AACT 360 booth with confetti at their Chicago wedding reception' },
    area: 'Chicago',
    service: 'Wedding 360 photo booth rental',
    dedicated: {
      navLabel: 'Weddings',
      ticks: ['Your names and wedding date on every video', 'An attendant with the booth all night', 'Cold sparks, pro lighting, stanchions and carpet for the full ballroom look'],
      image: { src: '/strip-wedding-confetti.webp', alt: 'Couple celebrating with confetti on the AACT 360 booth at their Chicago wedding reception', pos: '50% 42%' },
      order: ['highlights', 'split', 'timeline', 'packages', 'why', 'specs'],
      highlights: { kicker: 'Why couples book it', h2: 'More Than a Photo Strip', items: [
        ['overlay', 'Your Names on Every Clip', 'We design a custom overlay with your names, date and wedding colors, and send it for your approval before the wedding.'],
        ['share', 'On Their Phones in Seconds', 'Guests scan a QR code and their slow-motion video is ready to post that night. You get the videos too.'],
        ['attendant', 'Nobody Has to Run It', 'Our attendant coaches poses, hands out props and keeps the line moving, so your wedding party stays on the dance floor.'],
      ] },
      split: { h2: 'Made for the Dress, the Tux and the Dance Floor',
        text: ['A traditional booth gives you a strip of stills. A 360 booth gives you video: the dress twirling, the groomsmen showing off, grandma’s surprise dance move, all in slow motion with music.',
          'With cold spark machines, professional lighting, stanchions and a carpet under the platform, the booth looks like part of the room.'],
        images: [['/360-booth-setup.webp', 'AACT 360 booth set up with lighting at an evening event'], ['/event-preview.webp', 'Bride and groom back to back on the AACT 360 booth with their wedding overlay'], ['/package-premiere.webp', 'Bride and groom dancing on the AACT 360 booth at their reception']] },
      timeline: { kicker: 'Your wedding day', h2: 'How the Booth Fits Your Timeline', steps: [
        ['Before guests arrive', 'We coordinate load-in with your venue and planner and set up early. Setup never comes out of your hours.'],
        ['Cocktail hour', 'The booth opens while guests are dressed up and looking for something to do.'],
        ['Reception', 'Dinner ends, the dance floor fills and the line at the booth starts.'],
        ['After the last spin', 'We pack everything down. Guests already have their videos, and you get them too.'],
      ] },
      packages: { h2: 'Wedding Pricing', sub: 'Upfront pricing for weddings. No setup fee, no attendant fee.', cta: 'Check My Date',
        cards: [
          { name: '2 Hours', label: 'Wedding', price: WEDDING.two, pkg: 'Wedding – 2 hrs', for: 'For cocktail hour, or the busiest stretch of the dance floor.' },
          { name: '4 Hours', label: 'Wedding', price: WEDDING.four, pkg: 'Wedding – 4 hrs', for: 'Cocktail hour through the dance floor, so every guest gets a turn.' },
        ] },
      specs: { kicker: 'For your venue &amp; planner', h2: 'Easy on Your Venue', items: [
        ['10×10 ft', 'Space', 'A flat area of about 10×10 ft near the dance floor or cocktail space.'],
        ['1 outlet', 'Power', 'One standard outlet nearby is all we need.'],
        ['Early', 'Setup', 'We arrive before your guests and are ready when your package starts.'],
        ['Chicagoland', 'Service area', 'Downtown hotels and lofts to suburban banquet halls. Farther out, a travel fee may apply.'],
      ] },
      book: { h2: 'Check Your Wedding Date', lead: 'Send your date and venue and we’ll get back to you with availability and a quote, usually the same day.', type: 'Wedding' },
    },
    sections: [
      ['Why couples add a 360 booth to their wedding',
        `<p>A traditional photo booth gives you a strip of stills. A 360 booth gives you video: the dress twirling, the groomsmen showing off, grandma's surprise dance move, all in slow motion with music. Guests share their videos right away, so your wedding shows up all over their stories that night.</p>
         <p>You also get the videos. Every clip has your custom overlay with your names, date and wedding colors, so they look like part of your day rather than a generic rental.</p>`],
      ['Wedding pricing',
        `<p>Wedding pricing is <strong>${usd(WEDDING.two)} for 2 hours</strong> or <strong>${usd(WEDDING.four)} for 4 hours</strong>. Four hours covers cocktail hour and the bulk of the reception, when guests are dressed up and ready to celebrate.</p>`],
      ['How it works on your wedding day',
        `<p>We coordinate arrival with your venue and planner, set up before guests arrive, and have the booth ready when your package time starts. Setup time never comes out of your hours. Our attendant stays with the booth all night, so nobody from your wedding party has to run it.</p>
         <p>We need about a 10×10 ft space and one standard outlet. We serve wedding venues across Chicago and the suburbs, from downtown hotels and lofts to suburban banquet halls.</p>`],
    ],
    faqs: [
      ['When should I book a 360 booth for my wedding?', 'As soon as you have your date and venue. Saturdays in peak wedding season go first, so check availability early.'],
      ['Can the overlay match our wedding colors?', 'Yes. We design a custom overlay with your names, date and colors, and send it for your approval before the wedding.'],
      ['Do you work with our venue and planner?', 'Yes. Share your venue and planner contact and we will confirm load-in, space and power ahead of time.'],
      ['How much is a 360 booth for a wedding?', `Wedding pricing is ${usd(WEDDING.two)} for 2 hours or ${usd(WEDDING.four)} for 4 hours. Four hours covers cocktail hour through most of the reception; two hours suits a shorter window.`],
      ['Does our venue need to approve the cold sparks?', 'Some venues have their own rules about cold spark machines. Check with your venue and mention it in your request, and we will plan around it.'],
    ],
  },
  {
    slug: 'quinceanera-photo-booth-chicago',
    nav: 'Quinceañera Photo Booth',
    title: 'Quinceañera 360 Photo Booth Rental Chicago | AACT Booths',
    description: `360 video booth rental for Chicago quinceañeras. Slow-motion videos of the dress, the court and the whole family, with a custom overlay. Packages from ${usd(QUINCE.two)}.`,
    script: 'Her Big Night',
    h1: 'Quinceañera 360 Photo Booth Rental in Chicago',
    intro: `The dress was made for spinning. Our 360 booth captures the quinceañera, her court and the whole family in slow-motion videos with her name on every clip.`,
    hero: { src: '/hero-desktop.webp', alt: 'Guest in a ball gown spinning on the AACT 360 booth at a Chicago quinceañera' },
    area: 'Chicago',
    service: 'Quinceañera 360 photo booth rental',
    quick: [['2 hours', usd(QUINCE.two)], ['4 hours', usd(QUINCE.four)], ['Attendant &amp; setup', 'Included'], ['Videos', 'Unlimited']],
    packageCards: [
      { name: '2 Hours', label: 'Quinceañera', price: QUINCE.two, pkg: 'Quinceañera – 2 hrs', for: 'For the grand entrance and the busiest stretch of the dance floor.' },
      { name: '4 Hours', label: 'Quinceañera', price: QUINCE.four, pkg: 'Quinceañera – 4 hrs', for: 'Grand entrance, dinner and hours of dancing. Adds cold sparks, pro lighting, stanchions &amp; carpet.' },
    ],
    sections: [
      ['Made for quinceañeras',
        `<p>Quinces are big, loud, family-filled celebrations, and that's exactly where a 360 booth shines. The quinceañera's dress looks incredible in slow motion, the chambelanes can bring their best moves, and tías and abuelos get in on the fun too. Every guest leaves with a video on their phone.</p>
         <p>Her name, the date and her theme colors go on a custom overlay, so every clip shared that night looks like it belongs to her party.</p>`],
      ['Quinceañera pricing',
        `<p>Quinceañera pricing is <strong>${usd(QUINCE.two)} for 2 hours</strong> or <strong>${usd(QUINCE.four)} for 4 hours</strong>. Four hours covers the grand entrance, dinner and hours of dancing, and adds cold spark machines, professional lighting, stanchions and a carpet under the platform for a polished look in the banquet hall.</p>
         <p>Both options include the same attendant, unlimited videos and custom overlay.</p>`],
      ['Stress-free for the family',
        `<p>Our attendant runs the booth the whole time, organizes groups and keeps the line moving, so the family can enjoy the party. We set up before guests arrive and pack everything down after, and setup never counts against your hours.</p>
         <p>We serve banquet halls and event spaces across Chicago and the suburbs. Send us the date and hall and we'll confirm availability, usually the same day.</p>`],
    ],
    faqs: [
      ['Can the court take videos together?', 'Yes. The platform fits about 1–4 people at a time, and groups can go as many times as they want.'],
      ['Can the overlay include her name and theme colors?', 'Yes. Every package includes a custom overlay with her name, the date and her colors.'],
      ['How much is a 360 booth for a quinceañera?', `Quinceañera pricing is ${usd(QUINCE.two)} for 2 hours or ${usd(QUINCE.four)} for 4 hours, with the attendant, unlimited videos, custom overlay and setup included.`],
      ['How far ahead should we book for a quinceañera?', 'Book as soon as you have the hall and date. Popular Saturdays fill early.'],
    ],
  },
  {
    slug: 'birthday-photo-booth-chicago',
    nav: 'Birthday & Sweet 16 Booth',
    title: 'Birthday & Sweet 16 360 Photo Booth Rental Chicago | AACT',
    description: `Rent a 360 video booth for a Chicago birthday party or sweet 16. Unlimited slow-motion videos, props, custom overlay and an attendant. 2 hours from $${P.signature}.`,
    script: 'Make It a Party',
    h1: 'Birthday & Sweet 16 Photo Booth Rental in Chicago',
    intro: `Turn any birthday into the party everyone posts about. Our 360 booth gives guests unlimited slow-motion videos with props, music and a custom birthday overlay.`,
    hero: { src: '/event-ring-light.webp', alt: 'Guests at a birthday party filming on the AACT 360 booth with colorful lighting' },
    area: 'Chicago',
    service: 'Birthday 360 photo booth rental',
    sections: [
      ['The birthday activity guests actually line up for',
        `<p>A 360 booth gives guests something to do from the moment they walk in. They grab props, hop on the platform and get a slow-motion video set to music, then scan a QR code to save it. Kids, teens and adults all get into it, which makes it a great fit for 30th, 40th and 50th birthdays as well as kids' parties.</p>`],
      ['Sweet 16s and milestone birthdays',
        `<p>For sweet 16s, the booth becomes the content station of the night. The birthday girl or guy gets their name and date on every video, and friends share their clips right away. For a big sweet 16 with a DJ and a full dance floor, <strong>Premiere (4 hours, $${P.premiere})</strong> adds cold sparks, pro lighting, stanchions and a carpet.</p>`],
      ['Pick the right length',
        `<p>Most house parties and smaller birthdays do great with <strong>Signature (2 hours, $${P.signature})</strong>. Bigger parties where guests come and go all night usually go with <strong>Elite (3 hours, $${P.elite})</strong>. Every package includes the attendant, unlimited videos, props, the custom overlay, and delivery, setup and breakdown.</p>
         <p>We set up in backyards, basements, party rooms, restaurants and banquet halls across Chicago and the suburbs. All we need is about 10×10 ft and an outlet.</p>`],
    ],
    faqs: [
      ['Can you set up at a house party?', 'Yes. Indoors or in a backyard, as long as there is about a 10×10 ft flat area and a standard outlet nearby.'],
      ['Is the booth good for kids?', 'Yes. The attendant helps every group on and off the platform and keeps things safe and moving.'],
      ['What is the best package for a birthday?', `Signature (2 hours, $${P.signature}) fits most birthdays. Go Elite or Premiere for bigger parties and sweet 16s.`],
    ],
  },
  {
    slug: 'corporate-photo-booth-chicago',
    nav: 'Corporate Photo Booth',
    title: 'Corporate 360 Photo Booth Rental Chicago | AACT Booths',
    description: `Branded 360 video booth for Chicago corporate events, holiday parties, graduations and activations. Your logo on every video, attendant included. Trusted at 1,200-guest events.`,
    script: 'Your Brand, Spinning',
    h1: 'Corporate 360 Photo Booth Rental in Chicago',
    intro: `Put your logo on hundreds of shareable videos. Our branded 360 booth works for company parties, school events, graduations and brand activations of 12 or 1,200 guests.`,
    hero: { src: '/adler-booth-setup.webp', alt: 'AACT 360 booth with stanchions, lighting and a branded backdrop at Adler University’s commencement in Chicago', pos: '50% 50%' },
    quick: [['2 hours', '$' + CORPORATE.two.toLocaleString('en-US')], ['4 hours', '$' + CORPORATE.four.toLocaleString('en-US')], ['Backdrop &amp; branding', 'Included'], ['Cold sparks &amp; lighting', 'Included'], ['Attendant &amp; setup', 'Included'], ['Videos', 'Unlimited']],
    area: 'Chicago',
    service: 'Corporate 360 photo booth rental',
    dedicated: {
      navLabel: 'Corporate',
      ticks: ['Your logo, event name or hashtag on every video', 'Backdrop, cold sparks, lighting and stanchions included', 'Trusted at a 1,200-guest university commencement'],
      image: { src: '/adler-booth-setup.webp', alt: 'AACT 360 booth with stanchions, lighting and a branded backdrop, set up for Adler University’s commencement', pos: '50% 50%' },
      noPromo: true,
      order: ['tiles', 'why', 'highlights', 'split', 'timeline', 'packages', 'specs'],
      tiles: { kicker: 'Built for', h2: 'Events We Bring the Booth To', items: [
        ['Holiday parties', 'The part of the party people are still talking about on Monday.'],
        ['Employee appreciation', 'One activity every department lines up for.'],
        ['Client receptions', 'Guests leave with a branded video on their phone.'],
        ['Conferences', 'Give attendees a reason to stop, and a clip with your logo on it.'],
        ['Product launches', 'Put the launch on your guests’ feeds the same night.'],
        ['Brand activations', 'Your campaign hashtag on every video that gets shared.'],
        ['School events', 'Dances and campus events of any size.'],
        ['Graduations', 'Caps, gowns and slow motion, for 12 graduates or 1,200.'],
      ] },
      highlights: { kicker: 'What you get', h2: 'Branded Content, Made by Your Guests', items: [
        ['overlay', 'Your Logo on Every Video', 'Every package includes a custom overlay with your logo, event name or campaign hashtag.'],
        ['share', 'Shared Before They Leave', 'Guests scan a QR code and post their clip on the spot, so your brand travels well past the room.'],
        ['files', 'Yours to Reuse', 'You receive the videos to use on your own social and web channels.'],
      ] },
      split: { h2: 'A Team That Handles the Logistics',
        text: ['Large events need a vendor that shows up on time, works with the venue and keeps a line moving. At Adler University’s commencement we loaded in through the lower Wacker loading dock and were set up within minutes.',
          'Our attendant runs the booth from start to finish, so nobody on your staff gets pulled away to manage it.'],
        images: [['/adler-graduate-on-booth.webp', 'Adler University graduate in cap and gown on the AACT 360 booth at commencement'], ['/corporate-brand-event.webp', 'Guest filming on the AACT 360 booth at a brand event with a logo overlay'], ['/360-booth-setup.webp', 'AACT 360 booth set up with lighting at an evening event']] },
      timeline: { kicker: 'How it works', h2: 'From Request to Event Day', steps: [
        ['Send the details', 'Your date, venue and expected headcount.'],
        ['Get a clear quote', 'Package options and price, usually the same day.'],
        ['We brand it', 'Your logo, event name or hashtag goes on the video overlay.'],
        ['Event day', 'We load in, run the booth and pack it all down.'],
      ] },
      packages: { h2: 'Corporate Pricing', sub: 'Upfront pricing for company, school and brand events. Both options are the full setup: backdrop, cold sparks, lighting, stanchions and your branding.',
        inclTitle: 'Every corporate package includes',
        incl: ['360° video booth &amp; platform', 'On-site attendant', 'Unlimited videos', 'Custom branding on every video', 'Backdrop', 'Cold spark machines', 'Professional lighting', 'Stanchions', 'Slow-motion &amp; music', 'Instant sharing to phones', 'Props', 'Delivery, setup &amp; breakdown'],
        cards: [
          { name: '2 Hours', label: 'Corporate', price: CORPORATE.two, pkg: 'Corporate – 2 hrs', for: 'For a reception, happy hour or a booth during one part of your program.' },
          { name: '4 Hours', label: 'Corporate', price: CORPORATE.four, pkg: 'Corporate – 4 hrs', for: 'For holiday parties, commencements and all-evening events with a large headcount.' },
        ] },
      specs: { kicker: 'Venue logistics', h2: 'What We Need From You', items: [
        ['10×10 ft', 'Space', 'A flat area of about 10×10 ft, indoors or out.'],
        ['1 outlet', 'Power', 'One standard outlet nearby is all we need.'],
        ['Load-in', 'Docks &amp; access', 'Send your venue’s load-in, dock and insurance requirements with your request and we’ll confirm everything before your date.'],
        ['12 to 1,200', 'Headcount', 'Tell us how many guests to expect so we can plan for the line.'],
      ] },
      book: { h2: 'Get a Quote for Your Event', lead: 'Send your date, venue and expected headcount and we’ll confirm logistics and send a quote, usually the same day.', type: 'Corporate', company: true },
    },
    sections: [
      ['Branded content, made by your guests',
        `<p>Every video from the booth carries a custom overlay with your logo, event name or campaign hashtag. Guests share their clips on the spot, so your brand travels well past the event. You also get the videos for your own social and web channels.</p>`],
      ['Proven at large Chicago events',
        `<p>We handled Adler University's commencement with over 1,200 guests, including load-in through the lower Wacker loading dock and a fast setup. Large events need a team that shows up on time, knows how to work with venue logistics and keeps a line moving. That's what our attendants are trained for.</p>`],
      ['Built for',
        `<p>Holiday parties, employee appreciation events, client receptions, conferences, product launches, brand activations, school events and graduations. Corporate pricing is <strong>$${CORPORATE.two.toLocaleString('en-US')} for 2 hours</strong> or <strong>$${CORPORATE.four.toLocaleString('en-US')} for 4 hours</strong>. Both include a backdrop, cold spark machines, professional lighting, stanchions and custom branding on every video.</p>
         <p>We serve downtown Chicago venues, hotels and offices along with suburban corporate campuses. Send your venue, date and expected headcount and we'll confirm logistics and send a quote, usually the same day.</p>`],
    ],
    faqs: [
      ['How much is a 360 booth for a corporate event?', `Corporate pricing is $${CORPORATE.two.toLocaleString('en-US')} for 2 hours or $${CORPORATE.four.toLocaleString('en-US')} for 4 hours, with an attendant, custom branding, a backdrop, cold spark machines, professional lighting, stanchions, unlimited videos and setup included.`],
      ['Can you put our logo on the videos?', 'Yes. Every package includes a custom overlay with your logo, event name or hashtag.'],
      ['Do we get copies of the videos?', 'Yes. You receive the videos to use on your own social and web channels.'],
      ['Can you handle a large event?', 'Yes. We have run the booth at events with more than 1,200 guests, including university commencement.'],
      ['Can you work with venue loading docks and COI requirements?', 'Send us your venue requirements with your request and we will confirm everything before your date.'],
    ],
  },

  // ───────────────────────── SERVICE AREAS ─────────────────────────
  {
    slug: 'photo-booth-rental-skokie',
    nav: 'Skokie',
    city: 'Skokie',
    title: '360 Photo Booth Rental Skokie, IL | AACT Booths',
    description: `360 video booth rental in Skokie, IL for weddings, birthdays, quinceañeras and corporate events. Attendant, unlimited videos, custom overlay. From $${P.signature}.`,
    script: 'Skokie Spins',
    h1: '360 Photo Booth Rental in Skokie, IL',
    intro: `Skokie is right in the middle of our home turf. Bring a 360 video booth with an attendant, unlimited slow-motion videos and a custom overlay to your next Skokie event.`,
    hero: { src: '/img/hero.jpg', alt: 'Guest posing on the AACT 360 booth with stanchions at a Skokie-area event' },
    area: 'Skokie, IL',
    service: '360 photo booth rental',
    nearby: 'Lincolnwood, Morton Grove, Niles, Evanston and Chicago’s North Side',
    sections: [
      ['A 360 booth for every kind of Skokie event',
        `<p>We bring the booth to weddings, quinceañeras, birthday parties, sweet 16s, graduations, school events and company parties around Skokie. Hotel ballrooms, banquet halls, restaurant party rooms, community spaces and backyards all work. We just need a clear 10×10 ft area and a standard outlet.</p>`],
      ['Close by, so you get easy scheduling',
        `<p>Skokie sits in the heart of our service area, so early setups are easy to schedule. We also cover the neighboring towns: Lincolnwood, Morton Grove, Niles, Evanston and Chicago's North Side.</p>`],
      ['Simple pricing for Skokie events',
        `<p><strong>Signature</strong> is 2 hours for $${P.signature}, <strong>Elite</strong> is 3 hours for $${P.elite}, and <strong>Premiere</strong> is 4 hours for $${P.premiere} with cold sparks, pro lighting, stanchions and a carpet. Every package includes the attendant, unlimited videos, a custom overlay, props, instant sharing, and setup and breakdown.</p>`],
    ],
    faqs: [
      ['Do you serve Skokie?', 'Yes. Skokie is in the heart of our service area. Send your venue and date and we will confirm your quote, usually the same day.'],
      ['What Skokie venues can you set up in?', 'Banquet halls, hotels, restaurants, community spaces, schools, offices and homes. We need about 10×10 ft and one outlet.'],
    ],
  },
  {
    slug: 'photo-booth-rental-evanston',
    nav: 'Evanston',
    city: 'Evanston',
    title: '360 Photo Booth Rental Evanston, IL | AACT Booths',
    description: `Rent a 360 video booth in Evanston, IL for weddings, graduations, birthdays and corporate events. Attendant and custom overlay included. Packages from $${P.signature}.`,
    script: 'Evanston Events',
    h1: '360 Photo Booth Rental in Evanston, IL',
    intro: `From lakefront weddings to graduation parties, our 360 video booth gives Evanston guests slow-motion videos they can share before the party's over.`,
    hero: { src: '/event-guests-bubbles.webp', alt: 'Guests playing with bubble guns on the AACT 360 booth at an evening party' },
    area: 'Evanston, IL',
    service: '360 photo booth rental',
    nearby: 'Wilmette, Skokie, Rogers Park and the North Shore',
    sections: [
      ['360 videos for Evanston celebrations',
        `<p>Evanston hosts plenty of weddings, graduation parties, milestone birthdays and university and nonprofit events. A 360 booth fits all of them. Guests step on, the camera spins, and they scan a QR code to get a slow-motion video with your custom overlay.</p>`],
      ['Graduation season in Evanston',
        `<p>Graduation parties are one of our favorite events. Put the graduate's name, school colors and year on the overlay and every guest goes home with a keepsake video. We've also run the booth at a university commencement with over 1,200 guests, so we're comfortable with big crowds and tight schedules.</p>`],
      ['Packages and coverage',
        `<p>Choose <strong>Signature</strong> (2 hours, $${P.signature}), <strong>Elite</strong> (3 hours, $${P.elite}) or <strong>Premiere</strong> (4 hours, $${P.premiere}). Every package includes an attendant, unlimited videos, props, instant sharing, and setup and breakdown. We also cover Wilmette, Skokie, Rogers Park and the rest of the North Shore.</p>`],
    ],
    faqs: [
      ['Do you serve Evanston?', 'Yes. Evanston is inside our regular service area. Send your venue and date and we will confirm your quote.'],
      ['Can you do graduation parties?', 'Yes. We customize the overlay with the graduate’s name, school colors and class year.'],
    ],
  },
  {
    slug: '360-photo-booth-rental-des-plaines',
    nav: 'Des Plaines',
    city: 'Des Plaines',
    title: '360 Photo Booth Rental Des Plaines, IL | AACT Booths',
    description: `360 video booth rental in Des Plaines, IL. Weddings, quinceañeras, hotel and corporate events near O'Hare. Attendant, custom overlay, unlimited videos. From $${P.signature}.`,
    script: 'Des Plaines Parties',
    h1: '360 Photo Booth Rental in Des Plaines, IL',
    intro: `Banquet hall wedding or hotel event near O'Hare, our 360 video booth brings slow-motion, shareable videos to your Des Plaines event with an attendant running the show.`,
    hero: { src: '/strip-bubbles-booth.webp', alt: 'Guest posing on the AACT 360 booth with stanchions and lighting' },
    area: 'Des Plaines, IL',
    service: '360 photo booth rental',
    nearby: 'Park Ridge, Mount Prospect, Rosemont and Niles',
    sections: [
      ['Weddings, quinces and banquet hall events',
        `<p>Des Plaines and the surrounding area are full of banquet halls and hotel ballrooms that host weddings, quinceañeras and big family celebrations. Those rooms are perfect for a 360 booth. With <strong>Premiere</strong> we add cold sparks, pro lighting, stanchions and a carpet so the booth looks as polished as the room.</p>`],
      ['Hotel and corporate events near O’Hare',
        `<p>The hotels and event centers around O'Hare and Rosemont host company meetings, conferences and holiday parties. We put your logo on every video and an attendant keeps things moving. We coordinate load-in with the venue before your date.</p>`],
      ['Pricing and nearby areas',
        `<p><strong>Signature</strong> 2 hours $${P.signature}, <strong>Elite</strong> 3 hours $${P.elite}, <strong>Premiere</strong> 4 hours $${P.premiere}. Every package includes an attendant, unlimited videos, a custom overlay, props, instant sharing, and setup and breakdown. We also serve Park Ridge, Mount Prospect, Rosemont and Niles.</p>`],
    ],
    faqs: [
      ['Do you set up at hotels near O’Hare?', 'Yes. Send us the hotel and room and we will coordinate load-in with the venue.'],
      ['Do you serve Des Plaines?', 'Yes. Des Plaines is inside our regular service area. Send your venue and date and we will confirm your quote.'],
    ],
  },
  {
    slug: '360-photo-booth-rental-arlington-heights',
    nav: 'Arlington Heights',
    city: 'Arlington Heights',
    title: '360 Photo Booth Rental Arlington Heights, IL | AACT Booths',
    description: `360 video booth rental in Arlington Heights, IL for weddings, birthdays, sweet 16s and company events. Attendant and custom overlay included. From $${P.signature}.`,
    script: 'Northwest Burbs',
    h1: '360 Photo Booth Rental in Arlington Heights, IL',
    intro: `Bring the booth everyone lines up for to your Arlington Heights wedding, birthday or company party, with unlimited slow-motion videos and an attendant included.`,
    hero: { src: '/home-hero-4111.webp', alt: 'Guest on the AACT 360 booth with stanchions at an event' },
    area: 'Arlington Heights, IL',
    service: '360 photo booth rental',
    nearby: 'Palatine, Mount Prospect, Buffalo Grove and Rolling Meadows',
    sections: [
      ['360 booth rentals in the northwest suburbs',
        `<p>We set up at Arlington Heights banquet halls, country clubs, restaurants, hotels and homes for weddings, birthdays, sweet 16s, graduation parties and company events. Guests get a slow-motion video set to music with your custom overlay, sent straight to their phone.</p>`],
      ['Great for sweet 16s and grad parties',
        `<p>Teens love the booth. Put the guest of honor's name on the overlay, hand out props and the line forms on its own. For a full night with a DJ, <strong>Premiere</strong> (4 hours) adds cold sparks and pro lighting for a dramatic look.</p>`],
      ['Pricing and coverage',
        `<p><strong>Signature</strong> 2 hours $${P.signature}, <strong>Elite</strong> 3 hours $${P.elite}, <strong>Premiere</strong> 4 hours $${P.premiere}. Every package includes an attendant, unlimited videos, props, instant sharing, and setup and breakdown. We also serve Palatine, Mount Prospect, Buffalo Grove and Rolling Meadows.</p>`],
    ],
    faqs: [
      ['Do you serve Arlington Heights?', 'Yes. Arlington Heights and the surrounding northwest suburbs are in our service area.'],
      ['Can you set up at a country club?', 'Yes. We confirm space, power and load-in with the venue before your event.'],
    ],
  },
  {
    slug: 'photo-booth-rental-schaumburg',
    nav: 'Schaumburg',
    city: 'Schaumburg',
    title: '360 Photo Booth Rental Schaumburg, IL | AACT Booths',
    description: `360 video booth rental in Schaumburg, IL for weddings, hotel and convention events, corporate parties and birthdays. Attendant and custom overlay included. From $${P.signature}.`,
    script: 'Schaumburg Spins',
    h1: '360 Photo Booth Rental in Schaumburg, IL',
    intro: `Hotel ballroom, convention space or banquet hall, our 360 video booth gives your Schaumburg guests slow-motion videos with your names or logo on every clip.`,
    hero: { src: '/events-hero-2543.webp', alt: 'Guest on the AACT 360 booth at a hotel event space' },
    area: 'Schaumburg, IL',
    service: '360 photo booth rental',
    nearby: 'Hoffman Estates, Elk Grove Village, Palatine and Rolling Meadows',
    sections: [
      ['Built for Schaumburg’s hotels and event spaces',
        `<p>Schaumburg has a big concentration of hotels, convention space and banquet halls, which means a lot of weddings, conferences and company events. The 360 booth fits right in. It sets up in about a 10×10 ft footprint with one outlet, and our attendant keeps lines short even at busy events.</p>`],
      ['Corporate and convention events',
        `<p>For trade shows, company parties and brand activations, we add your logo to every video. Guests share their clips on the spot, and you get the videos for your own channels. We've handled events with over 1,200 guests.</p>`],
      ['Weddings, quinces and parties',
        `<p>For sweet 16s and big parties, <strong>Premiere</strong> (4 hours, $${P.premiere}) adds cold sparks, pro lighting, stanchions and a carpet. ${WED_LINK} ${QUINCE_LINK} <strong>Signature</strong> (2 hours, $${P.signature}) and <strong>Elite</strong> (3 hours, $${P.elite}) work well for birthdays and smaller events. We also serve Hoffman Estates, Elk Grove Village, Palatine and Rolling Meadows.</p>`],
    ],
    faqs: [
      ['Can you set up at a Schaumburg hotel or convention center?', 'Yes. We coordinate with the venue on load-in, space and power before your date.'],
      ['Can we brand the videos for a trade show?', 'Yes. Your logo or campaign goes on every video, and you receive the clips after the event.'],
    ],
  },
  {
    slug: '360-photo-booth-rental-oak-brook',
    nav: 'Oak Brook',
    city: 'Oak Brook',
    title: '360 Photo Booth Rental Oak Brook, IL | AACT Booths',
    description: `360 video booth rental in Oak Brook, IL for corporate events, hotel weddings and private parties. Logo or names on every video, attendant included. From $${P.signature}.`,
    script: 'Oak Brook Events',
    h1: '360 Photo Booth Rental in Oak Brook, IL',
    intro: `Corporate party at a hotel or a wedding in the western suburbs, our 360 video booth gives Oak Brook guests slow-motion videos they'll share before dessert.`,
    hero: { src: '/hero-source-quality.webp', alt: 'Guest celebrating on the AACT 360 booth at an event' },
    area: 'Oak Brook, IL',
    service: '360 photo booth rental',
    nearby: 'Oakbrook Terrace, Hinsdale, Elmhurst, Downers Grove and Westchester',
    sections: [
      ['Corporate events in Oak Brook',
        `<p>Oak Brook is home to many company headquarters and hotels, which makes it one of the busiest areas in the western suburbs for corporate events. A branded 360 booth gives your team and clients something fun to do and gives you a stack of logo-branded videos for your social channels.</p>`],
      ['Hotel weddings and private parties',
        `<p>For big celebrations, <strong>Premiere</strong> (4 hours, $${P.premiere}) adds cold sparks, pro lighting, stanchions and a carpet, so the booth looks right at home in a hotel ballroom. ${WED_LINK} <strong>Signature</strong> (2 hours, $${P.signature}) and <strong>Elite</strong> (3 hours, $${P.elite}) are great for shorter events.</p>`],
      ['Serving the western suburbs',
        `<p>We also serve Oakbrook Terrace, Hinsdale, Elmhurst, Downers Grove and Westchester. Send us your venue with your date. Depending on where your event is, a small travel fee may apply, and we'll tell you up front.</p>`],
    ],
    faqs: [
      ['Is there a travel fee to Oak Brook?', 'It depends on the exact venue. Send us the address and we will include any travel fee in your quote up front.'],
      ['Can you brand the booth for a company event?', 'Yes. Your logo goes on every video, and you receive the clips after the event.'],
    ],
  },
  {
    slug: 'photo-booth-rental-naperville',
    nav: 'Naperville',
    city: 'Naperville',
    title: '360 Photo Booth Rental Naperville, IL | AACT Booths',
    description: `360 video booth rental in Naperville, IL for weddings, sweet 16s, graduation parties and corporate events. Attendant and custom overlay included. From $${P.signature}.`,
    script: 'Naperville Nights',
    h1: '360 Photo Booth Rental in Naperville, IL',
    intro: `Bring a 360 video booth to your Naperville wedding, sweet 16 or grad party. Unlimited slow-motion videos, a custom overlay and an attendant are included.`,
    hero: { src: '/strip-wedding-confetti.webp', alt: 'Couple celebrating with confetti on the AACT 360 booth at a wedding reception' },
    area: 'Naperville, IL',
    service: '360 photo booth rental',
    nearby: 'Aurora, Lisle, Wheaton and Bolingbrook',
    sections: [
      ['A 360 booth for Naperville celebrations',
        `<p>Naperville hosts plenty of weddings, sweet 16s, graduation parties and company events. A 360 booth works at all of them. Guests step on the platform, the camera spins, and they scan a QR code to save a slow-motion video with your custom overlay.</p>`],
      ['Grad parties and sweet 16s',
        `<p>Backyard graduation parties and sweet 16s are a perfect fit. We set up on any flat 10×10 ft space near an outlet, the attendant handles the line, and every guest gets a video with the guest of honor's name on it. <strong>Signature</strong> (2 hours, $${P.signature}) covers most home parties.</p>`],
      ['Weddings and the western suburbs',
        `<p>For sweet 16s and big parties, <strong>Premiere</strong> (4 hours, $${P.premiere}) adds cold sparks, pro lighting, stanchions and a carpet. ${WED_LINK} <strong>Elite</strong> (3 hours, $${P.elite}) is a great middle option. We also serve Aurora, Lisle, Wheaton and Bolingbrook. Depending on your venue, a small travel fee may apply, and we'll include it in your quote up front.</p>`],
    ],
    faqs: [
      ['Do you travel to Naperville?', 'Yes. Send us your venue address and we will include any travel fee in your quote up front.'],
      ['Can you set up in a backyard?', 'Yes, on a flat area about 10×10 ft with a standard outlet nearby.'],
    ],
  },
];

// FAQs shown on every page after the page-specific ones.
export const commonFaqs = [
  ['How much space does the 360 booth need?', 'About a 10×10 ft area with one standard power outlet nearby.'],
  ['How many people fit on the platform?', 'Usually 1–4 at a time. Turns are unlimited, so groups can go again and again.'],
  ['Is setup included in my hours?', 'No. We arrive early to set up and pack down after, so every hour you book is booth time.'],
  ['How do guests get their videos?', 'They scan a QR code at the booth and the video goes straight to their phone.'],
];
