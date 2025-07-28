"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { LayoutProps } from "@/utils/Types";
import RotaDashboardSidebar from "@/components/custom/Dashboard/Sidebar/RotaDashboardSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";

interface Props extends CompanyByIDPageProps, LayoutProps {}

export default async function RotaDashboardPageLayout({
  children,
  params,
}: Props) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_rota_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_rota_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_rota_update");

  if (!readAccess) {
    return <AccessDenied />;
  }
  // Get company information
  const mParams = await params;
  const companyId = mParams.companyId;
  const company = await getCompanyData(companyId);

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Shift Management</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <div>
      <RotaDashboardSidebar company={company.data} />

      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
