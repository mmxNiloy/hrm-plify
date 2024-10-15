"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { DataTable } from "@/components/ui/data-table";
import { ISearchParamsProps } from "@/utils/Types";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import {
  IOrganogramHeirarchyRecord,
  IOrganogramLevel,
} from "@/schema/OrganogramSchema";
import { HeirarchyDataTableColumns } from "@/components/custom/DataTable/Columns/Organogram/HeirarchyDataTableColumns";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import HeirarchyEditDialog from "@/components/custom/Dialog/Organogram/HeirarchyEditDialog";
import AnimatedTrigger from "@/components/custom/Popover/AnimatedTrigger";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function OrganizationHeirarchyPage({
  params,
  searchParams,
}: Props) {
  const company = await getCompanyData(params.companyId);
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const companyExtraData = await getCompanyExtraData(params.companyId);

  // TODO: Get company levels
  const company_levels: IOrganogramLevel[] = [];

  // TODO: Hit the api and get a list of organization levels here
  const heirarchy: IOrganogramHeirarchyRecord[] = [];

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Organization Heirarchy</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company}
          user={user}
          parent="Organogram Chart"
          title="Heirarchy"
        />

        <AnimatedTrigger disabled label="Create a Heirarchy Record" />
        {/* <HeirarchyEditDialog
          {...companyExtraData}
          levels={company_levels}
          company_id={company.company_id}
        /> */}
      </div>

      <DataTable
        columns={HeirarchyDataTableColumns}
        data={heirarchy.map((item) => ({
          ...item,
          company_employees: companyExtraData.employees,
          company_designations: companyExtraData.designations,
          company_levels,
        }))}
      />
    </main>
  );
}
