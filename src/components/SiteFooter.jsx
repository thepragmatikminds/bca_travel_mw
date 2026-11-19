import { Link } from "@/lib/router";
import Logo from "@/components/Logo";
import InstallAppButton from "@/components/InstallAppButton";
import { InstagramIcon, MailIcon, PhoneIcon } from "@/components/Icons";
import { SERVICES, SITE } from "@/config/site";

export default function SiteFooter() {
  return (
    <footer className="on-dark mt-24 bg-ink-900 text-white">
      <div className="flag-stripe" />
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {SITE.tagline}. One team for your flights, stays, transfers, tours, insurance and visas.
          </p>
          <InstallAppButton className="mt-5" />
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-[0.18em] text-sun-400">Our services</h4>
          <ul className="mt-4 space-y-2.5">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <Link to={`/book?service=${s.id}`} className="text-sm text-white/75 transition-colors hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-[0.18em] text-sun-400">For booking</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2.5 text-white/85 hover:text-white">
                <MailIcon size={16} /> {SITE.email}
              </a>
            </li>
            {SITE.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="inline-flex items-center gap-2.5 text-white/85 hover:text-white">
                  <PhoneIcon size={16} /> {p.display}
                </a>
              </li>
            ))}
            <li>
              <a
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-white/85 hover:text-white"
              >
                <InstagramIcon size={16} /> @{SITE.instagram.handle}
              </a>
            </li>
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-white/55">
            Payment is arranged by email after we confirm your request.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BCA Travel, Malawi.</p>
          {SITE.pilot.enabled && <p>Pilot phase — prices, availability and bookings are confirmed by email.</p>}
        </div>
      </div>
    </footer>
  );
}
