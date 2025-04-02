import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ButtonGradient } from "@/styles/button.tailwind";
import { LucideIcon } from "lucide-react";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  label?: string;
  Icon?: React.ReactNode;
  disabled?: boolean;
}

const AnimatedTrigger = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, label, Icon, disabled = false, ...props }, ref) => (
    <Button
      disabled={disabled}
      ref={ref}
      className={cn(
        ButtonGradient,
        "group drop-shadow-lg data-[state=open]:from-red-500 data-[state=open]:to-fuchsia-400 data-[state=open]:bg-gradient-to-b transition-colors text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 relative">
        {Icon ? (
          <span className="scale-100 rotate-0 group-data-[state=open]:scale-0 group-data-[state=open]:rotate-[135deg] transition-all size-4 sm:size-5">
            {Icon}
          </span>
        ) : (
          <Icons.plus className="scale-100 rotate-0 group-data-[state=open]:scale-0 group-data-[state=open]:rotate-[135deg] transition-all size-4 sm:size-5" />
        )}
        <Icons.cross className="absolute scale-0 rotate-[135deg] group-data-[state=open]:scale-100 group-data-[state=open]:rotate-0 transition-all size-4 sm:size-5" />
        {label && <span>{label}</span>}
      </div>
    </Button>
  )
);
AnimatedTrigger.displayName = "AnimatedTrigger";

export default AnimatedTrigger;
