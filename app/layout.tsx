
import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./index.css";
import { siteUrl } from "@/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "easyfarebooking",
    template: "%s | easyfarebooking",
  },
  description:
    "Explore flight options and get travel booking support from easyfarebooking, operated by TravelFirst LLC.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {/* Google Ads Global Site Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18439176397"
          strategy="afterInteractive"
        />

        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18439176397');
          `}
        </Script>

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
