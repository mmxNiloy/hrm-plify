import { ICompanyAddress } from "@/schema/CompanySchema";
import React from "react";
import CompanyAddressFormFragment from "../../Form/Fragment/Company/CompanyAddressFormFragment";
import CompanyAddressEditDialog from "../../Dialog/Company/CompanyEditDialog/CompanyAddressEditDialog";

export default function CompanyAddressTab({
  data,
  company_id,
  readOnly,
}: {
  data?: ICompanyAddress;
  company_id: number;
  readOnly?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-6 md:p-8 border rounded-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <p className="text-base sm:text-lg md:text-xl font-semibold">
          Company Address
        </p>
        {!readOnly && (
          <div className="w-full sm:w-auto">
            <CompanyAddressEditDialog company_id={company_id} data={data} />
          </div>
        )}
      </div>

      <CompanyAddressFormFragment data={data} readOnly />
    </div>
  );
}
