import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type StackDirection = "col" | "row";
type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
type StackJustify = "start" | "center" | "end" | "between" | "around";

const directionClass: Record<StackDirection, string> = {
  col: "flex-col",
  row: "flex-row",
};

const gapClass: Record<StackGap, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

const alignClass: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyClass: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

type StackProps = {
  as?: ElementType;
  direction?: StackDirection;
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
} & ComponentPropsWithoutRef<"div">;

export function Stack({
  as: Component = "div",
  direction = "col",
  gap = "md",
  align,
  justify,
  className,
  ...props
}: StackProps) {
  return (
    <Component
      className={cn(
        "flex",
        directionClass[direction],
        gapClass[gap],
        align && alignClass[align],
        justify && justifyClass[justify],
        className,
      )}
      {...props}
    />
  );
}
