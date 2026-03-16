import { useLazyImage, type UseLazyImageOptions } from "./use-lazy-load";
import { cn } from "@/shared";
import { ImageOff } from "lucide-react";

export interface LazyImageProps extends UseLazyImageOptions {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  aspectRatio?: string;
  className?: string;
  imgClassName?: string;
  showBadge?: boolean;
}

export function LazyImage({
  src,
  alt,
  className,
  threshold = 0.1,
  rootMargin = "80px",
  imgClassName,
}: LazyImageProps) {
  const { ref, status, onLoad, onError } = useLazyImage({
    threshold,
    rootMargin,
  });
  const isLoaded = status === "loaded";
  const isError = status === "error";

  return (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden bg-muted", className)}
    >
      {status !== "idle" && !isError && (
        <img
          src={src}
          alt={alt}
          onLoad={onLoad}
          onError={onError}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out",
            {
              "blur-0 scale-100 opacity-100": isLoaded,
              "blur-2xl scale-110 opacity-0": !isLoaded,
            },
            imgClassName
          )}
        />
      )}

      {isError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <ImageOff className="w-8 h-8 opacity-40" />
          <span className="text-xs opacity-60">Failed to load</span>
        </div>
      )}
    </div>
  );
}
