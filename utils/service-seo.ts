import { createPageMetadata } from "@/metadata";
import { services, type ServiceKind } from "@/data/services";

export function serviceMetadata(service: ServiceKind) {
  const config = services[service];
  const title = `${config.seoTitle} | EasyFareBooking`;
  const metadata = createPageMetadata(config.seoTitle, config.seoDescription, config.path);
  return { ...metadata, title: { absolute: title },
    openGraph: { ...metadata.openGraph, title, siteName: "EasyFareBooking", images: [{ url: "/newlogo.png", alt: "EasyFareBooking travel logo" }] },
    twitter: { ...metadata.twitter, title, images: ["/newlogo.png"] },
  };
}
