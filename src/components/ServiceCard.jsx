import { Link } from "@/lib/router";
import { SERVICE_ICONS, ArrowRightIcon } from "@/components/Icons";

export default function ServiceCard({ service }) {
  const Icon = SERVICE_ICONS[service.icon];
  return (
    <Link
      to={`/book?service=${service.id}`}
      className="card group flex h-full flex-col p-6 transition-all hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-lift"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 text-sun-400">
        <Icon size={24} />
      </span>
      <h3 className="mt-5 text-xl font-bold text-ink-900">{service.title}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-600">{service.short}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-700">
        Request this service
        <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
