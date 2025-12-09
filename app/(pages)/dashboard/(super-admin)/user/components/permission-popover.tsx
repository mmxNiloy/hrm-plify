import { Button, ButtonProps } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { IPermission } from "@/schema/UserSchema";
import { ChevronRight, Info } from "lucide-react";
import React from "react";
import { getCenterPosition } from "react-zoom-pan-pinch";

interface Props extends ButtonProps {
  data: IPermission[];
  titleText?: string;
}

const PermissionPopover = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, data, titleText = "Permissions", ...props }, ref) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn("gap-1", className)}
            ref={ref}
            {...props}
          ></Button>
        </PopoverTrigger>
        <PopoverContent>
          <p className="font-semibold">
            Allowed {titleText}({data.length})
          </p>
          {data.length > 0 ? (
            <ScrollArea className="h-64 border border-muted rounded-md mt-1 overflow-x-clip">
              <div className="p-2 flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
                  {data.map((item) => (
                    <div
                      key={item.permission_id}
                      className="flex gap-0.5 w-full items-center break-words"
                    >
                      <ChevronRight className="size-3 flex-shrink-0" />
                      <li
                        key={item.permission_id}
                        className="line-clamp-2 text-ellipsis overflow-clip list-inside"
                      >
                        {item.description}
                      </li>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="w-full h-64 flex flex-1 flex-col gap-2 items-center justify-center text-center p-2 mt-1 rounded-md border border-muted">
              <Info />
              <p>No Data</p>
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  }
);

PermissionPopover.displayName = "PermissionPopover";

export default PermissionPopover;
