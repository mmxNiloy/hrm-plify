"use client";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import React, { HTMLAttributes, useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icons from "@/components/ui/icons";
import { BackLinkButton } from "./BackLinkButton";
import { cn } from "@/lib/utils";
import {
  INavDrawerControlContextProps,
  NavDrawerControlContext,
} from "@/context/NavDrawerControlContext";

interface INavDrawerProps extends HTMLAttributes<HTMLDivElement> {
  description?: string;
  dir?: "ltr" | "rtl";
  backLink?: string;
}

const NavDrawer = React.forwardRef<HTMLDivElement, INavDrawerProps>(
  ({ className, description = "Menu", backLink, ...props }, ref) => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const drawerControls: INavDrawerControlContextProps = {
      closeDrawer: () => setOpenDrawer(false),
    };

    return (
      <NavDrawerControlContext.Provider value={drawerControls}>
        <Drawer direction="left" open={openDrawer} onOpenChange={setOpenDrawer}>
          <DrawerTrigger className="fixed top-5 left-4 z-50 md:hidden">
            <Icons.menu />
          </DrawerTrigger>

          <DrawerContent className="fixed top-0 left-0 right-auto h-screen mt-0 sm:max-w-screen-sm md:max-w-screen-md rounded-none">
            <DrawerHeader className="relative">
              <DrawerTitle>Menu</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
              <DrawerClose className="absolute top-2 right-2">
                <Icons.cross />
              </DrawerClose>
            </DrawerHeader>

            <ScrollArea
              ref={ref}
              className={cn("h-[80vh] px-2", className)}
              {...props}
            ></ScrollArea>

            <BackLinkButton
              href={backLink}
              onClick={() => setOpenDrawer(false)}
            />
          </DrawerContent>
        </Drawer>
      </NavDrawerControlContext.Provider>
    );
  }
);
NavDrawer.displayName = "NavDrawer";

export default NavDrawer;
