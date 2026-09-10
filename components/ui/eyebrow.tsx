import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type EyebrowProps = {
  as?: ElementType;
} & ComponentPropsWithoutRef<"p">;

export function Eyebrow({ as: Component = "p", className, ...props }: EyebrowProps) {
  return (
    <Component
      className={cn("text-small tracking-eyebrow text-muted-foreground uppercase", className)}
      {...props}
    />
  );
}
