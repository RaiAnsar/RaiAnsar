// Post-build guard for the static export. `npm run build` runs it, so the
// deploy workflow (which only runs `npm run build`) never ships a bad out/.
//
// 1. Removes the soft-404 copies Next writes next to out/404.html. nginx serves
//    out/404/index.html and out/_not-found/index.html with 200 (try_files $uri/),
//    while unknown paths already get a real 404 from `error_page 404 /404.html`.
// 2. Fails when the sitemap lists a URL that is missing, noindex or canonicalised
//    elsewhere, an image that the page does not render, or deprecated image tags.
// 3. Fails when a named robots.txt group drops the '*' group's Disallow rules
//    (a crawler obeys only its most specific group).
import { existsSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const SITE = "https://raiansar.com";
export const SOFT_404_DIRS = ["404", "_not-found"];
const DEPRECATED_IMAGE_TAGS = ["image:title", "image:caption", "image:geo_location", "image:license"];

export function pruneSoft404Copies(outDir) {
  if (!existsSync(path.join(outDir, "404.html"))) {
    throw new Error("out/404.html is missing; nginx error_page 404 /404.html needs it");
  }
  const removed = [];
  for (const dir of SOFT_404_DIRS) {
    const target = path.join(outDir, dir);
    if (existsSync(target)) {
      rmSync(target, { recursive: true, force: true });
      removed.push(`${dir}/`);
    }
  }
  return removed;
}

export function parseRobots(text) {
  const groups = [];
  const sitemaps = [];
  let current = null;
  let lastWasAgent = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const match = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!match) continue;
    const key = match[1].toLowerCase();
    const value = match[2].trim();
    if (key === "sitemap") {
      sitemaps.push(value);
    } else if (key === "user-agent") {
      if (!lastWasAgent) {
        current = { agents: [], allow: [], disallow: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else {
      lastWasAgent = false;
      if (current && key === "allow") current.allow.push(value);
      if (current && key === "disallow" && value) current.disallow.push(value);
    }
  }
  return { groups, sitemaps };
}

export function checkRobots(text) {
  const problems = [];
  const { groups, sitemaps } = parseRobots(text);
  if (!sitemaps.includes(`${SITE}/sitemap.xml`)) {
    problems.push(`robots.txt: no "Sitemap: ${SITE}/sitemap.xml" line`);
  }
  const star = groups.find((group) => group.agents.includes("*"));
  if (!star) {
    problems.push("robots.txt: no 'User-agent: *' group");
    return problems;
  }
  for (const group of groups) {
    if (group === star || group.disallow.includes("/")) continue;
    const missing = star.disallow.filter((rule) => !group.disallow.includes(rule));
    if (missing.length) {
      problems.push(
        `robots.txt: group "${group.agents.join(", ")}" overrides '*' and drops Disallow ${missing.join(" ")}`,
      );
    }
  }
  return problems;
}

function metaContent(html, name) {
  const tag = html.match(new RegExp(`<meta[^>]*name="${name}"[^>]*>`, "i"));
  const content = tag && tag[0].match(/content="([^"]*)"/i);
  return content ? content[1].toLowerCase() : "";
}

function pageFile(outDir, loc) {
  const pathname = new URL(loc).pathname;
  return path.join(outDir, pathname.replace(/^\//, ""), "index.html");
}

export function checkSitemap(outDir, xml) {
  const problems = [];
  for (const tag of DEPRECATED_IMAGE_TAGS) {
    if (xml.includes(`<${tag}>`)) problems.push(`sitemap.xml: deprecated <${tag}>`);
  }
  const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  if (!urls.length) problems.push("sitemap.xml: no <url> entries");
  for (const block of urls) {
    const loc = (block.match(/<loc>([^<]+)<\/loc>/) || [])[1]?.trim();
    if (!loc || !loc.startsWith(`${SITE}/`) || !loc.endsWith("/")) {
      problems.push(`sitemap.xml: bad <loc> ${loc ?? "(missing)"}`);
      continue;
    }
    const file = pageFile(outDir, loc);
    if (!existsSync(file)) {
      problems.push(`sitemap.xml: ${loc} has no exported page`);
      continue;
    }
    const html = readFileSync(file, "utf8");
    for (const name of ["robots", "googlebot"]) {
      if (metaContent(html, name).includes("noindex")) problems.push(`sitemap.xml: ${loc} is ${name} noindex`);
    }
    const canonical = (html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i) || [])[1];
    if (canonical !== loc) problems.push(`sitemap.xml: ${loc} canonical is ${canonical ?? "(none)"}`);
    const rendered = new Set();
    for (const img of html.matchAll(/<img\b[^>]*>/gi)) {
      const src = img[0].match(/\ssrc="([^"]+)"/i);
      if (src) rendered.add(src[1]);
      const srcset = img[0].match(/\ssrcset="([^"]+)"/i);
      if (srcset) for (const part of srcset[1].split(",")) rendered.add(part.trim().split(/\s+/)[0]);
    }
    for (const m of block.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)) {
      const imageLoc = m[1].trim();
      const imagePath = imageLoc.startsWith(SITE) ? imageLoc.slice(SITE.length) : null;
      if (!imagePath || !existsSync(path.join(outDir, imagePath))) {
        problems.push(`sitemap.xml: image ${imageLoc} is not in the export`);
      } else if (!rendered.has(imagePath) && !rendered.has(imageLoc)) {
        problems.push(`sitemap.xml: image ${imageLoc} is not rendered in an <img> on ${loc}`);
      }
    }
  }
  return problems;
}

export function run(outDir) {
  const removed = pruneSoft404Copies(outDir);
  const problems = [
    ...checkRobots(readFileSync(path.join(outDir, "robots.txt"), "utf8")),
    ...checkSitemap(outDir, readFileSync(path.join(outDir, "sitemap.xml"), "utf8")),
  ];
  return { removed, problems };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const outDir = path.resolve(process.argv[2] ?? "out");
  const { removed, problems } = run(outDir);
  if (removed.length) console.log(`checks/export: removed soft-404 copies ${removed.join(" ")}`);
  if (problems.length) {
    for (const problem of problems) console.error(`checks/export: ${problem}`);
    process.exit(1);
  }
  console.log("checks/export: robots.txt and sitemap.xml OK");
}
