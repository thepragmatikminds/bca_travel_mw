import { Link } from "@/lib/router";
import Photo from "@/components/Photo";
import { DestinationScene } from "@/components/Scenes";
import { ArrowRightIcon } from "@/components/Icons";
import { srcsFor } from "@/lib/photos";

export default function DestinationCard({ destination }) {
  const { city, country, kind, colors, image } = destination;
  return (
    <Link
      to={`/book?service=air-ticket&to=${encodeURIComponent(city)}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <Photo
        srcs={srcsFor(image)}
        alt={`${city}, ${country}`}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        fallback={<DestinationScene kind={kind} colors={colors} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />}
      />
      <div className="scrim-bottom absolute inset-x-0 bottom-0 p-5 pt-20 text-white">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/70">{country}</p>
        <p className="mt-1 font-display text-[28px] font-medium leading-none">{city}</p>
        <div className="mt-3 flex items-center justify-between text-[13px] text-white/80">
          <span>Flights · Hotels · Tours</span>
          <span className="inline-flex items-center gap-1.5 font-bold text-sun-300">
            Request <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
