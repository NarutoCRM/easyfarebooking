// Run against a started production server: node tests/deals.smoke.cjs http://127.0.0.1:3100
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const exportsData = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(__dirname, "../data/deals.ts"), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 } }).outputText, { exports: exportsData });
const { dealCategories, routeDeals, categoryRedirects } = exportsData;
const base = process.argv[2] || "http://127.0.0.1:3100";
const canonicalPaths = new Set(["/deals", ...dealCategories.map((item) => item.path), ...routeDeals.map((item) => item.path)]);

async function get(path, redirect = "follow") {
  const response = await fetch(`${base}${path}`, { redirect, signal: AbortSignal.timeout(15000) });
  return { status: response.status, html: await response.text(), location: response.headers.get("location") };
}

async function main() {
  const directory = await get("/deals");
  assert.equal(directory.status, 200);
  for (const item of [...dealCategories, ...routeDeals]) assert.ok(directory.html.includes(`href="${item.path}"`), `Directory card: ${item.path}`);
  const sitemap = await get("/sitemap.xml");
  for (const item of [...dealCategories, ...routeDeals]) {
    const page = await get(item.path);
    assert.equal(page.status, 200, item.path);
    assert.ok(page.html.includes(`<link rel="canonical" href="https://easyfarebooking.com${item.path}"`), `Canonical: ${item.path}`);
    assert.ok(page.html.includes("application/ld+json"), `Breadcrumb schema: ${item.path}`);
    assert.equal((page.html.match(/<h1\b/g) || []).length, 1, `H1: ${item.path}`);
    assert.ok(page.html.includes("demo"));
    const visibleMarkup = page.html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    assert.ok(!/[$₹]\s*\d/.test(visibleMarkup), `No unsupported prices: ${item.path}`);
    if (item.fromCode) {
      assert.ok(page.html.includes(`(${item.fromCode})`), `Origin: ${item.path}`);
      assert.ok(page.html.includes(`(${item.toCode})`), `Destination: ${item.path}`);
    }
    if (item.defaultTripType === "oneway") assert.ok(!page.html.includes('aria-label="Return date"'));
    for (const match of page.html.matchAll(/href="(\/deals(?:\/[^"?#]*)?|\/(?:domestic|international|business-class|first-class|last-minute)-flight-deals)"/g)) assert.ok(canonicalPaths.has(match[1]), `Canonical internal link: ${match[1]}`);
    assert.ok(sitemap.html.includes(`<loc>https://easyfarebooking.com${item.path}</loc>`));
    assert.equal((await get(item.path)).status, 200, `Refresh: ${item.path}`);
  }
  for (const alias of categoryRedirects) {
    const redirect = await get(`${alias.source}?source=smoke`, "manual");
    assert.equal(redirect.status, 308, alias.source);
    assert.ok(redirect.location.endsWith(`${alias.destination}?source=smoke`), redirect.location);
    assert.ok(!sitemap.html.includes(`<loc>https://easyfarebooking.com${alias.source}</loc>`));
  }
  for (const path of ["/deals/unknown-category", "/deals/routes/unknown-route"]) assert.equal((await get(path)).status, 404, path);
  for (const path of ["/cheap-flights-to-new-york", "/cheap-flights-to-paris"]) {
    const page = await get(path);
    assert.ok(page.html.includes("/deals/routes/"), `Destination-to-deal links: ${path}`);
  }
  assert.equal((await get("/flights/search?from=JFK&to=LAX&departure=2026-11-10&tripType=oneway&travellers=2&cabin=Economy")).status, 200);
  console.log(`Deals production smoke passed: ${canonicalPaths.size} canonical URLs, direct access/refresh, cards, airport prefills, SEO/sitemap, ${categoryRedirects.length} permanent redirects, destination links and 404 handling.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
