// Builds the SEO landing pages (/wedding-photo-booth-chicago, /photo-booth-rental-skokie, ...)
// from the homepage design. Styles, packages, reviews, booking form and footer are copied
// from index.html, so after changing the homepage just re-run:
//
//   node scripts/build-seo-pages.mjs
//
// Page text lives in scripts/seo-pages-content.mjs.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { pages, commonFaqs, PRICES } from './seo-pages-content.mjs';

const ORIGIN = 'https://allaroundchitown.com';
const TODAY = new Date().toISOString().slice(0, 10);
const home = readFileSync('index.html', 'utf8');

// ---------- pull shared pieces out of the homepage ----------
const between = (a, b) => {
  const i = home.indexOf(a); const j = home.indexOf(b, i + a.length);
  if (i < 0 || j < 0) throw new Error(`Homepage marker missing: ${a} / ${b}`);
  return home.slice(i, j);
};
const css = between('<style>', '</style>').slice('<style>'.length);
const header = between('<header>', '<!-- HERO -->').replace('href="#top" class="brand"', 'href="/" class="brand"');
const why = between('<!-- WHY -->', '<!-- BLUE FEATURE -->');
const blue = between('<!-- BLUE FEATURE -->', '<!-- HOW -->');
const how = between('<!-- HOW -->', '<!-- PACKAGES -->');
const packages = between('<!-- PACKAGES -->', '<!-- FEATURES -->');
const features = between('<!-- FEATURES -->', '<!-- FAQ -->');
const book = between('<!-- BOOK -->', '<footer>');
const footerAndPopup = between('<footer>', '<script>\n/* ===== EDIT ME');
const script = between('<script>\n/* ===== EDIT ME', '</body>');
const gBadge = (home.match(/<div class="greview"><svg class="g"[\s\S]*?<\/div>/) || [''])[0];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const strip = s => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const seoCss = `
.hero h1{white-space:normal;max-width:15em}
.crumbs{font:600 .72rem Montserrat,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#888;margin-bottom:2.2rem}
.crumbs a{color:var(--blue)}.crumbs a:hover{text-decoration:underline}
.seo-body{padding:80px 0}
.seo-body .wrap{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(0,1fr);gap:4rem;align-items:start}
.seo-body article h2{font-size:clamp(1.5rem,2.4vw,2rem);margin:2.4rem 0 .9rem}
.seo-body article h2:first-child{margin-top:0}
.seo-body article p{font-size:1.06rem;color:#444;margin-bottom:1rem}
.seo-body article strong{color:#111}
.quick{position:sticky;top:100px;background:#000;color:#fff;border-radius:14px;padding:2rem 1.8rem;text-align:center}
.quick .script{display:block;font-family:"Caveat Brush",cursive;font-variant:small-caps;color:var(--blue);font-size:2.2rem;line-height:1}
.quick h2{color:#fff;font-size:1.5rem;margin:.3rem 0 1.2rem}
.quick ul{list-style:none;text-align:left;margin:0 0 1.5rem;display:grid;gap:.55rem}
.quick li{display:flex;justify-content:space-between;gap:1rem;border-bottom:1px solid #222;padding-bottom:.55rem;font-family:Montserrat,sans-serif;font-size:.95rem}
.quick li b{color:var(--blue)}
.quick .btn{width:100%;padding:1rem}
.quick small{display:block;margin-top:.9rem;color:#999;font-size:.82rem}
.areas{background:var(--gray);padding:70px 0}
.areas h2{font-size:clamp(1.6rem,3vw,2.3rem);text-align:center;margin-bottom:.6rem}
.areas p.sub{text-align:center;color:var(--muted);margin-bottom:2rem}
.areas .links{display:flex;flex-wrap:wrap;justify-content:center;gap:.7rem}
.areas .links a{background:#fff;border:1px solid #e3e3e3;border-radius:999px;padding:.6rem 1.2rem;font:600 .9rem Montserrat,sans-serif;color:#111}
.areas .links a:hover{border-color:var(--blue);color:var(--blue)}
footer .grid .col a{white-space:nowrap}
@media(max-width:900px){.seo-body .wrap{grid-template-columns:1fr;gap:2.5rem}.quick{position:static}}
`;

const url = p => `${ORIGIN}/${p.slug}`;
const abs = src => ORIGIN + src;

function schema(p, faqs) {
  const offers = [
    ['The Signature — 2 hours', PRICES.signature],
    ['The Elite — 3 hours', PRICES.elite],
    ['The Premiere — 4 hours', PRICES.premiere],
  ].map(([name, price]) => ({ '@type': 'Offer', name, price: String(price), priceCurrency: 'USD', url: `${url(p)}#packages` }));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${ORIGIN}/#business`, name: 'AACT Booths', alternateName: 'All Around Chi Town', url: `${ORIGIN}/`, telephone: '+1-224-234-1473', email: 'allaroundchitown@gmail.com', sameAs: ['https://www.instagram.com/allaroundchitown360/', 'https://www.tiktok.com/@allaroundchitown/', 'https://www.facebook.com/profile.php?id=61556657095887'] },
      { '@type': 'WebPage', '@id': `${url(p)}#webpage`, url: url(p), name: p.title, description: p.description, isPartOf: { '@id': `${ORIGIN}/#website` }, primaryImageOfPage: abs(p.hero.src), inLanguage: 'en-US', dateModified: TODAY },
      { '@type': 'Service', '@id': `${url(p)}#service`, name: p.h1, serviceType: p.service, provider: { '@id': `${ORIGIN}/#business` }, areaServed: p.city ? { '@type': 'City', name: p.area } : ['Chicago', 'Chicagoland'], offers },
      { '@type': 'FAQPage', '@id': `${url(p)}#faq`, mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: p.nav, item: url(p) },
      ] },
    ],
  };
}

function render(p) {
  const faqs = [...p.faqs, ...commonFaqs];
  const others = pages.filter(o => o.slug !== p.slug);
  const eventLinks = others.filter(o => !o.city);
  const cityLinks = others.filter(o => o.city);
  const label = p.city ? `${p.city} 360 Booth` : p.nav;

  const hero = `<!-- HERO -->
<section class="hero" id="top">
  <div class="grid">
    <div class="hero-text">
      <h1><span class="script">${p.script}</span>${p.h1}</h1>
      <p>${p.intro}</p>
      ${gBadge}
      <div class="hero-cta"><a href="#book" class="btn btn-blue">Check Availability</a><span class="urgency">Spots are filling up quickly!</span></div>
    </div>
    <div class="ph" data-label="Event photo"><img src="${p.hero.src}" alt="${esc(p.hero.alt)}" fetchpriority="high"></div>
  </div>
</section>
`;

  const body = `<!-- PAGE CONTENT -->
<section class="seo-body">
  <div class="wrap">
    <article>
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › ${p.nav}</nav>
      ${p.sections.map(([h, html]) => `<h2>${h}</h2>\n      ${html.replace(/\n\s+/g, '\n      ')}`).join('\n      ')}
    </article>
    <aside class="quick">
      <span class="script">At a glance</span>
      <h2>${label}</h2>
      <ul>
        <li>Signature · 2 hrs <b>$${PRICES.signature}</b></li>
        <li>Elite · 3 hrs <b>$${PRICES.elite}</b></li>
        <li>Premiere · 4 hrs <b>$${PRICES.premiere}</b></li>
        <li>Attendant &amp; setup <b>Included</b></li>
        <li>Videos <b>Unlimited</b></li>
      </ul>
      <a href="#book" class="btn btn-blue">Check My Date</a>
      <small>${p.city ? `Serving ${p.city}${p.nearby ? ', ' + p.nearby : ''}.` : 'Serving Chicago &amp; the surrounding suburbs.'}</small>
    </aside>
  </div>
</section>
`;

  const faq = `<!-- FAQ -->
<section class="faq" id="faq">
  <div class="wrap">
    <div class="center"><div class="kicker">FAQ</div><h2>${p.city ? `${p.city} 360 Booth Questions` : `${p.nav} Questions`}</h2></div>
    <div class="faq-list">
${faqs.map(([q, a]) => `      <details><summary>${q}</summary><p>${a}</p></details>`).join('\n')}
    </div>
  </div>
</section>
`;

  const areas = `<!-- AREAS -->
<section class="areas">
  <div class="wrap">
    <h2>${p.city ? 'More Areas We Serve' : 'Events &amp; Areas We Serve'}</h2>
    <p class="sub">360 video booth rentals across Chicago and the suburbs.</p>
    <div class="links">
      <a href="/">Chicago 360 Photo Booth Rental</a>
${[...eventLinks, ...cityLinks].map(o => `      <a href="/${o.slug}">${o.city ? `${o.city} 360 Booth` : o.nav}</a>`).join('\n')}
    </div>
  </div>
</section>
`;

  const pageScript = script
    .replace(/AACT homepage — /g, `AACT ${p.nav} — `)
    .replace(`data.append('source','AACT homepage')`, `data.append('source','${p.slug}')`)
    .replace(`form:'homepage_check_availability'`, `form:'${p.slug}'`);

  const ogImg = abs(p.hero.src);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<link rel="icon" href="/img/logo.png">
<meta name="description" content="${esc(p.description)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-video-preview:-1">
<meta name="theme-color" content="#000000">
<link rel="canonical" href="${url(p)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="AACT Booths">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url(p)}">
<meta property="og:image" content="${ogImg}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.description)}">
<meta name="twitter:image" content="${ogImg}">
${p.city ? `<meta name="geo.region" content="US-IL">\n<meta name="geo.placename" content="${esc(p.city)}">\n` : ''}<script src="/analytics.js" defer></script>
<script type="application/ld+json">${JSON.stringify(schema(p, faqs))}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@400;600&family=Caveat+Brush&display=swap" rel="stylesheet">
<style>${css}${seoCss}</style>
</head>
<body>

${header}${hero}
${body}
${why}${blue}${how}${packages}${features}${faq}
${areas}
${book}${footerAndPopup}${pageScript}</body>
</html>
`;
}

for (const p of pages) {
  const html = render(p);
  writeFileSync(`${p.slug}.html`, html);
  // Some pages also exist as /slug/index.html; keep both copies identical.
  if (existsSync(`${p.slug}/index.html`)) writeFileSync(`${p.slug}/index.html`, html);
  console.log('built', p.slug);
}

// ---------- thank-you page (shown after a lead form is sent; not indexed) ----------
{
  const toHome = s => s.replace(/href="#(\w+)"/g, 'href="/#$1"').replace('href="#top" class="brand"', 'href="/" class="brand"');
  const footerOnly = footerAndPopup.slice(0, footerAndPopup.indexOf('</footer>') + '</footer>'.length);
  const tyCss = `
.ty{background:#000;color:#fff;padding:80px 0 90px}
.ty .grid{display:grid;grid-template-columns:1.15fr .85fr;gap:4rem;align-items:center}
.ty .script{display:block;font-family:"Caveat Brush",cursive;font-variant:small-caps;color:var(--blue);font-size:clamp(2.8rem,5vw,4.2rem);line-height:.9;margin-bottom:.4rem}
.ty h1{font-size:clamp(2.1rem,4vw,3.2rem);font-weight:800;line-height:1.08;margin-bottom:1.1rem}
.ty .lead{color:#bbb;font-size:1.15rem;max-width:32em;margin-bottom:1.6rem}
.ty .recap{display:none;border:1.5px solid var(--blue);background:rgba(255,79,163,.1);border-radius:12px;padding:1rem 1.3rem;margin-bottom:1.8rem;font-family:Montserrat,sans-serif;font-size:.95rem;max-width:30em}
.ty .recap b{color:var(--blue)}
.ty .acts{display:flex;flex-wrap:wrap;gap:1rem}
.ty .btn-ghost{background:transparent;color:#fff;border:1.5px solid #fff}.ty .btn-ghost:hover{background:#fff;color:#111}
.ty .vid{border-radius:16px;overflow:hidden;aspect-ratio:9/14;max-height:620px;justify-self:center;width:100%;max-width:400px;background:#111;box-shadow:0 30px 60px -25px rgba(255,79,163,.45)}
.ty .vid video{width:100%;height:100%;object-fit:cover;display:block}
.next{background:var(--gray)}
.social{text-align:center}
.social .row{display:flex;justify-content:center;flex-wrap:wrap;gap:1rem;margin-top:1.8rem}
@media(max-width:900px){.ty .grid{grid-template-columns:1fr;gap:3rem}.ty{padding:50px 0 70px}.next .steps{grid-template-columns:1fr!important;gap:2.2rem}}
`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Thank You | AACT Booths</title>
<link rel="icon" href="/img/logo.png">
<meta name="robots" content="noindex,nofollow">
<meta name="theme-color" content="#000000">
<script src="/analytics.js" defer></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@400;600&family=Caveat+Brush&display=swap" rel="stylesheet">
<style>${css}${tyCss}</style>
</head>
<body>

${toHome(header)}
<section class="ty">
  <div class="wrap grid">
    <div>
      <span class="script">You’re on our list</span>
      <h1 id="tyTitle">Thank you! We got your request.</h1>
      <p class="lead">We’re checking our calendar now and will reach out with availability and your quote, usually the same day. Keep an eye on your texts and email.</p>
      <div class="recap" id="recap"></div>
      <div class="acts">
        <a class="btn btn-blue" href="tel:2242341473">Call or Text Us</a>
        <a class="btn btn-ghost" href="/#packages">See Packages</a>
      </div>
      <span class="urgency" style="color:#fff">Need an answer fast? Call or text (224) 234-1473</span>
    </div>
    <div class="vid"><video src="/aac-hero-video.mp4" poster="/event-preview.webp" autoplay muted loop playsinline aria-label="AACT 360 booth video from a real event"></video></div>
  </div>
</section>

<section class="next">
  <div class="wrap center">
    <div class="kicker">What happens next</div>
    <h2>Your Date, Locked In 3 Steps</h2>
    <div class="steps" style="grid-template-columns:repeat(3,1fr)">
      <div class="step"><div class="n">1</div><h3>We check your date</h3><p>We confirm availability for your date and venue.</p></div>
      <div class="step"><div class="n">2</div><h3>You get your quote</h3><p>We send your package options and price by text or email.</p></div>
      <div class="step"><div class="n">3</div><h3>Lock it in</h3><p>Pick your package and we reserve your date and start on your overlay.</p></div>
    </div>
  </div>
</section>

<section class="social">
  <div class="wrap">
    <div class="kicker">While you wait</div>
    <h2>See the Booth in Action</h2>
    <div class="row">
      <a class="btn btn-black" href="https://www.tiktok.com/@allaroundchitown/" target="_blank" rel="noopener">TikTok</a>
      <a class="btn btn-black" href="https://www.instagram.com/allaroundchitown360/" target="_blank" rel="noopener">Instagram</a>
      <a class="btn btn-black" href="https://www.facebook.com/profile.php?id=61556657095887" target="_blank" rel="noopener">Facebook</a>
    </div>
  </div>
</section>

${toHome(footerOnly)}

<script>
document.getElementById('yr').textContent = new Date().getFullYear();
(function(){
  const c=document.getElementById('contact');
  [['tel:2242341473','(224) 234-1473'],['mailto:allaroundchitown@gmail.com','allaroundchitown@gmail.com'],['https://www.instagram.com/allaroundchitown360/','Instagram'],['https://www.tiktok.com/@allaroundchitown/','TikTok'],['https://www.facebook.com/profile.php?id=61556657095887','Facebook']]
    .forEach(([h,t])=>{const a=document.createElement('a');a.href=h;a.textContent=t;c.appendChild(a);});
  let lead=null; try{lead=JSON.parse(sessionStorage.getItem('aactLead')||'null')}catch(_){}
  if(!lead) return;
  const first=(lead.name||'').trim().split(/\\s+/)[0];
  if(first) document.getElementById('tyTitle').textContent='Thank you, '+first+'! We got your request.';
  const bits=[];
  if(lead.type) bits.push('<b>'+lead.type.replace(/</g,'')+'</b>');
  if(lead.date){const d=new Date(lead.date+'T12:00:00'); if(!isNaN(d)) bits.push('on <b>'+d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})+'</b>');}
  if(bits.length){const r=document.getElementById('recap'); r.innerHTML='Checking availability for your '+bits.join(' ')+'.'; r.style.display='block';}
})();
</script>
</body>
</html>
`;
  writeFileSync('thank-you.html', html);
  console.log('built thank-you');
}

// ---------- sitemap ----------
const extra = ['check-my-date', 'terms-and-conditions', 'privacy-policy'];
const sm = [`  <url><loc>${ORIGIN}/</loc><lastmod>${TODAY}</lastmod><priority>1.0</priority></url>`,
  ...pages.map(p => `  <url><loc>${url(p)}</loc><lastmod>${TODAY}</lastmod><priority>0.8</priority></url>`),
  ...extra.map(s => `  <url><loc>${ORIGIN}/${s}</loc></url>`)];
writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sm.join('\n')}\n</urlset>\n`);
console.log('sitemap updated');
