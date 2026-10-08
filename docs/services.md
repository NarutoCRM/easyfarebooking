# Travel service pages

The existing `/hotels`, `/cruise` and `/car-rental` URLs now render premium service
planning pages. Their global layout, typography, header design, footer and brand
colors are preserved. `ServiceLandingPage` provides the small shared layout;
`data/services.ts` supplies original service-specific content. Warm hotel,
ocean-blue cruise and clean road-trip themes use original inline SVG illustrations,
with no external photos, hotlinked assets or stock-image licensing assumptions.

## Page features

- Hotels: destination, check-in/out, total guests and room count; four destination
  guide links; luxury, budget, family and business accommodation categories;
  planning benefits, tips and five FAQs.
- Cruise: preferred region, approximate departure, traveller count and contact
  information; Caribbean, Mediterranean, Alaska and Bahamas planning cards;
  family, luxury and romantic travel styles; first-time tips and five FAQs.
- Car rental: pickup location, pickup/return dates and vehicle preference;
  Economy, Sedan, SUV, Luxury and Minivan categories; rental considerations, tips
  and five FAQs. Same-day requests are allowed; users can add actual times on
  Contact.

All three use accessible labels, validation feedback, first-invalid-field focus,
responsive grids, restrained hover effects, inquiry CTAs and the existing contact
telephone number. Vehicle and accommodation categories are preferences, not
allocated inventory. No real prices, promotions or guaranteed inclusions are
shown.

## Inquiry flow

No service or contact submission API was found. The old Contact form was inert;
it is now a reviewable email-draft flow. Nothing is submitted by the website.

1. The service form validates location/region, dates and the relevant counts or
   category. Cruise also validates name, email and optional phone.
2. A request is placed in `sessionStorage` under
   `easyfarebooking:pending-service-inquiry:v1` and Contact opens at
   `/contact?service=hotels`, `/contact?service=cruise` or
   `/contact?service=car-rental`.
3. Only the public service identifier appears in that URL. Contact consumes and
   removes the session record, then prefills the request topic, message and any
   provided contact details. The record has a 30-minute validity window; corrupt,
   mismatched and expired records are discarded on arrival.
4. The user checks or edits the form, adds contact details where needed and selects
   Review Email Draft. The draft is shown on the page; editing invalidates the
   previous review.
5. Open Email Draft prepares a `mailto:` message to the existing company email.
   The user must send it in their own email application. Copy Details is an
   alternative if no mail app is configured. Phone assistance remains available.

There are no fabricated submission-success messages or reservation confirmations.
Contact and service forms make their inquiry-only behavior explicit. Personal
details are not placed in HTTP query parameters, sent to an analytics endpoint,
stored in an account or submitted to a server. The reviewed `mailto:` draft does
contain the details the user chooses to send through their email app.

If browser storage cannot carry a draft, the service form explains the limitation
and offers Contact with the service topic only. The user enters the remaining
details there. If the clipboard is unavailable, the reviewed draft remains
selectable on screen.

This is a one-use handoff, not a persistent inbox or account draft. After Contact
has consumed it, refreshing Contact will not restore that service record.

## Navigation and SEO

The desktop Travel More links retain their paths; Car is labeled Car Rental.
The missing service links were added to mobile navigation, with menu-close
handlers. Menu buttons now have names and expanded/control attributes. The header
layout was not redesigned and the footer was not changed.

Service metadata reuses `createPageMetadata` and the configured production domain.
The exact page titles are:

- Hotels & Accommodation Planning | EasyFareBooking
- Cruise Vacations & Travel Planning | EasyFareBooking
- Car Rental & Road Trip Planning | EasyFareBooking

Each has a unique description, canonical and social metadata using the existing
logo. All three routes were already present in the sitemap and remain included;
no unnecessary sitemap changes were made.

## Files created

- `data/services.ts`
- `components/ServiceLandingPage.tsx`
- `components/ServiceHeroVisual.tsx`
- `components/ServiceInquiryForm.tsx`
- `components/ContactInquiryForm.tsx`
- `utils/service-inquiry.ts`
- `utils/service-seo.ts`
- `tests/services.test.cjs`
- `tests/services.smoke.cjs`
- `docs/services.md`

## Files modified

- `site-pages/Hotels.tsx`
- `site-pages/Cruise.tsx`
- `site-pages/CarRental.tsx`
- `app/hotels/page.tsx`
- `app/cruise/page.tsx`
- `app/car-rental/page.tsx`
- `site-pages/Contact.tsx` — replace only the inert form and update its explanatory
  paragraph; preserve the surrounding contact layout and information.
- `components/Header.tsx` — service links and menu accessibility only.

Flight Search, Deals, Destinations, global styles, footer, package files and their
existing working-tree changes were not modified by this task. No dependency was
added.

## Verification

```text
npm run lint
node --test tests/flight-search.test.cjs tests/destinations.test.cjs tests/deals.test.cjs tests/services.test.cjs
npm run build
npm run typecheck
npm run start -- --hostname 127.0.0.1 --port 3100
node tests/services.smoke.cjs http://127.0.0.1:3100
```

The 11 service tests cover all page content, labeled fields, date/count/contact
validation, request summaries, expiring private drafts, URL privacy, encoded email
drafts, open desktop/mobile navigation and metadata/sitemap consistency. Existing
regression suites are run too. HTTP smoke checks direct access, refresh, exact
titles/canonicals, forms, Contact fallback URLs and inquiry wording.

Browser visual/interaction QA requires a connected browser. Server rendering and
HTTP tests do not establish mobile appearance, focus behavior, browser storage
handoff or external mail-client integration. No email or reservation is sent by
automated tests. A provider or inquiry backend is still needed for server-side
request delivery and any live inventory or confirmed booking flow.

Final results:

- Existing lint setup (Oxlint): passed without warnings.
- TypeScript typecheck: passed, including a standalone run after the build.
- All regression suites: 35 passed, 0 failed (11 new service tests).
- Production build: passed; all three service routes and Contact remained static pages.
- Production HTTP smoke: passed for all three service URLs, refreshes, Contact
  query URLs, exact SEO metadata, labeled fields and sitemap entries.
- Connected-browser visual/interaction QA: unavailable. No browser was connected.

The temporary production server was stopped after verification. No messages,
emails, booking requests or reservations were sent during this work.
