# Toyboxes App

The mobile games homepage at **https://toyboxes.app**. Published by Toyboxes / Randroid LLC.

- [Joker's Run](https://toyboxes.app/games/jokers-run/): offline arcade air combat for Android, built around one replayable mission.
- [Perspective Opus](https://toyboxes.app/games/perspective-opus/): a musical puzzle platformer with seamless 2D/3D switching.
- [Support](https://toyboxes.app/support/) and [website privacy](https://toyboxes.app/privacy/).

The interactive town remains at **https://toyboxes.games**, maintained in the separate [Toyboxes repository](https://github.com/Randroids-Dojo/Toyboxes).

## Local development

Node 22 or newer. There are no runtime or build dependencies.

```sh
npm ci
npm run build
npm run check
npm run dev
```

Open http://localhost:5218. Rebuild after editing templates or content. `npm run check -- https://toyboxes.app` also verifies production responses, linked assets and the 404 status.

## Editing

- `src/games.mjs`: game descriptions, features, screenshots, FAQs, support URLs and campaign-tagged Play links.
- `scripts/build.mjs`: shared HTML templates, metadata, structured data, robots and sitemap generation.
- `public/styles.css`: responsive styling and self-hosted fonts.
- `public/site.js`: progressive enhancement for the 2D/3D screenshot comparison. All essential content works without it.
- `docs/ASSETS.md`: image provenance and licenses.
- `docs/DISCOVERY.md`: discovery setup and measurement follow-up.

Do not add a game to the catalog until its package identity, public listing, claims, screenshots and support details are verified. Keep prices on Google Play so regional pricing stays accurate.

## Deployment

Vercel project: `toyboxes-app`, team: `randroid88s-projects`. GitHub repository: `Randroids-Dojo/ToyboxesApp`. The production branch is `main`. Build output is `dist`.

`toyboxes.app` serves the site and `www.toyboxes.app` permanently redirects to it. Do not change the `toyboxes` Vercel project, the `toyboxes.games` domain, or the app domain's existing mail records when working on this site.

Before deployment, verify the local link with `vercel project inspect --non-interactive`. Production deploys run the build and site checks. Verify the final custom domain with `npm run check -- https://toyboxes.app` and inspect it at phone and desktop widths.

The previous domain assignments are preserved in `docs/domain-baseline-2026-10-19.json`. Returning both app domains to the `toyboxes` project with permanent redirects to `toyboxes.games` restores the previous routing. No nameserver or mail-record change is needed.
