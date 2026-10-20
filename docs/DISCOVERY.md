# Discovery and measurement

## Shipped site foundation

- Static, crawlable homepage and one canonical page per game.
- Unique titles, descriptions, canonical links, Open Graph metadata and structured data for the organization and games.
- Ordinary links to Google Play, the developer collection, support, existing game policies and browser editions.
- `https://toyboxes.app/robots.txt` allows crawling and declares `https://toyboxes.app/sitemap.xml`.
- Real 404 responses. The www host redirects to the apex domain.
- Play links carry a `referrer` campaign: source `toyboxes.app`, medium `website`, campaign `mobile_storefront`, content by game and link placement. These labels contain no user identifier. Labels alone do not constitute a click or purchase analytics implementation; report availability must be confirmed in Play Console.

## Owner-console setup completed on October 19, 2026

- Added the `toyboxes.app` Search Console domain property. Google automatically verified ownership through the existing DNS record; no DNS change was needed.
- Submitted `https://toyboxes.app/sitemap.xml`. Google reported **Sitemap processed successfully**, with seven discovered pages. This includes the separately added PoleLine support and privacy pages.
- Google's live URL tests reported **URL is available to Google** and **Page can be indexed** for the homepage and both game pages. Both game pages also had one valid breadcrumb item.
- Google accepted manual indexing requests for the homepage and both game pages, confirming each URL was added to its priority crawl queue. An initial reCAPTCHA connectivity error was resolved by reloading Search Console. Accepted requests do not mean the pages are already indexed.
- Published the Play website fields as `https://toyboxes.app/games/jokers-run/` and `https://toyboxes.app/games/perspective-opus/`. Both destinations were verified in the public listings' App support sections.
- Created and saved the Toyboxes developer page with the existing icon, a new header using real gameplay captures, an 89-character brand description, Perspective Opus as the featured game, and `https://toyboxes.app/` as the developer website. The fields and uploaded assets persisted after reloading Play Console. Artwork and editable source are in `marketing/developer-profile/`.

## Remaining follow-up

1. Check the new developer page after Google's propagation window: `https://play.google.com/store/apps/dev?id=4940278051196101377`. The new URL initially returned Not Found despite the saved profile. [Google documents](https://support.google.com/googleplay/android-developer/answer/9873827?hl=en) up to one hour for the preview URL and up to 24 hours for the page to appear to users. Keep the website's existing developer collection link until the branded page is publicly confirmed.
2. Check actual indexing and performance after Google recrawls. The initial index record for the homepage still reflected its October 7 redirect to `toyboxes.games`. Joker's Run was discovered but not indexed; Perspective Opus was initially unknown. These are dated index records, distinct from the successful live tests and accepted indexing requests for the new site. Do not resubmit requests merely to try to increase priority.
3. Review title and short-description candidates against the actual listing requirements and search data. Keep Joker's Run's one-mission scope clear. Test metadata and screenshot changes separately when traffic supports it. This work did not change either game's title, description, screenshots or release tracks.
4. Record an initial acquisition baseline: Search Console impressions/clicks, Play search terms and listing visitors, install-intent clicks, completed purchases/installs, and retention. Keep those events distinct. The new Search Console property was still processing its reports. This site adds no analytics SDK and cannot itself report completed purchases or retention.

## Content verified on October 19, 2026

Both public US English Play listings were accessible. Joker's Run showed a $2.99 purchase price; Perspective Opus showed $1.99. These prices are a dated observation, not site constants. Public names, genres, offline behavior, no-ads/no-IAP claims and support links were checked against the listings and release documentation.

- Joker's Run: https://play.google.com/store/apps/details?id=app.toyboxes.jokersrun
- Perspective Opus: https://play.google.com/store/apps/details?id=app.toyboxes.perspectiveopus
- Google crawlable JavaScript/HTML guidance: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics

No ranking increase, keyword volume, conversion lift or completed-purchase attribution has been established. Console screenshots are retained locally under the ignored `evidence/seo-console/` directory.
