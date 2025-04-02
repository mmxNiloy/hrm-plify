"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getShifts } from "@/app/(server)/actions/getShifts";
import ShiftManagementEditDialog from "@/components/custom/Dialog/Rota/ShiftManagementEditDialog";
import ShiftManagementDataTable from "@/components/custom/DataTable/Rota/ShiftManagementDataTable";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
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
    } | Shift Management`,
  };
}

export default async function RotaShiftManagementPage({
  params,
  searchParams,
}: Props) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const sParams = await searchParams;
  const { limit, page } = getPaginationParams(sParams);

  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, paginatedShifts] = await Promise.all([
    getCompanyData(companyId),
    getShifts({
      company_id: companyId,
      page,
      limit,
    }),
  ]);

  if (company.error || paginatedShifts.error) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Shift Management
        </p>
        <ErrorFallbackCard error={company.error ?? paginatedShifts.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Shift Management
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Rota"
          title="Shift Management"
        />

        <ShiftManagementEditDialog company_id={companyId} />
      </div>

      <ShiftManagementDataTable data={paginatedShifts.data.data} />
    </main>
  );
}
