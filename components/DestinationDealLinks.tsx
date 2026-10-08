import Link from "next/link";
import { destinationDealLinks, getDealCategory } from "@/data/deals";
import RouteDealCard from "@/components/RouteDealCard";

export default function DestinationDealLinks({ city, country }: { city: string; country: string }) {
  const routes = destinationDealLinks(city);
  const category = getDealCategory(country === "United States" ? "cheap-domestic-flights" : "cheap-international-flights")!;
  return <section className="section-padding bg-slate-50"><div className="container-main">
    <h2 className="text-3xl font-black text-dark">Flight Planning for {city}</h2>
    <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600">Explore relevant city-pair guides or <Link href={category.path} className="font-bold text-primary underline">{country === "United States" ? "U.S. flight planning options" : "international flight planning options"}</Link>. These are informational resources, not verified promotions.</p>
    {routes.length > 0 && <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{routes.map((route) => <RouteDealCard key={route.slug} route={route} />)}</div>}
  </div></section>;
}
