import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICompany } from "@/schema/CompanySchema";
import React from "react";
import CompanyProfileFormFragment from "../CompanyEditDialog/CompanyProfileEditDialog/form-fragment";
import CompanyProfileEditDialog from "../CompanyEditDialog/CompanyProfileEditDialog";

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
