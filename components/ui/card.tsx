import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type CardTone = "default" | "raised" | "muted";
type CardPadding = "none" | "sm" | "md" | "lg";

const toneClass: Record<CardTone, string> = {
  default: "bg-card",
  raised: "bg-raised",
  muted: "bg-muted",
};

const paddingClass: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

type CardProps = {
  as?: ElementType;
  tone?: CardTone;
  padding?: CardPadding;
  interactive?: boolean;
} & ComponentPropsWithoutRef<"div">;

export function Card({
  as: Component = "div",
  tone = "default",
  padding = "md",
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-lg border border-border",
        toneClass[tone],
        paddingClass[padding],
        interactive &&
          "transition-colors duration-(--motion-fast) ease-motion focus-within:border-boundary hover:border-boundary",
        className,
      )}
      {...props}
    />
  );
}
