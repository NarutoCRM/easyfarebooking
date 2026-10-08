const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const { renderToStaticMarkup } = require("react-dom/server");
const { createElement } = require("react");
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
    if (id.startsWith("@/") || id.startsWith(".")) {
      const base = id.startsWith("@/") ? path.join(root, id.slice(2)) : path.resolve(path.dirname(filename), id);
      if (base.endsWith(".json")) return require(base);
      return load(fs.existsSync(`${base}.ts`) ? `${base}.ts` : `${base}.tsx`);
    }
    return require(id);
  };
  vm.runInNewContext(output, { exports, require: localRequire, URLSearchParams, URL, console }, { filename });
  return exports;
}
const { dealCategories, routeDeals, categoryRedirects, getDealCategory, categoryRoutes, relatedCategories, destinationDealLinks } = load("data/deals.ts");
const { dealMetadata, dealBreadcrumbs } = load("utils/deal-seo.ts");
const { parseSearchDraft } = load("utils/search-draft.ts");
const { findAirport } = load("utils/airports.ts");
const DealPage = load("components/DealPage.tsx").default;
const DealCard = load("components/DealCard.tsx").default;
const RouteCard = load("components/RouteDealCard.tsx").default;
const Widget = load("components/BookingWidget.tsx").default;
const categoryRoute = load("app/deals/[slug]/page.tsx");
const cityRoute = load("app/deals/routes/[slug]/page.tsx");
const sitemap = load("app/sitemap.ts").default;

test("existing canonical category URLs are retained and aliases redirect once", async () => {
  assert.equal(dealCategories.length, 9);
  for (const existing of ["/domestic-flight-deals", "/international-flight-deals", "/business-class-flight-deals", "/first-class-flight-deals", "/last-minute-flight-deals"]) assert.ok(dealCategories.some((category) => category.path === existing));
  assert.equal(categoryRedirects.length, 5);
  const redirects = await load("next.config.ts").default.redirects();
  for (const redirect of redirects) {
    assert.ok(redirect.permanent);
    assert.ok(dealCategories.some((category) => category.path === redirect.destination));
    assert.ok(!redirects.some((other) => other.source === redirect.destination));
  }
  assert.equal(categoryRoute.generateStaticParams().length, 4);
  assert.equal(cityRoute.generateStaticParams().length, 23);
});

test("route data uses valid distinct airports and every route has inbound category links", () => {
  assert.equal(routeDeals.length, 23);
  const ids = new Set();
  for (const route of routeDeals) {
    assert.ok(findAirport(route.fromCode), route.fromCode);
    assert.ok(findAirport(route.toCode), route.toCode);
    assert.notEqual(route.fromCode, route.toCode);
    const fromCountry = findAirport(route.fromCode).country;
    const toCountry = findAirport(route.toCode).country;
    assert.equal(fromCountry, "United States");
    assert.equal(route.kind === "domestic", toCountry === "United States");
    assert.ok(!ids.has(route.slug)); ids.add(route.slug);
    assert.ok(dealCategories.some((category) => category.routeIds.includes(route.slug)), route.slug);
    assert.equal(route.faq.length, 5);
  }
  for (const category of dealCategories) {
    assert.equal(categoryRoutes(category).length, category.routeIds.length);
    assert.ok(relatedCategories(category).length >= 3);
    assert.ok(!relatedCategories(category).some((item) => item.id === category.id));
  }
});

test("all guides have unique editorial introductions and metadata", () => {
  const guides = [...dealCategories, ...routeDeals];
  for (const field of ["introduction", "seoTitle", "seoDescription"]) assert.equal(new Set(guides.map((guide) => guide[field])).size, guides.length, field);
  for (const guide of guides) {
    assert.ok(guide.introduction.length > 200);
    assert.equal(guide.faq.length, 5);
    assert.ok(guide.faq.every((faq) => faq.question && faq.answer));
  }
});

test("metadata, breadcrumb schema and sitemap advertise canonical URLs only", () => {
  const urls = sitemap().map((item) => item.url);
  assert.equal(new Set(urls).size, urls.length);
  for (const guide of [...dealCategories, ...routeDeals]) {
    const metadata = dealMetadata(guide);
    assert.equal(metadata.alternates.canonical, guide.path);
    assert.equal(metadata.title.absolute, `${guide.seoTitle} | EasyFareBooking`);
    assert.equal(metadata.openGraph.url, guide.path);
    assert.equal(metadata.twitter.title, metadata.title.absolute);
    assert.equal(metadata.openGraph.images[0].url, "/newlogo.png");
    const breadcrumb = dealBreadcrumbs(guide).itemListElement[2];
    assert.equal(breadcrumb.item, `https://easyfarebooking.com${guide.path}`);
    assert.equal(breadcrumb.name, guide.title);
    assert.ok(urls.includes(breadcrumb.item));
  }
  for (const alias of categoryRedirects) assert.ok(!urls.includes(`https://easyfarebooking.com${alias.source}`));
});

test("category and route cards are complete navigation links without fabricated prices", () => {
  for (const category of dealCategories) {
    const html = renderToStaticMarkup(createElement(DealCard, { deal: category }));
    assert.ok(html.includes(`href="${category.path}"`));
    assert.ok(html.includes("Explore flight options"));
    assert.ok(!/[$₹]\s*\d/.test(html));
  }
  for (const route of routeDeals) {
    const html = renderToStaticMarkup(createElement(RouteCard, { route }));
    assert.ok(html.includes(`href="${route.path}"`));
    assert.ok(html.includes(route.fromCode) && html.includes(route.toCode));
    assert.ok(!/[$₹]\s*\d/.test(html));
  }
});

test("each deal guide server-renders required content and route airport prefills", () => {
  for (const guide of [...dealCategories, ...routeDeals]) {
    const html = renderToStaticMarkup(createElement(DealPage, { deal: guide }));
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(html.includes("Flight Planning Tips"));
    assert.ok(html.includes("Before a Real Booking"));
    assert.ok(html.includes("Frequently Asked Questions"));
    assert.ok(html.includes("application/ld+json"));
    assert.ok(html.includes("flight-search"));
    assert.ok(html.includes("demo"));
    if (guide.fromCode) {
      assert.ok(html.includes(`(${guide.fromCode})`));
      assert.ok(html.includes(`(${guide.toCode})`));
    }
  }
});

test("one-way, round-trip and premium-cabin defaults render in the existing widget", () => {
  const oneWay = renderToStaticMarkup(createElement(Widget, { defaultTripType: "oneway" }));
  assert.ok(!oneWay.includes('aria-label="Return date"'));
  const roundTrip = renderToStaticMarkup(createElement(Widget, { defaultTripType: "roundtrip" }));
  assert.ok(roundTrip.includes('aria-label="Return date"'));
  const business = renderToStaticMarkup(createElement(Widget, { defaultCabin: "Business" }));
  assert.ok(business.includes(">Business</p>"));
  const explicit = renderToStaticMarkup(createElement(Widget, { defaultTripType: "oneway", defaultCabin: "Business", initialValues: { from: findAirport("JFK"), to: findAirport("CDG"), departure: "2026-11-10", returnDate: "2026-11-20", travellers: 3, cabin: "Economy", tripType: "roundtrip" } }));
  assert.ok(explicit.includes('aria-label="Return date"'));
  assert.ok(explicit.includes('value="2026-11-10"'));
  assert.ok(explicit.includes(">Economy</p>"));
});

test("session drafts preserve valid dates, traveller and cabin choices and reject corruption", () => {
  const draft = { departure: "2026-11-10", returnDate: "2026-11-20", travellers: 4, cabin: "Premium Economy", tripType: "oneway" };
  const parsed = parseSearchDraft(JSON.stringify(draft));
  assert.equal(JSON.stringify(parsed), JSON.stringify(draft));
  for (const change of [{ travellers: 0 }, { travellers: 10 }, { travellers: 1.5 }, { cabin: "invalid" }, { departure: "2026-02-30" }, { returnDate: 123 }, { tripType: "unknown" }]) assert.equal(parseSearchDraft(JSON.stringify({ ...draft, ...change })), null);
  for (const raw of [null, "", "not-json", "[]", "null"]) assert.equal(parseSearchDraft(raw), null);
});

test("destination links are relevant and deal pages link back to destination guides", () => {
  for (const city of ["New York", "Paris", "Tokyo", "London"]) {
    assert.ok(destinationDealLinks(city).length > 0);
    assert.ok(destinationDealLinks(city).every((route) => route.fromCity === city || route.toCity === city));
  }
  const route = routeDeals.find((item) => item.slug === "chicago-to-paris");
  const html = renderToStaticMarkup(createElement(DealPage, { deal: route }));
  assert.ok(html.includes('href="/cheap-flights-to-paris"'));
});

test("unknown categories and city pairs return not-found", async () => {
  for (const module of [categoryRoute, cityRoute]) {
    await assert.rejects(module.default({ params: Promise.resolve({ slug: "does-not-exist" }) }), /NEXT_NOT_FOUND/);
    await assert.rejects(module.generateMetadata({ params: Promise.resolve({ slug: "does-not-exist" }) }), /NEXT_NOT_FOUND/);
  }
  await assert.rejects(categoryRoute.default({ params: Promise.resolve({ slug: "cheap-domestic-flights" }) }), /NEXT_NOT_FOUND/);
  assert.equal(getDealCategory("unknown"), undefined);
});

test("deals directory renders featured, domestic, international, tips and FAQ sections", () => {
  const directory = load("site-pages/Deals.tsx").default;
  const html = renderToStaticMarkup(createElement(directory));
  for (const text of ["Explore Flight Deals &amp; Travel Offers", "Featured Deals", "Popular Routes", "Domestic Flight Deals", "International Flight Deals", "Travel Planning Tips", "Frequently Asked Questions"]) assert.ok(html.includes(text), text);
  for (const category of dealCategories) assert.ok(html.includes(`href="${category.path}"`));
  assert.ok(!/[$₹]\s*\d/.test(html));
});
