import { Suspense } from "react";
import FlightSearchResults from "@/components/FlightSearchResults";

export const metadata = {
  title: "Flight search",
  robots: { index: false, follow: false },
};

export default function FlightSearchPage() {
  return <Suspense fallback={<div role="status" className="section-padding text-center">Preparing your flight search...</div>}><FlightSearchResults /></Suspense>;
}
