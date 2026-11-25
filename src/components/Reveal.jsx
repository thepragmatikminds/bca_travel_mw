import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Fades and lifts content in as it scrolls into view. Shows immediately if animations aren't available.
export default function Reveal({ children, className, delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} style={delay ? { transitionDelay: `${delay}ms` } : undefined} className={cn("reveal", shown && "reveal-in", className)}>
      {children}
    </Tag>
  );
}
