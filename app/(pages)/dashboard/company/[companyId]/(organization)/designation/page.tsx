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

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function DesignationsPage({
  params,
  searchParams,
}: Props) {
  const companyId = (await params).companyId;
  const { limit, page } = getPaginationParams(await searchParams);
  const [company, designations] = await Promise.all([
    getCompanyData(companyId),
    getDesignations({
      company_id: companyId,
      page,
      limit,
    }),
  ]);

  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  if (company.error || designations.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Company Designations</p>

        <ErrorFallbackCard error={company.error || designations.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Company Designations</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          title="Designations"
        />

        <DesignationEditPopover company_id={companyId} />
      </div>

      <DataTable
        data={designations.data}
        columns={CompanyDesignationDataTableColumns}
      />
    </main>
  );
}
