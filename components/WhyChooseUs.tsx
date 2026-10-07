const reasons = [
  {
    number: "01",
    icon: "☎",
    title: "Personalized Support",
    text: "Need help with your flight search or booking? Our support team is here to guide you through the process.",
  },
  {
    number: "02",
    icon: "✈",
    title: "Find the Right Flight",
    text: "Explore available flights and compare options based on your destination, travel dates, and preferences.",
  },
  {
    number: "03",
    icon: "✓",
    title: "Easy Booking Process",
    text: "Choose your preferred flight, review your travel details, and complete your reservation with ease.",
  },
  {
    number: "04",
    icon: "↔",
    title: "More Travel Options",
    text: "Discover one-way, round-trip, domestic, and international flight options for your next journey.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="container-main">

        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-light-blue px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-dark md:text-4xl lg:text-5xl">
            Travel Made Simple With{" "}
            <span className="text-primary">easyfarebooking</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
            From finding the right flight to completing your reservation,
            we make your travel booking experience simple, convenient, and
            easy to navigate.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="
                group relative overflow-hidden rounded-3xl
                border border-gray-100 bg-white p-6
                shadow-sm
                transition-all duration-300
                hover:-translate-y-2
                hover:border-primary/20
                hover:shadow-xl
              "
            >
              {/* Background Number */}
              <span
                className="
                  pointer-events-none absolute -right-2 -top-5
                  text-7xl font-black
                  text-slate-100
                  transition-all duration-300
                  group-hover:text-light-blue
                "
              >
                {reason.number}
              </span>

              {/* Top Row */}
              <div className="relative flex items-center justify-between">
                {/* Icon */}
                <div
                  className="
                    flex h-14 w-14 items-center justify-center
                    rounded-2xl
                    bg-light-blue
                    text-xl text-primary
                    transition-all duration-300
                    group-hover:bg-primary
                    group-hover:text-white
                    group-hover:rotate-3
                  "
                >
                  {reason.icon}
                </div>

                {/* Number */}
                <span className="text-xs font-extrabold tracking-widest text-gray-300">
                  {reason.number}
                </span>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="mt-6 text-lg font-extrabold text-dark">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {reason.text}
                </p>

                {/* Bottom Accent */}
                <div className="mt-6 flex items-center gap-2">
                  <span className="h-1 w-8 rounded-full bg-primary transition-all duration-300 group-hover:w-14" />

                  <span className="text-xs font-bold text-gray-300 transition-colors group-hover:text-primary">
                    easyfarebooking
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;