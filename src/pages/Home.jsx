import { Link } from "@/lib/router";
import ServiceCard from "@/components/ServiceCard";
import ContactBand from "@/components/ContactBand";
import { ArrowRightIcon } from "@/components/Icons";
import { DESTINATION_SUGGESTIONS, SERVICES, SITE, STEPS } from "@/config/site";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function Home() {
  useDocumentTitle();
  return (
    <>
      <section className="hero-bg on-dark relative isolate overflow-hidden text-white">
        <svg
          className="pointer-events-none absolute -bottom-6 left-0 -z-10 w-full opacity-[0.08]"
          viewBox="0 0 1200 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 220 180 40l120 110 90-80 150 150 120-130 170 150 120-90 250 170Z" fill="#F7DF3A" />
        </svg>

        <div className="container-page grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/90">
              <span className="h-2 w-2 rounded-full bg-sun-400" /> Travel agency · Malawi
            </span>
            <h1 className="mt-6 text-[40px] font-extrabold leading-[1.05] sm:text-6xl">
              Where travel feels as easy as <span className="text-sun-400">ABC.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Air tickets, travel insurance, hotel booking, tour packages, airport transfers and visa processing —
              all arranged by one team.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book" className="btn btn-sun">
                Request a booking <ArrowRightIcon size={18} />
              </Link>
              <Link to="/services" className="btn btn-ghost-light">
                Explore services
              </Link>
            </div>
            {SITE.pilot.enabled && (
              <p className="mt-6 max-w-md text-[13px] leading-relaxed text-white/60">
                We are in our pilot phase: send your request by email and our team confirms the details and payment with you.
              </p>
            )}
          </div>

          <div className="mx-auto w-full max-w-[22rem] lg:max-w-none">
            <img
              src="/images/bca-poster.jpg"
              alt="BCA Travel poster: a traveller with a suitcase looking over a lake, with the list of services."
              width="591"
              height="714"
              className="w-full rounded-[2rem] border-4 border-white/15 shadow-lift"
            />
          </div>
        </div>
      </section>

      <section className="container-page pt-20" aria-labelledby="services-title">
        <p className="eyebrow">Our services</p>
        <h2 id="services-title" className="mt-2 max-w-2xl text-3xl font-extrabold sm:text-4xl">
          Everything for your trip, in one place
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
        <p className="mt-6 text-sm">
          <Link to="/services" className="font-bold text-brand-700 underline underline-offset-4">
            See what each service includes
          </Link>
        </p>
      </section>

      <section className="container-page pt-20" aria-labelledby="how-title">
        <p className="eyebrow">How it works</p>
        <h2 id="how-title" className="mt-2 text-3xl font-extrabold sm:text-4xl">
          Three simple steps
        </h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sun-400 font-display text-lg font-extrabold text-ink-900">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page pt-20" aria-labelledby="dest-title">
        <div className="card p-6 sm:p-10">
          <p className="eyebrow">Start a flight request</p>
          <h2 id="dest-title" className="mt-2 text-2xl font-extrabold sm:text-3xl">
            Where would you like to go?
          </h2>
          <p className="mt-2 text-[15px] text-ink-600">Pick a destination to begin, or type your own on the next page.</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {DESTINATION_SUGGESTIONS.map((city) => (
              <Link
                key={city}
                to={`/book?service=air-ticket&to=${encodeURIComponent(city)}`}
                className="rounded-full border-2 border-line px-4 py-2 text-sm font-bold transition-colors hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-20">
        <ContactBand />
      </div>
    </>
  );
}
