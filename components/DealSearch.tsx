import Link from "next/link";
import BookingWidget from "@/components/BookingWidget";

type Props = { fromCode?: string; toCode?: string; tripType?: "oneway" | "roundtrip"; cabin?: string };

export default function DealSearch({ fromCode, toCode, tripType, cabin }: Props) {
  return (
    <div id="flight-search" className="scroll-mt-24">
      <BookingWidget defaultOriginCode={fromCode} defaultDestinationCode={toCode} defaultTripType={tripType} defaultCabin={cabin} />
      <p className="mt-4 text-xs leading-6 text-gray-500">Planning guides, not verified promotions. Current flight results are a demo; no live prices or seats are being checked. <Link href="/contact" className="font-bold text-primary underline">Contact EasyFareBooking for real itinerary assistance.</Link></p>
    </div>
  );
}
