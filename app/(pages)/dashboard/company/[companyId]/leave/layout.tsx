import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function CompanyLeaveDashboardLayout({
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
