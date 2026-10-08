import DealPage from "@/components/DealPage";
import { getDealCategory } from "@/data/deals";

export default function FirstClassFlightDeals() {
  return <DealPage deal={getDealCategory("first-class-flights")!} />;
}
