import { cn } from "@/lib/utils";

// Mountain-peaks mark echoing the BCA Travel logo on the poster.
export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lm-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a5530" />
          <stop offset="1" stopColor="#0b6b36" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#lm-bg)" />
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
        <span className={cn("block font-display text-[21px] font-semibold tracking-tight", light ? "text-white" : "text-ink-900")}>
          BCA Travel
        </span>
        <span className={cn("mt-1 block text-[9px] font-bold uppercase tracking-[0.24em]", light ? "text-white/60" : "text-ink-500")}>
          Malawi
        </span>
      </span>
    </span>
  );
}
