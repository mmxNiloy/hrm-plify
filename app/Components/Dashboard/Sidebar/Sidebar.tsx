"use client";
import { cn } from "@/lib/utils";
import * as React from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /// Where to position the sidebar, default left
  position?: "left" | "right";
  open?: boolean;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, position = "left", open = false, ...props }, ref) => {
    return (
      <div
        data-state={open ? "open" : "closed"}
        data-position={position}
        data-position-state={`${position}-${open ? "open" : "closed"}`}
        className={cn(
          "peer/sidebar fixed transition-all duration-300 space-y-4 data-[state=closed]:w-20 data-[state=closed]:2xl:w-24 data-[state=open]:w-64 data-[state=open]:2xl:w-96 h-screen px-4 py-8 data-[position=left]:border-e data-[position=left]:left-0 data-[position=right]:border-s data-[position=right]:right-0 drop-shadow-sm",
          className
        )}
        ref={ref}
        {...props}
      ></div>
    );
  }
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
SidebarHeader.displayName = "DialogHeader";

const SidebarViewport = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "float-right transition-all duration-300 px-4 py-8 peer-data-[position-state=left-open]/sidebar:w-[calc(100%-16rem)] peer-data-[position-state=left-closed]/sidebar:w-[calc(100%-4rem)] peer-data-[position-state=right-open]/sidebar:mr-64 peer-data-[position-state=right-closed]/sidebar:mr-16",
      className
    )}
    ref={ref}
    {...props}
  ></div>
));
SidebarViewport.displayName = "SidebarViewport";

export { Sidebar, SidebarHeader, SidebarViewport };
