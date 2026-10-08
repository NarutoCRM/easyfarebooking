// Run against an already-started production server:
// node tests/destinations.smoke.cjs http://127.0.0.1:3100
const assert = require("node:assert/strict");
const base = process.argv[2] || "http://127.0.0.1:3100";

async function get(path) {
  const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(15000) });
  return { status: response.status, html: await response.text() };
}

async function main() {
  const sitemap = await get("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const paths = [...sitemap.html.matchAll(/<loc>https:\/\/easyfarebooking\.com(\/cheap-flights-to-[^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(paths.length, 28);
  const directory = await get("/destinations");
  assert.equal(directory.status, 200);
  for (const path of paths) {
    assert.ok(directory.html.includes(`href="${path}"`), `Directory link: ${path}`);
    const page = await get(path);
    assert.equal(page.status, 200, path);
    assert.ok(page.html.includes(`<link rel="canonical" href="https://easyfarebooking.com${path}"`), `Canonical: ${path}`);
    assert.ok(page.html.includes("application/ld+json"), `Schema: ${path}`);
    assert.ok(page.html.includes("aria-label=\"Breadcrumb\""), `Breadcrumb: ${path}`);
    assert.ok(page.html.includes("Your destination starts at"), `Search prefill: ${path}`);
    assert.ok(page.html.includes("Finding flights" ) || page.html.includes("Search Flights"), `Flight widget: ${path}`);
    assert.equal((page.html.match(/<h1\b/g) || []).length, 1, `H1: ${path}`);
    const refresh = await get(path);
    assert.equal(refresh.status, 200, `Refresh: ${path}`);
  }
  assert.equal((await get("/cheap-flights-to-unknown-city")).status, 404);
  assert.equal((await get("/flights/search?from=DEL&to=JFK&departure=2026-11-10&tripType=oneway&travellers=1&cabin=Economy")).status, 200);
  assert.ok((await get("/robots.txt")).html.includes("https://easyfarebooking.com/sitemap.xml"));
  console.log(`Production HTTP smoke passed: ${paths.length} destination links, direct URLs, refreshes, metadata, schema, 404 handling and flight results route.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
