import { useCallback, useEffect, useRef, useState } from "react";

export type LazyImageStatus = "idle" | "loading" | "loaded" | "error";

export interface UseLazyImageOptions {
  /** Fraction of element that must be visible before load starts (0–1). Default: 0.1 */
  threshold?: number;
  /** Pre-load margin before element scrolls into view. Default: "80px" */
  rootMargin?: string;
}

export interface UseLazyImageReturn {
  /** Attach to the container element you want to observe */
  ref: React.RefObject<HTMLDivElement | null>;
  status: LazyImageStatus;
  onLoad: () => void;
  onError: () => void;
}

export function useLazyImage({
  threshold = 0.1,
  rootMargin = "80px",
}: UseLazyImageOptions = {}): UseLazyImageReturn {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<LazyImageStatus>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || status !== "idle") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatus("loading");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, status]);

  const onLoad = useCallback(() => setStatus("loaded"), []);
  const onError = useCallback(() => setStatus("error"), []);

  return { ref, status, onLoad, onError };
}
