import { dealMetadata } from "@/utils/deal-seo";
import { getDealCategory } from "@/data/deals";
import DomesticFlightDeals from "@/site-pages/DomesticFlightDeals";

export const metadata = dealMetadata(getDealCategory("cheap-domestic-flights")!);
export default DomesticFlightDeals;
