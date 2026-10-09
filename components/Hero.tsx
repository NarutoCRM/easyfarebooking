import { appData } from "../data";
import { formatPhoneNumber } from "../utils/helper";
import BookingWidget from "./BookingWidget";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900">
      {/* Hero Background */}
      <div
        className=" relative min-h-[570px] bg-cover bg-center sm:min-h-[590px] md:min-h-screen"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(3,18,32,.82), rgba(3,35,55,.58), rgba(3,18,32,.42)), url('/images/hero-travel.png')",
        }}
      >
        {/* Decorative Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/40" />

        <div className="container-main relative">
          {/* Hero Content */}
          <div className=" flex min-h-[520px] flex-col items-center justify-center px-3 pb-24 pt-16 text-center text-white sm:px-4 sm:pb-28 md:min-h-[550px] md:items-start md:text-left">
            {/* Badge */}
            <span
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-white/20
                bg-white/10
                px-4 py-2
                text-xs font-bold uppercase
                tracking-wider text-white/90
                backdrop-blur-md
              "
            >
              <span className="text-base">✈</span>
              Find Your Perfect Flight
            </span>

            {/* Heading */}
            <h1
              className="
                mt-5 max-w-3xl
                text-4xl font-black
                leading-[1.08]
                tracking-tight
                sm:text-5xl
                md:text-6xl
              "
            >
              Your Journey Starts
              <span className="block text-blue-200">With the Right Flight</span>
            </h1>

            {/* Description */}
            <p
              className="
                mt-5 max-w-2xl
                text-sm leading-7
                text-white/80
                sm:text-base
                md:text-lg
              "
            >
              Explore available flights, compare travel options, and find a
              journey that fits your destination, dates, and travel plans.
            </p>

            {/* Buttons */}
            <div className="mt-7 mb-2 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row md:justify-start">
              <a
                href="#booking"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-xl
                  bg-primary
                  px-7 py-3.5
                  text-sm font-extrabold text-white
                  shadow-lg shadow-primary/20
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                <span>✈</span>
                Explore Flights
              </a>

              <a
                href={`tel:+${appData.phoneNumber}`}
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-xl
                  border border-white/30
                  bg-white/10
                  px-7 py-3.5
                  text-sm font-extrabold text-white
                  backdrop-blur-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-white/20
                "
              >
                <span>☎</span>
                Call {formatPhoneNumber(appData.phoneNumber)}
              </a>
            </div>

            {/* Trust Points */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-white/70 md:justify-start">
              <span className="flex items-center gap-1.5">
                <span className="text-blue-200">✓</span>
                Domestic & International
              </span>

              <span className="hidden h-3 w-px bg-white/30 sm:block" />

              <span className="flex items-center gap-1.5">
                <span className="text-blue-200">✓</span>
                One-way & Round-trip
              </span>

              <span className="hidden h-3 w-px bg-white/30 sm:block" />

              <span className="flex items-center gap-1.5">
                <span className="text-blue-200">✓</span>
                Booking Assistance
              </span>
            </div>
          </div>

          {/* Booking Widget */}
          <div
            id="booking"
            className=" relative z-20 mx-auto w-full max-w-280 md:absolute md:-bottom-1 md:left-1/2 md:w-[calc(100%-32px)] md:-translate-x-1/2"
          >
            <div className="md:-mb-35 md:-ml-4">
              <BookingWidget />
            </div>
          </div>
        </div>
      </div>

      {/* Space Below Booking Widget */}
      <div className="hidden h-28 md:block" />
      <div className="h-7 md:hidden" />
    </section>
  );
}

export default Hero;
