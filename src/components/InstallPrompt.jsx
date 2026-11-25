import { useEffect, useState } from "react";
import { LogoMark } from "@/components/Logo";
import { CloseIcon, ShareIcon, PlusSquareIcon } from "@/components/Icons";
import { useLocation } from "@/lib/router";
import { useInstall } from "@/lib/install";

// Slides up a few seconds after the page loads when the app can be installed and isn't already.
export default function InstallPrompt() {
  const { canPrompt, isIos, standalone, dismissedRecently, install, dismiss } = useInstall();
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [steps, setSteps] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const eligible = !standalone && !hidden && !dismissedRecently && (canPrompt || isIos);
  // Don't cover the booking form.
  if (!ready || !eligible || pathname.startsWith("/book")) return null;

  const close = () => {
    dismiss();
    setHidden(true);
  };

  const onInstall = async () => {
    if (canPrompt) {
      const outcome = await install();
      if (outcome !== "accepted") close();
      else setHidden(true);
    } else {
      setSteps(true);
    }
  };

  return (
    <div
      role="dialog"
      aria-label="Install BCA Travel"
      className="on-dark slide-up fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+4.75rem)] z-50 rounded-3xl border border-white/15 bg-ink-900/95 p-4 text-white shadow-lift backdrop-blur-xl md:inset-x-auto md:bottom-6 md:right-6 md:w-[24rem]"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Not now"
        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
      >
        <CloseIcon size={16} />
      </button>

      <div className="flex items-start gap-3 pr-8">
        <LogoMark className="h-12 w-12 shrink-0" />
        <div>
          <p className="font-display text-[17px] font-bold leading-tight">Install BCA Travel</p>
          <p className="mt-1 text-[13px] leading-relaxed text-white/70">
            Add us to your home screen for one-tap booking requests, even on a slow connection.
          </p>
        </div>
      </div>

      {steps ? (
        <ol className="mt-4 space-y-2.5 rounded-2xl bg-white/8 p-3.5 text-[13px] leading-relaxed text-white/85">
          <li className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15"><ShareIcon size={15} /></span>
            <span>Tap the <strong>Share</strong> button in your browser.</span>
          </li>
          <li className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15"><PlusSquareIcon size={15} /></span>
            <span>Choose <strong>Add to Home Screen</strong>, then <strong>Add</strong>.</span>
          </li>
        </ol>
      ) : (
        <div className="mt-4 flex gap-2.5">
          <button type="button" onClick={onInstall} className="btn btn-sun flex-1 !py-2.5">
            {canPrompt ? "Install app" : "Show me how"}
          </button>
          <button type="button" onClick={close} className="btn btn-ghost-light !px-4 !py-2.5">
            Not now
          </button>
        </div>
      )}
    </div>
  );
}
