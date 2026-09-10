import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type ContainerSize = "default" | "narrow" | "wide";

const sizeClass: Record<ContainerSize, string> = {
  default: "max-w-(--container-max)",
  narrow: "max-w-(--container-narrow)",
  wide: "max-w-(--container-wide)",
};

type ContainerProps = {
  as?: ElementType;
  size?: ContainerSize;
} & ComponentPropsWithoutRef<"div">;

export function Container({
  as: Component = "div",
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <Component className={cn("mx-auto w-full px-gutter", sizeClass[size], className)} {...props} />
  );
}
