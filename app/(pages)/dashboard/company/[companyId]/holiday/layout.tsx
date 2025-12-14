import React, { Suspense } from "react";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/components/custom/Dashboard/Navbar/DashboardNavbar";

interface Props {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function HolidayDashboardPageLayout({
  children,
  sidebar,
}: Props) {
  return (
    <SidebarProvider>
      <Suspense fallback={<Skeleton className="w-16 h-screen" />}>
        {sidebar}
      </Suspense>

      <main className="w-screen">
        <DashboardNavbar />
        <SidebarViewport>{children}</SidebarViewport>
      </main>
    </SidebarProvider>
  );
}
