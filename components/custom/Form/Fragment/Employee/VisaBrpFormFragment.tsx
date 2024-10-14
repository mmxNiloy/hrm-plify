"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IEmployeeVisaBrp } from "@/schema/EmployeeSchema";
import { countryNames, nationalities, toYYYYMMDD } from "@/utils/Misc";
import VisaFrontSkeleton from "../../../Employee/visa-front-skeleton";
import { ImagePicker } from "@/components/ui/image-picker";
import VisaBackSkeleton from "../../../Employee/visa-back-skeleton";
import { ComboBox } from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { IFormFragmentProps } from "@/utils/Types";

export default function VisaBrpFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<IEmployeeVisaBrp>) {
  return (
    <>
      {/* Visa/BRP Number */}
      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="visa-brp-number"
        >
          Visa/BRP Number
        </Label>
        <Input
          key={`visa-brp-number-${data?.visa_brp_number}`}
          required
          readOnly={readOnly}
          disabled={disabled}
          id="visa-brp-number"
          defaultValue={data?.visa_brp_number ?? ""}
          placeholder="Visa/BRP Number"
          name="visa_brp_number"
        />
      </div>

      {/* Issue Date */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="issue-date">Issue Date</Label>
        <Input
          key={`issue-date-${data?.issue_date}`}
          type="date"
          readOnly={readOnly}
          disabled={disabled}
          id="issue-date"
          defaultValue={
            data?.issue_date ? toYYYYMMDD(new Date(data.issue_date)) : ""
          }
          placeholder="Issue Date"
          name="issue_date"
        />
      </div>

      {/* Expiry Date */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="expiry-date">Expiry Date</Label>
        <Input
          key={`expiry-date-${data?.expiry_date}`}
          type="date"
          readOnly={readOnly}
          disabled={disabled}
          id="expiry-date"
          defaultValue={
            data?.expiry_date ? toYYYYMMDD(new Date(data.expiry_date)) : ""
          }
          placeholder="Expiry Date"
          name="expiry_date"
        />
      </div>

      {/* Issued By */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="issued-by">Issued By</Label>
        <Input
          key={`issued-by-${data?.issued_by}`}
          readOnly={readOnly}
          disabled={disabled}
          id="issued-by"
          defaultValue={data?.issued_by ?? ""}
          placeholder="Issued By"
          name="issued_by"
        />
      </div>

      {/* Country of Residence */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="country-of-residence">Country of Residence</Label>
        <ComboBox
          key={`country-of-residence-${data?.country_of_residence}`}
          items={countryNames}
          readOnly={readOnly}
          disabled={disabled}
          id="country-of-residence"
          defaultValue={data?.country_of_residence ?? ""}
          placeholder="Country of Residence"
          name="country_of_residence"
        />
      </div>

      {/* Nationality */}
      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="nationality"
        >
          Nationality
        </Label>
        <ComboBox
          key={`nationality-${data?.nationality}`}
          items={nationalities}
          required
          readOnly={readOnly}
          disabled={disabled}
          id="nationality"
          defaultValue={data?.nationality ?? ""}
          placeholder="Nationality"
          name="nationality"
        />
      </div>

      {/* Visa/BRP Photo (Front) */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="visa-brp-photo-front">Visa/BRP Photo (Front)</Label>
        <ImagePicker
          key={`visa-brp-photo-front-${data?.visa_brp_photo_front}`}
          className="size-full max-h-64"
          readOnly={readOnly}
          disabled={disabled}
          src={data?.visa_brp_photo_front}
          id="visa-brp-photo-front"
          name="visa_brp_photo_front_image"
          skeleton={<VisaFrontSkeleton />}
        />
      </div>

      {/* Visa/BRP Photo (Back) */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="visa-brp-photo-back">Visa/BRP Photo (Back)</Label>

        <ImagePicker
          key={`visa-brp-photo-back-${data?.visa_brp_photo_back}`}
          className="size-full max-h-64"
          readOnly={readOnly}
          disabled={disabled}
          id="visa-brp-photo-back"
          src={data?.visa_brp_photo_back ?? ""}
          name="visa_brp_photo_back_image"
          skeleton={<VisaBackSkeleton />}
        />
      </div>

      {/* Remarks */}
      <div className="col-span-full flex flex-col gap-2">
        <Label htmlFor="remarks">Remarks</Label>
        <Textarea
          key={`remarks-${data?.remarks}`}
          className="resize-none"
          readOnly={readOnly}
          disabled={disabled}
          id="remarks"
          rows={5}
          defaultValue={data?.remarks ?? ""}
          placeholder="Remarks"
          name="remarks"
        />
      </div>
    </>
  );
}
