import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICompanyTradeDetails } from "@/schema/CompanySchema";
import React from "react";

export default function CompanyTradeTab({
  data,
}: {
  data?: ICompanyTradeDetails;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <p className="text-lg font-semibold col-span-full">
        Company Trade Details
      </p>

      <div className="flex flex-col gap-2">
        <Label>Registration No.</Label>
        <Input
          className="rounded-full"
          readOnly
          defaultValue={data?.company_reg ?? ""}
          placeholder="Registration Number"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Company Type</Label>
        <Input
          className="rounded-full"
          readOnly
          defaultValue={data?.type_of_company ?? ""}
          placeholder="Company Type"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Trade</Label>
        <Input
          className="rounded-full"
          readOnly
          defaultValue={data?.trade_name ?? ""}
          placeholder="Trade"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Sector</Label>
        <Input
          className="rounded-full"
          readOnly
          defaultValue={data?.sector ?? ""}
          placeholder="Sector"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Organization Email</Label>
        <Input
          className="rounded-full"
          readOnly
          defaultValue={data?.org_email ?? ""}
          placeholder="Organization Email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>
          Has the organization/trading name changed in the last 5 years?
        </Label>
        <Input
          className="rounded-full"
          readOnly
          defaultValue={data?.change_of_name_5 ?? ""}
          placeholder="Has name changed?"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Has the organization faced a penalty in the last 3 years?</Label>
        <Input
          className="rounded-full"
          readOnly
          defaultValue={data?.faced_penaly_org ?? ""}
          placeholder="Has the organization faced a penalty? (e.g., for recruiting illegal employees)"
        />
      </div>
    </div>
    // TODO: Add trading hours section here
  );
}
