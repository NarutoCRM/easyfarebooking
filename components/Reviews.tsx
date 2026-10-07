const reviews = [
  {
    name: "Michael R.",
    quote:
      "The flight search was simple and easy to understand. I could compare different schedules and find an option that worked well for my trip.",
  },
  {
    name: "Sarah M.",
    quote:
      "I liked how straightforward the booking process was. It was easy to review different flight options before making my reservation.",
  },
  {
    name: "Jessica B.",
    quote:
      "I needed assistance with my travel plans and found the booking support helpful. The overall experience was smooth and convenient.",
  },
];

function Reviews() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-main">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-light-blue px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">
            Customer Reviews
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-dark md:text-4xl lg:text-5xl">
            What Travelers
            <span className="block text-primary">
              Are Saying
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
            See what travelers have shared about their experience
            exploring and booking flights with easyfarebooking.
          </p>
        </div>

        {/* Reviews */}
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={review.name}
              className="
                group relative overflow-hidden
                rounded-3xl border border-gray-100
                bg-slate-50 p-6
                transition-all duration-300
                hover:-translate-y-2
                hover:bg-white
                hover:shadow-xl
              "
            >
              {/* Large Quote */}
              <div
                className="
                  absolute right-5 top-2
                  text-7xl font-black leading-none
                  text-primary/10
                  transition-all duration-300
                  group-hover:text-primary/15
                "
              >
                “
              </div>

              {/* Rating */}
              <div className="relative flex items-center justify-between">
                <div className="flex gap-1 text-sm text-amber-400">
                  ★ ★ ★ ★ ★
                </div>

                <span className="text-xs font-bold text-gray-300">
                  0{index + 1}
                </span>
              </div>

              {/* Review */}
              <p className="relative mt-6 text-sm leading-7 text-gray-600">
                “{review.quote}”
              </p>

              {/* Customer */}
              <div className="mt-7 flex items-center gap-3 border-t border-gray-200 pt-5">
                <div
                  className="
                    flex h-12 w-12 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-primary
                    text-sm font-black text-white
                    shadow-sm
                  "
                >
                  {review.name.charAt(0)}
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-dark">
                    {review.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Verified Traveler
                  </p>
                </div>
              </div>

              {/* Bottom Accent */}
              <div
                className="
                  absolute bottom-0 left-0 h-1 w-0
                  bg-primary
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </div>
          ))}
        </div>

        {/* Bottom Trust Message */}
        <div className="mt-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[2px] text-gray-400">
            Simple Search • Flexible Options • Helpful Support
          </p>
        </div>

      </div>
    </section>
  );
}

export default Reviews;