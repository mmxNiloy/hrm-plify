"use server";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable, StaticDataTable } from "@/components/ui/data-table";
import getCompanyAdmin from "@/app/(server)/actions/getCompanyAdmin";
import CompanyAdminEditDialog from "@/components/custom/Dialog/Company/CompanyAdminEditDialog";
import { CompanyAdminListDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyAdminListDataTableColumns";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Company Admin`,
  };
}

export default async function CompanyAdminPage({
  params,
}: CompanyByIDPageProps) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_admin_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_admin_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_admin_update");

  if (!readAccess) {
    return <AccessDenied />;
  }

  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  if (
    user.user_roles?.roles.role_name !== "Admin" &&
    user.user_roles?.roles.role_name !== "Super Admin"
  ) {
    redirect(`/dashboard`);
  }

  const { data: companyAdmins, error } = await getCompanyAdmin(companyId);
  if (error) {
    return (
      <div className="flex flex-col gap-2">
        <div className="w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">Company Admin</p>
        </div>
        <ErrorFallbackCard error={error} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Company Admin</p>
        {writeAccess && <CompanyAdminEditDialog companyId={companyId} />}
      </div>
      <DataTable
        data={companyAdmins.map((item) => ({
          ...item,
          updateAccess: updateAccess ? true : false,
        }))}
        columns={CompanyAdminListDataTableColumns}
      />
    </div>
  );
}
