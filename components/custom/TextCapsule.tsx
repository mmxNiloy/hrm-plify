import { cn } from "@/lib/utils";
import React from "react";

const TextCapsule = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    className={cn(
      "rounded-full w-fit bg-muted-foreground text-white items-center justify-center px-2 py-1 text-sm flex gap-1 [&>svg]:size-4",
      className
    )}
    {...props}
    ref={ref}
  ></p>
));
TextCapsule.displayName = "TextCapsule";

export default TextCapsule;
