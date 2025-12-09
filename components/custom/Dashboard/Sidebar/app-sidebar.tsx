import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";
import { INavItem } from "@/schema/SidebarSchema";
import SidebarFooterProfile from "./sidebar-footer-profile";
import AppSidebarContent from "./app-sidebar-content";
import AppSidebarHeader from "./app-sidebar-header";
import AppSidebarHeaderLink from "./app-sidebar-link";
import Link from "next/link";
import AppSidebarBackLink from "./app-sidebar-backlink";

interface Props {
  companyId?: string;
  navItems?: INavItem[];
}

export default function AppSidebar({ companyId, navItems = [] }: Props) {
  return (
    <Sidebar>
      <SidebarContent className="py-8 bg-background drop-shadow-md">
        <Suspense fallback={<AppSidebarHeaderLink />}>
          <AppSidebarHeader companyId={companyId} />
        </Suspense>

        <SidebarSeparator />

        <AppSidebarContent navItems={navItems} />

        <SidebarSeparator />

        <AppSidebarBackLink />

        <SidebarSeparator />
        {/* Sidebar Footer */}
        <Suspense fallback={<Skeleton className="w-full h-16" />}>
          <SidebarFooterProfile />
        </Suspense>
      </SidebarContent>
    </Sidebar>
  );
}
