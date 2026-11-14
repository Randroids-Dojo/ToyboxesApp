# Toyboxes App

The mobile games homepage at **https://toyboxes.app**. Published by Toyboxes / Randroid LLC.

- [Joker's Run](https://toyboxes.app/games/jokers-run/): offline arcade air combat for Android, built around one replayable mission.
- [Perspective Opus](https://toyboxes.app/games/perspective-opus/): a musical puzzle platformer with seamless 2D/3D switching.
- [Keepsies](https://toyboxes.app/games/keepsies/): a card game played for keeps, coming soon, with a waitlist.
- [Support](https://toyboxes.app/support/) and [website privacy](https://toyboxes.app/privacy/).

The interactive town remains at **https://toyboxes.games**, maintained in the separate [Toyboxes repository](https://github.com/Randroids-Dojo/Toyboxes).

## Local development

Node 22 or newer. The pages build with no dependencies; `scripts/waitlist-migrate.mjs` uses `@vercel/blob`.

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

Keepsies is coming soon. The site must not link to the game until it opens: `npm run check` fails if anything in `dist` names the game's own hosts (the list is in `scripts/check.mjs`). The waitlist function posting to Keepsies from the server is not a link, and `api/` is not part of `dist`.

The form on the home page and `/games/keepsies/` posts to `/api/waitlist/` (`api/waitlist.js`). The function keeps nothing: it sends each signup on to Keepsies, server to server, as JSON `{ email, game }` with `Authorization: Bearer <WAITLIST_SECRET>`. Keepsies keeps the waitlist in its own database, one row per lowercased address, and the owner invites from Keepsies' `/admin/waitlist` (see the Keepsies repo, `web/README.md`, The waitlist). Production posts to `https://keepsies.toyboxes.app/api/waitlist`; previews and development post to `https://keepsies-qa.vercel.app/api/waitlist`. `KEEPSIES_WAITLIST_URL` overrides either.

A plain form post is redirected (303) to `/games/keepsies/joined/` once Keepsies answers ok, and to `/games/keepsies/try-again/` when the address looks wrong, Keepsies refuses it, or Keepsies cannot be reached in 8 seconds. A request with `Accept: application/json` gets JSON. A filled honeypot field (`website`) gets a success answer and sends nothing. The function never logs addresses. What is kept and why is in `/games/keepsies/waitlist-privacy/`.

| Name | Where | What |
| --- | --- | --- |
| `WAITLIST_SECRET` | Production, Preview, Development (sensitive) | The same value is on the `keepsies` project (qa and Production), which checks it. Without it every signup goes to try-again. `vercel env pull --environment=development` reads it for the migration below. |
| `KEEPSIES_WAITLIST_URL` | not set | Optional: where to send signups instead of the default for `VERCEL_ENV`. |
| `BLOB_READ_WRITE_TOKEN` | every environment | Only for moving the signups kept in Vercel Blob before the waitlist moved to Keepsies. |

Signups made before the move are private blobs at `waitlist/<VERCEL_ENV>/keepsies/<sha256 of the lowercased email>.json`. `scripts/waitlist-migrate.mjs` posts each one to Keepsies with its `joinedAt` and deletes the blob only after Keepsies answers ok, printing counts and never addresses:

```sh
vercel env pull .env.migrate --environment=development
node --env-file=.env.migrate scripts/waitlist-migrate.mjs production --dry-run
node --env-file=.env.migrate scripts/waitlist-migrate.mjs production
rm .env.migrate
```

`production` goes to Keepsies prod; `preview` and `development` go to Keepsies QA. Run it for production only once Keepsies prod has the waitlist. Once no blobs are left, the Blob store and `BLOB_READ_WRITE_TOKEN` can go.

## Deployment

Vercel project: `toyboxes-app`, team: `randroid88s-projects`. GitHub repository: `Randroids-Dojo/ToyboxesApp`. The production branch is `main`. Build output is `dist`.

`toyboxes.app` serves the site and `www.toyboxes.app` permanently redirects to it. Do not change the `toyboxes` Vercel project, the `toyboxes.games` domain, or the app domain's existing mail records when working on this site.

Before deployment, verify the local link with `vercel project inspect --non-interactive`. Production deploys run the build and site checks. Verify the final custom domain with `npm run check -- https://toyboxes.app` and inspect it at phone and desktop widths.

The previous domain assignments are preserved in `docs/domain-baseline-2026-10-19.json`. Returning both app domains to the `toyboxes` project with permanent redirects to `toyboxes.games` restores the previous routing. No nameserver or mail-record change is needed.
