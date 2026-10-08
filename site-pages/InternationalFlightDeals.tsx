import DealPage from "@/components/DealPage";
import { getDealCategory } from "@/data/deals";

export default function InternationalFlightDeals() {
  return <DealPage deal={getDealCategory("cheap-international-flights")!} />;
}
