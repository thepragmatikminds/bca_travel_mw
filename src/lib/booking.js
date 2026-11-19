import { SITE } from "@/config/site";
import { formatDate } from "@/lib/dates";

export const isVisible = (field, values) =>
  !field.showIf || Object.entries(field.showIf).every(([key, val]) => values[key] === val);

export const defaultValues = (service, query) => {
  const values = {};
  for (const f of service.fields) {
    let fromQuery = query?.get(f.name) ?? null;
    if (fromQuery !== null && f.type === "select" && !f.options.includes(fromQuery)) fromQuery = null;
    values[f.name] = fromQuery ?? f.default ?? "";
  }
  return values;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(service, contact, values, today) {
  const errors = {};
  if (!contact.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!EMAIL_RE.test(contact.email.trim())) errors.email = "Please enter a valid email address.";
  if (contact.phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a phone number we can reach you on.";

  for (const f of service.fields) {
    if (!isVisible(f, values)) continue;
    const v = String(values[f.name] ?? "").trim();
    if (f.required && !v) {
      errors[f.name] = "This is required.";
      continue;
    }
    if (!v) continue;
    if (f.type === "date") {
      if (v < today && f.name !== "passportExpiry") errors[f.name] = "Please choose a date from today onwards.";
      else if (f.name === "passportExpiry" && v < today) errors[f.name] = "This passport appears to have expired.";
      else if (f.after && values[f.after]) {
        const other = values[f.after];
        if (f.strict ? v <= other : v < other) {
          errors[f.name] = f.strict ? "This must be after the previous date." : "This cannot be before the previous date.";
        }
      }
    }
    if (f.type === "number") {
      const n = Number(v);
      if (!Number.isFinite(n) || n < (f.min ?? 1) || n > (f.max ?? 999)) {
        errors[f.name] = `Enter a number between ${f.min ?? 1} and ${f.max ?? 999}.`;
      }
    }
  }
  return errors;
}

const makeReference = () => {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(2);
  const stamp = `${yy}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i += 1) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `BCA-${stamp}-${code}`;
};

const displayValue = (field, value) => (field.type === "date" ? formatDate(value) : value);

export function buildRequest(service, contact, values) {
  const reference = makeReference();
  const rows = service.fields
    .filter((f) => isVisible(f, values) && String(values[f.name] ?? "").trim() !== "")
    .map((f) => ({ label: f.label.replace(/ \(optional\)$/, ""), value: displayValue(f, String(values[f.name]).trim()) }));

  const contactRows = [
    { label: "Name", value: contact.fullName.trim() },
    { label: "Email", value: contact.email.trim() },
    { label: "Phone", value: contact.phone.trim() },
  ];
  const notes = (contact.notes || "").trim();

  const lines = [
    "Hello BCA Travel,",
    "",
    `I would like to request: ${service.title}`,
    `Reference: ${reference}`,
    "",
    "TRIP DETAILS",
    ...rows.map((r) => `${r.label}: ${r.value}`),
    "",
    "MY DETAILS",
    ...contactRows.map((r) => `${r.label}: ${r.value}`),
  ];
  if (notes) lines.push("", "NOTES", notes);
  lines.push(
    "",
    "Please confirm availability and the price, and let me know how to pay.",
    "",
    "(Sent from the BCA Travel website — pilot)"
  );

  return {
    reference,
    service,
    rows,
    contactRows,
    notes,
    subject: `${reference} | ${service.title} request | ${contact.fullName.trim()}`,
    body: lines.join("\n"),
  };
}

const crlf = (text) => text.replace(/\r?\n/g, "\r\n");

export const mailtoUrl = (req) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(req.subject)}&body=${encodeURIComponent(crlf(req.body))}`;

export const gmailUrl = (req) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE.email)}&su=${encodeURIComponent(
    req.subject
  )}&body=${encodeURIComponent(req.body)}`;

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}
