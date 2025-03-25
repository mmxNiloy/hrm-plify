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
        "group drop-shadow-lg data-[state=open]:from-red-500 data-[state=open]:to-fuchsia-400 data-[state=open]:bg-gradient-to-b transition-colors",
        className
      )}
      {...props}
    >
      <div className="flex relative">
        {Icon ? (
          <span className="scale-100 rotate-0 group-data-[state=open]:scale-0 group-data-[state=open]:rotate-[135deg] transition-all">
            {Icon}
          </span>
        ) : (
          <Icons.plus className="scale-100 rotate-0 group-data-[state=open]:scale-0 group-data-[state=open]:rotate-[135deg] transition-all" />
        )}

        <Icons.cross className="absolute scale-0 rotate-[135deg] group-data-[state=open]:scale-100 group-data-[state=open]:rotate-0 transition-all" />
      </div>
      {label ?? "Open"}
    </Button>
  )
);
AnimatedTrigger.displayName = "AnimatedTrigger";

export default AnimatedTrigger;
