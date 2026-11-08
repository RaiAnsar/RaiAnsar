import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { checkRobots, checkSitemap, pruneSoft404Copies } from "./export.mjs";

const repo = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const read = (rel) => readFileSync(path.join(repo, rel), "utf8");

const PAGE = (robots, canonical, img = "/images/hero-rai-680.webp") => `<!DOCTYPE html><html><head>
<meta name="robots" content="${robots}"/><link rel="canonical" href="${canonical}"/></head>
<body><img src="${img}" srcSet="/images/hero-rai-340.webp 340w, ${img} 680w"/></body></html>`;

function fixture(files) {
  const dir = mkdtempSync(path.join(tmpdir(), "raiansar-export-"));
  for (const [rel, body] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    writeFileSync(path.join(dir, rel), body);
  }
  return dir;
}

const sitemap = (urls) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

test("the committed robots.txt passes", () => {
  assert.deepEqual(checkRobots(read("public/robots.txt")), []);
});

test("an Allow-only named group that drops the '*' Disallow rules fails", () => {
  const robots = `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /cdn-cgi/\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: MJ12bot\nDisallow: /\n\nSitemap: https://raiansar.com/sitemap.xml\n`;
  const problems = checkRobots(robots);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /gptbot.*\/admin\/ \/cdn-cgi\//);
});

test("robots.txt without the sitemap line fails", () => {
  assert.match(checkRobots("User-agent: *\nAllow: /\n").join(), /Sitemap/);
});

test("the committed sitemap passes against a matching export", () => {
  const out = fixture({
    "index.html": PAGE("index, follow", "https://raiansar.com/"),
    "images/hero-rai-680.webp": "x",
    "images/hero-rai-340.webp": "x",
  });
  assert.deepEqual(checkSitemap(out, read("public/sitemap.xml")), []);
});

test("noindex, canonicalised, missing and soft-404 URLs in the sitemap fail", () => {
  const out = fixture({
    "index.html": PAGE("index, follow", "https://raiansar.com/"),
    "hidden/index.html": PAGE("noindex", "https://raiansar.com/hidden/"),
    "copy/index.html": PAGE("index, follow", "https://raiansar.com/"),
    "404.html": PAGE("noindex", ""),
    "404/index.html": PAGE("noindex", ""),
    "images/hero-rai-680.webp": "x",
  });
  pruneSoft404Copies(out);
  const xml = sitemap(
    ["/", "/hidden/", "/copy/", "/gone/", "/404/"].map((p) => `<url><loc>https://raiansar.com${p}</loc></url>`).join("\n"),
  );
  const problems = checkSitemap(out, xml).join("\n");
  assert.match(problems, /\/hidden\/ is robots noindex/);
  assert.match(problems, /\/copy\/ canonical is https:\/\/raiansar\.com\/$/m);
  assert.match(problems, /\/gone\/ has no exported page/);
  assert.match(problems, /\/404\/ has no exported page/);
  assert.doesNotMatch(problems, /raiansar\.com\/ (is|canonical|has)/);
});

test("unrendered or missing images and deprecated image tags fail", () => {
  const out = fixture({
    "index.html": PAGE("index, follow", "https://raiansar.com/"),
    "images/hero-rai-680.webp": "x",
    "images/og-image.png": "x",
  });
  const xml = sitemap(`<url><loc>https://raiansar.com/</loc>
<image:image><image:loc>https://raiansar.com/images/og-image.png</image:loc><image:title>t</image:title></image:image>
<image:image><image:loc>https://raiansar.com/images/none.jpg</image:loc></image:image></url>`);
  const problems = checkSitemap(out, xml).join("\n");
  assert.match(problems, /deprecated <image:title>/);
  assert.match(problems, /og-image\.png is not rendered/);
  assert.match(problems, /none\.jpg is not in the export/);
});

test("pruning removes the soft-404 copies and keeps 404.html", () => {
  const out = fixture({
    "404.html": "x",
    "404/index.html": "x",
    "_not-found/index.html": "x",
    "_not-found/index.txt": "x",
  });
  assert.deepEqual(pruneSoft404Copies(out), ["404/", "_not-found/"]);
  assert.ok(existsSync(path.join(out, "404.html")));
  assert.ok(!existsSync(path.join(out, "404")));
  assert.ok(!existsSync(path.join(out, "_not-found")));
});

test("pruning refuses to run without 404.html", () => {
  assert.throws(() => pruneSoft404Copies(fixture({ "index.html": "x" })), /404\.html is missing/);
});
