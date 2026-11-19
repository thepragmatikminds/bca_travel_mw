import { SITE } from "@/config/site";

export default function PilotBanner() {
  if (!SITE.pilot.enabled) return null;
  return (
    <div className="bg-sun-400 text-ink-900">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-[13px] font-semibold">
        <span className="rounded-full bg-ink-900 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-sun-400">
          Pilot phase
        </span>
        <span>{SITE.pilot.banner}</span>
      </div>
    </div>
  );
}
