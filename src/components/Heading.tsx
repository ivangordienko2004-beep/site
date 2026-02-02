import React from "react";
import { cn } from "@/lib/cn";

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4";
};

export default function Heading({ as = "h1", className, ...rest }: Props) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "font-semibold tracking-tight text-2xl",
        as === "h1" && "text-3xl sm:text-4xl",
        as === "h2" && "text-2xl sm:text-3xl",
        className
      )}
      {...rest}
    />
  );
}
