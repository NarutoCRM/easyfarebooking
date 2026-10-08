function AboutSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-main">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left Content */}
          <div>
            <span className="inline-flex items-center rounded-full bg-light-blue px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">
              About easyfarebooking
            </span>

            <h2 className="mt-5 text-3xl font-black leading-tight text-dark md:text-4xl lg:text-5xl">
              Your Journey Starts With
              <span className="block text-primary">
                Easy fare Booking
              </span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-gray-600 md:text-base">
              At easyfarebooking, we believe planning your next trip should be
              simple. Our platform helps travelers explore available flight
              options and find itineraries that fit their destination,
              schedule, and travel preferences.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-600 md:text-base">
              Whether you're traveling for business, visiting family, taking a
              vacation, or planning a last-minute trip, we make it easier to
              explore your flight options in one convenient place.
            </p>

            {/* Quick Points */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-light-blue text-sm font-bold text-primary">
                  ✓
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-dark">
                    Simple Search
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Explore flights based on your travel needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-light-blue text-sm font-bold text-primary">
                  ✓
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-dark">
                    Flexible Options
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Compare different routes and travel dates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-light-blue text-sm font-bold text-primary">
                  ✓
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-dark">
                    Domestic & International
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Discover flights for journeys near and far.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-light-blue text-sm font-bold text-primary">
                  ✓
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-dark">
                    Booking Assistance
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Get support when you need help with your booking.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative">
            {/* Decorative Background */}
            <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-light-blue/60 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-blue-700 p-8 text-white shadow-xl md:p-10">

              {/* Decorative Circle */}
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />
              <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full border border-white/10" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur-sm">
                  ✈
                </div>

                <h3 className="mt-7 text-2xl font-black md:text-3xl">
                  Explore More.
                  <br />
                  Travel Further.
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/80">
                  From quick domestic trips to international adventures,
                  easyfarebooking helps you explore flight options for your
                  next journey.
                </p>

                {/* Features */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm">
                      ✓
                    </span>
                    <span className="text-sm font-semibold">
                      One-way & round-trip options
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm">
                      ✓
                    </span>
                    <span className="text-sm font-semibold">
                      Domestic & international travel
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm">
                      ✓
                    </span>
                    <span className="text-sm font-semibold">
                      Support for your booking questions
                    </span>
                  </div>
                </div>

                {/* Bottom Text */}
                <div className="mt-9 border-t border-white/15 pt-5">
                  <p className="text-xs font-bold uppercase tracking-[2px] text-white/60">
                    Your Travel • Your Choice • Your Journey
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;