import { Link } from "@/lib/router";
import Photo from "@/components/Photo";
import { ServiceScene } from "@/components/Scenes";
import { SERVICE_ICONS, ArrowRightIcon } from "@/components/Icons";
import { srcsFor } from "@/lib/photos";

export default function ServiceCard({ service }) {
  const Icon = SERVICE_ICONS[service.icon];
  return (
    <Link
      to={`/book?service=${service.id}`}
      className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Photo
          srcs={srcsFor(service.image)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          fallback={<ServiceScene id={service.id} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />}
        />
        <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-brand-700 shadow-soft">
          <Icon size={19} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[23px] leading-tight">{service.title}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-600">{service.short}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-700">
          Request this service <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
