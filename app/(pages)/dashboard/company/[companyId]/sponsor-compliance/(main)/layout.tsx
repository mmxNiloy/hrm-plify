import React, { Suspense } from "react";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/components/custom/Dashboard/Navbar/DashboardNavbar";

interface Props {
  visaNotif: React.ReactNode;
  passportNotif: React.ReactNode;
  dbsNotif: React.ReactNode;
  eussNotif: React.ReactNode;
  otherDocumentNotif: React.ReactNode;
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function SponsorComplianceDashboardLayout({
  children,
  visaNotif,
  passportNotif,
  eussNotif,
  dbsNotif,
  otherDocumentNotif,
  sidebar,
}: Props) {
  return (
    <SidebarProvider>
      <Suspense fallback={<Skeleton className="w-16 h-screen" />}>
        {sidebar}
      </Suspense>
      <main className="w-screen">
        <DashboardNavbar />
        <SidebarViewport>
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-xl font-semibold">Sponsor Compliance</p>
              <MyBreadcrumbs title="Sponsor Compliance" />
            </div>
            {visaNotif}
            {passportNotif}
            {eussNotif}
            {dbsNotif}
            {otherDocumentNotif}
            {children}
          </div>
        </SidebarViewport>
      </main>
    </SidebarProvider>
  );
}
