import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Shows an "Install app" button where the browser supports it (Chrome/Edge/Android),
// and a short Add-to-Home-Screen tip on iPhone/iPad.
export default function InstallAppButton({ className }) {
  const [promptEvent, setPromptEvent] = useState(null);
  const [isIos, setIsIos] = useState(false);
  const [standalone, setStandalone] = useState(true);
  const [tip, setTip] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(display-mode: standalone)");
    setStandalone(media.matches || window.navigator.standalone === true);
    setIsIos(/iphone|ipad|ipod/i.test(window.navigator.userAgent));
    const onPrompt = (e) => {
      e.preventDefault();
      setPromptEvent(e);
    };
    const onInstalled = () => {
      setStandalone(true);
      setPromptEvent(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (standalone || (!promptEvent && !isIos)) return null;

  const install = async () => {
    if (!promptEvent) {
      setTip((v) => !v);
      return;
    }
    promptEvent.prompt();
    await promptEvent.userChoice.catch(() => null);
    setPromptEvent(null);
  };

  return (
    <div className={className}>
      <button type="button" onClick={install} className={cn("btn btn-ghost-light !px-4 !py-2 text-[13px]")}>
        Install app
      </button>
      {tip && (
        <p className="mt-2 max-w-[16rem] text-xs text-white/70">
          Tap the Share button, then choose “Add to Home Screen”.
        </p>
      )}
    </div>
  );
}
