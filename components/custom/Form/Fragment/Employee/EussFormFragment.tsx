"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComboBox } from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { nationalities, toYYYYMMDD } from "@/utils/Misc";
import { IEmployeeEussDbsData } from "@/schema/EmployeeSchema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { ButtonBlue } from "@/styles/button.tailwind";
import { IFormFragmentProps } from "@/utils/Types";
import Link from "next/link";
import { FilePicker } from "@/components/ui/file-picker";
import { useContext } from "react";
import EussDbsDialogContext from "@/context/EussDbsDialogContext";

export default function EussFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<IEmployeeEussDbsData>) {
  const { setEussDocError } = useContext(EussDbsDialogContext);
  return (
    <>
      {/* Reference No. (EUSS) */}
      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="euss-time-linit-ref-num"
        >
          Reference No.
        </Label>
        <Input
          key={`euss-reference-no-${data?.euss_time_linit_ref_num}`}
          required
          readOnly={readOnly}
          disabled={disabled}
          id="euss-time-linit-ref-num"
          defaultValue={data?.euss_time_linit_ref_num ?? ""}
          placeholder="Reference No."
          name="euss_time_linit_ref_num"
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
          key={`euss-nationality-${data?.nationality}`}
          items={nationalities}
          required
          readOnly={readOnly}
          disabled={disabled}
          id="nationality"
          defaultValue={data?.nationality ?? ""}
          placeholder="Select Nationality"
          name="nationality"
        />
      </div>

      {/* EUSS Issue Date */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="euss-issue-date">EUSS Issue Date</Label>
        <Input
          key={`euss-issue-date-${data?.euss_issue_date}`}
          type="date"
          readOnly={readOnly}
          disabled={disabled}
          id="euss-issue-date"
          defaultValue={
            data?.euss_issue_date
              ? toYYYYMMDD(new Date(data.euss_issue_date))
              : ""
          }
          placeholder="EUSS Issue Date"
          name="euss_issue_date"
        />
      </div>

      {/* EUSS Expiry Date */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="euss-expiry-date">EUSS Expiry Date</Label>
        <Input
          key={`euss-expiry-date-${data?.euss_expiry_date}`}
          type="date"
          readOnly={readOnly}
          disabled={disabled}
          id="euss-expiry-date"
          defaultValue={
            data?.euss_expiry_date
              ? toYYYYMMDD(new Date(data.euss_expiry_date))
              : ""
          }
          placeholder="EUSS Expiry Date"
          name="euss_expiry_date"
        />
      </div>

      {/* EUSS Document */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="euss-doc">EUSS Document</Label>
        {readOnly ? (
          data?.euss_doc ? (
            <Link passHref href={data.euss_doc} target="_blank">
              <Button className={cn(ButtonBlue, "w-full")}>
                <Icons.externalLink /> View Document
              </Button>
            </Link>
          ) : (
            <Button className={ButtonBlue} disabled>
              <Icons.externalLink /> View Document
            </Button>
          )
        ) : (
          <FilePicker
            onError={() => setEussDocError(true)}
            onSuccess={() => setEussDocError(false)}
            className="data-[error=true]:border-red-500"
            key={`euss-doc-${data?.euss_doc}`}
            disabled={disabled}
            id="euss-doc"
            placeholder="EUSS Document URL"
            name="euss_doc"
          />
        )}
      </div>

      {/* EUSS Current Status */}
      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="euss-is-current"
        >
          Is this your current status?
        </Label>
        <Select
          key={`euss-is-current-${data?.euss_is_current}`}
          defaultValue={data?.euss_is_current === 1 ? "yes" : "no"}
          disabled={readOnly || disabled}
          name="euss_is_current"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select current status</SelectLabel>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* EUSS Remarks */}
      <div className="flex flex-col gap-2 col-span-full">
        <Label htmlFor="euss-remarks">Remarks</Label>
        <Textarea
          key={`euss-remarks-${data?.euss_remarks}`}
          className="resize-none"
          readOnly={readOnly}
          disabled={disabled}
          id="euss-remarks"
          rows={5}
          defaultValue={data?.euss_remarks ?? ""}
          placeholder="Remarks"
          name="euss_remarks"
        />
      </div>
    </>
  );
}
