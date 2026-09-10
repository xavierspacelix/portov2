import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "relative inline-flex select-none items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors duration-(--motion-fast) ease-motion disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-foreground hover:bg-accent/90",
        secondary: "border border-boundary bg-background text-foreground hover:bg-muted",
        ghost: "bg-transparent text-foreground hover:bg-muted",
      },
      size: {
        sm: "h-9 px-3 text-small",
        md: "h-11 px-5 text-body",
        lg: "h-12 px-7 text-lead",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = {
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  variant,
  size,
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      {...props}
    >
      <span className={cn("inline-flex items-center gap-2", loading && "invisible")}>
        {children}
      </span>
      {loading ? (
        <Loader2 className="absolute inset-0 m-auto size-4 animate-spin" aria-hidden />
      ) : null}
    </button>
  );
}
