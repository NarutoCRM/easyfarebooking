import { dealMetadata } from "@/utils/deal-seo";
import { getDealCategory } from "@/data/deals";
import FirstClassFlightDeals from "@/site-pages/FirstClassFlightDeals";

export const metadata = dealMetadata(getDealCategory("first-class-flights")!);
export default FirstClassFlightDeals;
