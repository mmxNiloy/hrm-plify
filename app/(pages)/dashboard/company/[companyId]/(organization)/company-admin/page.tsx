"use server";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import AccessDenied from "@/components/custom/AccessDenied";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";
import getCurrentUser from "@/app/(server)/actions/user/get-current-user.controller";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import { SearchParams } from "nuqs";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import { CompanyAdminTable } from "./(ui)/features/table";
import { CompanyAdminAssignDialog } from "./(ui)/components";
import getCompanyMeta from "@/app/(server)/actions/company/get-company-meta.controller";

export async function generateMetadata({
  params,
}: CompanyIDURLParamSchema): Promise<Metadata> {
  const prms = await params;
  var companyId = prms.companyId;
  return await getCompanyMeta(companyId, "Company Admin");
}

interface Props extends CompanyIDURLParamSchema {
  searchParams: Promise<SearchParams>;
}

export default async function CompanyAdminPage({
  params,
  searchParams,
}: Props) {
  const [mParams, user, mPermissions, sParams] = await Promise.all([
    params,
    getCurrentUser(),
    getCurrentUserPermissions(),
    searchParams,
  ]);

  const readAccess = mPermissions?.find((item) => item === "cmp_admin_read");
  const writeAccess = mPermissions?.find((item) => item === "cmp_admin_create");
  const updateAccess = mPermissions?.find(
    (item) => item === "cmp_admin_update"
  );

  if (!readAccess) {
    return (
      <main className="flex-1 container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold">
            Company Admin
          </p>
        </div>
        <AccessDenied />
      </main>
    );
  }

  var companyId = mParams.companyId;

  if (!user) {
    redirect("/login?_ref=token-expired");
  }

  const isAdmin =
    user.user_roles?.roles?.role_name === "Super Admin" ||
    user.user_roles?.roles?.role_name === "Admin";

  if (!isAdmin) {
    redirect(`/dashboard`);
  }

  searchParamsCache.parse(sParams);
  const key = serialize(sParams);

  return (
    <main className="flex-1 container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Company Admin
        </p>
        {writeAccess && (
          <div className="w-full sm:w-auto">
            <CompanyAdminAssignDialog companyId={companyId} />
          </div>
        )}
      </div>

      <Suspense key={key} fallback={<DataTableSkeleton />}>
        <CompanyAdminTable
          updateAccess={!!updateAccess}
          companyId={companyId}
        />
      </Suspense>
    </main>
  );
}
