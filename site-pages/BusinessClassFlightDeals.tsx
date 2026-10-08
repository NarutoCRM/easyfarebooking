import DealPage from "@/components/DealPage";
import { getDealCategory } from "@/data/deals";

export default function BusinessClassFlightDeals() {
  return <DealPage deal={getDealCategory("business-class-flights")!} />;
}
