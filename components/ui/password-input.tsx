import React, { HTMLAttributes, useState } from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import Icons from "./icons";

interface Props extends HTMLAttributes<HTMLInputElement> {
  name?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  ({ className, name, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div
        data-state={isVisible ? "shown" : "hidden"}
        className="relative flex w-full"
      >
        <Input
          type={isVisible ? "text" : "password"}
          ref={ref}
          className={cn(className, "w-full pr-16")}
          {...props}
          name={name}
        />
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => setIsVisible((oldVal) => !oldVal)}
          className="absolute bg-transparent hover:bg-transparent right-0 bottom-0 border-none focus-visible:border-none focus-visible:ring-0 ring-0"
        >
          {isVisible ? <Icons.visible /> : <Icons.hidden />}
        </Button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
