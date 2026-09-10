import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4;
type HeadingTone = "default" | "muted";

const levelClass: Record<HeadingLevel, string> = {
  1: "text-h1",
  2: "text-h2",
  3: "text-h3",
  4: "text-h4",
};

const levelTag: Record<HeadingLevel, "h1" | "h2" | "h3" | "h4"> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
};

const toneClass: Record<HeadingTone, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
};

type HeadingProps = {
  level: HeadingLevel;
  as?: ElementType;
  tone?: HeadingTone;
} & Omit<ComponentPropsWithoutRef<"h2">, "color">;

export function Heading({ level, as, tone = "default", className, ...props }: HeadingProps) {
  const Component = as ?? levelTag[level];
  return (
    <Component
      className={cn(
        "font-semibold tracking-heading text-balance",
        levelClass[level],
        toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}
