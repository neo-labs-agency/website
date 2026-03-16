import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";

const FADE_OUT_DELAY_MS = 200;

export function PageLoadBlur({ className }: { className?: string }) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, FADE_OUT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [mounted]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] pointer-events-none transition-[backdrop-filter,opacity] duration-[600ms] ease-out",
        !visible && "opacity-0 backdrop-blur-none",
        visible && "backdrop-blur-md",
        className
      )}
      style={{
        background: visible
          ? "rgba(10, 10, 15, 0.4)"
          : "transparent",
      }}
      aria-hidden
    />
  );
}
