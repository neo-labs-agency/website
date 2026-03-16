import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl font-medium whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-[#7B3FE4]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "bg-[#7B3FE4] text-white shadow-[0_0_30px_rgba(123,63,228,0.4)] hover:bg-[#9D6BF7] hover:shadow-[0_0_40px_rgba(123,63,228,0.5)]",
        outline:
          "border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:border-[#7B3FE4]/50",
        ghost: "text-white/90 hover:bg-white/10 hover:text-white",
        link: "text-[#9D6BF7] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 gap-2 px-6 text-sm",
        sm: "h-9 gap-1.5 px-4 text-sm",
        lg: "h-12 gap-2 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
