// "Add to Home Screen" support.
// Chrome / Edge / Android fire `beforeinstallprompt` — we keep that event and call it from our own button.
// iPhone / iPad Safari has no such event, so we show step-by-step instructions instead.
// Browsers only allow the real install dialog after a tap, so we show our own banner automatically
// and the tap on "Install" opens the native dialog.
import { useSyncExternalStore } from "react";

const DISMISS_KEY = "bca-install-dismissed";
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // ask again after a week

let deferred = null;
let version = 0;
const listeners = new Set();
const emit = () => {
  version += 1;
  listeners.forEach((l) => l());
};

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e;
    emit();
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    emit();
  });
}

const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

const readDismissed = () => {
  try {
    return Number(window.localStorage.getItem(DISMISS_KEY)) || 0;
  } catch {
    return 0;
  }
};

export function useInstall() {
  useSyncExternalStore(subscribe, () => version, () => 0);

  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isIos =
    /iphone|ipad|ipod/i.test(ua) ||
    (typeof navigator !== "undefined" && navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const standalone =
    typeof window !== "undefined" &&
    (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true);
  const dismissedRecently = Date.now() - readDismissed() < COOLDOWN_MS;

  const install = async () => {
    if (!deferred) return "unavailable";
    deferred.prompt();
    const choice = await deferred.userChoice.catch(() => ({ outcome: "dismissed" }));
    deferred = null;
    emit();
    return choice.outcome;
  };

  const dismiss = () => {
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* private mode: ignore */
    }
    emit();
  };

  return { canPrompt: Boolean(deferred), isIos, standalone, dismissedRecently, install, dismiss };
}
