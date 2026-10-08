const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const { renderToStaticMarkup } = require("react-dom/server");
const root = path.resolve(__dirname, "..");
const cache = new Map();

function load(relative) {
  const filename = path.resolve(root, relative);
  if (cache.has(filename)) return cache.get(filename);
  const exports = {};
  cache.set(filename, exports);
  const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const localRequire = (id) => {
    if (id === "next/navigation") return { useRouter: () => ({ push() {} }), notFound: () => { throw new Error("NEXT_NOT_FOUND"); } };
    if (id.startsWith("@/")) {
      const file = id.slice(2);
      if (file.endsWith(".json")) return require(path.join(root, file));
      return load(fs.existsSync(path.join(root, `${file}.ts`)) ? `${file}.ts` : `${file}.tsx`);
    }
    return require(id);
  };
  vm.runInNewContext(output, { exports, require: localRequire, URLSearchParams, URL, console }, { filename });
  return exports;
}
const { destinations, destinationPath, getDestination, getDestinationByCity, relatedDestinations } = load("data/destinations.ts");
const { findAirport } = load("utils/airports.ts");
const { destinationMetadata, destinationStructuredData, serializeStructuredData } = load("utils/destination-seo.ts");
const route = load("app/[destination]/page.tsx");
const sitemap = load("app/sitemap.ts").default;

test("all existing destination cards have a unique landing page", () => {
  const expected = ["New York", "Los Angeles", "San Francisco", "Orlando", "London", "Paris", "Tokyo", "Hong Kong", "Boston", "Dubai", "Singapore", "Toronto", "Frankfurt", "Sydney", "Miami", "Las Vegas", "Chicago", "Seattle", "Dallas", "Atlanta", "Bangkok", "Amsterdam", "West Palm Beach", "San Diego", "Appleton", "Sarasota", "New Jersey", "Portland"];
  assert.equal(destinations.length, expected.length);
  for (const city of expected) assert.ok(getDestinationByCity(city), city);
  assert.equal(new Set(destinations.map(destinationPath)).size, destinations.length);
  assert.equal(route.generateStaticParams().length, destinations.length);
  assert.equal(route.dynamicParams, false);
  for (const item of destinations) assert.equal(getDestination(destinationPath(item).slice(1)).city, item.city);
});

test("airport and route selectors use real independent IATA records", () => {
  for (const destination of destinations) {
    for (const airport of destination.airports) {
      assert.ok(findAirport(airport.code), `${destination.city}: ${airport.code}`);
      assert.match(airport.source, /^https:\/\//);
    }
    for (const route of destination.popularRoutes) {
      assert.ok(findAirport(route.code), route.city);
      assert.notEqual(route.code, destination.airportCodes[0]);
    }
  }
});

test("content is destination-specific and provides the required sections", () => {
  for (const field of ["introduction", "heroDescription", "bestTimeToVisit", "seoDescription"]) assert.equal(new Set(destinations.map((item) => item[field])).size, destinations.length, field);
  for (const destination of destinations) {
    assert.equal(destination.faq.length, 5);
    assert.equal(destination.travelSeasons.length, 4);
    assert.ok(destination.travelTips.length >= 3);
    assert.ok(destination.thingsToDo.length >= 3);
    assert.ok(destination.introduction.length > 170);
  }
});

test("metadata and sitemap use the configured production canonical domain", () => {
  const urls = new Set(sitemap().map((item) => item.url));
  for (const destination of destinations) {
    const metadata = destinationMetadata(destination);
    assert.equal(metadata.title.absolute, `Cheap Flights to ${destination.city} | EasyFareBooking`);
    assert.equal(metadata.alternates.canonical, destinationPath(destination));
    assert.equal(metadata.description, destination.seoDescription);
    assert.equal(metadata.openGraph.url, destinationPath(destination));
    assert.equal(metadata.openGraph.images[0].url, "/newlogo.png");
    assert.ok(urls.has(`https://easyfarebooking.com${destinationPath(destination)}`));
  }
  assert.ok(!urls.has("https://easyfarebooking.com/flights/search"));
});

test("FAQ and breadcrumb schema match the actual guide data and escape script injection", () => {
  for (const destination of destinations) {
    const graph = JSON.parse(serializeStructuredData(destinationStructuredData(destination)))["@graph"];
    assert.equal(graph[0].itemListElement[2].name, destination.city);
    assert.equal(graph[1].mainEntity.length, destination.faq.length);
    graph[1].mainEntity.forEach((item, index) => {
      assert.equal(item.name, destination.faq[index].question);
      assert.equal(item.acceptedAnswer.text, destination.faq[index].answer);
    });
  }
  const encoded = serializeStructuredData({ value: "</script><script>alert(1)</script>" });
  assert.ok(!encoded.includes("<"));
  assert.equal(JSON.parse(encoded).value, "</script><script>alert(1)</script>");
});

test("each guide renders server content and a destination-prefilled widget", async () => {
  for (const destination of destinations) {
    const page = await route.default({ params: Promise.resolve({ destination: destinationPath(destination).slice(1) }) });
    const html = renderToStaticMarkup(page);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(html.includes(destination.heroTitle));
    assert.ok(html.includes(`(${destination.airportCodes[0]})`));
    assert.ok(html.includes("Airports Serving"));
    assert.ok(html.includes("Things to Do in"));
    assert.ok(html.includes("application/ld+json"));
    assert.ok(html.includes("Search Flights"));
    assert.ok(html.includes("demo"));
    assert.ok(!relatedDestinations(destination).some((item) => item.slug === destination.slug));
    assert.equal(relatedDestinations(destination).length, 4);
  }
});

test("unknown destination paths return not-found instead of an empty guide", async () => {
  assert.equal(getDestination("cheap-flights-to-does-not-exist"), undefined);
  assert.equal(getDestination("new-york"), undefined);
  await assert.rejects(route.default({ params: Promise.resolve({ destination: "cheap-flights-to-does-not-exist" }) }), /NEXT_NOT_FOUND/);
  await assert.rejects(route.generateMetadata({ params: Promise.resolve({ destination: "other" }) }), /NEXT_NOT_FOUND/);
});
