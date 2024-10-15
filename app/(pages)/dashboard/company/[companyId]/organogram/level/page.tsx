"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { DataTable } from "@/components/ui/data-table";
import { ISearchParamsProps } from "@/utils/Types";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import LevelEditPopover from "@/components/custom/Popover/Organogram/LevelEditPopover";
import { LevelDataTableColumns } from "@/components/custom/DataTable/Columns/Organogram/LevelDataTableColumns";
import { IOrganogramLevel } from "@/schema/OrganogramSchema";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function OrganizationLevelPage({
  params,
  searchParams,
}: Props) {
  const company = await getCompanyData(params.companyId);
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  // TODO: Hit the api and get a list of organization levels here
  const levels: IOrganogramLevel[] = [];

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Organization Levels</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company}
          user={user}
          parent="Organogram Chart"
          title="Levels"
        />

        <LevelEditPopover company_id={company.company_id} />
      </div>

      <DataTable columns={LevelDataTableColumns} data={levels} />
    </main>
  );
}
