import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const configPath = path.join(root, "seo.config.json");
const indexPath = path.join(root, "index.html");
const publicDir = path.join(root, "public");
const mode = process.argv[2] || "all";

const read = (p) => fs.readFileSync(p, "utf8");
const write = (p, value) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, value);
};
const escRe = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const htmlEscape = (s) => String(s)
  .replaceAll("&", "&amp;")
  .replaceAll('\"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");
const xmlEscape = (s) => htmlEscape(s).replaceAll("'", "&apos;");
const decode = (s = "") => String(s)
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", '\"')
  .replaceAll("&#39;", "'")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">")
  .trim();
const ensureSlash = (url) => url.endsWith("/") ? url : url + "/";

if (!fs.existsSync(configPath)) {
  console.error("SEO ENGINE ERROR: seo.config.json n\u00e3o existe.");
  process.exit(1);
}
if (!fs.existsSync(indexPath)) {
  console.error("SEO ENGINE ERROR: index.html n\u00e3o existe.");
  process.exit(1);
}

const config = JSON.parse(read(configPath));

function insertBeforeHead(html, tag) {
  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
}

function setTitle(html, value) {
  const tag = `<title>${htmlEscape(value)}</title>`;
  return /<title>[\s\S]*?<\/title>/i.test(html)
    ? html.replace(/<title>[\s\S]*?<\/title>/i, tag)
    : insertBeforeHead(html, tag);
}

function setHtmlLang(html, lang) {
  return /<html\b[^>]*\blang=["'][^"']*["']/i.test(html)
    ? html.replace(/(<html\b[^>]*\blang=)["'][^"']*["']/i, `$1"${htmlEscape(lang)}"`)
    : html.replace(/<html\b/i, `<html lang="${htmlEscape(lang)}"`);
}

function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\\b(?=[^>]*\\b${escRe(attr)}=["']${escRe(key)}["'])[^>]*>`, "i");
  const tag = `<meta ${attr}="${htmlEscape(key)}" content="${htmlEscape(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : insertBeforeHead(html, tag);
}

function setLink(html, rel, href) {
  const re = new RegExp(`<link\\b(?=[^>]*\\brel=["']${escRe(rel)}["'])[^>]*>`, "i");
  const tag = `<link rel="${htmlEscape(rel)}" href="${htmlEscape(href)}" />`;
  return re.test(html) ? html.replace(re, tag) : insertBeforeHead(html, tag);
}

function businessGraph() {
  const site = config.site;
  const b = config.business;
  const pageId = `${site.url}#webpage`;
  const websiteId = `${site.url}#website`;
  const businessId = `${site.url}#business`;
  const business = {
    "@type": b.schemaType,
    "@id": businessId,
    name: b.name,
    url: site.url,
    ...(b.telephone ? { telephone: b.telephone } : {}),
    ...(b.priceRange ? { priceRange: b.priceRange } : {}),
    ...(b.description ? { description: b.description } : {}),
    ...(b.image ? { image: b.image } : {}),
    ...(b.address ? {
      address: {
        "@type": "PostalAddress",
        ...(b.address.streetAddress ? { streetAddress: b.address.streetAddress } : {}),
        ...(b.address.postalCode ? { postalCode: b.address.postalCode } : {}),
        ...(b.address.addressLocality ? { addressLocality: b.address.addressLocality } : {}),
        ...(b.address.addressRegion ? { addressRegion: b.address.addressRegion } : {}),
        ...(b.address.addressCountry ? { addressCountry: b.address.addressCountry } : {})
      }
    } : {}),
    ...(Array.isArray(b.areaServed) && b.areaServed.length ? {
      areaServed: b.areaServed.map((name) => ({ "@type": "Place", name }))
    } : {}),
    ...(Array.isArray(b.sameAs) && b.sameAs.length ? { sameAs: b.sameAs } : {}),
    ...(b.geo?.latitude != null && b.geo?.longitude != null ? {
      geo: {
        "@type": "GeoCoordinates",
        latitude: b.geo.latitude,
        longitude: b.geo.longitude
      }
    } : {}),
    ...(b.schemaType === "Restaurant" && Array.isArray(b.servesCuisine) && b.servesCuisine.length
      ? { servesCuisine: b.servesCuisine } : {})
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        inLanguage: site.lang
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        url: site.url,
        name: site.title,
        description: site.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": businessId },
        mainEntity: { "@id": businessId },
        inLanguage: site.lang
      },
      business
    ]
  };
}

function injectStructuredData(html) {
  if (config.structuredDataMode !== "generate") return html;
  const start = "<!-- SEO-ENGINE:STRUCTURED-DATA:START -->";
  const end = "<!-- SEO-ENGINE:STRUCTURED-DATA:END -->";
  const block = `${start}
    <script id="seo-engine-structured-data" type="application/ld+json">
${JSON.stringify(businessGraph(), null, 2)}
    </script>
    ${end}`;
  const re = /<!-- SEO-ENGINE:STRUCTURED-DATA:START -->[\s\S]*?<!-- SEO-ENGINE:STRUCTURED-DATA:END -->/i;
  return re.test(html) ? html.replace(re, block) : insertBeforeHead(html, block);
}

function generate() {
  let html = read(indexPath);
  const site = config.site;
  html = setHtmlLang(html, site.lang);
  html = setTitle(html, site.title);
  html = setMeta(html, "name", "description", site.description);
  html = setMeta(html, "name", "robots", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
  html = setMeta(html, "name", "googlebot", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
  html = setLink(html, "canonical", site.url);
  html = setMeta(html, "property", "og:title", site.ogTitle || site.title);
  html = setMeta(html, "property", "og:description", site.ogDescription || site.description);
  html = setMeta(html, "property", "og:url", site.url);
  html = setMeta(html, "property", "og:type", site.ogType || (config.business.schemaType === "Restaurant" ? "restaurant" : "website"));
  if (site.ogImage) html = setMeta(html, "property", "og:image", site.ogImage);
  html = setMeta(html, "name", "twitter:card", "summary_large_image");
  html = setMeta(html, "name", "twitter:title", site.ogTitle || site.title);
  html = setMeta(html, "name", "twitter:description", site.ogDescription || site.description);
  if (site.ogImage) html = setMeta(html, "name", "twitter:image", site.ogImage);
  html = injectStructuredData(html);
  write(indexPath, html);

  fs.mkdirSync(publicDir, { recursive: true });
  const base = ensureSlash(site.url);
  const pages = Array.from(new Set(["/", ...(config.pages || [])]));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${xmlEscape(new URL(p.replace(/^\//, ""), base).href)}</loc></url>`).join("\n")}
</urlset>
`;
  write(path.join(publicDir, "sitemap.xml"), sitemap);
  const robotsPath = path.join(publicDir, "robots.txt");
  if (!fs.existsSync(robotsPath)) write(robotsPath,
`User-agent: *
Allow: /

Sitemap: ${new URL("sitemap.xml", base).href}
`);

  const local = (config.business.areaServed || []).join(", ");
  const services = (config.business.services || []).join(", ");
  const llms = `# ${site.name}

Canonical URL: ${site.url}
Language: ${site.lang}
Business type: ${config.business.schemaType}
Business name: ${config.business.name}
${config.business.telephone ? `Telephone: ${config.business.telephone}\n` : ""}${config.business.address?.streetAddress ? `Address: ${[config.business.address.streetAddress, config.business.address.postalCode, config.business.address.addressLocality, config.business.address.addressCountry].filter(Boolean).join(", ")}\n` : ""}${local ? `Areas served: ${local}\n` : ""}${services ? `Services / offering: ${services}\n` : ""}
Primary description:
${site.description}

This file is a machine-readable business summary. Canonical facts remain the website and verified business profiles.
`;
  const llmsPath = path.join(publicDir, "llms.txt");
  if (!fs.existsSync(llmsPath)) write(llmsPath, llms);

  write(path.join(publicDir, "seo-engine.json"), JSON.stringify({
    version: 1,
    site: {
      name: site.name,
      url: site.url,
      lang: site.lang
    },
    business: config.business,
    pages
  }, null, 2) + "\n");

  console.log("SEO ENGINE: generation complete.");
}

function attrs(tag) {
  const out = {};
  const re = /([^\s=]+)\s*=\s*["']([^"']*)["']/g;
  let m;
  while ((m = re.exec(tag))) out[m[1].toLowerCase()] = decode(m[2]);
  return out;
}
function getMeta(html, attr, key) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const a = attrs(tag);
    if (a[attr] === key) return a.content || "";
  }
  return "";
}
function getLink(html, rel) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const a = attrs(tag);
    if (a.rel === rel) return a.href || "";
  }
  return "";
}
function schemaTypes(html) {
  const types = new Set();
  const scripts = html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) || [];
  const walk = (v) => {
    if (!v || typeof v !== "object") return;
    if (Array.isArray(v)) return v.forEach(walk);
    if (typeof v["@type"] === "string") types.add(v["@type"]);
    if (Array.isArray(v["@type"])) v["@type"].forEach((x) => types.add(x));
    Object.values(v).forEach(walk);
  };
  for (const script of scripts) {
    const body = script.replace(/^<script\b[^>]*>/i, "").replace(/<\/script>$/i, "").trim();
    try { walk(JSON.parse(body)); } catch {}
  }
  return types;
}
function sourceFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...sourceFiles(p));
    else if (/\.(tsx|jsx|html)$/.test(entry.name)) out.push(p);
  }
  return out;
}

function audit() {
  const errors = [];
  const warnings = [];
  const site = config.site || {};
  const b = config.business || {};
  const required = [
    ["site.name", site.name],
    ["site.url", site.url],
    ["site.lang", site.lang],
    ["site.title", site.title],
    ["site.description", site.description],
    ["business.name", b.name],
    ["business.schemaType", b.schemaType],
    ["business.address.addressLocality", b.address?.addressLocality],
    ["business.address.addressCountry", b.address?.addressCountry]
  ];
  for (const [key, value] of required) if (!value) errors.push(`Missing required config: ${key}`);
  if (site.url && !/^https:\/\//.test(site.url)) errors.push("Canonical URL must use HTTPS.");

  const html = read(indexPath);
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/i) || [,""])[1]);
  const lang = decode((html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i) || [,""])[1]);
  if (title !== site.title) errors.push(`Title differs from config. Found: "${title}"`);
  if (getMeta(html, "name", "description") !== site.description) errors.push("Meta description differs from config.");
  if (getLink(html, "canonical") !== site.url) errors.push("Canonical URL differs from config.");
  if (lang !== site.lang) errors.push(`HTML lang differs from config. Found: "${lang}"`);
  if (getMeta(html, "property", "og:url") !== site.url) errors.push("og:url differs from config.");
  if (!getMeta(html, "name", "robots").includes("index")) errors.push("robots meta is not indexable.");

  const types = schemaTypes(html);
  if (!types.has(b.schemaType)) {
    errors.push(`Structured data type ${b.schemaType} not found in index.html.`);
  }
  if (!Array.isArray(b.areaServed) || !b.areaServed.length) warnings.push("No areaServed configured.");
  if (!b.telephone) warnings.push("No telephone configured.");
  if (b.geo?.latitude == null || b.geo?.longitude == null) warnings.push("No verified latitude/longitude configured.");

  if ((site.title || "").length < 25 || (site.title || "").length > 70)
    warnings.push(`Title length is ${(site.title || "").length}; review SERP fit.`);
  if ((site.description || "").length < 70 || (site.description || "").length > 180)
    warnings.push(`Description length is ${(site.description || "").length}; review SERP fit.`);

  let imgWithoutAlt = 0;
  let h1 = 0;
  for (const file of sourceFiles(path.join(root, "src"))) {
    const src = read(file);
    imgWithoutAlt += (src.match(/<img\b(?![^>]*\balt=)[^>]*>/gi) || []).length;
    h1 += (src.match(/<h1\b/gi) || []).length;
  }
  if (imgWithoutAlt) warnings.push(`${imgWithoutAlt} <img> element(s) without alt detected in src.`);
  if (!h1) warnings.push("No static <h1> detected in src; verify runtime heading structure.");

  for (const f of ["robots.txt", "sitemap.xml", "llms.txt", "seo-engine.json"]) {
    if (!fs.existsSync(path.join(publicDir, f))) errors.push(`Generated file missing: public/${f}`);
  }
  const sitemapPath = path.join(publicDir, "sitemap.xml");
  if (fs.existsSync(sitemapPath) && site.url) {
    const sitemap = read(sitemapPath);
    const base = ensureSlash(site.url);
    for (const page of new Set(["/", ...(config.pages || [])])) {
      const url = new URL(page.replace(/^\//, ""), base).href;
      if (!sitemap.includes(`<loc>${xmlEscape(url)}</loc>`))
        errors.push(`Sitemap missing configured page: ${url}`);
      if (page !== "/" && !fs.existsSync(path.join(publicDir, page.replace(/^\//, ""), "index.html")))
        errors.push(`Configured page has no public/index.html: ${page}`);
    }
  }

  console.log("\nSEO ENGINE AUDIT");
  console.log(`Site: ${site.name || "(unknown)"}`);
  console.log(`Schema types: ${Array.from(types).sort().join(", ") || "(none)"}`);
  if (warnings.length) {
    console.log("\nWARNINGS");
    warnings.forEach((x) => console.log(`- ${x}`));
  }
  if (errors.length) {
    console.error("\nERRORS");
    errors.forEach((x) => console.error(`- ${x}`));
    process.exitCode = 1;
  } else {
    console.log("\nPASS: critical SEO/AEO/GEO checks passed.");
  }
}

if (!["generate", "audit", "all"].includes(mode)) {
  console.error("Usage: node scripts/seo-engine.mjs [generate|audit|all]");
  process.exit(1);
}
if (mode === "generate" || mode === "all") generate();
if (mode === "audit" || mode === "all") audit();
