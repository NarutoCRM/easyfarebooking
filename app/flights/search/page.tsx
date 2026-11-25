
import { Suspense } from "react";
import Script from "next/script";
import FlightSearchResults from "@/components/flight/FlightSearchResults";

export const metadata = {
  title: "Flight search",
  robots: { index: false, follow: false },
};

export default function FlightSearchPage() {
  return (
    <>
      {/* Google Ads Website Lead Conversion */}
      <Script
        id="google-ads-flight-search-conversion"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function() {
            window.dataLayer.push(arguments);
          };

          window.gtag('event', 'conversion', {
            'send_to': 'AW-18439176397/BzK5CO2kk74dEM2BvthE'
          });
        `}
      </Script>

      <Suspense
        fallback={
          <div role="status" className="section-padding text-center">
            Preparing your flight search...
          </div>
        }
      >
        <FlightSearchResults />
      </Suspense>
    </>
  );
}
