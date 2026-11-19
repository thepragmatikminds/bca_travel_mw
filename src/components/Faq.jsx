import { FAQS } from "@/config/site";
import { ChevronDownIcon } from "@/components/Icons";

export default function Faq() {
  return (
    <div className="space-y-3">
      {FAQS.map((item) => (
        <details key={item.q} className="card group px-5 py-4 open:border-brand-500">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[17px] font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDownIcon size={20} className="shrink-0 text-brand-600 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
