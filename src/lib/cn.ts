import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** cn: merge Tailwind classes + conditionals */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
