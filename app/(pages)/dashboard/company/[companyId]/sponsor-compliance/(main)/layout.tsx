"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { LayoutProps } from "@/utils/Types";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import SponsorComplianceDashboardSidebar from "@/components/custom/Dashboard/Sidebar/SponsorComplianceDashboardSidebar";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props extends CompanyByIDPageProps, LayoutProps {
  visaNotif: React.ReactNode;
  passportNotif: React.ReactNode;
  dbsNotif: React.ReactNode;
  eussNotif: React.ReactNode;
  otherDocumentNotif: React.ReactNode;
}

export default async function SponsorComplianceDashboardLayout({
  children,
  visaNotif,
  passportNotif,
  eussNotif,
  dbsNotif,
  otherDocumentNotif,
  params,
}: Props) {
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const companyId = (await params).companyId;

  const company = await getCompanyData(companyId);

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Payroll</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <div>
      <SponsorComplianceDashboardSidebar company={company.data} />
      <SidebarViewport>
        <main className="container flex flex-col gap-2">
          <p className="text-xl font-semibold">Sponsor Compliance</p>
          <div className="flex items-center justify-between">
            <MyBreadcrumbs
              company={company.data}
              user={user}
              title="Sponsor Compliance"
            />

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
