"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import BookingWidget from "@/components/BookingWidget";
import Link from "next/link";

type Props = { city: string; airportCode: string; routes: { city: string; code: string }[] };

export default function DestinationFlightSearch({ city, airportCode, routes }: Props) {
  const [origin, setOrigin] = useState("");
  const [selection, setSelection] = useState(0);
  const selectRoute = (code: string) => {
    setOrigin(code);
    setSelection((value) => value + 1);
    document.getElementById("flight-search")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  };
  return <>
    <div id="flight-search" className="scroll-mt-24">
      <div className="mb-6"><p className="text-xs font-bold uppercase tracking-widest text-primary">Start your journey</p><h2 className="mt-2 text-2xl font-black text-dark sm:text-3xl">Find Flights to {city}</h2><p className="mt-3 text-sm leading-6 text-gray-600">Your destination starts at {airportCode}. Choose an origin and travel dates, or change the airport to fit your plans.</p></div>
      <BookingWidget defaultDestinationCode={airportCode} defaultOriginCode={origin} originSelection={selection} />
      <p className="mt-3 text-xs leading-5 text-gray-500">The current search results are a demo. Live fares and availability are not connected. <Link href="/contact" className="font-semibold text-primary underline">Contact EasyFareBooking for flight assistance.</Link></p>
    </div>
    <div className="mt-12">
      <h2 className="text-2xl font-black text-dark">Popular Routes to {city}</h2>
      <p className="mt-3 text-sm leading-6 text-gray-600">Starting points to explore, not a promise of direct service or availability. Select a route to prefill the search; fares and schedules depend on your dates and provider.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">{routes.map((route) => <button type="button" key={route.code} onClick={() => selectRoute(route.code)} className="group flex min-w-0 items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"><span className="min-w-0"><span className="block text-sm font-bold text-dark">{route.city} → {city}</span><span className="mt-1 block text-xs text-gray-500">{route.code} → {airportCode} · Search flights</span></span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1 motion-reduce:transform-none" /></button>)}</div>
      <p role="status" aria-live="polite" className="mt-3 text-sm text-primary">{origin ? `Search updated: ${origin} → ${airportCode}. Choose your dates above.` : ""}</p>
    </div>
  </>;
}
