"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { DataTable } from "@/components/ui/data-table";
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import { getLatePolicies } from "@/app/(server)/actions/getLatePolicies";
import LatePolicyEditDialog from "@/components/custom/Dialog/Rota/LatePolicyEditDialog";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import { LatePolicyDataTableColumns } from "@/components/custom/DataTable/Columns/Rota/LatePolicyDataTableColumns";
import SiteConfig from "@/utils/SiteConfig";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.appName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Late Policy`,
  };
}

export default async function RotaLatePolicyPage({
  params,
  searchParams,
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
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const sParams = await searchParams;

  const { page, limit } = getPaginationParams(sParams);

  const [company, companyExtra, paginatedLatePolicies] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(companyId),
    getLatePolicies({
      company_id: companyId,
      page,
      limit,
    }),
  ]);

  if (company.error || paginatedLatePolicies.error || companyExtra.error) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Late Policy
        </p>
        <ErrorFallbackCard
          error={
            company.error ?? paginatedLatePolicies.error ?? companyExtra.error
          }
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Late Policy
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Shift"
          title="Late Policy"
        />

        {writeAccess && (
          <LatePolicyEditDialog company_id={companyId} {...companyExtra.data} />
        )}
      </div>

      <DataTable
        // showOptions={false}
        data={paginatedLatePolicies.data.data.map((item) => ({
          ...item,
          companyExtra: companyExtra.data,
          updateAccess: updateAccess ? true : false,
        }))}
        columns={LatePolicyDataTableColumns}
      />
    </main>
  );
}
