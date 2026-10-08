import { createPageMetadata, siteUrl } from "@/metadata";
import { destinationPath, type Destination } from "@/data/destinations";

export function destinationMetadata(destination: Destination) {
  const metadata = createPageMetadata(destination.seoTitle, destination.seoDescription, destinationPath(destination));
  return {
    ...metadata,
    title: { absolute: `${destination.seoTitle} | EasyFareBooking` },
    openGraph: { ...metadata.openGraph, title: `${destination.seoTitle} | EasyFareBooking`, siteName: "EasyFareBooking", images: [{ url: "/newlogo.png", alt: "EasyFareBooking travel logo" }] },
    twitter: { ...metadata.twitter, title: `${destination.seoTitle} | EasyFareBooking`, images: ["/newlogo.png"] },
  };
}

export function destinationStructuredData(destination: Destination) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Destinations", item: `${siteUrl}/destinations` },
        { "@type": "ListItem", position: 3, name: destination.city, item: `${siteUrl}${destinationPath(destination)}` },
      ] },
      { "@type": "FAQPage", mainEntity: destination.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    ],
  };
}

export const serializeStructuredData = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
