"use server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IUserConfig } from "@/schema/UserSchema";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { StaticDataTable } from "@/components/ui/data-table";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import UserConfigEditDialog from "@/components/custom/Dialog/UserAccess/UserConfigEditDialog";
import { UserConfigDataTableColumns } from "@/components/custom/DataTable/Columns/UserAccess/UserConfigDataTableColumns";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function UserConfigPage({ params, searchParams }: Props) {
  const { limit, page } = getPaginationParams(searchParams);

  const company = await getCompanyData(params.companyId);
  const companyExtraData = await getCompanyExtraData(params.companyId);

  // TODO: hit the api to get data
  const userConfigData: IUserConfig[] = []; // Placeholder

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">User Configuration</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className="line-clamp-1 text-ellipsis max-w-32"
                href={`../`}
              >
                {company.company_name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`.`}>User Access</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>User Configuration</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <UserConfigEditDialog
          company_id={company.company_id}
          employees={companyExtraData.employees}
        />
      </div>

      <StaticDataTable
        data={userConfigData}
        columns={UserConfigDataTableColumns}
      />
    </main>
  );
}
