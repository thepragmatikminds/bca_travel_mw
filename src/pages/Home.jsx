import { Link } from "@/lib/router";
import HeroBackdrop from "@/components/HeroBackdrop";
import QuickRequest from "@/components/QuickRequest";
import ServiceCard from "@/components/ServiceCard";
import DestinationCard from "@/components/DestinationCard";
import RouteCard from "@/components/RouteCard";
import ContactBand from "@/components/ContactBand";
import Reveal from "@/components/Reveal";
import { ArrowRightIcon, CheckIcon, SERVICE_ICONS } from "@/components/Icons";
import { DESTINATIONS, ROUTES, SERVICES, SITE, STEPS, TRUST, WHY } from "@/config/site";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function Home() {
  useDocumentTitle();
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="on-dark relative isolate text-white">
        <HeroBackdrop />
        <div className="container-page grid grid-cols-1 gap-10 pb-14 pt-12 sm:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:py-24">
          <div className="min-w-0">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/90">
              <span className="h-1.5 w-1.5 rounded-full bg-sun-400" /> Travel agency · Malawi
            </span>
            <h1 className="mt-6 text-[42px] leading-[1.02] sm:text-6xl lg:text-[4.5rem]">
              Where travel feels as easy as <em className="text-grad-sun pr-1 not-italic">ABC.</em>
            </h1>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-white/80 sm:text-lg">
              Air tickets, travel insurance, hotels, tour packages, airport transfers and visa processing — arranged by one team and confirmed by email.
            </p>
            <p className="mt-7 flex flex-wrap gap-x-5 gap-y-1 text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/55">
              <span>6 services</span>
              <span>Email booking</span>
              <span>No account needed</span>
            </p>
          </div>
          <div className="w-full min-w-0 max-w-md lg:ml-auto">
            <QuickRequest />
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="container-page pt-16 sm:pt-24" aria-labelledby="services-title">
        <Reveal>
          <p className="eyebrow">What we do</p>
          <h2 id="services-title" className="mt-3 max-w-2xl text-[34px] leading-[1.05] sm:text-5xl">
            Everything for your trip, in one place
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 80}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Flight starting points ---------- */}
      <section className="container-page pt-20 sm:pt-28" aria-labelledby="routes-title">
        <Reveal>
          <p className="eyebrow">Flights out of Malawi</p>
          <h2 id="routes-title" className="mt-3 text-[34px] leading-[1.05] sm:text-5xl">Start a flight request</h2>
          <Link to="/book?service=air-ticket" className="mt-3 inline-block text-sm font-bold text-brand-700 underline underline-offset-4">
            Other routes
          </Link>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ROUTES.map((r, i) => (
            <Reveal key={`${r.fromCode}${r.toCode}`} delay={(i % 3) * 70}>
              <RouteCard route={r} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Why BCA ---------- */}
      <section className="wash mt-20 py-16 sm:mt-28 sm:py-24" aria-labelledby="why-title">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow">Why BCA</p>
            <h2 id="why-title" className="mt-3 text-[34px] leading-[1.05] sm:text-5xl">Travel arranged the simple way</h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-600">
              One team for the whole trip, from the flight to the airport pick-up. Tell us what you need and we take it from there.
            </p>
            <Link to="/contact" className="btn btn-outline mt-7">
              Ask a question <ArrowRightIcon size={16} />
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <div className="card overflow-hidden">
              <ul className="divide-y divide-line">
                {WHY.map((item) => {
                  const Icon = SERVICE_ICONS[item.icon];
                  return (
                    <li key={item.title} className="flex gap-4 p-5 sm:p-6">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                        <Icon size={20} />
                      </span>
                      <div>
                        <p className="text-[16px] font-bold">{item.title}</p>
                        <p className="mt-1 text-[14.5px] leading-relaxed text-ink-600">{item.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <ul className="flex flex-col gap-2 bg-[linear-gradient(100deg,#e4f4e8,#eef6e0)] px-5 py-4 text-[13px] font-semibold text-ink-700 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:px-6">
                {TRUST.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckIcon size={15} className="text-brand-600" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Destinations ---------- */}
      <section id="destinations" className="container-page scroll-mt-24 pt-20 sm:pt-28" aria-labelledby="dest-title">
        <Reveal>
          <p className="eyebrow">Destinations</p>
          <h2 id="dest-title" className="mt-3 max-w-2xl text-[34px] leading-[1.05] sm:text-5xl">Where would you like to go?</h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-600">
            Choose a destination to begin a request. Not listed? Type any city on the next page.
          </p>
        </Reveal>
        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.city} delay={(i % 4) * 70} className="w-[74%] shrink-0 snap-start sm:w-auto">
              <DestinationCard destination={d} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="container-page pt-20 sm:pt-28" aria-labelledby="how-title">
        <Reveal>
          <p className="eyebrow">How it works</p>
          <h2 id="how-title" className="mt-3 text-[34px] leading-[1.05] sm:text-5xl">Three simple steps</h2>
        </Reveal>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="card p-6">
              <span className="grad-sun grid h-11 w-11 place-items-center rounded-full font-display text-xl font-semibold text-ink-900">
                {i + 1}
              </span>
              <h3 className="mt-5 text-[22px] leading-tight">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{step.text}</p>
            </Reveal>
          ))}
        </ol>
        {SITE.pilot.enabled && (
          <p className="mt-6 text-[13px] text-ink-500">We are in our pilot phase, so every booking is confirmed personally by our team.</p>
        )}
      </section>

      <div className="pt-20 sm:pt-28">
        <Reveal>
          <ContactBand />
        </Reveal>
      </div>
    </>
  );
}
