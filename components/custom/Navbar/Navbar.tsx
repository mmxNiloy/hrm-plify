import React from "react";
import NavLogo from "./NavLogo";
import NavMenu from "./NavMenu";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center gap-2 md:gap-4 lg:gap-8 px-6 md:px-8 lg:px-16 sm:space-x-0">
        <NavLogo />

        <NavMenu />

        {/* Empty gap */}
        <span className="flex-grow" />

        {/* <LoginDialog /> */}
        <Button className="bg-green-500 hover:bg-green-400 gap-1 rounded-full">
          <Icons.phone /> Contact Us
        </Button>
      </div>
    </header>
  );
}
