"use server";
import { IUser, IUserConfig } from "@/schema/UserSchema";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { StaticDataTable } from "@/components/ui/data-table";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import UserConfigEditDialog from "@/components/custom/Dialog/UserAccess/UserConfigEditDialog";
import { UserConfigDataTableColumns } from "@/components/custom/DataTable/Columns/UserAccess/UserConfigDataTableColumns";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { cookies } from "next/headers";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function UserConfigPage({ params, searchParams }: Props) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const { limit, page } = getPaginationParams(await searchParams);

  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, companyExtraData] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(companyId),
  ]);

  if (company.error || companyExtraData.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Shift Management</p>
        <ErrorFallbackCard error={company.error ?? companyExtraData.error} />
      </main>
    );
  }

  // TODO: hit the api to get data
  const userConfigData: IUserConfig[] = []; // Placeholder

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">User Configuration</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="User Access"
          title="User Configuration"
        />

        <UserConfigEditDialog
          company_id={companyId}
          employees={companyExtraData.data.employees}
        />
      </div>

      <StaticDataTable
        data={userConfigData}
        columns={UserConfigDataTableColumns}
      />
    </main>
  );
}
