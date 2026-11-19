import { SITE, whatsappUrl } from "@/config/site";
import { MailIcon, PhoneIcon } from "@/components/Icons";

// Echoes the poster's "For Booking" strip.
export default function ContactBand() {
  return (
    <section className="container-page">
      <div className="panel-dark on-dark grid gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-300">Ready when you are</p>
          <h2 className="mt-3 text-3xl font-extrabold text-sun-400 sm:text-4xl">For booking</h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/75">
            Send us your request by email, or call if your trip is urgent. We reply with availability, the price and how to pay.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <a href={`mailto:${SITE.email}`} className="btn btn-sun justify-start">
            <MailIcon size={18} /> {SITE.email}
          </a>
          {SITE.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="btn btn-ghost-light justify-start">
              <PhoneIcon size={18} /> {p.display}
            </a>
          ))}
          {SITE.whatsappEnabled && (
            <p className="text-xs text-white/55">
              Questions only? WhatsApp us on{" "}
              {SITE.phones.map((p, i) => (
                <span key={p.tel}>
                  {i > 0 && " or "}
                  <a className="underline" href={whatsappUrl(p.tel)} target="_blank" rel="noopener noreferrer">
                    {p.display}
                  </a>
                </span>
              ))}
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
