    # Destination guides

The local Next.js App Router renders 28 destination guides at
`/cheap-flights-to-<slug>`. Existing static routes retain precedence over
`app/[destination]/page.tsx`. Only configured destinations are generated;
unrecognized root segments return 404.

## Add a destination

Add one object to `entries` in `data/destinations.ts`. Supply a unique slug,
city, country, original summary and introduction, airports, seasonal guidance,
route starting points, attraction descriptions, travel tips and flight tips.
Airport entries require an IATA code that exists in `data/airports.json` and an
official source URL. The first airport is the default selection. A regional
code such as NYC is not used as an airport selection.

The normalized destination object supplies titles, unique descriptions, five
FAQs, canonical paths, related cards and sitemap entries automatically. The
shared template reads these fields; no additional React page is necessary.

`DestinationFlightSearch` reuses `BookingWidget`. Optional
`defaultDestinationCode`, `defaultOriginCode` and `originSelection` props support
prefilling without resetting dates, travellers or cabin when a route is selected.
Existing `initialValues` remain supported. Search validation, autocomplete and
the `/flights/search` redirect use the existing flight-search utilities.

## SEO and content

The production origin is the existing `https://easyfarebooking.com`, centralized
as `siteUrl` in `metadata.ts`. Destination pages have unique titles, descriptions,
canonicals, Open Graph and Twitter metadata. BreadcrumbList and FAQPage JSON-LD
are generated from the content presented on each guide. Script serialization
escapes `<`. Structured data does not guarantee a search-engine rich result.

The sitemap includes public destination guides and existing public pages; demo
flight-result URLs are excluded. The results route retains its existing noindex
metadata. Robots advertises the sitemap and allows crawling.

Airport sources are linked in each guide. Official airport and tourism sites
were consulted for airport identities and destination context. The requested
EasyTripsNow reference pages were unavailable to the browsing tool; no wording
or assets were copied. Original seasonal advice is general, not a prediction of
weather, fares, airline service or availability. Route suggestions do not assert
direct flights. PBI is presented by code and region because its official site's
current naming differs from the local airport dataset; verify naming during
future content maintenance.

Search results remain an explicitly labeled demo. A provider API and server-side
integration are required for real prices, schedules, availability and booking.
The subsequent Deals rebuild replaces the old fare-card implementation with
informational category and route cards. See `docs/deals.md` for the current deal
architecture, preserved URLs and search integration.

## Verification

```text
npm run lint
npm run typecheck
node --test tests/flight-search.test.cjs tests/destinations.test.cjs
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
node tests/destinations.smoke.cjs http://127.0.0.1:3100
```

The regression suite checks all 28 destinations, airport codes, unique content,
metadata, sitemap coverage, structured data, server rendering and prefilled
widgets, related cards, unknown paths and the existing flight-search validation.
The HTTP smoke checks the built application, direct URLs and refreshes, directory
links, canonical tags, schema, 404 behavior and the existing results route.

## File inventory for this destination change

Created:

- `data/destinations.ts`
- `app/[destination]/page.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `components/DestinationPage.tsx`
- `components/DestinationCard.tsx`
- `components/DestinationFlightSearch.tsx`
- `utils/destination-seo.ts`
- `tests/destinations.test.cjs`
- `tests/destinations.smoke.cjs`
- `docs/destinations.md`

Modified:

- `app/layout.tsx` — reuse the existing production origin from metadata config.
- `metadata.ts` — expose that origin for canonical/schema/sitemap consistency.
- `components/BookingWidget.tsx` — optional airport prefill props.
- `components/FlightDeals.tsx` — whole-card destination links.
- `site-pages/Destinations.tsx` — centralized, clickable destination cards.
- `site-pages/BusinessClassFlightDeals.tsx`
- `site-pages/FirstClassFlightDeals.tsx`
- `site-pages/LastMinuteFlightDeals.tsx`
- `site-pages/DomesticFlightDeals.tsx`
- `site-pages/InternationalFlightDeals.tsx`

The five deal pages now link their existing destination chips directly to guides.
Other pre-existing working-tree changes were preserved.

## Generated URLs

- `/cheap-flights-to-new-york`
- `/cheap-flights-to-los-angeles`
- `/cheap-flights-to-san-francisco`
- `/cheap-flights-to-orlando`
- `/cheap-flights-to-london`
- `/cheap-flights-to-paris`
- `/cheap-flights-to-tokyo`
- `/cheap-flights-to-hong-kong`
- `/cheap-flights-to-boston`
- `/cheap-flights-to-dubai`
- `/cheap-flights-to-singapore`
- `/cheap-flights-to-toronto`
- `/cheap-flights-to-frankfurt`
- `/cheap-flights-to-sydney`
- `/cheap-flights-to-miami`
- `/cheap-flights-to-las-vegas`
- `/cheap-flights-to-chicago`
- `/cheap-flights-to-seattle`
- `/cheap-flights-to-dallas`
- `/cheap-flights-to-atlanta`
- `/cheap-flights-to-bangkok`
- `/cheap-flights-to-amsterdam`
- `/cheap-flights-to-west-palm-beach`
- `/cheap-flights-to-san-diego`
- `/cheap-flights-to-appleton`
- `/cheap-flights-to-sarasota`
- `/cheap-flights-to-new-jersey`
- `/cheap-flights-to-portland`

New Jersey is explicitly described as a regional/state destination. Portland is
explicitly Portland, Oregon, using PDX.

## Verification limitations

No connected browser was available during this session. Automated rendering and
production HTTP checks do not establish visual QA or full interactive browser
coverage on desktop, tablet or mobile. Responsive layouts use the existing
Tailwind breakpoints, but those viewports still need a visual review.
