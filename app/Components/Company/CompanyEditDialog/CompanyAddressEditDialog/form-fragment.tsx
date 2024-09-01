import { ComboBox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICompanyAddress } from "@/schema/CompanySchema";
import { countryNames } from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

export default function CompanyAddressFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<ICompanyAddress>) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor="post-code-input">Post Code</Label>
        <Input
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          placeholder="Post Code"
          defaultValue={data?.postcode ?? ""}
          name="postcode"
          id="post-code-input"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="address-line-input">Address Line #1</Label>
        <Input
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          placeholder="Address Line #1"
          defaultValue={data?.address_line_1 ?? ""}
          name="address_line"
          id="address-line-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="address-line-input">Address Line #2</Label>
        <Input
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          placeholder="Address Line #2"
          defaultValue={data?.address_line_2 ?? ""}
          name="address_line"
          id="address-line-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="address-line-input">Address Line #3</Label>
        <Input
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          placeholder="Address Line #3"
          defaultValue={data?.address_line_3 ?? ""}
          name="address_line"
          id="address-line-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="city-county-input">City/County</Label>
        <Input
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          placeholder="City or County"
          defaultValue={data?.city_county ?? ""}
          name="city_county"
          id="city-county-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="country-input">Country</Label>
        <ComboBox
          items={countryNames}
          className="rounded-full"
          readOnly={readOnly}
          disabled={readOnly}
          placeholder="Country"
          defaultValue={data?.country ?? ""}
          name="country"
          id="country-input"
        />
      </div>
    </>
  );
}
