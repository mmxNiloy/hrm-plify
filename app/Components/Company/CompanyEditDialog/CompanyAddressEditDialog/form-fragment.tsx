import { ComboBox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
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
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="post-code-input"
        >
          Post Code
        </Label>
        <Input
          key={`address-post-code-${data?.postcode}`}
          required
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
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="address-line-input"
        >
          Address Line #1
        </Label>
        <Input
          required
          key={`address-line-1-${data?.address_line_1}`}
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          placeholder="Address Line #1"
          defaultValue={data?.address_line_1 ?? ""}
          name="address_line_1"
          id="address-line-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="address-line-input">Address Line #2</Label>
        <Input
          key={`address-line-2-${data?.address_line_2}`}
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          placeholder="Address Line #2"
          defaultValue={data?.address_line_2 ?? ""}
          name="address_line_2"
          id="address-line-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="address-line-input">Address Line #3</Label>
        <Input
          key={`address-line-3-${data?.address_line_3}`}
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          placeholder="Address Line #3"
          defaultValue={data?.address_line_3 ?? ""}
          name="address_line_3"
          id="address-line-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="city-county-input"
        >
          City/County
        </Label>
        <Input
          required
          key={`city-county-${data?.city_county}`}
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
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="country-input"
        >
          Country
        </Label>
        <ComboBox
          key={`country-${data?.country}`}
          required
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
