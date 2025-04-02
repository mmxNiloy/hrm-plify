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
import { StaticDataTable } from "@/components/ui/data-table";
import { OffDaysDataTableColumns } from "@/components/custom/DataTable/Columns/Rota/OffDaysDataTableColumns";
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
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
    } | Off Days`,
  };
}

export default async function RotaDayOffPage({ params, searchParams }: Props) {
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

  const [company, paginatedOffDays, allShifts] = await Promise.all([
    getCompanyData(companyId),
    getOffDays({
      company_id: companyId,
      page,
      limit,
    }),
    getShifts({
      company_id: companyId,
      page: 1,
      limit: -1,
    }),
  ]);

  if (company.error || paginatedOffDays.error || allShifts.error) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">Off Days</p>
        <ErrorFallbackCard
          error={company.error ?? paginatedOffDays.error ?? allShifts.error}
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">Off Days</p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Rota"
          title="Off Days"
        />

        {writeAccess && (
          <OffDaysEditDialog
            shifts={allShifts.data.data}
            company_id={companyId}
          />
        )}
      </div>

      <StaticDataTable
        showOptions={false}
        data={paginatedOffDays.data.data.map((item) => ({
          ...item,
          shifts: allShifts.data.data,
          updateAccess: updateAccess ? true : false,
        }))}
        columns={OffDaysDataTableColumns}
      />
    </main>
  );
}
