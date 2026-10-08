import { dealMetadata } from "@/utils/deal-seo";
import { getDealCategory } from "@/data/deals";
import LastMinuteFlightDeals from "@/site-pages/LastMinuteFlightDeals";

export const metadata = dealMetadata(getDealCategory("last-minute-flights")!);
export default LastMinuteFlightDeals;
