"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getOffDays } from "@/app/(server)/actions/getOffDays";
import { getShifts } from "@/app/(server)/actions/getShifts";
import OffDaysDataTable from "@/components/custom/DataTable/Rota/OffDaysDataTable";
import OffDaysEditDialog from "@/components/custom/Dialog/Rota/OffDaysEditDialog";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { DataTable, StaticDataTable } from "@/components/ui/data-table";
import { OffDaysDataTableColumns } from "@/components/custom/DataTable/Columns/Rota/OffDaysDataTableColumns";
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
    title: `${SiteConfig.siteName} | ${
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
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Off Days</p>
        <ErrorFallbackCard
          error={
            company.error ?? paginatedLatePolicies.error ?? companyExtra.error
          }
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Late Policy</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Rota"
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
