import Link from "next/link";
import { ArrowUpRight, Plane } from "lucide-react";
import { destinationPath, type Destination } from "@/data/destinations";

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link href={destinationPath(destination)} className="group flex h-full min-w-0 cursor-pointer flex-col rounded-2xl bg-gradient-to-br from-primary to-dark p-6 text-white shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transform-none">
      <div className="flex items-center justify-between"><Plane aria-hidden="true" className="h-8 w-8" /><span className="text-xs font-bold tracking-widest text-white/80">{destination.airportCodes[0]}</span></div>
      <p className="mt-7 text-xs text-white/75">{destination.country}</p>
      <h2 className="mt-1 text-xl font-black">{destination.city}</h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-white/85">{destination.heroDescription}</p>
      <span className="mt-5 flex items-center justify-between gap-2 text-sm font-bold">Explore flights to {destination.city}<ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" /></span>
    </Link>
  );
}
