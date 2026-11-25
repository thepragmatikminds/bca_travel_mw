import { useState } from "react";
import { useInstall } from "@/lib/install";

// Always-available "Install app" link (footer), for people who dismissed the banner.
export default function InstallAppButton({ className }) {
  const { canPrompt, isIos, standalone, install } = useInstall();
  const [tip, setTip] = useState(false);

  if (standalone || (!canPrompt && !isIos)) return null;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => (canPrompt ? install() : setTip((v) => !v))}
        className="btn btn-ghost-light !px-4 !py-2 text-[13px]"
      >
        Install app
      </button>
      {tip && (
        <p className="mt-2 max-w-[16rem] text-xs text-white/70">Tap the Share button, then choose “Add to Home Screen”.</p>
      )}
    </div>
  );
}
