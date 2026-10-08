import DealPage from "@/components/DealPage";
import { getDealCategory } from "@/data/deals";

export default function DomesticFlightDeals() {
  return <DealPage deal={getDealCategory("cheap-domestic-flights")!} />;
}
