import { Link } from "@/lib/router";
import { ArrowUpRightIcon } from "@/components/Icons";

export default function RouteCard({ route }) {
  const to = `/book?service=air-ticket&from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`;
  return (
    <Link to={to} className="card group block p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-lift">
      <div className="flex items-start justify-between">
        <p className="font-display text-[26px] font-medium leading-none tracking-tight">
          {route.fromCode} <span className="px-1 text-ink-400">—</span> {route.toCode}
        </p>
        <ArrowUpRightIcon size={18} className="text-ink-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600" />
      </div>
      <p className="mt-2 text-[15px] text-ink-500">
        {route.from} to {route.to}
      </p>
      <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">Price</p>
          <p className="mt-0.5 text-[15px] font-bold">Quoted by email</p>
        </div>
        <p className="text-right text-[12.5px] leading-snug text-ink-500">
          Return or one-way
          <br />
          Choose dates next
        </p>
      </div>
    </Link>
  );
}
