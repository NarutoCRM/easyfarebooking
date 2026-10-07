import { appData } from "../data";

const faqs = [
  {
    number: "01",
    question: "What flight options can I explore with easyfarebooking?",
    answer:
      "You can explore available domestic and international flights, including one-way and round-trip options. Depending on availability, business class and first class options may also be available.",
  },
  {
    number: "02",
    question: "Can I search for domestic and international flights?",
    answer:
      "Yes. easyfarebooking allows travelers to explore flight options for destinations across the United States and international destinations.",
  },
  {
    number: "03",
    question: "How do I book a flight with easyfarebooking?",
    answer:
      "Enter your departure city, destination, and travel dates to explore available flights. Review the available itinerary and follow the booking process to complete your reservation.",
  },
  {
    number: "04",
    question: "Can I get help with my flight booking?",
    answer: `Yes. If you need assistance while searching or booking a flight, you can contact our team at ☎ ${appData.phoneNumber}.`,
  },
  {
    number: "05",
    question: "Can flight prices change?",
    answer:
      "Yes. Airfare and seat availability may change based on airline inventory, demand, travel dates, routes, and other pricing factors. Displayed fares are subject to availability until your booking is confirmed.",
  },
];

function FAQ() {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container-main">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-light-blue px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">
            Frequently Asked Questions
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-dark md:text-4xl lg:text-5xl">
            Have Questions?
            <span className="block text-primary">
              We've Got Answers.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
            Find answers to some of the common questions travelers have
            about searching and booking flights with easyfarebooking.
          </p>
        </div>

        {/* FAQ List */}
        <div className="mx-auto max-w-4xl space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="
                group overflow-hidden rounded-2xl
                border border-gray-100
                bg-white
                shadow-sm
                transition-all duration-300
                open:border-primary/20
                open:shadow-md
              "
            >
              <summary
                className="
                  flex cursor-pointer list-none
                  items-center gap-4
                  px-5 py-5
                  md:px-6 md:py-6
                  [&::-webkit-details-marker]:hidden
                "
              >
                {/* Number */}
                <span
                  className="
                    flex h-10 w-10 shrink-0 items-center justify-center
                    rounded-xl
                    bg-light-blue
                    text-xs font-black text-primary
                    transition-all duration-300
                    group-open:bg-primary
                    group-open:text-white
                  "
                >
                  {faq.number}
                </span>

                {/* Question */}
                <span
                  className="
                    flex-1 pr-2
                    text-sm font-extrabold leading-6 text-dark
                    md:text-base
                  "
                >
                  {faq.question}
                </span>

                {/* Toggle */}
                <span
                  aria-hidden="true"
                  className="
                    relative flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-slate-50
                    text-primary
                    transition-all duration-300
                    group-open:bg-primary
                    group-open:text-white
                  "
                >
                  <span className="absolute h-3.5 w-0.5 rounded-full bg-current transition-transform duration-300 group-open:rotate-90" />
                  <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                </span>
              </summary>

              {/* Answer */}
              <div className="px-5 pb-5 md:px-6 md:pb-6">
                <div className="ml-14 border-t border-gray-100 pt-4">
                  <p className="text-sm leading-7 text-gray-500 md:text-[15px]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>

        {/* Bottom Support Box */}
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-white p-5 text-center shadow-sm sm:flex-row sm:text-left md:p-6">
            <div>
              <h3 className="text-base font-extrabold text-dark">
                Still have a question?
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Our team is available to help with your flight booking
                questions.
              </p>
            </div>

            <a
              href={`tel:${appData.phoneNumber}`}
              className="
                inline-flex shrink-0 items-center justify-center
                rounded-xl bg-primary
                px-5 py-3
                text-sm font-bold text-white
                transition-all duration-300
                hover:-translate-y-0.5
                hover:shadow-lg
              "
            >
              Call Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FAQ;