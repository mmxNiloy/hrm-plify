import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  fromColor?: string;
  toColor?: string;
}

const GradientBorderContainer = React.forwardRef<HTMLDivElement, Props>(
  ({ className, fromColor, toColor, ...props }, ref) => (
    <div
      className={cn(
        `p-[0.125rem] from-[${fromColor ?? "#bd1cc2"}] to-[${
          toColor ?? "#f5561c"
        }] bg-gradient-to-r`,
        className
      )}
      ref={ref}
      {...props}
    ></div>
  )
);
GradientBorderContainer.displayName = "GradientBorderContainer";

export default GradientBorderContainer;
