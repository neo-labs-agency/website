import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border p-2 md:p-4 lg:p-6 border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-[#7B3FE4]/30 hover:bg-white/[0.07]",
        glow && "shadow-[0_0_40px_-12px_rgba(123,63,228,0.25)]",
        className
      )}
      {...props}
    />
  )
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
