import { HeroScene } from "@/components/Scenes";
import { useFirstImage } from "@/lib/useFirstImage";
import { HERO_IMAGE } from "@/config/site";
import { srcsFor } from "@/lib/photos";

// Full-bleed hero background: a photo when one is available (deep-green → teal gradient over it),
// otherwise a drawn sunrise scene with a drifting plane.
export default function HeroBackdrop() {
  const { src, done } = useFirstImage(srcsFor(HERO_IMAGE));

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {src ? (
        <>
          <img src={src} alt="" className="h-full w-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </>
      ) : (
        <div className={`hero-bg absolute inset-0 transition-opacity duration-500 ${done ? "opacity-100" : "opacity-90"}`}>
          <HeroScene className="absolute inset-x-0 bottom-0 h-[58%] w-full min-h-[14rem]" />
          <div className="cloud-drift absolute left-0 top-[14%] w-56 opacity-70">
            <svg viewBox="0 0 200 50"><g fill="#fff" opacity="0.2"><ellipse cx="70" cy="32" rx="62" ry="14" /><ellipse cx="108" cy="22" rx="40" ry="14" /></g></svg>
          </div>
          <div className="cloud-drift absolute left-0 top-[34%] w-40 opacity-60 [animation-duration:130s] [animation-delay:-40s]">
            <svg viewBox="0 0 200 50"><g fill="#fff" opacity="0.16"><ellipse cx="70" cy="32" rx="62" ry="14" /><ellipse cx="108" cy="22" rx="40" ry="14" /></g></svg>
          </div>
          <div className="plane-fly absolute left-0 top-[22%]">
            <div className="plane-bob flex items-center">
              <span className="mr-1 block h-[3px] w-28 rounded-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.65))]" />
              <svg viewBox="0 0 120 44" className="w-16 sm:w-20" style={{ transform: "rotate(-6deg)" }}>
                <path d="M4 24Q4 19 12 19H84Q104 17 116 22Q104 28 84 28H12Q4 28 4 24Z" fill="#fff" />
                <path d="M12 19 4 6H14L26 19Z" fill="#e6f6ec" />
                <path d="M52 24 38 40H52L70 26Z" fill="#d3efdc" />
                <path d="M54 18 40 2H54L72 16Z" fill="#fff" />
              </svg>
            </div>
          </div>
        </div>
      )}
      <div className="fade-to-paper absolute inset-x-0 bottom-0 h-24" />
    </div>
  );
}
