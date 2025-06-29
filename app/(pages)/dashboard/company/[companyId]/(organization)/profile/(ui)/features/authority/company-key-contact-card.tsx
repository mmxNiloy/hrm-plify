"use server";

import React from "react";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import getCompanyKeyContact from "@/app/(server)/actions/company/key-contact/get-company-key-contact.controller";
import {
  CompanyAuthorityEditDialog,
  CompanyAuthorityFormFragment,
} from "../../components";

interface Props {
  companyId: string;
  updateAccess?: boolean;
}

export default async function CompanyKeyContactCard({
  companyId,
  updateAccess,
}: Props) {
  const data = await getCompanyKeyContact(companyId);

  if (data.error) {
    return <DataTableError errorMessage="Failed to fetch key contact." />;
  }

  const keyContact = data.payload;

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 border rounded-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <p className="text-base sm:text-lg md:text-xl font-semibold">
          Company Key Contact
        </p>
        {updateAccess && (
          <CompanyAuthorityEditDialog
            data={keyContact}
            type="Key Contact"
            companyId={companyId}
          />
        )}
      </div>
      <CompanyAuthorityFormFragment
        companyId={companyId}
        data={keyContact}
        title="Key Contact"
        readOnly
      />
    </div>
  );
}
