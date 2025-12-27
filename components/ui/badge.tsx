import * as React from "react";
import { cn } from "../../lib/utils";

export const Badge = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full bg-accent text-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]",
      className
    )}
    {...props}
  />
);
