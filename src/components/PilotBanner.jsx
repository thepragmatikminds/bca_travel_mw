import { SITE } from "@/config/site";

export default function PilotBanner() {
  if (!SITE.pilot.enabled) return null;
  return (
    <div className="on-dark bg-[linear-gradient(100deg,#062f1c,#0a5530_55%,#0c6f86)] text-white">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-[12.5px] font-semibold">
        <span className="rounded-full bg-sun-400 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink-900">
          Pilot
        </span>
        <span className="text-white/90">{SITE.pilot.banner}</span>
      </div>
    </div>
  );
}
