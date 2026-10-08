// node tests/services.smoke.cjs http://127.0.0.1:3100
const assert = require("node:assert/strict");
const base = process.argv[2] || "http://127.0.0.1:3100";
const services = [
  { id: "hotels", heading: "Find Your Perfect Stay, Wherever You Go", title: "Hotels &amp; Accommodation Planning | EasyFareBooking", fields: ["destination", "startDate", "endDate", "travellers", "rooms"] },
  { id: "cruise", heading: "Discover the World, One Voyage at a Time", title: "Cruise Vacations &amp; Travel Planning | EasyFareBooking", fields: ["destination", "startDate", "travellers", "name", "email", "phone"] },
  { id: "car-rental", heading: "Your Journey. Your Car. Your Freedom.", title: "Car Rental &amp; Road Trip Planning | EasyFareBooking", fields: ["destination", "startDate", "endDate", "preference"] },
];
async function get(path) {
  const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(15000) });
  return { status: response.status, html: await response.text() };
}
async function main() {
  const sitemap = await get("/sitemap.xml");
  for (const service of services) {
    const path = `/${service.id}`;
    const page = await get(path);
    assert.equal(page.status, 200, path);
    assert.ok(page.html.includes(service.heading));
    assert.ok(page.html.includes(`<title>${service.title}</title>`), `Title: ${path}`);
    assert.ok(page.html.includes(`<link rel="canonical" href="https://easyfarebooking.com${path}"`));
    assert.equal((page.html.match(/<h1\b/g) || []).length, 1);
    assert.ok(page.html.includes("Continue to Contact"));
    assert.ok(page.html.includes("no live inventory"));
    for (const field of service.fields) assert.ok(page.html.includes(`id="${service.id}-${field}"`), field);
    const visibleMarkup = page.html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    assert.ok(!/[$₹]\s*\d/.test(visibleMarkup));
    assert.ok(sitemap.html.includes(`<loc>https://easyfarebooking.com${path}</loc>`));
    assert.equal((await get(path)).status, 200, `Refresh: ${path}`);
    const contact = await get(`/contact?service=${service.id}`);
    assert.equal(contact.status, 200);
    assert.ok(contact.html.includes("Review Email Draft"));
    assert.ok(contact.html.includes("No request is submitted automatically"));
    assert.ok(contact.html.includes('id="contact-message"'));
  }
  assert.equal((await get("/contact?service=unknown")).status, 200);
  console.log("Services production smoke passed: all three routes and refreshes, exact SEO titles/canonicals, labeled forms, Contact handoff URLs, honest inquiry wording and sitemap entries.");
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
