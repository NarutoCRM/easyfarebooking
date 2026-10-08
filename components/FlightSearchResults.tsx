"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plane, SlidersHorizontal, ArrowRight } from "lucide-react";
import BookingWidget, { type FlightSearchValues } from "@/components/BookingWidget";
import { findAirport } from "@/utils/airports";

const demoFlights = [
  { id: "EF101", airline: "Example Airways", initials: "EA", departure: "08:10", arrival: "18:40", duration: 630, stops: 0, price: 64500 },
  { id: "EF204", airline: "Demo International", initials: "DI", departure: "14:25", arrival: "04:25", duration: 840, stops: 1, price: 48900 },
  { id: "EF307", airline: "Sample Airlines", initials: "SA", departure: "20:15", arrival: "12:45", duration: 990, stops: 2, price: 42300 },
  { id: "EF408", airline: "Example Airways", initials: "EA", departure: "06:30", arrival: "18:00", duration: 690, stops: 1, price: 55700 },
  { id: "EF509", airline: "Demo International", initials: "DI", departure: "01:45", arrival: "12:45", duration: 660, stops: 0, price: 71200 },
];
const airlines = [...new Set(demoFlights.map((flight) => flight.airline))];
const periods = ["Morning", "Afternoon", "Evening", "Night"];
const money = (price: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);
const dateIsValid = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date)) && new Date(date).toISOString().slice(0, 10) === date;
const formatDate = (date: string) => new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
const period = (time: string) => { const hour = Number(time.slice(0, 2)); return hour >= 6 && hour < 12 ? "Morning" : hour < 18 && hour >= 12 ? "Afternoon" : hour >= 18 && hour < 24 ? "Evening" : "Night"; };

export default function FlightSearchResults() {
  const params = useSearchParams();
  const searchKey = params.toString();
  const values: FlightSearchValues = {
    from: findAirport(params.get("from") ?? "") ?? null,
    to: findAirport(params.get("to") ?? "") ?? null,
    departure: params.get("departure") ?? "",
    returnDate: params.get("return") ?? "",
    tripType: params.get("tripType") ?? "",
    travellers: Number(params.get("travellers")),
    cabin: params.get("cabin") ?? "",
  };
  const valid = !!values.from && !!values.to && values.from.code !== values.to.code && dateIsValid(values.departure)
    && ["oneway", "roundtrip"].includes(values.tripType)
    && (values.tripType === "oneway" || (dateIsValid(values.returnDate) && values.returnDate >= values.departure))
    && Number.isInteger(values.travellers) && values.travellers >= 1 && values.travellers <= 9
    && ["Economy", "Premium Economy", "Business", "First Class"].includes(values.cabin);
  const [readyKey, setReadyKey] = useState<string | null>(null);
  const [modify, setModify] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [stops, setStops] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(80000);
  const [sort, setSort] = useState("recommended");
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    setModify(false);
    setSelected(null);
    const timer = setTimeout(() => setReadyKey(searchKey), 2000);
    return () => clearTimeout(timer);
  }, [searchKey]);
  const flights = useMemo(() => demoFlights.filter((flight) =>
    (!stops.length || stops.includes(String(flight.stops))) && (!selectedAirlines.length || selectedAirlines.includes(flight.airline))
    && (!times.length || times.includes(period(flight.departure))) && flight.price <= maxPrice
  ).sort((a, b) => sort === "cheapest" ? a.price - b.price : sort === "fastest" ? a.duration - b.duration : a.stops - b.stops || a.duration - b.duration), [stops, selectedAirlines, times, maxPrice, sort]);
  const toggle = (items: string[], value: string) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
  const clearFilters = () => { setStops([]); setSelectedAirlines([]); setTimes([]); setMaxPrice(80000); };
  const checks = (legend: string, options: { label: string; value: string }[], checked: string[], change: (values: string[]) => void) => (
    <fieldset className="border-b border-slate-100 pb-5"><legend className="mb-3 font-bold text-slate-800">{legend}</legend>
      {options.map((option) => <label key={option.value} className="mb-2 flex cursor-pointer items-center gap-3 text-sm text-slate-600"><input type="checkbox" className="h-4 w-4 accent-primary" checked={checked.includes(option.value)} onChange={() => change(toggle(checked, option.value))} />{option.label}</label>)}
    </fieldset>
  );
  if (!valid) return <section className="section-padding"><div className="container-main max-w-3xl"><h1 className="text-2xl font-black text-slate-900">Let’s set up your flight search</h1><p role="alert" className="my-5 text-slate-600">Your search link is incomplete or invalid. Select airports, dates and travellers below.</p><BookingWidget /></div></section>;
  if (readyKey !== searchKey) return <section className="section-padding"><div role="status" aria-live="polite" className="container-main mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-lg"><Plane aria-hidden="true" className="mx-auto mb-6 h-12 w-12 animate-bounce text-primary motion-reduce:animate-none" /><h1 className="text-2xl font-black text-slate-900">Searching for the best flights...</h1><p className="mt-5 text-3xl font-black text-primary">{values.from!.code} → {values.to!.code}</p><p className="mt-2 text-slate-600">{values.from!.city} → {values.to!.city}</p><div className="my-6 h-2 animate-pulse rounded-full bg-primary/20 motion-reduce:animate-none" /><p className="text-sm text-slate-500">Preparing example flights and fares...</p><p className="mt-2 text-xs text-slate-500">Demo preview · no live availability is being checked.</p></div></section>;

  return <section className="section-padding bg-slate-50"><div className="container-main min-w-0">
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">Flight search</p><h1 className="flex items-center gap-3 text-2xl font-black text-slate-900">{values.from!.code}<ArrowRight aria-hidden="true" className="h-5 w-5" />{values.to!.code}</h1><p className="mt-1 text-sm text-slate-500">{values.from!.city} → {values.to!.city}</p></div><button type="button" aria-expanded={modify} onClick={() => setModify(!modify)} className="rounded-xl border border-primary px-5 py-3 text-sm font-bold text-primary">{modify ? "Close search" : "Modify Search"}</button></div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600"><span>{values.tripType === "roundtrip" ? "Round Trip" : "One Way"}</span><span>Departure: {formatDate(values.departure)}</span>{values.tripType === "roundtrip" && <span>Return: {formatDate(values.returnDate)}</span>}<span>{values.travellers} {values.travellers === 1 ? "traveller" : "travellers"}</span><span>{values.cabin}</span></div>
    </div>
    {modify && <div className="mb-6"><BookingWidget key={searchKey} initialValues={values} /></div>}
    <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><strong>Demo results.</strong> Airlines, schedules and fares are illustrative. Prices are per person{values.tripType === "roundtrip" ? " for the example round trip" : " for the example one-way trip"}. Times are illustrative, shown in one reference timezone. No live availability or booking is available.</p>
    <button type="button" aria-expanded={showFilters} aria-controls="flight-filters" onClick={() => setShowFilters(!showFilters)} className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold text-primary lg:hidden"><SlidersHorizontal className="h-4 w-4" aria-hidden="true" />{showFilters ? "Hide filters" : "Filters"}</button>
    <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
      <aside id="flight-filters" aria-label="Flight filters" className={`${showFilters ? "block" : "hidden"} space-y-5 rounded-2xl border border-slate-200 bg-white p-5 lg:block`}>
        <div className="flex items-center justify-between"><h2 className="text-lg font-black">Filters</h2><button type="button" onClick={clearFilters} className="text-xs font-bold text-primary">Reset</button></div>
        {checks("Stops", [{ label: "Non-stop", value: "0" }, { label: "1 Stop", value: "1" }, { label: "2+ Stops", value: "2" }], stops, setStops)}
        {checks("Airlines", airlines.map((airline) => ({ label: airline, value: airline })), selectedAirlines, setSelectedAirlines)}
        <div><label htmlFor="flight-price" className="mb-3 block font-bold text-slate-800">Price Range</label><input id="flight-price" type="range" min={40000} max={80000} step={1000} value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="w-full accent-primary" /><p className="text-sm text-slate-600">Up to {money(maxPrice)}</p></div>
        {checks("Departure Time", periods.map((time) => ({ label: time, value: time })), times, setTimes)}
      </aside>
      <div className="min-w-0"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><p aria-live="polite" className="text-sm text-slate-600">{flights.length} example flights</p><label className="flex items-center gap-2 text-sm text-slate-600">Sort by<select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg border border-slate-200 bg-white p-2 text-slate-800"><option value="recommended">Recommended</option><option value="cheapest">Cheapest</option><option value="fastest">Fastest</option></select></label></div>
        {!flights.length && <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center"><h2 className="text-lg font-bold">No flights match your filters</h2><button type="button" onClick={clearFilters} className="mt-4 font-bold text-primary">Reset filters</button></div>}
        <div className="space-y-4">{flights.map((flight) => <article key={flight.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3"><span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-black text-primary">{flight.initials}</span><div><h2 className="font-bold text-slate-900">{flight.airline}</h2><p className="text-xs text-slate-500">{flight.id} · {values.cabin}</p></div></div>
          <div className="grid items-center gap-5 xl:grid-cols-[1fr_auto]"><div className="grid grid-cols-[1fr_1.2fr_1fr] items-center gap-2"><div><p className="text-xl font-black sm:text-2xl">{flight.departure}</p><p className="text-sm font-bold text-slate-600">{values.from!.code}</p></div><div className="text-center"><p className="text-xs text-slate-500">{Math.floor(flight.duration / 60)}h {flight.duration % 60}m</p><div className="my-2 flex items-center gap-2"><span className="h-px flex-1 bg-slate-200" /><Plane aria-hidden="true" className="h-4 w-4 text-primary" /><span className="h-px flex-1 bg-slate-200" /></div><p className="text-xs font-semibold text-primary">{flight.stops === 0 ? "Non-stop" : `${flight.stops} ${flight.stops === 1 ? "stop" : "stops"}`}</p></div><div className="text-right"><p className="text-xl font-black sm:text-2xl">{flight.arrival}</p><p className="text-sm font-bold text-slate-600">{values.to!.code}</p>{flight.arrival < flight.departure && <p className="text-xs text-slate-500">+1 day</p>}</div></div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4 xl:block xl:border-l xl:border-t-0 xl:pl-5 xl:pt-0 xl:text-right"><div><p className="text-2xl font-black text-slate-900">{money(flight.price)}</p><p className="text-xs text-slate-500">per person · demo fare</p></div><button type="button" onClick={() => setSelected(flight.id)} className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-dark xl:mt-3">Select Flight<span className="sr-only"> {flight.id}</span></button></div></div>
          {selected === flight.id && <div role="status" className="mt-4 rounded-xl bg-primary/5 p-4 text-sm text-slate-700">You selected example flight {flight.id}. Total for {values.travellers} {values.travellers === 1 ? "traveller" : "travellers"}: <strong>{money(flight.price * values.travellers)}</strong>. This is a demo; no reservation has been made. <Link href="/contact" className="font-bold text-primary underline">Contact us for booking assistance.</Link></div>}
        </article>)}</div>
      </div>
    </div>
  </div></section>;
}
