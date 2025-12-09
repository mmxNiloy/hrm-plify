import React, { Suspense } from "react";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div>
      <Suspense fallback={<Skeleton className="w-16 h-screen" />}>
        {sidebar}
      </Suspense>
      <SidebarViewport>
        <main className="container flex flex-col gap-2">
          <p className="text-xl font-semibold">Sponsor Compliance</p>
          <div className="flex items-center justify-between">
            <MyBreadcrumbs title="Sponsor Compliance" />

            {/* Quick Nav */}
            {/* <div className="flex flex-row gap-2">
              <Link passHref href="#euss">
                <Button variant={"link"}>EUSS Notifications</Button>
              </Link>
            </div> */}
          </div>
          {visaNotif}
          {passportNotif}
          {eussNotif}
          {dbsNotif}
          {otherDocumentNotif}
          {children}
        </main>
      </SidebarViewport>
    </div>
  );
}
