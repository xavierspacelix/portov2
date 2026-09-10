import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-small font-medium",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground",
        outline: "border border-boundary text-foreground",
        accent: "bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeProps = {
  as?: ElementType;
} & VariantProps<typeof badgeVariants> &
  ComponentPropsWithoutRef<"span">;

export function Badge({ variant, as: Component = "span", className, ...props }: BadgeProps) {
  return <Component className={cn(badgeVariants({ variant }), className)} {...props} />;
}
