"use server";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable } from "@/components/ui/data-table";
import getCompanyAdmin from "@/app/(server)/actions/getCompanyAdmin";
import CompanyAdminEditDialog from "@/components/custom/Dialog/Company/CompanyAdminEditDialog";
import { CompanyAdminListDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyAdminListDataTableColumns";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";
import getCurrentUser from "@/app/(server)/actions/user/get-current-user.controller";

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  const prms = await params;
  var companyId = prms.companyId;
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

  const [prms, user] = await Promise.all([params, getCurrentUser()]);
  var companyId = prms.companyId;

  if (!user) {
    redirect("/login?_ref=token-expired");
  }

  if (
    user.user_roles?.roles.role_name !== "Admin" &&
    user.user_roles?.roles.role_name !== "Super Admin"
  ) {
    redirect(`/dashboard`);
  }

  const { data: companyAdmins, error } = await getCompanyAdmin(companyId);
  if (error) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Company Admin
        </p>
        <ErrorFallbackCard error={error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Company Admin
        </p>
        {writeAccess && (
          <div className="w-full sm:w-auto">
            <CompanyAdminEditDialog companyId={companyId} />
          </div>
        )}
      </div>
      <DataTable
        data={companyAdmins.map((item) => ({
          ...item,
          updateAccess: updateAccess ? true : false,
        }))}
        columns={CompanyAdminListDataTableColumns}
      />
    </main>
  );
}
