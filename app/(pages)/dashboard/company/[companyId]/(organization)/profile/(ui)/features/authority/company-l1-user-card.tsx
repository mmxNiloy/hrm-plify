"use server";

import { DataTableError } from "@/components/ui/data-table/data-table-error";
import React from "react";
import CompanyAuthorityEditDialog from "../../components/company-authority-edit-dialog";
import CompanyAuthorityFormFragment from "../../components/company-authority-form-fragment";
import getCompanyL1User from "@/app/(server)/actions/company/l1-user/get-company-l1-user.controller";

interface Props {
  companyId: string;
  updateAccess?: boolean;
}

export default async function CompanyL1UserCard({
  companyId,
  updateAccess,
}: Props) {
  const data = await getCompanyL1User(companyId);

  if (data.error) {
    return <DataTableError errorMessage="Failed to fetch level 1 user." />;
  }

  const l1User = data.payload;

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 border rounded-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <p className="text-base sm:text-lg md:text-xl font-semibold">
          Company Level-1 User
        </p>
        {updateAccess && (
          <CompanyAuthorityEditDialog
            data={l1User}
            type="Level 1 User"
            companyId={companyId}
          />
        )}
      </div>
      <CompanyAuthorityFormFragment
        companyId={companyId}
        data={l1User}
        title="Level 1 User"
        readOnly
      />
    </div>
  );
}
