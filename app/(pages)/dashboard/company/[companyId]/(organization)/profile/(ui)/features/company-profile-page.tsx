"use server";

import { getCompany } from "@/app/(server)/actions/company/get-company.controller";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import getCurrentUser from "@/app/(server)/actions/user/get-current-user.controller";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import React from "react";
import CompanyProfileEditDialog from "../components/company-profile-edit-dialog";
import CompanyProfileFormFragment from "../components/company-profile-form-fragment";

export default async function CompanyProfilePage({
  companyId,
}: {
  companyId: string;
}) {
  const [mPermissions, user, data] = await Promise.all([
    getCurrentUserPermissions(),
    getCurrentUser(),
    getCompany(companyId),
  ]);

  const isAdmin =
    user?.user_roles?.roles?.role_name === "Super Admin" ||
    user?.user_roles?.roles?.role_name === "Admin";

  if (data.error) {
    return <DataTableError errorMessage="Failed to fetch company details." />;
  }

  const updateAccess = mPermissions?.find((item) => item === "cmp_mgmt_update");

  const company = data.payload;
  const key = `company-profile-key-${Date.now()}`;
  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 border rounded-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <p className="text-base sm:text-lg md:text-xl font-semibold">
          Company Profile
        </p>
        {updateAccess && (
          <CompanyProfileEditDialog isAdmin={isAdmin} data={company} />
        )}
      </div>
      <CompanyProfileFormFragment key={key} data={company} readOnly />
    </div>
  );
}
