import { dealMetadata } from "@/utils/deal-seo";
import { getDealCategory } from "@/data/deals";
import InternationalFlightDeals from "@/site-pages/InternationalFlightDeals";

export const metadata = dealMetadata(getDealCategory("cheap-international-flights")!);
export default InternationalFlightDeals;
