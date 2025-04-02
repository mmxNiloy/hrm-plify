import { ICompany } from "@/schema/CompanySchema";
import React from "react";
import CompanyProfileFormFragment from "../../Form/Fragment/Company/CompanyProfileFormFragment";
import CompanyProfileEditDialog from "../../Dialog/Company/CompanyEditDialog/CompanyProfileEditDialog";

export default function CompanyProfileTab({
  data,
  readOnly,
}: {
  data: ICompany;
  readOnly?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 border rounded-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <p className="text-base sm:text-lg md:text-xl font-semibold">
          Company Profile
        </p>
        {!readOnly && (
          <div className="w-full sm:w-auto">
            <CompanyProfileEditDialog data={data} />
          </div>
        )}
      </div>
      <CompanyProfileFormFragment data={data} readOnly />
    </div>
  );
}
