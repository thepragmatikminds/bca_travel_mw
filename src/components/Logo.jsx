import { cn } from "@/lib/utils";

// Mountain-peaks mark echoing the BCA Travel logo on the poster.
export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="13" fill="#0B6B36" />
      <path d="M5 35 19 10l8.5 15L31 18.5 43 35Z" fill="#F7DF3A" />
      <path d="M19 10l-5.2 9.3 3.6-2.2 3.2 3.4 2.6-3.1Z" fill="#FBEA6A" />
    </svg>
  );
}

export default function Logo({ light = false, className }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-[22px] font-extrabold tracking-tight",
            light ? "text-sun-400" : "text-brand-800"
          )}
        >
          BCA
        </span>
        <span
          className={cn(
            "mt-0.5 block text-[12px] font-bold italic tracking-wide",
            light ? "text-white/80" : "text-brand-600"
          )}
        >
          Travel
        </span>
      </span>
    </span>
  );
}
