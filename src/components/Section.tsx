import * as React from "react";
import { cn } from "@/lib/cn";

export function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-10 sm:py-14", className)} {...props} />;
}
