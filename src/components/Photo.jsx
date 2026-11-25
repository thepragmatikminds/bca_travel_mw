import { useFirstImage } from "@/lib/useFirstImage";

// Shows the first available photo, or the illustration passed as `fallback` when there is none.
export default function Photo({ srcs, alt = "", className, fallback }) {
  const { src, done } = useFirstImage(srcs);
  if (src) return <img src={src} alt={alt} loading="lazy" decoding="async" className={className} />;
  if (!done) return <div className="h-full w-full bg-tint" aria-hidden="true" />;
  return fallback;
}
