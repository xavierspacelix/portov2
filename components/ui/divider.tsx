import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type DividerProps = {
  as?: ElementType;
} & ComponentPropsWithoutRef<"div">;

export function Divider({ as: Component = "div", className, ...props }: DividerProps) {
  const isHr = Component === "hr";
  return (
    <Component
      className={cn("h-px w-full border-0 bg-border", className)}
      aria-hidden={isHr ? undefined : true}
      {...props}
    />
  );
}
