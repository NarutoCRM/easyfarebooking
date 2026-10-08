import type { MetadataRoute } from "next";
import { destinations, destinationPath } from "@/data/destinations";
import { siteUrl } from "@/metadata";
import { dealCategories, routeDeals } from "@/data/deals";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/destinations", "/flights", "/hotels", "/car-rental", "/cruise", "/about", "/contact", "/deals", "/domestic-flight-deals", "/international-flight-deals", "/business-class-flight-deals", "/first-class-flight-deals", "/last-minute-flight-deals", "/terms-conditions", "/privacy-policy", "/cookie-policy", "/disclaimer", "/cancellation-refund", "/advertisement-disclosure"];
  return [...new Set([...pages, ...destinations.map(destinationPath), ...dealCategories.map((deal) => deal.path), ...routeDeals.map((route) => route.path)])].map((path) => ({ url: `${siteUrl}${path}` }));
}
