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
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <div className="col-span-full flex flex-row items-center justify-between">
        <p className="col-span-full text-lg font-semibold">Company Address</p>
        {!readOnly && (
          <CompanyAddressEditDialog company_id={company_id} data={data} />
        )}
      </div>

      <CompanyAddressFormFragment data={data} readOnly />
    </div>
  );
}
