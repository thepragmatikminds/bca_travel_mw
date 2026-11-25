import { SITE, whatsappUrl } from "@/config/site";
import { MailIcon, PhoneIcon } from "@/components/Icons";

// The poster's "For Booking" strip, as the original app's dark feature panel.
export default function ContactBand() {
  return (
    <section className="container-page">
      <div className="panel-dark on-dark grid gap-8 p-7 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-200">For booking</p>
          <h2 className="mt-3 text-[34px] leading-[1.05] sm:text-5xl">Ready when you are.</h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75">
            Send us your request by email, or call if your trip is urgent. We reply with availability, the price and how to pay.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <a href={`mailto:${SITE.email}`} className="btn btn-white justify-start !px-5">
            <MailIcon size={18} /> <span className="break-all">{SITE.email}</span>
          </a>
          {SITE.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="btn btn-ghost-light justify-start !px-5">
              <PhoneIcon size={18} /> {p.display}
            </a>
          ))}
          {SITE.whatsappEnabled && (
            <p className="text-xs leading-relaxed text-white/55">
              Questions only? WhatsApp{" "}
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
