import React, { Suspense } from "react";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function EmployeeHomeLayout({ children, sidebar }: Props) {
  return (
    <div>
      {/* Navbar has h-16 */}
      <Suspense fallback={<Skeleton className="w-16 h-screen" />}>
        {sidebar}
      </Suspense>

      <SidebarViewport className="flex flex-col gap-1">
        {children}
      </SidebarViewport>
    </div>
  );
}
