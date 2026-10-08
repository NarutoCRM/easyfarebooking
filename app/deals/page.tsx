import { dealMetadata, dealsDirectoryMetadata } from "@/utils/deal-seo";
import Deals from "@/site-pages/Deals";

export const metadata = dealMetadata(dealsDirectoryMetadata);

export default Deals;
