"use server";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable, StaticDataTable } from "@/components/ui/data-table";
import getCompanyAdmin from "@/app/(server)/actions/getCompanyAdmin";
import CompanyAdminEditDialog from "@/components/custom/Dialog/Company/CompanyAdminEditDialog";
import { CompanyAdminListDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyAdminListDataTableColumns";

export default async function CompanyAdminPage({
  params,
}: CompanyByIDPageProps) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  if (
    user.user_roles?.roles.role_name !== "Admin" &&
    user.user_roles?.roles.role_name !== "Super Admin"
  ) {
    redirect(`/dashboard`);
  }

  const companyAdmins = await getCompanyAdmin(params.companyId);

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Company Admin</p>
        <CompanyAdminEditDialog companyId={params.companyId} />
      </div>
      <DataTable
        data={companyAdmins}
        columns={CompanyAdminListDataTableColumns}
      />
    </div>
  );
}
