import { Link } from "@/lib/router";
import Logo from "@/components/Logo";
import InstallAppButton from "@/components/InstallAppButton";
import { SERVICES, SITE } from "@/config/site";

const Group = ({ title, children }) => (
  <div>
    <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-500">{title}</h4>
    <ul className="mt-4 space-y-3 text-[15px] text-ink-700">{children}</ul>
  </div>
);

export default function SiteFooter() {
  return (
    <footer className="mt-24 bg-[linear-gradient(180deg,#eef3e7,#e3eddc)] pb-24 md:pb-0">
      <div className="flag-stripe" />
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ink-600">
            {SITE.tagline}. Flights, stays, transfers, tours, insurance and visas — confirmed by email.
          </p>
          <p className="mt-3 text-[13px] text-ink-500">Serving travellers in Malawi.</p>
          <InstallAppButton className="mt-5 [&_button]:!border-brand-700/30 [&_button]:!text-brand-800 [&_p]:!text-ink-500" />
        </div>

        <Group title="Our services">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <Link to={`/book?service=${s.id}`} className="hover:text-brand-700">
                {s.title}
              </Link>
            </li>
          ))}
        </Group>

        <Group title="Contact">
          <li><a href={`mailto:${SITE.email}`} className="break-all hover:text-brand-700">{SITE.email}</a></li>
          {SITE.phones.map((p) => (
            <li key={p.tel}><a href={`tel:${p.tel}`} className="hover:text-brand-700">{p.display}</a></li>
          ))}
          <li>
            <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700">
              Instagram @{SITE.instagram.handle}
            </a>
          </li>
        </Group>

        <Group title="Good to know">
          <li>Requests confirmed by email</li>
          <li>Payment arranged by email</li>
          <li>No account needed</li>
        </Group>
      </div>

      <div className="border-t border-ink-900/10">
        <div className="container-page flex flex-col gap-1.5 py-6 text-xs leading-relaxed text-ink-500 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} BCA Travel. Prices and availability are confirmed by email. Photos via Pexels.</p>
          {SITE.pilot.enabled && <p>Pilot phase — thank you for helping us improve.</p>}
        </div>
      </div>
    </footer>
  );
}
