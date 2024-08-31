import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICompanyAddress } from "@/schema/CompanySchema";
import React from "react";

export default function CompanyAddressTab({
  data,
}: {
  data?: ICompanyAddress;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <p className="col-span-full text-lg font-semibold">Company Address</p>

      <div className="flex flex-col gap-2">
        <Label>Post Code</Label>
        <Input
          className="rounded-full"
          readOnly
          placeholder="Post Code"
          defaultValue={data?.postcode ?? ""}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Address Line #1</Label>
        <Input
          className="rounded-full"
          readOnly
          placeholder="Address Line #1"
          defaultValue={data?.address_line_1 ?? ""}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Address Line #2</Label>
        <Input
          className="rounded-full"
          readOnly
          placeholder="Address Line #2"
          defaultValue={data?.address_line_2 ?? ""}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Address Line #3</Label>
        <Input
          className="rounded-full"
          readOnly
          placeholder="Address Line #3"
          defaultValue={data?.address_line_3 ?? ""}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>City/County</Label>
        <Input
          className="rounded-full"
          readOnly
          placeholder="City or County"
          defaultValue={data?.city_county ?? ""}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Country</Label>
        <Input
          className="rounded-full"
          readOnly
          placeholder="Country"
          defaultValue={data?.country ?? ""}
        />
      </div>
    </div>
  );
}
