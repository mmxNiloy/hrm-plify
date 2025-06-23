"use server";

import getCompanyAuthority from "@/app/(server)/actions/company/authority/get-company-authority.controller";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import React from "react";
import CompanyAuthorityEditDialog from "../../components/company-authority-edit-dialog";
import CompanyAuthorityFormFragment from "../../components/company-authority-form-fragment";

interface Props {
  companyId: string;
  updateAccess?: boolean;
}

export default async function CompanyAuthorizedPersonnelCard({
  companyId,
  updateAccess,
}: Props) {
  const data = await getCompanyAuthority(companyId);

  if (data.error) {
    return (
      <DataTableError errorMessage="Failed to fetch authorized personnel." />
    );
  }

  const authorizedPersonnel = data.payload;

  console.log("Authorized Personnel", authorizedPersonnel);

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 border rounded-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold">
          Company Authorized Personnel
        </h3>
        {updateAccess && (
          <CompanyAuthorityEditDialog
            data={authorizedPersonnel}
            companyId={companyId}
          />
        )}
      </div>
      <CompanyAuthorityFormFragment
        companyId={companyId}
        data={authorizedPersonnel}
        readOnly
      />
    </div>
  );
}
