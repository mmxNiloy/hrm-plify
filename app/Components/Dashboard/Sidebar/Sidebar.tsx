"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /// Where to position the sidebar, default left
  position?: "left" | "right";
  open?: boolean;
  hasNavbar?: boolean;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    { className, position = "left", hasNavbar = true, open = false, ...props },
    ref
  ) => {
    return (
      <div
        data-state={open ? "open" : "closed"}
        data-position={position}
        data-position-state={`${position}-${open ? "open" : "closed"}`}
        className={cn(
          "peer/sidebar group/sidebar fixed transition-all duration-100 data-[state=closed]:w-[5vw] data-[state=closed]:2xl:w-[6vw] data-[state=open]:w-1/6 data-[state=open]:2xl:w-1/5 h-screen data-[position=left]:border-e data-[position=left]:left-0 data-[position=right]:border-s data-[position=right]:right-0 drop-shadow-sm",
          hasNavbar ? "top-16" : "",
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
      "flex flex-col space-y-1.5 group-data-[state=open]/sidebar:p-2 p-0 transition-all text-center sm:text-left",
      className
    )}
    {...props}
  />
);
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("flex flex-col gap-4 px-4 py-4", className)}
    {...props}
    ref={ref}
  ></div>
));
SidebarContent.displayName = "SidebarContent";

const SidebarViewport = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "float-right transition-all duration-100 px-4 py-8 peer-data-[position-state=left-open]/sidebar:w-5/6 peer-data-[position-state=left-open]/sidebar:2xl:w-4/5 peer-data-[position-state=left-closed]/sidebar:w-[95vw] peer-data-[position-state=left-closed]/sidebar:2xl:w-[94vw] peer-data-[position-state=right-open]/sidebar:mr-64 peer-data-[position-state=right-closed]/sidebar:mr-16",
      className
    )}
    ref={ref}
    {...props}
  ></div>
));
SidebarViewport.displayName = "SidebarViewport";

interface SidebarLinkProps extends React.HTMLAttributes<HTMLButtonElement> {
  href: string;
  passHref?: boolean;
}

const SidebarLink = React.forwardRef<HTMLButtonElement, SidebarLinkProps>(
  ({ className, href, children, ...props }, ref) => {
    const path = usePathname();
    return (
      <Link className={"w-full"} href={href} passHref>
        <Button
          ref={ref}
          {...props}
          variant={"ghost"}
          className={cn(
            "w-full gap-4 hover:underline justify-center transition-all group-data-[state=open]/sidebar:justify-start",
            path === href
              ? "bg-blue-500 hover:bg-blue-400 text-white hover:text-white"
              : "",
            className
          )}
        >
          {children}
        </Button>
      </Link>
    );
  }
);
SidebarLink.displayName = "SidebarLink";

export { Sidebar, SidebarContent, SidebarHeader, SidebarLink, SidebarViewport };
