import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "@/lib/router";
import {
  ArrowRightIcon,
  CheckIcon,
  CopyIcon,
  InfoIcon,
  MailIcon,
  PhoneIcon,
  SERVICE_ICONS,
  SendIcon,
} from "@/components/Icons";
import { SERVICES, SITE } from "@/config/site";
import { buildRequest, copyText, defaultValues, gmailUrl, isVisible, mailtoUrl, validate } from "@/lib/booking";
import { todayIso } from "@/lib/dates";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { cn } from "@/lib/utils";

const EMPTY_CONTACT = { fullName: "", email: "", phone: "", notes: "" };

function Field({ id, label, error, wide, children }) {
  return (
    <div className={cn(wide && "sm:col-span-2")}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] font-semibold text-flag">
          {error}
        </p>
      )}
    </div>
  );
}

function ServiceField({ field, value, values, error, onChange, today }) {
  const id = `field-${field.name}`;
  const common = {
    id,
    name: field.name,
    value,
    onChange: (e) => onChange(field.name, e.target.value),
    className: "field",
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
  let control;
  if (field.type === "select") {
    control = (
      <select {...common}>
        {field.options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  } else if (field.type === "textarea") {
    control = <textarea {...common} rows={3} placeholder={field.placeholder} />;
  } else if (field.type === "date") {
    const min = field.after && values[field.after] && values[field.after] > today ? values[field.after] : today;
    control = <input {...common} type="date" min={min} />;
  } else if (field.type === "number") {
    control = <input {...common} type="number" inputMode="numeric" min={field.min ?? 1} max={field.max ?? 999} />;
  } else {
    control = <input {...common} type={field.type} placeholder={field.placeholder} autoComplete="off" />;
  }
  return (
    <Field id={id} label={field.label + (field.required ? " *" : "")} error={error}>
      {control}
    </Field>
  );
}

function Review({ request, onEdit }) {
  const [copied, setCopied] = useState(false);
  const mailto = mailtoUrl(request);

  const copy = async () => {
    const ok = await copyText(`To: ${SITE.email}\nSubject: ${request.subject}\n\n${request.body}`);
    setCopied(ok);
    if (ok) setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="card p-6 sm:p-8">
      <p className="eyebrow">Step 2 of 2</p>
      <h2 className="mt-2 text-3xl font-extrabold">Send your request by email</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
        Your request is ready, but <strong className="text-ink-900">nothing has been sent yet</strong>. Choose an option
        below, then press send in your email. Our team replies to confirm availability, the price and how to pay.
      </p>

      <div className="mt-6 rounded-2xl border-2 border-line bg-brand-50/50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-bold">{request.service.title}</h3>
          <span className="rounded-full bg-ink-900 px-3 py-1 text-xs font-bold tracking-wider text-sun-400">
            {request.reference}
          </span>
        </div>
        <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {[...request.rows, ...request.contactRows].map((r) => (
            <div key={r.label + r.value}>
              <dt className="text-xs font-bold uppercase tracking-wider text-ink-500">{r.label}</dt>
              <dd className="mt-0.5 break-words text-[15px] font-semibold">{r.value}</dd>
            </div>
          ))}
          {request.notes && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-bold uppercase tracking-wider text-ink-500">Notes</dt>
              <dd className="mt-0.5 whitespace-pre-wrap break-words text-[15px] font-semibold">{request.notes}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a id="open-mail" href={mailto} className="btn btn-primary">
          <SendIcon size={18} /> Open in my email app
        </a>
        <a href={gmailUrl(request)} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          <MailIcon size={18} /> Open in Gmail
        </a>
        <button type="button" onClick={copy} className="btn btn-outline">
          {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />} {copied ? "Copied" : "Copy request"}
        </button>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-500" aria-live="polite">
        {copied
          ? `Copied. Paste it into a new email to ${SITE.email}.`
          : `No email app on this device? Use Gmail, or copy the request and email it to ${SITE.email}.`}
      </p>

      <div className="mt-6 flex gap-3 rounded-2xl bg-sun-400/25 p-4 text-[14px] leading-relaxed">
        <InfoIcon size={20} className="mt-0.5 shrink-0 text-brand-800" />
        <p>
          <strong>Payment:</strong> there is no online payment yet. We will tell you how to pay in our email reply, once
          your request is confirmed. Please quote <strong>{request.reference}</strong> if you call us.
        </p>
      </div>

      <button type="button" onClick={onEdit} className="mt-6 text-sm font-bold text-brand-700 underline underline-offset-4">
        ← Edit my details
      </button>
    </div>
  );
}

export default function Book() {
  useDocumentTitle("Request a booking");
  const params = useSearchParams();
  const navigate = useNavigate();
  const today = useMemo(todayIso, []);

  const serviceId = SERVICES.some((s) => s.id === params.get("service")) ? params.get("service") : SERVICES[0].id;
  const service = SERVICES.find((s) => s.id === serviceId);

  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [values, setValues] = useState(() => defaultValues(service, params));
  const [errors, setErrors] = useState({});
  const [request, setRequest] = useState(null);

  // Switching service rebuilds the service fields; contact details are kept.
  useEffect(() => {
    setValues(defaultValues(service, params));
    setErrors({});
    setRequest(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  };
  const setContactField = (name, value) => {
    setContact((c) => ({ ...c, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  };

  const chooseService = (id) => navigate(`/book?service=${id}`, { replace: true, scroll: false });

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(service, contact, values, today);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      setTimeout(() => {
        const el = document.getElementById(first === "fullName" || first === "email" || first === "phone" ? `contact-${first}` : `field-${first}`);
        el?.focus();
        el?.scrollIntoView({ block: "center", behavior: "smooth" });
      }, 0);
      return;
    }
    setRequest(buildRequest(service, contact, values));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container-page pb-4 pt-10 sm:pt-14">
      <p className="eyebrow">Request a booking</p>
      <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Tell us about your trip</h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-600">
        Fill in the details and we prepare an email to our team. We reply with availability, the price and how to pay.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start">
        <div>
          {request ? (
            <Review request={request} onEdit={() => setRequest(null)} />
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-8">
              <fieldset>
                <legend className="field-label !mb-3 !text-sm">1. What do you need?</legend>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {SERVICES.map((s) => {
                    const Icon = SERVICE_ICONS[s.icon];
                    return (
                      <label key={s.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="service"
                          value={s.id}
                          checked={s.id === serviceId}
                          onChange={() => chooseService(s.id)}
                          className="peer sr-only"
                        />
                        <span className="flex h-full flex-col items-start gap-2.5 rounded-2xl border-2 border-line bg-white p-4 text-sm font-bold transition-colors hover:border-brand-300 peer-checked:border-brand-600 peer-checked:bg-brand-50 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-500">
                          <span
                            className={cn(
                              "grid h-9 w-9 place-items-center rounded-xl",
                              s.id === serviceId ? "bg-brand-600 text-sun-400" : "bg-brand-50 text-brand-700"
                            )}
                          >
                            <Icon size={18} />
                          </span>
                          {s.title}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="card p-6 sm:p-7">
                <legend className="px-2 font-display text-lg font-bold">2. {service.title}: trip details</legend>
                <div className="mt-2 grid gap-5 sm:grid-cols-2">
                  {service.fields
                    .filter((f) => isVisible(f, values))
                    .map((f) => (
                      <ServiceField
                        key={`${service.id}-${f.name}`}
                        field={f}
                        value={values[f.name] ?? ""}
                        values={values}
                        error={errors[f.name]}
                        onChange={setField}
                        today={today}
                      />
                    ))}
                </div>
                {service.privacyNote && (
                  <p className="mt-5 flex gap-2.5 text-[13px] leading-relaxed text-ink-600">
                    <InfoIcon size={16} className="mt-0.5 shrink-0 text-brand-600" /> {service.privacyNote}
                  </p>
                )}
              </fieldset>

              <fieldset className="card p-6 sm:p-7">
                <legend className="px-2 font-display text-lg font-bold">3. Your details</legend>
                <div className="mt-2 grid gap-5 sm:grid-cols-2">
                  <Field id="contact-fullName" label="Full name *" error={errors.fullName} wide>
                    <input
                      id="contact-fullName"
                      className="field"
                      value={contact.fullName}
                      onChange={(e) => setContactField("fullName", e.target.value)}
                      autoComplete="name"
                      placeholder="As it appears on your passport"
                      aria-invalid={errors.fullName ? "true" : undefined}
                      aria-describedby={errors.fullName ? "contact-fullName-error" : undefined}
                    />
                  </Field>
                  <Field id="contact-email" label="Email *" error={errors.email}>
                    <input
                      id="contact-email"
                      type="email"
                      className="field"
                      value={contact.email}
                      onChange={(e) => setContactField("email", e.target.value)}
                      autoComplete="email"
                      aria-invalid={errors.email ? "true" : undefined}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                    />
                  </Field>
                  <Field id="contact-phone" label="Phone (with country code) *" error={errors.phone}>
                    <input
                      id="contact-phone"
                      type="tel"
                      className="field"
                      value={contact.phone}
                      onChange={(e) => setContactField("phone", e.target.value)}
                      autoComplete="tel"
                      placeholder="+265 …"
                      aria-invalid={errors.phone ? "true" : undefined}
                      aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                    />
                  </Field>
                  <Field id="contact-notes" label="Anything else we should know? (optional)" wide>
                    <textarea
                      id="contact-notes"
                      className="field"
                      rows={3}
                      value={contact.notes}
                      onChange={(e) => setContactField("notes", e.target.value)}
                    />
                  </Field>
                </div>
              </fieldset>

              {Object.values(errors).some(Boolean) && (
                <p role="alert" className="rounded-2xl bg-flag/10 px-4 py-3 text-sm font-bold text-flag">
                  Please check the highlighted fields.
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" className="btn btn-primary">
                  Review &amp; prepare email <ArrowRightIcon size={18} />
                </button>
                <p className="text-[13px] text-ink-500">Nothing is sent until you press send in your email.</p>
              </div>
            </form>
          )}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28">
          <div className="panel-dark on-dark p-6">
            <h2 className="text-xl font-extrabold text-sun-400">How booking works</h2>
            <ol className="mt-4 space-y-3 text-[14px] leading-relaxed text-white/80">
              <li><strong className="text-white">1.</strong> Fill in the form and prepare the email.</li>
              <li><strong className="text-white">2.</strong> Send it to {SITE.email}.</li>
              <li><strong className="text-white">3.</strong> We reply to confirm the details, the price and how to pay.</li>
            </ol>
          </div>
          <div className="card p-6">
            <h2 className="text-lg font-bold">Prefer to talk?</h2>
            <ul className="mt-3 space-y-2.5">
              {SITE.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="inline-flex items-center gap-2.5 text-[15px] font-semibold text-brand-700 hover:underline">
                    <PhoneIcon size={16} /> {p.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2.5 text-[15px] font-semibold text-brand-700 hover:underline">
                  <MailIcon size={16} /> {SITE.email}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-ink-500">
              <Link to="/contact" className="underline">More ways to reach us</Link>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
