"use server";
import React, { Suspense } from "react";
import NavLogo from "../../Navbar/NavLogo";
import { Skeleton } from "@/components/ui/skeleton";
import NavPopover from "./NavPopover";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-40 flex flex-col w-full">
      <section className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 w-full items-center gap-2 md:gap-4 lg:gap-8 px-6 md:px-8 lg:px-16 sm:space-x-0">
          <SidebarTrigger />
          <span className="flex-grow md:flex-grow-0" />
          <NavLogo href="/dashboard" />

          {/* <DashboardNavMenu user={user} company={company} /> */}

          {/* Empty gap */}
          <span className="flex-grow" />

          {/* <LoginDialog /> */}
          {/* <Suspense fallback={<Skeleton className="size-6 rounded-full" />}>
            <NavPopover />
          </Suspense> */}
        </div>
      </section>
      <span className="bg-site-gradient-lmr w-full h-0.5"></span>
    </header>
  );
}
