import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type TextSize = "lead" | "body" | "small";
type TextTone = "default" | "muted";

const sizeClass: Record<TextSize, string> = {
  lead: "text-lead",
  body: "text-body",
  small: "text-small",
};

const toneClass: Record<TextTone, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
};

type TextProps = {
  size?: TextSize;
  tone?: TextTone;
  as?: ElementType;
} & ComponentPropsWithoutRef<"p">;

export function Text({
  size = "body",
  tone = "default",
  as: Component = "p",
  className,
  ...props
}: TextProps) {
  return <Component className={cn(sizeClass[size], toneClass[tone], className)} {...props} />;
}
