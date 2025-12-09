import React, { Suspense } from "react";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function HolidayDashboardPageLayout({
  children,
  sidebar,
}: Props) {
  return (
    <div>
      <Suspense fallback={<Skeleton className="w-16 h-screen" />}>
        {sidebar}
      </Suspense>

      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
