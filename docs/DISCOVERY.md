# Discovery and measurement

## Shipped site foundation

- Static, crawlable homepage and one canonical page per game.
- Unique titles, descriptions, canonical links, Open Graph metadata and structured data for the organization and games.
- Ordinary links to Google Play, the developer collection, support, existing game policies and browser editions.
- `https://toyboxes.app/robots.txt` allows crawling and declares `https://toyboxes.app/sitemap.xml`.
- Real 404 responses. The www host redirects to the apex domain.
- Play links carry a `referrer` campaign: source `toyboxes.app`, medium `website`, campaign `mobile_storefront`, content by game and link placement. These labels contain no user identifier. Labels alone do not constitute a click or purchase analytics implementation; report availability must be confirmed in Play Console.

## Follow-up in the owner consoles

1. Open the toyboxes.app Search Console domain property, or verify it if none exists. A preexisting Google verification TXT record was observed during setup; its presence does not prove this property is verified or accessible.
2. Submit the sitemap and inspect the homepage and both game URLs. Request indexing where appropriate. A live, indexable page is not proof Google has indexed it.
3. Update the website URL on each Play listing to its dedicated game page. Update the developer website to `https://toyboxes.app/`. Create or enhance the branded developer profile in Play Console if available. This site's deployment does not change Play listing metadata.
4. Review title and short-description candidates against the actual listing requirements and search data. Keep Joker's Run's one-mission scope clear. Test metadata and screenshot changes separately when traffic supports it.
5. Record an initial acquisition baseline: Search Console impressions/clicks, Play search terms and listing visitors, install-intent clicks, completed purchases/installs, and retention. Keep those events distinct. This site adds no analytics SDK and cannot itself report completed purchases or retention.

## Content verified on October 19, 2026

Both public US English Play listings were accessible. Joker's Run showed a $2.99 purchase price; Perspective Opus showed $1.99. These prices are a dated observation, not site constants. Public names, genres, offline behavior, no-ads/no-IAP claims and support links were checked against the listings and release documentation.

- Joker's Run: https://play.google.com/store/apps/details?id=app.toyboxes.jokersrun
- Perspective Opus: https://play.google.com/store/apps/details?id=app.toyboxes.perspectiveopus
- Google crawlable JavaScript/HTML guidance: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics

No ranking increase, keyword volume, conversion lift, indexing status or private acquisition metric has been verified by publishing this site.
