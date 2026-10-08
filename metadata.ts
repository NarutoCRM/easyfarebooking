import type { Metadata } from "next";

const siteName = "easyfare booking";
export const siteUrl = "https://easyfarebooking.com";

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const brandedTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: brandedTitle,
      description,
      url: path,
      siteName,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/logo.png",
          width: 1774,
          height: 887,
          alt: "easyfarebooking travel logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: ["/logo.png"],
    },
  };
}
