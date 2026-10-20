import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const base = process.argv[2];
const site = "https://toyboxes.app";
const routes = [
  "/",
  "/games/jokers-run/",
  "/games/perspective-opus/",
  "/support/",
  "/privacy/",
  "/games/poleline/privacy/",
];
const load = async (path) => {
  if (!base)
    return readFile(
      `dist${path.endsWith("/") ? `${path}index.html` : path}`,
      "utf8",
    );
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, `${path} must return 200`);
  assert(
    !response.headers.get("x-robots-tag")?.includes("noindex"),
    `${path} must be indexable`,
  );
  return response.text();
};
const titles = new Set();
const descriptions = new Set();
const assets = new Set();
const unescape = (str) =>
  str
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
const attribute = (tag, name) =>
  unescape(tag.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`))?.[1] || "");

for (const path of routes) {
  const html = await load(path);
  assert.match(html, /<html lang="en">/);
  assert.equal(
    (html.match(/<h1[ >]/g) || []).length,
    1,
    `${path}: exactly one H1`,
  );
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert(title && !titles.has(title), `${path}: unique title`);
  titles.add(title);
  const description = html.match(
    /<meta name="description" content="([^"]+)"/,
  )?.[1];
  assert(
    description && !descriptions.has(description),
    `${path}: unique description`,
  );
  descriptions.add(description);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert(
    html.includes(`rel="canonical" href="${site}${path}"`),
    `${path}: canonical`,
  );
  assert(!html.includes('content="noindex'), `${path}: robots`);
  assert(
    html.includes('<main id="main"'),
    `${path}: main landmark and skip target`,
  );
  for (const match of html.matchAll(
    /<script type="application\/ld\+json">(.*?)<\/script>/gs,
  )) {
    const data = JSON.parse(match[1]);
    assert.equal(data["@context"], "https://schema.org");
    assert(data["@graph"].some((node) => node["@type"] === "Organization"));
    if (/^\/games\/[^/]+\/$/.test(path)) {
      assert(
        data["@graph"].some(
          (node) =>
            node["@type"]?.includes("VideoGame") &&
            node.operatingSystem === "Android",
        ),
      );
    }
  }
  for (const match of html.matchAll(/<(?:a|link|script|img)\b[^>]*>/g)) {
    const tag = match[0];
    if (tag.startsWith("<img")) {
      assert(
        /\salt="[^"]*"/.test(tag),
        `${path}: image needs an alt attribute`,
      );
      assert(
        /\swidth="\d+"/.test(tag) && /\sheight="\d+"/.test(tag),
        `${path}: image dimensions`,
      );
    }
    const href = attribute(tag, "href") || attribute(tag, "src");
    if (!href) continue;
    if (href.startsWith("/") || href.startsWith("#")) {
      const target = new URL(href, site + path);
      const resource = target.pathname;
      const targetFile = `dist${resource.endsWith("/") ? `${resource}index.html` : resource}`;
      await access(resolve(targetFile));
      if (target.hash) {
        const targetHtml = await readFile(targetFile, "utf8");
        assert(
          targetHtml.includes(`id="${target.hash.slice(1)}"`),
          `${path}: anchor ${href}`,
        );
      }
      if (!resource.endsWith("/")) assets.add(resource);
    }
    if (href.includes("play.google.com/store/apps/details")) {
      const url = new URL(href);
      assert(
        ["app.toyboxes.jokersrun", "app.toyboxes.perspectiveopus"].includes(
          url.searchParams.get("id"),
        ),
      );
      assert.equal(
        new URLSearchParams(url.searchParams.get("referrer")).get("utm_source"),
        "toyboxes.app",
      );
    }
  }
  console.log(
    `PASS ${path}: metadata, structured data, semantic HTML, links and images`,
  );
}
const sitemap = await load("/sitemap.xml");
for (const route of routes)
  assert(
    sitemap.includes(`<loc>${site}${route}</loc>`),
    `${route}: sitemap entry`,
  );
assert.equal((sitemap.match(/<loc>/g) || []).length, routes.length);
assert.match(await load("/robots.txt"), /User-agent: \*\nAllow: \/\n/);
assert((await load("/robots.txt")).includes(`Sitemap: ${site}/sitemap.xml`));
if (base) {
  for (const path of assets) {
    const response = await fetch(new URL(path, base), { method: "HEAD" });
    assert.equal(response.status, 200, `Live asset ${path}`);
  }
  const missing = await fetch(new URL("/this-page-does-not-exist/", base));
  assert.equal(missing.status, 404, "Unknown routes return a real 404");
  assert((await missing.text()).includes("This box is empty."));
}
console.log(
  `PASS sitemap, robots.txt${base ? `, ${assets.size} live assets and real 404` : ""}.`,
);
