import { useEffect } from "react";
import { Link, useLocation } from "@/lib/router";
import ContactBand from "@/components/ContactBand";
import PageHeader from "@/components/PageHeader";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { ServiceScene } from "@/components/Scenes";
import { ArrowRightIcon, CheckIcon, SERVICE_ICONS } from "@/components/Icons";
import { SERVICES } from "@/config/site";
import { srcsFor } from "@/lib/photos";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { cn } from "@/lib/utils";

export default function Services() {
  useDocumentTitle("Services");
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return undefined;
    const t = setTimeout(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView(), 80);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <>
      <PageHeader eyebrow="Our services" title="Travel made as easy as ABC">
        Six services, one team. Choose what you need and send us a request — we confirm the details and price by email.
      </PageHeader>

      <div className="container-page mt-10 space-y-6">
        {SERVICES.map((s, i) => {
          const Icon = SERVICE_ICONS[s.icon];
          return (
            <Reveal key={s.id}>
              <article id={s.id} className="card scroll-mt-28 grid overflow-hidden md:grid-cols-[0.9fr_1.1fr]">
                <div className={cn("relative min-h-[14rem] md:min-h-full", i % 2 && "md:order-2")}>
                  <div className="absolute inset-0">
                    <Photo
                      srcs={srcsFor(s.image)}
                      className="h-full w-full object-cover"
                      fallback={<ServiceScene id={s.id} className="h-full w-full" />}
                    />
                  </div>
                  <span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-brand-700 shadow-soft">
                    <Icon size={20} />
                  </span>
                </div>
                <div className="p-6 sm:p-8">
                  <h2 className="text-[30px] leading-tight sm:text-4xl">{s.title}</h2>
                  <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-ink-600">{s.description}</p>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="eyebrow !font-bold">What you can request</h3>
                      <ul className="mt-3 space-y-2.5">
                        {s.includes.map((item) => (
                          <li key={item} className="flex gap-2.5 text-[14.5px]">
                            <CheckIcon size={17} className="mt-0.5 shrink-0 text-brand-600" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="eyebrow !font-bold">What we will need</h3>
                      <ul className="mt-3 space-y-2.5">
                        {s.needs.map((item) => (
                          <li key={item} className="flex gap-2.5 text-[14.5px] text-ink-600">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sun-500" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Link to={`/book?service=${s.id}`} className="btn btn-primary mt-7">
                    Request {s.title.toLowerCase()} <ArrowRightIcon size={16} />
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="pt-20">
        <ContactBand />
      </div>
    </>
  );
}
