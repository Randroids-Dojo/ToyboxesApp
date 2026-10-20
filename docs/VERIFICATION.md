# Storefront launch verification

Verified October 19, 2026 (America/Chicago).

## Release

- Repository: https://github.com/Randroids-Dojo/ToyboxesApp
- Initial site commit: `5e8458e`
- Vercel project: `toyboxes-app`, team `randroid88s-projects`.
- Initial production deployment: `dpl_9VTrBdeu6AYqVYfaNaR4idPKvdLv`.
- Both app domains moved to the new project after its production deployment passed checks.
- `https://toyboxes.app/` returned the storefront in an incognito browser without authentication.
- `https://www.toyboxes.app/` returned 308 to the apex. A deep URL preserved its path and query string through the redirect.
- The existing `toyboxes.games` project and domain remained in place and returned 200 with the town's original title.
- Existing Google mail MX and verification TXT records were read back after the move. They were unchanged. Vercel updated its managed apex ALIAS as part of project reassignment.

## Automated and browser checks

- `npm run build` and `npm run check` passed.
- `npm run check -- https://toyboxes.app` passed for all five HTML pages, canonical URLs, unique metadata, JSON-LD, internal links, 22 live linked assets, robots.txt, sitemap.xml, and a genuine 404 for an unknown route.
- The homepage and both game pages were checked at 320, 768 and 1440 CSS pixels in the collaborative browser. No horizontal overflow or broken images was found at any width. Separate 390-pixel phone checks also passed.
- axe-core 4.10.3 WCAG 2 A/AA and 2.1 AA automated audits reported zero violations on all five pages at phone width. Automated checks are not a complete accessibility certification.
- The Perspective Opus view control switched to 2D with a click and back to 3D using Shift+Tab and Enter. Image visibility and `aria-pressed` values changed correctly; the visible screenshot loaded successfully.
- FAQ disclosure opened and exposed its answer.
- In a sandboxed frame with scripts disabled, the Perspective Opus page retained both screenshots, full HTML text and Play links. The enhancement controls remained hidden.
- Each homepage/game download link was followed to the public Google Play listing with the expected package and title.
- Both existing game privacy-policy links returned 200.
- Desktop and phone layout images were inspected using T3's HTML preview. The collaborative browser separately verified the actual site's rendering and controls.

## Boundaries

This release publishes the website and domain routing. It does not edit Google Play titles, descriptions, screenshots, developer-profile fields, game binaries or review submissions. It does not verify Search Console ownership/indexing, private acquisition reports, purchase attribution or a search-ranking improvement. See DISCOVERY.md for the remaining console-side steps.
