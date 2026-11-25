import Faq from "@/components/Faq";
import PageHeader from "@/components/PageHeader";
import { Link } from "@/lib/router";
import { InstagramIcon, MailIcon, PhoneIcon, ChatIcon } from "@/components/Icons";
import { SITE, whatsappUrl } from "@/config/site";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function Contact() {
  useDocumentTitle("Contact");
  return (
    <>
      <PageHeader eyebrow="Contact" title="For booking">
        The quickest way to book is to send us a request by email. For anything urgent, call us.
      </PageHeader>

      <div className="container-page mt-10 grid gap-5 md:grid-cols-2">
        <div className="panel-dark on-dark p-7 sm:p-9">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-200">Email &amp; phone</p>
          <ul className="mt-5 space-y-4">
            <li>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-3 break-all text-lg font-semibold hover:underline">
                <MailIcon size={20} className="shrink-0 text-sun-400" /> {SITE.email}
              </a>
            </li>
            {SITE.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="inline-flex items-center gap-3 text-lg font-semibold hover:underline">
                  <PhoneIcon size={20} className="shrink-0 text-sun-400" /> {p.display}
                </a>
              </li>
            ))}
          </ul>
          <Link to="/book" className="btn btn-sun mt-8">
            Request a booking
          </Link>
        </div>

        <div className="card p-7 sm:p-9">
          <p className="eyebrow">Follow &amp; chat</p>
          <ul className="mt-5 space-y-4">
            <li>
              <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-lg font-semibold text-brand-700 hover:underline">
                <InstagramIcon size={20} /> @{SITE.instagram.handle}
              </a>
            </li>
            {SITE.whatsappEnabled &&
              SITE.phones.map((p) => (
                <li key={p.tel}>
                  <a href={whatsappUrl(p.tel)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-lg font-semibold text-brand-700 hover:underline">
                    <ChatIcon size={20} /> WhatsApp {p.display}
                  </a>
                </li>
              ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-ink-600">Bookings and payments are arranged by email. Chat is for questions.</p>
        </div>
      </div>

      <div className="container-page mt-16">
        <p className="eyebrow">Good to know</p>
        <h2 className="mt-3 text-[34px] leading-[1.05] sm:text-5xl">Questions, answered</h2>
        <div className="mt-8 max-w-3xl">
          <Faq />
        </div>
      </div>
    </>
  );
}
