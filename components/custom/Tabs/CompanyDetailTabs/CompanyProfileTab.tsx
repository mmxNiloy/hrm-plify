import { ICompany } from "@/schema/CompanySchema";
import React from "react";
import CompanyProfileFormFragment from "../../Form/Fragment/Company/CompanyProfileFormFragment";
import CompanyProfileEditDialog from "../../Dialog/Company/CompanyEditDialog/CompanyProfileEditDialog";

export default function CompanyProfileTab({ data }: { data: ICompany }) {
  return (
    <div className="flex flex-col gap-4 p-8 border rounded-md">
      <div className="w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Company Profile</p>
        <CompanyProfileEditDialog data={data} />
      </div>
      <CompanyProfileFormFragment data={data} readOnly />
    </div>
  );
}
