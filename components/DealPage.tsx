import Link from "next/link";
import { ArrowRight, Compass, Check, Plane } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import DealCard from "@/components/DealCard";
import RouteDealCard from "@/components/RouteDealCard";
import DealSearch from "@/components/DealSearch";
import DealCTA from "@/components/DealCTA";
import FlightPlanningTips from "@/components/FlightPlanningTips";
import { categoryRoutes, relatedCategories, routeDeals, dealCategories, type DealCategory, type RouteDeal } from "@/data/deals";
import { destinationPath, getDestinationByCity } from "@/data/destinations";
import { findAirport } from "@/utils/airports";
import { dealBreadcrumbs } from "@/utils/deal-seo";
import { serializeStructuredData } from "@/utils/destination-seo";

export default function DealPage({ deal }: { deal: DealCategory | RouteDeal }) {
  const category = "id" in deal ? deal : null;
  const route = "fromCode" in deal ? deal : null;
  const routes = category ? categoryRoutes(category) : routeDeals.filter((item) => item.slug !== route!.slug && (item.fromCity === route!.fromCity || item.toCity === route!.toCity)).slice(0, 4);
  const related = category ? relatedCategories(category) : dealCategories.filter((item) => [route!.kind === "domestic" ? "cheap-domestic-flights" : "cheap-international-flights", "round-trip-flights", "one-way-flights", "last-minute-flights"].includes(item.id));
  const cities = route ? [route.fromCity, route.toCity] : [...new Set(routes.flatMap((item) => [item.toCity, item.fromCity]))].slice(0, 6);
  const guides = cities.map(getDestinationByCity).filter((item) => item !== undefined);
  const from = route ? findAirport(route.fromCode) : null;
  const to = route ? findAirport(route.toCode) : null;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(dealBreadcrumbs(deal)) }} />
    <section className="relative bg-dark text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-white/5" />
      <div className="container-main relative py-10 sm:py-16">
        <nav aria-label="Breadcrumb"><ol className="flex flex-wrap gap-2 text-xs text-white/75"><li><Link href="/" className="hover:underline">Home</Link></li><li aria-hidden="true">/</li><li><Link href="/deals" className="hover:underline">Deals</Link></li><li aria-hidden="true">/</li><li aria-current="page">{deal.title}</li></ol></nav>
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">{category?.eyebrow ?? `${route!.kind} route guide`}</p><h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">{deal.title}</h1><p className="mt-5 max-w-3xl text-base leading-8 text-white/80">{deal.introduction}</p><a href="#flight-search" className="mt-7 inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3 text-sm font-bold transition hover:bg-white hover:text-dark">Search Flights<ArrowRight aria-hidden="true" className="h-4 w-4" /></a></div>
          <div className="rounded-3xl border border-white/20 bg-white/5 p-6"><Compass aria-hidden="true" className="h-9 w-9 text-white/70" /><p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/65">A clearer starting point</p><p className="mt-3 text-base leading-7 text-white/85">{deal.summary}</p>{route && <div className="mt-5 flex flex-wrap items-center gap-3 text-lg font-black"><span className="rounded-lg bg-white/10 px-3 py-2">{route.fromCode}</span><ArrowRight aria-hidden="true" className="h-5 w-5" /><span className="rounded-lg bg-white/10 px-3 py-2">{route.toCode}</span></div>}<p className="mt-5 border-t border-white/15 pt-4 text-xs leading-6 text-white/70">Informational planning guide. No verified promotion, airline availability or live price is advertised.</p></div>
        </div>
      </div>
    </section>
    <section className="section-padding bg-slate-50"><div className="container-main"><h2 className="mb-6 text-2xl font-black text-dark">{route ? `Prepare your ${route.fromCode} → ${route.toCode} search` : "Start with your travel plans"}</h2><DealSearch fromCode={route?.fromCode} toCode={route?.toCode} tripType={category?.defaultTripType} cabin={category?.defaultCabin} /></div></section>
    <section className="section-padding"><div className="container-main">
      <p className="text-xs font-bold uppercase tracking-widest text-primary">The details that matter</p><h2 className="mt-2 text-3xl font-black text-dark">{route ? "Route Overview" : "Deal Overview"}</h2>
      {category ? <><p className="mt-5 max-w-3xl text-base leading-8 text-gray-600">{category.overview}</p><p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-dark">{category.audience}</p><div className="mt-7 grid gap-5 md:grid-cols-3">{category.considerations.map((item) => <article key={item.title} className="rounded-2xl border border-gray-200 p-6"><Check aria-hidden="true" className="h-5 w-5 text-primary" /><h3 className="mt-4 font-bold text-dark">{item.title}</h3><p className="mt-3 text-sm leading-7 text-gray-600">{item.text}</p></article>)}</div></> : <>
        <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600">This guide is a starting point for {route!.fromCity} to {route!.toCity} visits, work journeys or onward travel. The city pair is informational: direct service, flight times and cabins must be checked against a real provider's itinerary.</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2">{[{ airport: from, city: route!.fromCity, code: route!.fromCode, label: "Departure" }, { airport: to, city: route!.toCity, code: route!.toCode, label: "Arrival" }].map((item) => <article key={item.label} className="rounded-2xl border border-gray-200 p-6"><p className="text-xs font-bold uppercase tracking-widest text-primary">{item.label}</p><h3 className="mt-3 text-xl font-black text-dark">{item.city} · {item.code}</h3><p className="mt-2 text-sm text-gray-600">{item.airport?.name}</p><p className="mt-4 text-sm leading-7 text-gray-600">Review the actual terminal and onward transport for your itinerary before arranging a pickup or a timed activity.</p></article>)}</div>
        <ul className="mt-6 space-y-3">{route!.planningNotes.map((note) => <li key={note} className="flex items-start gap-3 text-sm leading-7 text-gray-600"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary" />{note}</li>)}</ul>
      </>}
    </div></section>
    <section className="section-padding bg-light-blue"><div className="container-main"><h2 className="text-3xl font-black text-dark">{category ? "Popular Routes to Explore" : "More Routes to Consider"}</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600">Open a route guide to prefill both airports. Listings do not establish direct service or live availability; dates, travellers and cabin choices are kept within your browser session.</p><div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{routes.map((item) => <RouteDealCard key={item.slug} route={item} />)}</div></div></section>
    {guides.length > 0 && <section className="section-padding"><div className="container-main"><h2 className="text-3xl font-black text-dark">Plan the Visit as Well as the Flight</h2><p className="mt-4 text-sm leading-7 text-gray-600">Explore local airports, seasons and highlights in the destination guides.</p><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{guides.map((destination) => <Link key={destination.slug} href={destinationPath(destination)} className="group rounded-2xl border border-gray-200 p-5 transition hover:border-primary hover:shadow-md"><h3 className="font-bold text-dark">Explore {destination.city}</h3><p className="mt-3 text-sm leading-6 text-gray-600">{destination.heroDescription}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">Read the destination guide<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div></section>}
    <section className="section-padding bg-slate-50"><div className="container-main"><h2 className="mb-7 text-3xl font-black text-dark">Flight Planning Tips</h2><FlightPlanningTips /></div></section>
    <section className="section-padding"><div className="container-main grid gap-8 lg:grid-cols-[1fr_1.4fr]"><div><Plane aria-hidden="true" className="h-8 w-8 text-primary" /><h2 className="mt-4 text-3xl font-black text-dark">Before a Real Booking</h2><p className="mt-5 text-sm leading-7 text-gray-600">The demo can prepare a search, but it cannot issue a ticket. Verify the full itinerary and exact provider terms before any purchase.</p><Link href="/contact" className="mt-5 inline-flex font-bold text-primary">Discuss your travel plans →</Link></div><div className="space-y-5">
      <article className="rounded-2xl border border-gray-200 p-5"><h3 className="font-bold text-dark">One-way or round-trip</h3><p className="mt-3 text-sm leading-7 text-gray-600">Choose One Way for a single journey, or Round Trip with both dates. A return date is sent only for round trips; this choice does not imply a price advantage.</p></article>
      <article className="rounded-2xl border border-gray-200 p-5"><h3 className="font-bold text-dark">Cabin and inclusions</h3><p className="mt-3 text-sm leading-7 text-gray-600">The widget supports Economy, Premium Economy, Business and First Class. Verify what the actual itinerary offers on every segment; selecting a cabin does not confirm service or amenities.</p></article>
      <article className="rounded-2xl border border-gray-200 p-5"><h3 className="font-bold text-dark">Changes, cancellations and quotes</h3><p className="mt-3 text-sm leading-7 text-gray-600">Read the exact fare and booking-provider conditions, including baggage, before purchase. Any real price or availability must be confirmed by the provider; none is established by these guides.</p><Link href="/cancellation-refund" className="mt-3 inline-block text-sm font-bold text-primary underline">Read our cancellation and refund information</Link></article>
    </div></div></section>
    <section className="section-padding bg-slate-50"><div className="container-main max-w-4xl"><h2 className="mb-8 text-center text-3xl font-black text-dark">Frequently Asked Questions</h2><div className="space-y-3"><FAQAccordion faqs={deal.faq} /></div></div></section>
    <section className="section-padding"><div className="container-main"><h2 className="mb-7 text-3xl font-black text-dark">Related Deals & Planning Guides</h2><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <DealCard key={item.id} deal={item} />)}</div></div></section>
    <DealCTA />
  </>;
}
