"use server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getShifts } from "@/app/(server)/actions/getShifts";
import ShiftManagementEditDialog from "@/components/custom/Dialog/Rota/ShiftManagementEditDialog";
import ShiftManagementDataTable from "@/components/custom/DataTable/Rota/ShiftManagementDataTable";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function RotaShiftManagementPage({
  params,
  searchParams,
}: Props) {
  const { limit, page } = getPaginationParams(searchParams);

  const company = await getCompanyData(params.companyId);
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const paginatedShifts = await getShifts({
    company_id: params.companyId,
    page,
    limit,
  });

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Shift Management</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company}
          user={user}
          parent="Rota"
          title="Shift Management"
        />

        <ShiftManagementEditDialog company_id={company.company_id} />
      </div>

      <ShiftManagementDataTable data={paginatedShifts.data} />
    </main>
  );
}
