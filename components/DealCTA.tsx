import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DealCTA() {
  return <section className="bg-dark py-12 text-white"><div className="container-main flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
    <div><h2 className="text-2xl font-black sm:text-3xl">Ready to Find Your Next Flight?</h2><p className="mt-3 text-sm leading-6 text-white/80">Start with your route and dates, or <Link href="/contact" className="font-bold underline">ask for travel assistance</Link>.</p></div>
    <a href="#flight-search" className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-primary px-6 py-3 text-sm font-bold transition hover:bg-white hover:text-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Search Flights<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
  </div></section>;
}
