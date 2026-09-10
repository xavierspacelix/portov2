import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type LinkProps = {
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href">;

export function Link({ href, external = false, className, children, ...props }: LinkProps) {
  const classes = cn(
    "text-link underline decoration-1 underline-offset-4 transition-colors duration-(--motion-fast) ease-motion hover:decoration-2",
    className,
  );

  const isPlain = external || href.startsWith("mailto:") || href.startsWith("tel:");

  if (isPlain) {
    return (
      <a
        href={href}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} {...props}>
      {children}
    </NextLink>
  );
}
