import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { games, site, developer, playUrl } from "../src/games.mjs";

const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const json = (data) => JSON.stringify(data).replace(/</g, "\\u003c");
const asset = (g, name) => `/assets/${g.slug}/${name}`;
const gamePath = (g) => `/games/${g.slug}/`;
const photo = (
  g,
  file,
  alt,
  { eager = false, sizes = "(min-width: 850px) 560px, 100vw" } = {},
) =>
  `<img src="${asset(g, `${file}-960.webp`)}" srcset="${asset(g, `${file}-960.webp`)} 960w, ${asset(g, `${file}.webp`)} 1920w" sizes="${sizes}" width="1920" height="1080" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
const play = (g, placement) =>
  `<a class="play-link" href="${esc(playUrl(g, placement))}" aria-label="Get ${esc(g.name)} on Google Play"><img src="/assets/google-play-badge.png" width="646" height="250" alt="Get it on Google Play"></a>`;
const organization = {
  "@type": "Organization",
  "@id": `${site}/#organization`,
  name: "Toyboxes",
  legalName: "Randroid LLC",
  url: `${site}/`,
  logo: `${site}/assets/toyboxes-icon.png`,
  email: "support@toyboxes.app",
  sameAs: [developer, "https://toyboxes.games/"],
};
const gameSchema = (g) => ({
  "@type": ["VideoGame", "MobileApplication"],
  "@id": `${site}${gamePath(g)}#game`,
  name: g.name,
  url: `${site}${gamePath(g)}`,
  description: g.intro,
  image: `${site}${asset(g, `${g.cover}.webp`)}`,
  screenshot: g.shots.map(([f]) => `${site}${asset(g, `${f}.webp`)}`),
  operatingSystem: "Android",
  applicationCategory: "GameApplication",
  genre: g.genre,
  playMode: "SinglePlayer",
  isAccessibleForFree: false,
  inLanguage: "en",
  publisher: { "@id": organization["@id"] },
  installUrl: `https://play.google.com/store/apps/details?id=${g.package}`,
  sameAs: [
    g.browser,
    `https://play.google.com/store/apps/details?id=${g.package}`,
  ],
});

function layout({
  path,
  title,
  description,
  content,
  image = "/assets/toyboxes-icon.png",
  schema = [],
  bodyClass = "",
  noindex = false,
}) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="theme-color" content="#edf6ff">
  ${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${site}${path}">`}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Toyboxes">
  <meta property="og:locale" content="en_US">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${site}${path}">
  <meta property="og:image" content="${site}${image}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/assets/toyboxes-icon.png">
  <link rel="preload" href="/assets/fonts/lilita-one.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/atkinson-hyperlegible-next.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/styles.css">
  <script src="/site.js" defer></script>
  <script type="application/ld+json">${json({ "@context": "https://schema.org", "@graph": [organization, ...schema] })}</script>
</head>
<body class="${bodyClass}">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header wrap">
    <a class="brand" href="/" aria-label="Toyboxes home"><img src="/favicon.svg" width="44" height="44" alt=""><span>Toyboxes</span></a>
    <nav aria-label="Main navigation"><a href="/#games">Our games</a><a href="/support/"${path === "/support/" ? ' aria-current="page"' : ""}>Support</a><a class="town-nav" href="https://toyboxes.games/">Visit the town <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></a></nav>
  </header>
  <main id="main" tabindex="-1">${content}</main>
  <footer class="site-footer wrap">
    <div><a class="brand" href="/"><img src="/favicon.svg" width="34" height="34" alt=""><span>Toyboxes</span></a><p>Little worlds, made to be played.</p><small>© ${new Date().getUTCFullYear()} Randroid LLC</small></div>
    <nav aria-label="Footer navigation"><a href="${developer}">Toyboxes on Google Play</a><a href="/support/">Support</a><a href="/privacy/">Privacy</a><a href="https://toyboxes.games/">Toyboxes town</a></nav>
  </footer>
</body>
</html>`;
}

function card(g) {
  return `<article class="game-card ${g.slug}">
    <div class="game-identity"><img class="app-icon" src="${asset(g, g.icon)}" width="64" height="64" alt=""><h3><a href="${gamePath(g)}">${esc(g.name)}</a></h3></div>
    <a class="card-image" href="${gamePath(g)}" aria-label="Explore ${esc(g.name)}">${photo(g, g.cover, g.coverAlt, { eager: true })}<span class="image-label">${esc(g.genre)}</span></a>
    <div class="card-copy">
    <p>${esc(g.summary)}</p><div class="card-actions">${play(g, "home")}<a class="text-link" href="${gamePath(g)}">Explore the game</a></div></div>
  </article>`;
}

const pages = new Map();
pages.set(
  "/",
  layout({
    path: "/",
    title: "Toyboxes | Original Android Games. No Ads. Just Play.",
    description:
      "Discover Toyboxes games for Android: Joker’s Run arcade air combat and Perspective Opus, a musical 2D/3D puzzle platformer. Buy once, play offline. No ads or in-app purchases.",
    schema: [
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        name: "Toyboxes",
        url: `${site}/`,
        publisher: { "@id": organization["@id"] },
      },
      {
        "@type": "ItemList",
        name: "Toyboxes Android games",
        itemListElement: games.map((g, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${site}${gamePath(g)}`,
          name: g.name,
        })),
      },
    ],
    content: `<section class="home-intro wrap"><div><h1>Little worlds.<br>Big adventures.</h1><p class="intro-copy">Original Android games from Toyboxes.<br>Chase the ace or change your perspective.</p></div><div class="play-promise"><img src="/favicon.svg" width="92" height="92" alt=""><p>Buy once.<br> Play offline.</p><span>No ads. No in-app purchases.</span></div></section>
  <section class="games-section wrap" id="games" aria-labelledby="games-heading"><div class="section-heading"><h2 id="games-heading">Open a little world.</h2><span>Available on Google Play</span></div><div class="game-grid">${games.map(card).join("")}</div></section>
  <section class="about-strip wrap" aria-labelledby="about-heading"><div><h2 id="about-heading">Made for the love of play.</h2><p>Toyboxes is an independent game label from Randroid LLC. We make small games with a clear idea at their heart: a flight worth mastering, a puzzle worth seeing differently.</p></div><p>Both Android games are paid downloads. After installation, play offline, without ads, in-app purchases or an account.</p></section>
  <aside class="town-strip wrap"><div><h2>There’s a whole town, too.</h2><p>Walk around, ride a go-kart and discover browser games in the Toyboxes town.</p></div><a class="button secondary" href="https://toyboxes.games/">Visit toyboxes.games</a></aside>`,
  }),
);

function perspectiveDemo(g) {
  return `<section class="perspective-section wrap" aria-labelledby="perspective-heading"><div class="section-heading"><div><h2 id="perspective-heading">Same place. A new possibility.</h2><p>See the opening meadow on the 3D Stage and the 2D Score.</p></div><div class="view-switch" role="group" aria-label="Choose a perspective" hidden><button type="button" data-view="stage" aria-pressed="true" aria-controls="view-stage">3D Stage</button><button type="button" data-view="score" aria-pressed="false" aria-controls="view-score">2D Score</button></div></div><div class="perspective-views"><figure id="view-stage">${photo(g, "phone-01-overture-stage", g.coverAlt, { sizes: "(min-width: 1240px) 1180px, 100vw" })}<figcaption><strong>The 3D Stage.</strong> Depth is real. Move around obstacles to find another way through.</figcaption></figure><figure id="view-score">${photo(g, "phone-02-overture-score", g.shots[0][3], { sizes: "(min-width: 1240px) 1180px, 100vw" })}<figcaption><strong>The 2D Score.</strong> Depth disappears. Platforms at different distances line up into a path.</figcaption></figure></div></section>`;
}

for (const g of games) {
  const other = games.find((other) => other !== g);
  pages.set(
    gamePath(g),
    layout({
      path: gamePath(g),
      title: g.title,
      description: g.description,
      image: asset(g, `${g.cover}.webp`),
      bodyClass: `game-page ${g.slug}`,
      schema: [
        gameSchema(g),
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Toyboxes",
              item: `${site}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: g.name,
              item: `${site}${gamePath(g)}`,
            },
          ],
        },
      ],
      content: `<div class="wrap"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Our games</a><span aria-hidden="true">/</span><span aria-current="page">${esc(g.name)}</span></nav></div>
    <section class="game-hero wrap"><div class="game-hero-copy"><div class="genre-row"><img class="app-icon" src="${asset(g, g.icon)}" width="64" height="64" alt=""><p>${esc(g.genre)}<br><span>For Android</span></p></div><h1>${esc(g.name)}</h1><p class="game-hook">${esc(g.hook)}</p><p>${esc(g.intro)}</p>${play(g, "hero")}<p class="purchase-note">Paid download. No ads or in-app purchases.</p></div><figure class="hero-gameplay">${photo(g, g.cover, g.coverAlt, { eager: true, sizes: "(min-width: 850px) 680px, 100vw" })}<figcaption>${g.slug === "jokers-run" ? "Lock on. Close the distance. Keep the fleet safe." : "A little note in a world waiting to be heard."}</figcaption></figure></section>
    <div class="game-facts wrap"><ul>${g.facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul><a href="${g.browser}">Try the browser version</a></div>
    ${g.slug === "perspective-opus" ? perspectiveDemo(g) : ""}
    <section class="features wrap" aria-label="Inside ${esc(g.name)}">${g.features.map(([title, copy]) => `<div><h2>${esc(title)}</h2><p>${esc(copy)}</p></div>`).join("")}</section>
    <section class="gallery-section wrap" aria-labelledby="screenshots-heading"><div class="section-heading"><h2 id="screenshots-heading">A look inside ${esc(g.name)}.</h2><span>Gameplay screenshots</span></div><div class="screenshot-grid">${g.shots.map(([f, title, copy, alt]) => `<figure><a href="${asset(g, `${f}.webp`)}" aria-label="View full screenshot: ${esc(title)}">${photo(g, f, alt, { sizes: "(min-width: 850px) 380px, 100vw" })}</a><figcaption><h3>${esc(title)}</h3><p>${esc(copy)}</p></figcaption></figure>`).join("")}</div></section>
    <section class="details-section wrap"><div><h2>Ready when you are.</h2><p>${esc(g.controls)}</p><p>Google Play has the current price and device availability for your region.</p>${play(g, "details")}<div class="support-links"><a href="mailto:support@toyboxes.app?subject=${encodeURIComponent(`${g.name} support`)}">Game support</a><a href="${g.privacy}">${esc(g.name)} privacy policy</a></div></div><div class="faq"><h2>Before you play</h2>${g.faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div></section>
    <aside class="other-game wrap"><div><p>Another little world to explore</p><h2><a href="${gamePath(other)}">${esc(other.name)}</a></h2><p>${esc(other.genre)}</p></div><a class="button secondary" href="${gamePath(other)}">Meet ${esc(other.name)}</a></aside>`,
    }),
  );
}

pages.set(
  "/support/",
  layout({
    path: "/support/",
    title: "Toyboxes Game Support | Joker’s Run & Perspective Opus",
    description:
      "Get help with Joker’s Run and Perspective Opus on Android. Contact Toyboxes support, find game privacy policies, and learn about offline play and saved progress.",
    content: `<section class="prose wrap"><h1>A little help?</h1><p class="lead">We’re here to help with Joker’s Run and Perspective Opus.</p><p>Email <a href="mailto:support@toyboxes.app">support@toyboxes.app</a>. Tell us the game, your device model, Android version and what happened. A screenshot and the steps that led to the problem can help.</p><p>Please leave out passwords, payment details and other sensitive information.</p><h2>Choose your game</h2><div class="support-games">${games.map((g) => `<div><h3><a href="${gamePath(g)}">${esc(g.name)}</a></h3><p>${esc(g.genre)}</p><a href="mailto:support@toyboxes.app?subject=${encodeURIComponent(`${g.name} support`)}">Email about ${esc(g.name)}</a><br><a href="${g.privacy}">Game privacy policy</a></div>`).join("")}</div><h2>Playing offline</h2><p>Both Android games work offline after installation. Downloading, reinstalling or updating through Google Play needs an internet connection.</p><h2>Your saved game</h2><p>Game progress, scores and settings are stored on your device. Clearing an app’s storage or uninstalling it can remove that data. Contact us before trying either step if you want help with a problem.</p><h2>Purchases and refunds</h2><p>Purchases are handled by Google Play. See <a href="https://support.google.com/googleplay/answer/2479637">Google Play’s refund help</a> for the available options.</p></section>`,
  }),
);
pages.set(
  "/privacy/",
  layout({
    path: "/privacy/",
    title: "Toyboxes Website Privacy | toyboxes.app",
    description:
      "How the Toyboxes website handles web requests and support email, plus links to the privacy policies for Joker’s Run and Perspective Opus on Android.",
    content: `<section class="prose wrap"><h1>Privacy</h1><p class="lead">The Toyboxes website and our Android games.</p><p>This website is published by Randroid LLC. Updated October 19, 2026.</p><h2>This website</h2><p>You can browse toyboxes.app without creating an account. We do not add advertising, analytics scripts or tracking cookies. Our hosting provider, Vercel, processes ordinary web requests, which may include your IP address, browser information and the pages requested, to serve and secure the site.</p><p>Google Play links contain campaign labels identifying this website, the game and the link’s placement. These labels contain no personal identifier. When you follow an external link, that service’s own privacy practices apply.</p><h2>Support email</h2><p>If you email support@toyboxes.app, we receive your email address and the information you choose to send, and use them to respond to your request. Please do not send passwords or payment details.</p><h2>Android game policies</h2><p>The Android games have their own privacy policies. Read the policy for your game:</p><ul>${games.map((g) => `<li><a href="${g.privacy}">${esc(g.name)} privacy policy</a></li>`).join("")}</ul><h2>Contact</h2><p>For privacy questions, email <a href="mailto:support@toyboxes.app">support@toyboxes.app</a>.</p></section>`,
  }),
);

pages.set(
  "/games/poleline/privacy/",
  layout({
    path: "/games/poleline/privacy/",
    title: "PoleLine Privacy Policy | Toyboxes",
    description: "How PoleLine by Toyboxes handles local lap records, offline play, device backups and support requests on Android and iOS.",
    content: `<section class="prose wrap"><h1>PoleLine privacy policy</h1><p class="lead">Your laps stay on your device.</p><p>PoleLine is published by Randroid LLC under the Toyboxes brand. This policy applies to the native Android and iOS apps, package and bundle identifier <code>app.toyboxes.poleline</code>. Updated October 19, 2026.</p><h2>No data collection</h2><p>PoleLine does not collect or transmit personal information, device identifiers, location, gameplay data or diagnostics. It contains no advertising, analytics, tracking, accounts, social features or in-app purchases. The app does not contact a game server.</p><h2>Offline play and local records</h2><p>All circuits and gameplay are included with the app and work offline from the first launch. Lap records, drawn lines, tyre choices, ghost replays and settings are saved on your device. You can delete them using Settings, then Delete all local records. Clearing app storage or uninstalling also removes local progress.</p><h2>Device backups</h2><p>The Android app disables cloud backup and device-to-device transfer of its local game data. On iOS, device backups may include local app data according to your Apple settings. Toyboxes does not operate a cloud-save service or receive your backups.</p><h2>Purchases and external pages</h2><p>The app is a paid download. Store purchases and downloads are handled by Google Play or Apple, under their privacy policies. PoleLine does not receive payment details. If you choose to open this policy or contact support in another app, that browser, email service or store handles the resulting request. The game remains playable without opening any external page.</p><h2>Support</h2><p>If you email <a href="mailto:support@toyboxes.app">support@toyboxes.app</a>, we receive your email address and the information you choose to send, and use them to respond to your request. Do not send passwords or payment details.</p><h2>Children and privacy</h2><p>The same no-collection behaviour applies to every player. PoleLine does not ask for a name, age or contact information.</p><h2>Changes and contact</h2><p>Updates to this policy will appear on this page with a revised date. For privacy questions, contact <a href="mailto:support@toyboxes.app">support@toyboxes.app</a>. See the <a href="/privacy/">Toyboxes website privacy policy</a> for information about this website.</p></section>`,
  }),
);

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });
for (const [path, html] of pages) {
  await mkdir(`dist${path}`, { recursive: true });
  await writeFile(`dist${path}index.html`, html);
}
await writeFile(
  "dist/404.html",
  layout({
    path: "/404.html",
    title: "Page Not Found | Toyboxes",
    description: "Find your next Toyboxes game.",
    noindex: true,
    content:
      '<section class="prose wrap"><h1>This box is empty.</h1><p>The page you’re looking for isn’t here.</p><a class="button" href="/">Find our games</a></section>',
  }),
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`,
);
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...pages.keys()].map((path) => `  <url><loc>${site}${path}</loc></url>`).join("\n")}\n</urlset>\n`,
);
console.log(
  `Built ${pages.size} crawlable pages, a 404 page, robots.txt and sitemap.xml.`,
);
