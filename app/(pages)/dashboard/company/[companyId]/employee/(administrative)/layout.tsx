import DashboardNavbar from "@/components/custom/Dashboard/Navbar/DashboardNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { Suspense } from "react";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

interface LayoutProps {
  children: React.ReactNode;
  breadcrumbs: React.ReactNode;
  stats: React.ReactNode;
  pageTitle: React.ReactNode;
  actions: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function EmployeeDashboardLayout({
  children,
  breadcrumbs,
  stats,
  pageTitle,
  actions,
  sidebar,
}: LayoutProps) {
  return (
    <>
      <SidebarProvider>
        <Suspense fallback={<Skeleton className="w-16 h-screen" />}>
          {sidebar}
        </Suspense>

        <main className="w-screen">
          <DashboardNavbar />
          <SidebarViewport>
            <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
              {pageTitle}

              <Suspense fallback={<Skeleton className="w-3/5 h-6" />}>
                {breadcrumbs}
              </Suspense>

              <Suspense fallback={<Skeleton className="w-3/5 h-6" />}>
                {actions}
              </Suspense>

              {children}

              <Suspense fallback={<DataTableSkeleton columns={3} />}>
                {stats}
              </Suspense>
            </main>
          </SidebarViewport>
        </main>
      </SidebarProvider>
    </>
  );
}
