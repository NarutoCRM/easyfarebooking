import DealPage from "@/components/DealPage";
import { getDealCategory } from "@/data/deals";

export default function LastMinuteFlightDeals() {
  return <DealPage deal={getDealCategory("last-minute-flights")!} />;
}
