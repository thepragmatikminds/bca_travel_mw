import { useMemo, useState } from "react";
import { useNavigate } from "@/lib/router";
import { ArrowRightIcon, CalendarIcon, MapPinIcon, SERVICE_ICONS } from "@/components/Icons";
import { SERVICES } from "@/config/site";
import { todayIso } from "@/lib/dates";
import { cn } from "@/lib/utils";

// Hero planner: pick a service, say where and when, and the booking form opens pre-filled.
export default function QuickRequest() {
  const navigate = useNavigate();
  const today = useMemo(todayIso, []);
  const [serviceId, setServiceId] = useState(SERVICES[0].id);
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const service = SERVICES.find((s) => s.id === serviceId);
  const q = service.quick;

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({ service: serviceId });
    if (place.trim()) params.set(q.placeField, place.trim());
    if (date) params.set(q.dateField, date);
    navigate(`/book?${params.toString()}`);
  };

  return (
    <form onSubmit={submit} className="rounded-[2rem] bg-white p-5 text-ink-900 shadow-lift sm:p-6" aria-label="Quick booking request">
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible" role="radiogroup" aria-label="Service">
        {SERVICES.map((s) => {
          const Icon = SERVICE_ICONS[s.icon];
          const active = s.id === serviceId;
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setServiceId(s.id)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-bold transition-all",
                active ? "grad-brand border-transparent text-white shadow-soft" : "border-line bg-white text-ink-600 hover:border-brand-300"
              )}
            >
              <Icon size={15} /> {s.shortTitle}
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-3.5">
        <label className="block">
          <span className="field-label"><MapPinIcon size={13} /> {q.placeLabel}</span>
          <input className="field" value={place} onChange={(e) => setPlace(e.target.value)} placeholder={q.placePlaceholder} autoComplete="off" />
        </label>
        <label className="block">
          <span className="field-label"><CalendarIcon size={13} /> {q.dateLabel}</span>
          <input className="field" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
      </div>

      <button type="submit" className="btn btn-primary mt-5 w-full !py-3.5">
        Continue <ArrowRightIcon size={17} />
      </button>
      <p className="mt-3 text-center text-[12px] text-ink-500">No payment now. We confirm by email first.</p>
    </form>
  );
}
