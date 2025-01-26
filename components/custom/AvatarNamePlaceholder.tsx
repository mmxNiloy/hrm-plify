import { cn } from "@/lib/utils";
import { stringToColor } from "@/utils/Misc";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  name: string;
}

const AvatarNamePlaceholder = React.forwardRef<HTMLSpanElement, Props>(
  ({ name, className, ...props }, ref) => {
    return (
      <span
        style={{
          backgroundColor: stringToColor(name),
        }}
        className={cn(
          "flex items-center justify-center text-xl size-10 bg-muted rounded-full text-white",
          className
        )}
        ref={ref}
        {...props}
      >
        {name.charAt(0).toUpperCase()}
      </span>
    );
  }
);
AvatarNamePlaceholder.displayName = "AvatarNamePlaceholder";

export default AvatarNamePlaceholder;
