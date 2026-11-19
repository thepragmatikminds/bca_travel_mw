import { useEffect } from "react";
import { Link, useLocation } from "@/lib/router";
import ContactBand from "@/components/ContactBand";
import { ArrowRightIcon, CheckIcon, SERVICE_ICONS } from "@/components/Icons";
import { SERVICES } from "@/config/site";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function Services() {
  useDocumentTitle("Services");
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView(), 80);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <>
      <div className="container-page pb-4 pt-12 sm:pt-16">
        <p className="eyebrow">Our services</p>
        <h1 className="mt-2 max-w-2xl text-4xl font-extrabold sm:text-5xl">Travel made as easy as ABC</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-600 sm:text-base">
          Six services, one team. Choose what you need and send us a request — we confirm the details and price by email.
        </p>

        <div className="mt-10 space-y-5">
          {SERVICES.map((s) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <article key={s.id} id={s.id} className="card scroll-mt-28 grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr_1fr]">
                <div>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 text-sun-400">
                    <Icon size={24} />
                  </span>
                  <h2 className="mt-4 text-2xl font-extrabold">{s.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{s.description}</p>
                  <Link to={`/book?service=${s.id}`} className="btn btn-primary mt-5">
                    Request {s.title.toLowerCase()} <ArrowRightIcon size={16} />
                  </Link>
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-600">What you can request</h3>
                  <ul className="mt-3 space-y-2.5">
                    {s.includes.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[15px]">
                        <CheckIcon size={18} className="mt-0.5 shrink-0 text-brand-600" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-600">What we will need</h3>
                  <ul className="mt-3 space-y-2.5">
                    {s.needs.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[15px] text-ink-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sun-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="pt-16">
        <ContactBand />
      </div>
    </>
  );
}
