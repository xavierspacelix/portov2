import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type SectionSpacing = "default" | "tight" | "loose";

const spacingClass: Record<SectionSpacing, string> = {
  tight: "py-section-y-tight",
  default: "py-section-y",
  loose: "py-section-y-loose",
};

type SectionProps = {
  as?: ElementType;
  spacing?: SectionSpacing;
} & ComponentPropsWithoutRef<"section">;

export function Section({
  as: Component = "section",
  spacing = "default",
  className,
  ...props
}: SectionProps) {
  return <Component className={cn("w-full", spacingClass[spacing], className)} {...props} />;
}
