import { createPageMetadata, siteUrl } from "@/metadata";
import type { DealCategory, RouteDeal } from "@/data/deals";

export function dealMetadata(deal: Pick<DealCategory, "seoTitle" | "seoDescription" | "path">) {
  const title = `${deal.seoTitle} | EasyFareBooking`;
  const metadata = createPageMetadata(deal.seoTitle, deal.seoDescription, deal.path);
  return { ...metadata, title: { absolute: title },
    openGraph: { ...metadata.openGraph, title, siteName: "EasyFareBooking", images: [{ url: "/newlogo.png", alt: "EasyFareBooking travel logo" }] },
    twitter: { ...metadata.twitter, title, images: ["/newlogo.png"] },
  };
}

export const dealsDirectoryMetadata = { path: "/deals", seoTitle: "Flight Deals, Routes & Travel Planning", seoDescription: "Explore EasyFareBooking flight planning guides, domestic and international routes, cabin choices and trip types. No unverified discounts or live fares." };

export function dealBreadcrumbs(deal?: DealCategory | RouteDeal) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Deals", item: `${siteUrl}/deals` },
    ...(deal ? [{ "@type": "ListItem", position: 3, name: deal.title, item: `${siteUrl}${deal.path}` }] : []),
  ] };
}
