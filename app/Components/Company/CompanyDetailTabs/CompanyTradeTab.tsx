import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICompanyTradeDetails } from "@/schema/CompanySchema";
import React from "react";
import CompanyTradeFormFragment from "../CompanyEditDialog/CompanyTradeEditDialog/form-fragment";
import CompanyTradeEditDialog from "../CompanyEditDialog/CompanyTradeEditDialog";

export default function CompanyTradeTab({
  data,
  company_id,
}: {
  data?: ICompanyTradeDetails;
  company_id: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <div className="col-span-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold col-span-full">
          Company Trade Details
        </p>
        <CompanyTradeEditDialog company_id={company_id} data={data} />
      </div>

      <CompanyTradeFormFragment data={data} readOnly />
    </div>
    // TODO: Add trading hours section here
  );
}
