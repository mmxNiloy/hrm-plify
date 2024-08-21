"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import NavLogo from "../../Navbar/NavLogo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import DashboardNavMenu from "./DashboardNavMenu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export default function DashboardNavbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center gap-2 md:gap-4 lg:gap-8 px-6 md:px-8 lg:px-16 sm:space-x-0">
        <NavLogo href="/dashboard" />

        <DashboardNavMenu />

        {/* Empty gap */}
        <span className="flex-grow" />

        {/* <LoginDialog /> */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex gap-1 items-center">
                {/* Avatar */}
                <Icons.user />
                <p className="w-32 text-start">John Doe</p>
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <div className="flex flex-col gap-2 px-4 py-2">
                  <div className="w-64">
                    {/* Profile card */}
                    <div className="bg-accent rounded-md flex flex-col gap-2 p-2">
                      <div className="flex gap-1">
                        {/* Avatar */}
                        <Icons.user className="size-16" />
                        <div className="flex flex-col gap-1">
                          <p className="w-32 text-start font-semibold">
                            John Doe
                          </p>
                          <p className="w-32 text-start text-xs">
                            johndoe@email.com
                          </p>
                          <p className="w-32 text-start text-xs">Designation</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme-switch">Dark mode</Label>
                    <Switch
                      id="theme-switch"
                      defaultChecked={theme === "dark"}
                      onCheckedChange={() => {
                        setTheme(theme === "dark" ? "light" : "dark");
                      }}
                    />
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button variant="ghost" size={"icon"} className="rounded-full">
          <Icons.bell />
        </Button>
      </div>
    </header>
  );
}
