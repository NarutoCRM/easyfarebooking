import { dealMetadata } from "@/utils/deal-seo";
import { getDealCategory } from "@/data/deals";
import BusinessClassFlightDeals from "@/site-pages/BusinessClassFlightDeals";

export const metadata = dealMetadata(getDealCategory("business-class-flights")!);
export default BusinessClassFlightDeals;
