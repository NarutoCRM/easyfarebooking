"use client";

import { useMemo, useState, useEffect, useId, useRef } from "react";
import { useRouter } from "next/navigation";
import { airports, findAirport, type Airport } from "@/utils/airports";
import { validateFlightSearch, flightSearchParams, type FlightSearchValues } from "@/utils/flight-search";
import { parseSearchDraft, searchDraftKey } from "@/utils/search-draft";
export type { FlightSearchValues } from "@/utils/flight-search";

function AirportSearch({
  label,
  value,
  onChange,
  placeholder,
  icon = "✈",
}: { label: string; value: Airport | null; onChange: (airport: Airport | null) => void; placeholder: string; icon?: string }) {
  const inputId = useId();
  const [query, setQuery] = useState(
    value ? `${value.city} (${value.code})` : ""
  );
  const [open, setOpen] = useState(false);


  const filteredAirports = useMemo(() => {
    if (!query.trim()) return airports.slice(0, 8);

    const search = query.toLowerCase();

    return airports
      .filter((airport) => {
        return (
          airport.code.toLowerCase().includes(search) ||
          airport.city.toLowerCase().includes(search) ||
          airport.name.toLowerCase().includes(search) ||
          airport.country.toLowerCase().includes(search)
        );
      })
      .slice(0, 8);
  }, [query, airports]);

  const selectAirport = (airport: Airport) => {
    onChange(airport);
    setQuery(`${airport.city || airport.name} (${airport.code})`);
    setOpen(false);
  };

  return (
    <div className="relative min-w-0">
      <label htmlFor={inputId} className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </label>

      <div
        className={`flex h-[62px] items-center gap-3 rounded-xl border bg-white px-4 transition-all ${
          open
            ? "border-primary ring-4 ring-primary/10"
            : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-lg text-primary">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <input
            id={inputId}
            aria-expanded={open}
            aria-controls={`${inputId}-suggestions`}
            onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}
            value={value ? `${value.city || value.name} (${value.code})` : query}
            onChange={(e) => {
              onChange(null);
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => { setQuery(""); setOpen(true); }}
            placeholder={placeholder}
            autoComplete="off"
            className="w-full bg-transparent text-[15px] font-semibold text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400"
          />

          {value?.name && (
            <p className="mt-0.5 truncate text-[10px] text-slate-400">
              {value.name}
            </p>
          )}
        </div>

        {value?.code && (
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-black text-slate-700">
            {value.code}
          </span>
        )}
      </div>

      {/* Airport Dropdown */}
      {open && (
        <>
          <button
            type="button"
            aria-label="Close airport search"
            className="fixed inset-0 z-30 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div id={`${inputId}-suggestions`} className="absolute left-0 right-0 top-[92px] z-40 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl">
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="text-xs font-bold text-slate-400">
                SUGGESTED AIRPORTS
              </p>
            </div>

            <div className="max-h-[330px] overflow-y-auto p-2">
              {filteredAirports.length > 0 ? (
                filteredAirports.map((airport, index) => (
                  <button
                    key={`${airport.code}-${index}`}
                    type="button"
                    onClick={() => selectAirport(airport)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm">
                      ✈
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-bold text-slate-800">
                          {airport.city || airport.name}
                        </p>

                        <span className="text-xs font-black text-primary">
                          {airport.code}
                        </span>
                      </div>

                      <p className="mt-0.5 truncate text-xs text-slate-400">
                        {airport.name}
                        {airport.country ? ` • ${airport.country}` : ""}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <div className="mb-2 text-2xl">🔎</div>
                  <p className="text-sm font-semibold text-slate-700">
                    No airport found
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Try city, airport name or IATA code
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

type BookingWidgetProps = {
  initialValues?: FlightSearchValues;
  defaultDestinationCode?: string;
  defaultOriginCode?: string;
  originSelection?: number;
  defaultTripType?: "oneway" | "roundtrip";
  defaultCabin?: string;
};

export default function BookingWidget({ initialValues, defaultDestinationCode, defaultOriginCode, originSelection, defaultTripType, defaultCabin }: BookingWidgetProps) {
  const router = useRouter();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const [error, setError] = useState("");
  const [tripType, setTripType] = useState(initialValues?.tripType ?? defaultTripType ?? "roundtrip");

  const [from, setFrom] = useState<Airport | null>(initialValues?.from ?? findAirport(defaultOriginCode ?? "") ?? null);
  const [to, setTo] = useState<Airport | null>(initialValues?.to ?? findAirport(defaultDestinationCode ?? "") ?? null);
  useEffect(() => {
    if (!initialValues && defaultOriginCode) {
      setFrom(findAirport(defaultOriginCode) ?? null);
      if (defaultDestinationCode) setTo(findAirport(defaultDestinationCode) ?? null);
    }
  }, [defaultOriginCode, originSelection, defaultDestinationCode, initialValues]);

  const [departure, setDeparture] = useState(initialValues?.departure ?? "");
  const [returnDate, setReturnDate] = useState(initialValues?.returnDate ?? "");

  const [travellers, setTravellers] = useState(initialValues?.travellers ?? 1);
  const [cabin, setCabin] = useState(initialValues?.cabin ?? defaultCabin ?? "Economy");
  const [draftReady, setDraftReady] = useState(false);
  // Explicit results-page values take precedence. A page's airport or trip-type
  // defaults never clear dates, traveller counts or a cabin chosen by the user.
  useEffect(() => {
    if (!initialValues) {
      if (defaultTripType) setTripType(defaultTripType);
      try {
        const draft = parseSearchDraft(sessionStorage.getItem(searchDraftKey));
        if (draft) {
          setDeparture(draft.departure);
          setReturnDate(draft.returnDate);
          setTravellers(draft.travellers);
          setCabin(draft.cabin);
          if (draft.tripType && !defaultTripType) setTripType(draft.tripType);
        }
      } catch { /* Search still works when browser storage is unavailable. */ }
    }
    setDraftReady(true);
  }, [initialValues, defaultTripType]);
  useEffect(() => {
    if (!draftReady) return;
    try { sessionStorage.setItem(searchDraftKey, JSON.stringify({ departure, returnDate, travellers, cabin, tripType })); }
    catch { /* Storage is optional; validation and navigation remain available. */ }
  }, [draftReady, departure, returnDate, travellers, cabin, tripType]);

  const [travellerOpen, setTravellerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const swapAirports = () => {
    const currentFrom = from;
    setFrom(to);
    setTo(currentFrom);
  };

  const handleSearch = () => {
    if (loading) return;
    setError("");
    const values = { from, to, departure, returnDate, tripType, travellers, cabin };
    const validationError = validateFlightSearch(values);
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);

    const params = flightSearchParams(values);

    timer.current = setTimeout(() => {
      router.push(`/flights/search?${params.toString()}`);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="w-full rounded-[26px] border border-white/60 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.16)] sm:p-6">
      {/* Top */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-9 items-center justify-center rounded-xl bg-primary text-white">
              ✈
            </div>

            <div>
              <p className="text-lg font-black text-slate-900">
                Search Flights
              </p>
              <p className="text-xs text-slate-400">
                Find the perfect flight for your journey
              </p>
            </div>
          </div>
        </div>

        {/* Trip Type */}
        <div className="flex w-fit rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setTripType("roundtrip")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
              tripType === "roundtrip"
                ? "bg-white text-primary shadow-sm"
                : "text-slate-500"
            }`}
          >
            Round Trip
          </button>

          <button
            type="button"
            onClick={() => {
              setTripType("oneway");
              setReturnDate("");
            }}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
              tripType === "oneway"
                ? "bg-white text-primary shadow-sm"
                : "text-slate-500"
            }`}
          >
            One Way
          </button>
        </div>
      </div>

      {/* From + To */}
      <div className="relative mt-4 grid gap-3 md:grid-cols-2">
        <AirportSearch
          label="From"
          value={from}
          onChange={setFrom}
          placeholder="City or airport"
          icon="↗"
        />

        {/* Swap */}
        <button
          type="button"
          onClick={swapAirports}
          className="absolute left-1/2 top-[53px] z-20 hidden h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-primary text-sm font-bold text-white shadow-md transition hover:scale-110 hover:bg-dark md:flex"
          title="Swap airports"
          aria-label="Swap airports"
        >
          ⇄
        </button>

        <AirportSearch
          label="To"
          value={to}
          onChange={setTo}
          placeholder="Where are you going?"
          icon="↘"
        />
      </div>

      {/* Dates / Travellers */}
      <div
        className={`mt-4 grid gap-3 ${
          tripType === "roundtrip"
            ? "md:grid-cols-3"
            : "md:grid-cols-2"
        }`}
      >
        {/* Departure */}
        <div>
          <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Departure
          </label>

          <div className="flex h-[62px] items-center gap-3 rounded-xl border border-slate-200 px-4 transition hover:border-slate-300">
            <span className="text-lg text-primary">▣</span>

            <input
              type="date"
              aria-label="Departure date"
              value={departure}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setDeparture(e.target.value);

                if (
                  returnDate &&
                  new Date(returnDate) < new Date(e.target.value)
                ) {
                  setReturnDate("");
                }
              }}
              className="min-w-0 w-full bg-transparent text-sm font-semibold text-slate-700 outline-none"
            />
          </div>
        </div>

        {/* Return */}
        {tripType === "roundtrip" && (
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Return
            </label>

            <div className="flex h-[62px] items-center gap-3 rounded-xl border border-slate-200 px-4 transition hover:border-slate-300">
              <span className="text-lg text-primary">▣</span>

              <input
                type="date"
                aria-label="Return date"
                value={returnDate}
                min={
                  departure ||
                  new Date().toISOString().split("T")[0]
                }
                onChange={(e) => setReturnDate(e.target.value)}
                className="min-w-0 w-full bg-transparent text-sm font-semibold text-slate-700 outline-none"
              />
            </div>
          </div>
        )}

        {/* Travellers */}
        <div className="relative">
          <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Travellers & Cabin
          </label>

          <button
            type="button"
            onClick={() => setTravellerOpen(!travellerOpen)}
            className="flex h-[62px] w-full items-center gap-3 rounded-xl border border-slate-200 px-4 text-left transition hover:border-slate-300"
          >
            <span className="text-lg text-primary">♙</span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-800">
                {travellers} {travellers === 1 ? "Traveller" : "Travellers"}
              </p>

              <p className="text-[11px] text-slate-400">{cabin}</p>
            </div>

            <span className="text-xs text-slate-400">▼</span>
          </button>

          {travellerOpen && (
            <div className="absolute right-0 top-[92px] z-50 w-full rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl">
              <p className="mb-4 text-xs font-black uppercase tracking-wider text-slate-400">
                Travellers
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Passengers
                  </p>
                  <p className="text-xs text-slate-400">
                    Age 12+
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Remove traveller"
                    onClick={() =>
                      setTravellers(Math.max(1, travellers - 1))
                    }
                    className="h-8 w-8 rounded-full border border-slate-200 font-bold"
                  >
                    −
                  </button>

                  <span className="w-4 text-center text-sm font-black">
                    {travellers}
                  </span>

                  <button
                    type="button"
                    aria-label="Add traveller"
                    onClick={() =>
                      setTravellers(Math.min(9, travellers + 1))
                    }
                    className="h-8 w-8 rounded-full bg-primary font-bold text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="my-4 h-px bg-slate-100" />

              <label className="mb-2 block text-xs font-bold text-slate-500">
                Cabin Class
              </label>

              <select
                aria-label="Cabin class"
                value={cabin}
                onChange={(e) => setCabin(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-primary"
              >
                <option>Economy</option>
                <option>Premium Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </select>

              <button
                type="button"
                onClick={() => setTravellerOpen(false)}
                className="mt-4 w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white"
              >
                DONE
              </button>
            </div>
          )}
        </div>
      </div>

      {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {/* Bottom */}
      <div className="mt-1 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-400">
          
        </p>

        <button
          type="button"
          disabled={loading}
          onClick={handleSearch}
          className="group flex min-h-[52px] min-w-[190px] items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-black text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-dark disabled:cursor-wait disabled:opacity-80"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Finding flights...
            </>
          ) : (
            <>
              Search Flights
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
