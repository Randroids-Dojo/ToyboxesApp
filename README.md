# Toyboxes App

The mobile games homepage at **https://toyboxes.app**. Published by Toyboxes / Randroid LLC.

- [Joker's Run](https://toyboxes.app/games/jokers-run/): offline arcade air combat for Android, built around one replayable mission.
- [Perspective Opus](https://toyboxes.app/games/perspective-opus/): a musical puzzle platformer with seamless 2D/3D switching.
- [Keepsies](https://toyboxes.app/games/keepsies/): a card game played for keeps, coming soon, with a waitlist.
- [Support](https://toyboxes.app/support/) and [website privacy](https://toyboxes.app/privacy/).

The interactive town remains at **https://toyboxes.games**, maintained in the separate [Toyboxes repository](https://github.com/Randroids-Dojo/Toyboxes).

## Local development

Node 22 or newer. The pages build with no dependencies; the waitlist function uses `@vercel/blob`.

```sh
npm ci
npm run build
npm run check
npm run dev
```

Open http://localhost:5218. Rebuild after editing templates or content. `npm run check -- https://toyboxes.app` also verifies production responses, linked assets and the 404 status.

## Editing

- `src/games.mjs`: game descriptions, features, screenshots, FAQs, support URLs and campaign-tagged Play links. `keepsies` holds the coming-soon page's copy, card fan and captures.
- `scripts/build.mjs`: shared HTML templates, metadata, structured data, robots and sitemap generation.
- `public/styles.css`: responsive styling and self-hosted fonts.
- `public/site.js`: progressive enhancement for the 2D/3D screenshot comparison and the waitlist form. All essential content works without it.
- `api/waitlist.js`: the waitlist Vercel Function (see below).
- `docs/ASSETS.md`: image provenance and licenses.
- `docs/DISCOVERY.md`: discovery setup and measurement follow-up.

Do not add a game to the catalog until its package identity, public listing, claims, screenshots and support details are verified. Keep prices on Google Play so regional pricing stays accurate.

## Keepsies waitlist

Keepsies is coming soon. The site must not link to the game until it opens: `npm run check` fails if anything in `dist` names the game's own hosts (the list is in `scripts/check.mjs`).

The form on the home page and `/games/keepsies/` posts to `/api/waitlist/` (`api/waitlist.js`). Each signup is one private Vercel Blob at `waitlist/<VERCEL_ENV>/keepsies/<sha256 of the lowercased email>.json` holding only `email`, `game` and `joinedAt`, so signing up again overwrites rather than duplicates. A plain form post is redirected (303) to `/games/keepsies/joined/` or `/games/keepsies/try-again/`; a request with `Accept: application/json` gets JSON. A filled honeypot field (`website`) gets a success answer and stores nothing. The function never logs addresses. What is kept and why is in `/games/keepsies/waitlist-privacy/`.

The Blob store's `BLOB_READ_WRITE_TOKEN` is set on the Vercel project for every environment. To export signups as CSV:

```sh
vercel env pull .env.local
node --env-file=.env.local scripts/waitlist-export.mjs production > waitlist.csv
```

Pass `preview` or `development` instead of `production` for test signups. The CSV holds personal data: never commit it (`waitlist*.csv` is ignored), and delete it and the signups after the launch email, as the privacy note promises.

## Deployment

Vercel project: `toyboxes-app`, team: `randroid88s-projects`. GitHub repository: `Randroids-Dojo/ToyboxesApp`. The production branch is `main`. Build output is `dist`.

`toyboxes.app` serves the site and `www.toyboxes.app` permanently redirects to it. Do not change the `toyboxes` Vercel project, the `toyboxes.games` domain, or the app domain's existing mail records when working on this site.

Before deployment, verify the local link with `vercel project inspect --non-interactive`. Production deploys run the build and site checks. Verify the final custom domain with `npm run check -- https://toyboxes.app` and inspect it at phone and desktop widths.

The previous domain assignments are preserved in `docs/domain-baseline-2026-10-19.json`. Returning both app domains to the `toyboxes` project with permanent redirects to `toyboxes.games` restores the previous routing. No nameserver or mail-record change is needed.
