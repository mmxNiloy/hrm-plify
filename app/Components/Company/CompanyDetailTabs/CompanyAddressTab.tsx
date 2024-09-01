import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICompanyAddress } from "@/schema/CompanySchema";
import React from "react";
import CompanyAddressFormFragment from "../CompanyEditDialog/CompanyAddressEditDialog/form-fragment";
import CompanyAddressEditDialog from "../CompanyEditDialog/CompanyAddressEditDialog";

export default function CompanyAddressTab({
  data,
}: {
  data?: ICompanyAddress;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <div className="col-span-full flex flex-row items-center justify-between">
        <p className="col-span-full text-lg font-semibold">Company Address</p>
        <CompanyAddressEditDialog data={data} />
      </div>

      <CompanyAddressFormFragment data={data} readOnly />
    </div>
  );
}
