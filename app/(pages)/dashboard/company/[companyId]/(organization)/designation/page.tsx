"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable } from "@/components/ui/data-table";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getDesignations } from "@/app/(server)/actions/getDesignations";
import DesignationEditPopover from "@/components/custom/Popover/Company/DesignationEditPopover";
import { CompanyDesignationDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyDesignationDataTableColumns";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import SiteConfig from "@/utils/SiteConfig";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Designation`,
  };
}

export default async function DesignationsPage({
  params,
  searchParams,
}: Props) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_desg_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_desg_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_desg_update");

  if (!readAccess) {
    return <AccessDenied />;
  }

  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const { limit, page } = getPaginationParams(await searchParams);
  const [company, designations, companyExtra] = await Promise.all([
    getCompanyData(companyId),
    getDesignations({
      company_id: companyId,
      page,
      limit,
    }),
    getCompanyExtraData(companyId),
  ]);

  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  if (company.error || designations.error || companyExtra.error) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Company Designations
        </p>

        <ErrorFallbackCard
          error={company.error || designations.error || companyExtra.error}
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Company Designations
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          title="Designations"
        />

        {writeAccess && (
          <div className="w-full sm:w-auto">
            <DesignationEditPopover
              company_id={companyId}
              departments={companyExtra.data.departments}
            />
          </div>
        )}
      </div>

      <DataTable
        data={designations.data.map((item) => ({
          ...item,
          updateAccess: updateAccess ? true : false,
          departments: companyExtra.data.departments,
        }))}
        columns={CompanyDesignationDataTableColumns}
      />
    </main>
  );
}
