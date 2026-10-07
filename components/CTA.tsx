import { appData } from "../data";
import { formatPhoneNumber } from "../utils/helper";

function CTA() {
  return (
    <section className="px-3 py-12 md:px-5 md:py-20">
      <div className="container-main">

        {/* Main CTA */}
        <div
          className="
            relative overflow-hidden rounded-[2rem]
            bg-gradient-to-br from-dark via-slate-900 to-primary
            px-6 py-12 text-center
            shadow-2xl
            md:px-12 md:py-16
          "
        >
          {/* Decorative Circles */}
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />

          {/* Decorative Rings */}
          <div className="pointer-events-none absolute right-8 top-8 hidden h-28 w-28 rounded-full border border-white/10 md:block" />
          <div className="pointer-events-none absolute bottom-8 left-8 hidden h-20 w-20 rounded-full border border-white/10 md:block" />

          <div className="relative mx-auto max-w-3xl">

            {/* Badge */}
            <span
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-white/15
                bg-white/10
                px-4 py-2
                text-xs font-bold uppercase
                tracking-wider text-white/90
                backdrop-blur-sm
              "
            >
              <span className="text-base">✈</span>
              Your Journey Starts Here
            </span>

            {/* Heading */}
            <h2 className="mt-6 text-3xl font-black leading-tight text-white md:text-5xl">
              Find Your Next Flight.
              <span className="block text-blue-200">
                Start Your Journey.
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100/80 md:text-base">
              Explore available flight options, compare itineraries, and
              choose the right option for your next trip with easyfarebooking.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#booking"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-xl
                  bg-white
                  px-7 py-3.5
                  text-sm font-extrabold text-dark
                  shadow-lg
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
                  bg-white/5
                  px-7 py-3.5
                  text-sm font-extrabold text-white
                  backdrop-blur-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-white/10
                "
              >
                <span>☎</span>
                Call {formatPhoneNumber(appData.phoneNumber)}
              </a>
            </div>

            {/* Trust Points */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-semibold text-white/60">
              <span className="flex items-center gap-2">
                <span className="text-blue-200">✓</span>
                Easy Flight Search
              </span>

              <span className="hidden h-3 w-px bg-white/20 sm:block" />

              <span className="flex items-center gap-2">
                <span className="text-blue-200">✓</span>
                Flexible Options
              </span>

              <span className="hidden h-3 w-px bg-white/20 sm:block" />

              <span className="flex items-center gap-2">
                <span className="text-blue-200">✓</span>
                Booking Assistance
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-black text-dark md:text-2xl">
            Your Next Adventure Is Just a Flight Away
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-500">
            Discover flight options that fit your journey and take the next
            step toward your destination with easyfarebooking.
          </p>
        </div>

      </div>
    </section>
  );
}

export default CTA;