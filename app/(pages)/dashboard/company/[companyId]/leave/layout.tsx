import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/components/custom/Dashboard/Navbar/DashboardNavbar";

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function CompanyLeaveDashboardLayout({
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
