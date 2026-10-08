import ContactInquiryForm from "@/components/ContactInquiryForm";
import { appData } from "../data";
import { formatPhoneNumber } from "../utils/helper";

function Contact() {
  return (
    <section className="relative overflow-hidden bg-slate-50 section-padding">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="container-main relative">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
              Get In Touch
            </span>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-primary-dark sm:text-5xl">
            Your Journey Starts With
            <span className="text-primary"> A Conversation.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500">
            Planning a trip, need help with an existing reservation, or simply
            have a travel question? Our team is ready to make things easier.
          </p>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* Contact Information */}
            <div className="relative overflow-hidden bg-primary-dark p-8 text-black sm:p-10 lg:p-12">
              {/* Decoration */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[45px] border-white/5" />
              <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-2xl" />

              <div className="relative z-10">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blck-300">
                  Travel Support
                </p>

                <h2 className="mt-3 text-3xl font-black">
                  Let's Plan Something
                  <br />
                  Worth Remembering.
                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-black">
                  From your first travel question to your final itinerary,
                  we're here to help you move forward with confidence.
                </p>

                <div className="mt-10 space-y-4">
                  {/* Phone */}
                  <a
                    href={`tel:+${appData.phoneNumber}`}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl">
                      ☎
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black">
                        Talk To Our Team
                      </p>

                      <p className="mt-1 font-bold text-black">
                        {formatPhoneNumber(appData.phoneNumber)}
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${appData.email}`}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl">
                      ✉
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black">
                        Send Us An Email
                      </p>

                      <p className="mt-1 truncate font-bold text-black">
                        {appData.email}
                      </p>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl">
                      ⌖
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black">
                        Our Office
                      </p>

                      <p className="mt-1 text-sm font-semibold leading-6 text-black">
                        Five Greentree Centre
                        <br />
                        525 Route 73 North, Suite 104
                        <br />
                        Marlton, New Jersey 08053-0805
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-9 border-t border-white/10 pt-6">
                  <p className="flex items-center gap-2 text-xs text-black">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    Travel assistance when you need it.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="mb-8">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
                  Send A Message
                </p>

                <h2 className="mt-2 text-3xl font-black text-primary-dark">
                  How Can We Help?
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Review your inquiry, then open an email draft when you are
                  ready to send it. Nothing is submitted automatically.
                </p>
              </div>

              <ContactInquiryForm />
            </div>
          </div>
        </div>

        {/* Bottom trust text */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold text-gray-400">
          <span>✓ Personalized Assistance</span>
          <span>✓ Travel Experts</span>
          <span>✓ Secure Communication</span>
          <span>✓ Hassle-Free Support</span>
        </div>
      </div>
    </section>
  );
}

export default Contact;