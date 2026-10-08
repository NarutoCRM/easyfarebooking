import FlightDeals from "../components/FlightDeals";
import Link from "next/link";
import { Plane, ArrowRight } from "lucide-react";
import DealSearch from "@/components/DealSearch";
import DealCTA from "@/components/DealCTA";
import FlightPlanningTips from "@/components/FlightPlanningTips";
import FAQAccordion from "@/components/FAQAccordion";
import { dealsFaq } from "@/data/deals";
import { dealBreadcrumbs } from "@/utils/deal-seo";
import { serializeStructuredData } from "@/utils/destination-seo";

function Deals() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(dealBreadcrumbs()) }} />
      <section className="relative bg-dark py-12 text-white sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-white/5" />
        <div className="container-main relative">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-white/70"><Link href="/" className="hover:underline">Home</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">Deals</span></nav>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
            easyfarebooking Deals
          </p>

          <h1 className="mt-3 text-4xl font-black text-white md:text-5xl">
            Explore Flight Deals & Travel Offers
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Discover flight routes, explore popular travel options, and find the right journey for your next adventure.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4"><a href="#flight-search" className="inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3 text-sm font-bold transition hover:bg-white hover:text-dark">Start a flight search<ArrowRight aria-hidden="true" className="h-4 w-4" /></a><span className="inline-flex items-center gap-2 text-xs text-white/70"><Plane aria-hidden="true" className="h-4 w-4" />Planning resources · no live fare claims</span></div>
        </div>
      </section>
      <section className="section-padding bg-slate-50"><div className="container-main"><h2 className="mb-6 text-2xl font-black text-dark">Where would you like to go?</h2><DealSearch /></div></section>
      <FlightDeals />
      <section className="section-padding bg-slate-50"><div className="container-main"><h2 className="mb-7 text-3xl font-black text-dark">Travel Planning Tips</h2><FlightPlanningTips /></div></section>
      <section className="section-padding"><div className="container-main max-w-4xl"><h2 className="mb-8 text-center text-3xl font-black text-dark">Frequently Asked Questions</h2><div className="space-y-3"><FAQAccordion faqs={dealsFaq} /></div></div></section>
      <DealCTA />
    </div>
  );
}

export default Deals;
