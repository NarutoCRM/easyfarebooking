const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const React = require("react");
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
    if (id === "next/navigation") return { useRouter: () => ({ push() {} }) };
    // Render both existing header menus in their open state without a browser.
    if (id === "react" && filename.endsWith(`${path.sep}Header.tsx`)) return { ...React, useState: () => [true, () => {}] };
    if (id.startsWith("@/") || id.startsWith(".")) {
      const base = id.startsWith("@/") ? path.join(root, id.slice(2)) : path.resolve(path.dirname(filename), id);
      if (base.endsWith(".json")) return require(base);
      if (fs.existsSync(`${base}.ts`)) return load(`${base}.ts`);
      if (fs.existsSync(`${base}.tsx`)) return load(`${base}.tsx`);
      return load(path.join(base, "index.ts"));
    }
    return require(id);
  };
  vm.runInNewContext(output, { exports, require: localRequire, URLSearchParams, URL, console }, { filename });
  return exports;
}
const { services, serviceKinds } = load("data/services.ts");
const inquiry = load("utils/service-inquiry.ts");
const { serviceMetadata } = load("utils/service-seo.ts");
const LandingPage = load("components/ServiceLandingPage.tsx").default;
const ContactForm = load("components/ContactInquiryForm.tsx").default;
const sitemap = load("app/sitemap.ts").default;
const valid = { ...inquiry.emptyInquiry, destination: "Paris", startDate: "2026-11-10", endDate: "2026-11-15", travellers: "4", rooms: "2", preference: "SUV", name: "Test Traveller", email: "traveller@example.test", phone: "+1 (555) 123-4567" };
const today = "2026-10-08";

test("all three existing service routes render complete distinct pages", () => {
  const names = { hotels: "Hotels", cruise: "Cruise", "car-rental": "CarRental" };
  for (const service of serviceKinds) {
    const Page = load(`site-pages/${names[service]}.tsx`).default;
    const html = renderToStaticMarkup(React.createElement(Page));
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(html.includes(services[service].title));
    assert.ok(html.includes('id="service-inquiry"'));
    assert.ok(html.includes("Continue to Contact"));
    assert.ok(html.includes("Frequently Asked Questions"));
    assert.ok(html.includes("no live inventory"));
    assert.ok(html.includes('role="img"'));
    assert.ok(!html.includes("<img"), "Original illustrations avoid unverified stock assets");
    assert.equal(services[service].faq.length, 5);
    for (const collection of services[service].collections) assert.ok(html.includes(collection.title));
    assert.ok(!/[$₹]\s*\d/.test(html));
  }
});

test("forms expose correctly labeled service-specific fields", () => {
  const expected = { hotels: ["destination", "startDate", "endDate", "travellers", "rooms"], cruise: ["destination", "startDate", "travellers", "name", "email", "phone"], "car-rental": ["destination", "startDate", "endDate", "preference"] };
  for (const service of serviceKinds) {
    const html = renderToStaticMarkup(React.createElement(LandingPage, { service }));
    for (const field of expected[service]) {
      assert.ok(html.includes(`id="${service}-${field}"`));
      assert.ok(html.includes(`for="${service}-${field}"`));
    }
    if (service !== "cruise") assert.ok(!html.includes(`id="${service}-email"`));
  }
});

test("valid inquiries pass without asserting inventory or a reservation", () => {
  assert.equal(Object.keys(inquiry.validateInquiry("hotels", valid, today)).length, 0);
  assert.equal(Object.keys(inquiry.validateInquiry("car-rental", valid, today)).length, 0);
  assert.equal(Object.keys(inquiry.validateInquiry("cruise", { ...valid, destination: "Caribbean" }, today)).length, 0);
  const sameDayCar = { ...valid, endDate: valid.startDate };
  assert.equal(Object.keys(inquiry.validateInquiry("car-rental", sameDayCar, today)).length, 0);
  assert.ok(inquiry.validateInquiry("hotels", sameDayCar, today).endDate);
});

test("dates, required locations and counts reject invalid requests", () => {
  for (const service of ["hotels", "car-rental"]) {
    assert.ok(inquiry.validateInquiry(service, { ...valid, destination: " " }, today).destination);
    assert.ok(inquiry.validateInquiry(service, { ...valid, endDate: "2026-11-09" }, today).endDate);
  }
  for (const startDate of ["", "2026-02-30", "2026-10-07", "not-a-date"]) assert.ok(inquiry.validateInquiry("hotels", { ...valid, startDate }, today).startDate);
  for (const travellers of ["0", "-1", "1.5", "51", "NaN"]) assert.ok(inquiry.validateInquiry("hotels", { ...valid, travellers }, today).travellers);
  for (const rooms of ["0", "21", "1.5", "5"]) assert.ok(inquiry.validateInquiry("hotels", { ...valid, rooms }, today).rooms);
  assert.ok(inquiry.validateInquiry("car-rental", { ...valid, preference: "Guaranteed upgrade" }, today).preference);
});

test("cruise contact details and selected region are validated", () => {
  for (const change of [{ name: "" }, { email: "invalid" }, { phone: "letters" }, { destination: "Unsupported region" }, { travellers: "0" }]) assert.ok(Object.keys(inquiry.validateInquiry("cruise", { ...valid, destination: "Alaska", ...change }, today)).length > 0);
  assert.equal(Object.keys(inquiry.validateInquiry("cruise", { ...valid, destination: "Alaska", phone: "" }, today)).length, 0);
});

test("prepared requests contain only the applicable service fields", () => {
  const hotel = inquiry.prepareInquiry("hotels", valid, 1000);
  assert.ok(hotel.message.includes("Check-in: 2026-11-10"));
  assert.ok(hotel.message.includes("Guests: 4"));
  assert.equal(hotel.name, ""); assert.equal(hotel.email, "");
  assert.ok(!hotel.message.includes("SUV"));
  const car = inquiry.prepareInquiry("car-rental", valid, 1000);
  assert.ok(car.message.includes("Vehicle preference: SUV"));
  assert.ok(!car.message.includes("Rooms:"));
  const cruise = inquiry.prepareInquiry("cruise", { ...valid, destination: "Mediterranean" }, 1000);
  assert.equal(cruise.email, valid.email);
  assert.ok(!cruise.message.includes("Check-out:"));
  for (const draft of [hotel, car, cruise]) assert.ok(draft.message.includes("not a confirmed reservation"));
});

test("private handoff expires and rejects corrupt or oversized browser data", () => {
  const draft = inquiry.prepareInquiry("cruise", { ...valid, destination: "Alaska" }, 1000);
  assert.equal(inquiry.parsePendingInquiry(JSON.stringify(draft), 2000).email, valid.email);
  assert.equal(inquiry.parsePendingInquiry(JSON.stringify(draft), 1000 + inquiry.inquiryLifetime + 1), null);
  assert.equal(inquiry.parsePendingInquiry(JSON.stringify(draft), 999), null);
  for (const change of [{ service: "other" }, { version: 2 }, { message: "x".repeat(2001) }, { email: "broken" }, { phone: "x" }, { createdAt: "1000" }]) assert.equal(inquiry.parsePendingInquiry(JSON.stringify({ ...draft, ...change }), 2000), null);
  for (const raw of [null, "broken-json", "null", "[]"]) assert.equal(inquiry.parsePendingInquiry(raw), null);
});

test("Contact URLs carry only a service identifier, never inquiry or personal details", () => {
  for (const service of serviceKinds) {
    const url = new URL(inquiry.contactInquiryPath(service), "https://easyfarebooking.com");
    assert.equal(url.pathname, "/contact");
    assert.equal(url.searchParams.size, 1);
    assert.equal(url.searchParams.get("service"), service);
    assert.equal(inquiry.serviceFromQuery(url.search), service);
  }
  assert.equal(inquiry.serviceFromQuery("?service=unknown&email=secret@example.test"), "");
});

test("Contact review validates details and prepares an encoded email draft", () => {
  const values = { name: valid.name, email: valid.email, phone: valid.phone, subject: "Cruise Planning Inquiry", message: "Destination: Alaska\nDates: flexible & request only" };
  assert.equal(Object.keys(inquiry.validateContact(values)).length, 0);
  assert.ok(inquiry.validateContact({ ...values, email: "invalid" }).email);
  assert.ok(inquiry.validateContact({ ...values, message: " " }).message);
  assert.ok(inquiry.validateContact({ ...values, subject: "Header\nInjection" }).subject);
  const draft = new URL(inquiry.emailDraftLink(values, "contact@example.test"));
  assert.equal(draft.protocol, "mailto:");
  assert.equal(draft.searchParams.get("subject"), "Travel inquiry: Cruise Planning Inquiry");
  assert.ok(draft.searchParams.get("body").includes(values.message));
  const html = renderToStaticMarkup(React.createElement(ContactForm));
  assert.ok(html.includes("Review Email Draft"));
  assert.ok(html.includes("No request is submitted automatically"));
  for (const field of ["name", "email", "phone", "subject", "message"]) assert.ok(html.includes(`for="contact-${field}"`));
});

test("desktop and mobile navigation both include all service links", () => {
  const Header = load("components/Header.tsx").default;
  const html = renderToStaticMarkup(React.createElement(Header));
  const desktop = html.split('id="desktop-travel-menu"')[1].split("</nav>")[0];
  const mobile = html.split('id="mobile-navigation"')[1];
  for (const service of serviceKinds) {
    assert.ok(desktop.includes(`href="/${service}"`));
    assert.ok(mobile.includes(`href="/${service}"`));
  }
  assert.ok(html.includes('aria-label="Close navigation"'));
});

test("service metadata and existing sitemap use unique configured canonicals", () => {
  const urls = sitemap().map((item) => item.url);
  const titles = new Set();
  for (const service of serviceKinds) {
    const metadata = serviceMetadata(service);
    titles.add(metadata.title.absolute);
    assert.equal(metadata.title.absolute, `${services[service].seoTitle} | EasyFareBooking`);
    assert.equal(metadata.alternates.canonical, `/${service}`);
    assert.equal(metadata.description, services[service].seoDescription);
    assert.equal(metadata.openGraph.images[0].url, "/newlogo.png");
    assert.ok(urls.includes(`https://easyfarebooking.com/${service}`));
  }
  assert.equal(titles.size, 3);
});
