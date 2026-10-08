import Link from "next/link";
import { ArrowRight, Plane } from "lucide-react";
import type { RouteDeal } from "@/data/deals";

export default function RouteDealCard({ route }: { route: RouteDeal }) {
  return (
    <Link href={route.path} className="group flex h-full min-w-0 flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transform-none">
      <div className="flex items-center justify-between gap-3"><span className="text-[10px] font-bold uppercase tracking-widest text-primary">{route.kind === "domestic" ? "U.S. city pair" : "International city pair"}</span><Plane aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" /></div>
      <h3 className="mt-4 text-lg font-black text-dark">{route.fromCity} to {route.toCity}</h3>
      <div className="mt-4 flex items-center gap-3 text-sm font-bold text-dark"><span className="rounded-lg bg-light-blue px-3 py-2">{route.fromCode}</span><ArrowRight aria-hidden="true" className="h-4 w-4 text-primary" /><span className="rounded-lg bg-light-blue px-3 py-2">{route.toCode}</span></div>
      <p className="mt-4 flex-1 text-sm leading-6 text-gray-600">{route.summary}</p>
      <span className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-4 text-sm font-bold text-primary">Search flights on this route<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" /></span>
    </Link>
  );
}
