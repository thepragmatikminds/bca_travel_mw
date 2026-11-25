import { useEffect, useState } from "react";

// Finds the first image in `srcs` that actually loads. Results are cached for the session.
const cache = new Map();

export function useFirstImage(srcs) {
  const key = (srcs || []).join("|");
  const [state, setState] = useState(() =>
    cache.has(key) ? { src: cache.get(key), done: true } : { src: null, done: !key }
  );

  useEffect(() => {
    if (!key) {
      setState({ src: null, done: true });
      return undefined;
    }
    if (cache.has(key)) {
      setState({ src: cache.get(key), done: true });
      return undefined;
    }
    let cancelled = false;
    const list = key.split("|");
    const tryNext = (i) => {
      if (cancelled) return;
      if (i >= list.length) {
        cache.set(key, null);
        setState({ src: null, done: true });
        return;
      }
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        cache.set(key, list[i]);
        setState({ src: list[i], done: true });
      };
      img.onerror = () => tryNext(i + 1);
      img.src = list[i];
    };
    tryNext(0);
    return () => {
      cancelled = true;
    };
  }, [key]);

  return state;
}
