import Faq from "@/components/Faq";
import { Link } from "@/lib/router";
import { InstagramIcon, MailIcon, PhoneIcon, ChatIcon } from "@/components/Icons";
import { SITE, whatsappUrl } from "@/config/site";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function Contact() {
  useDocumentTitle("Contact");
  return (
    <div className="container-page pb-4 pt-12 sm:pt-16">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">For booking</h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-600 sm:text-base">
        The quickest way to book is to send us a request by email. For anything urgent, call us.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="panel-dark on-dark p-7">
          <h2 className="text-2xl font-extrabold text-sun-400">Email &amp; phone</h2>
          <ul className="mt-5 space-y-4">
            <li>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-3 text-lg font-semibold hover:underline">
                <MailIcon size={20} className="text-sun-400" /> {SITE.email}
              </a>
            </li>
            {SITE.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="inline-flex items-center gap-3 text-lg font-semibold hover:underline">
                  <PhoneIcon size={20} className="text-sun-400" /> {p.display}
                </a>
              </li>
            ))}
          </ul>
          <Link to="/book" className="btn btn-sun mt-7">
            Request a booking
          </Link>
        </div>

        <div className="card p-7">
          <h2 className="text-2xl font-extrabold">Follow &amp; chat</h2>
          <ul className="mt-5 space-y-4">
            <li>
              <a
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-lg font-semibold text-brand-700 hover:underline"
              >
                <InstagramIcon size={20} /> @{SITE.instagram.handle} on Instagram
              </a>
            </li>
            {SITE.whatsappEnabled &&
              SITE.phones.map((p) => (
                <li key={p.tel}>
                  <a
                    href={whatsappUrl(p.tel)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-lg font-semibold text-brand-700 hover:underline"
                  >
                    <ChatIcon size={20} /> WhatsApp {p.display}
                  </a>
                </li>
              ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-ink-600">
            Bookings and payments are arranged by email. Chat is for questions.
          </p>
        </div>
      </div>

      <h2 className="mt-16 text-3xl font-extrabold">Good to know</h2>
      <div className="mt-6 max-w-3xl">
        <Faq />
      </div>
    </div>
  );
}
