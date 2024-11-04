"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toYYYYMMDD } from "@/utils/Misc";
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

export default function DbsFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<IEmployeeEussDbsData>) {
  return (
    <>
      {/* Reference No. (DBS) */}
      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="dbs-ref-no"
        >
          Reference No.
        </Label>
        <Input
          key={`dbs-ref-no-${data?.dbs_ref_no}`}
          required
          readOnly={readOnly}
          disabled={disabled}
          id="dbs-ref-no"
          defaultValue={data?.dbs_ref_no ?? ""}
          placeholder="Reference No."
          name="dbs_ref_no"
        />
      </div>

      {/* DBS Issue Date */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="dbs-issue-date">DBS Issue Date</Label>
        <Input
          key={`dbs-issue-date-${data?.dbs_issue_date?.toString()}`}
          type="date"
          readOnly={readOnly}
          disabled={disabled}
          id="dbs-issue-date"
          defaultValue={
            data?.dbs_issue_date
              ? toYYYYMMDD(new Date(data.dbs_issue_date))
              : ""
          }
          placeholder="DBS Issue Date"
          name="dbs_issue_date"
        />
      </div>

      {/* DBS Expiry Date */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="dbs-expiry-date">DBS Expiry Date</Label>
        <Input
          key={`dbs-expiry-date-${data?.dbs_expiry_date?.toString()}`}
          type="date"
          readOnly={readOnly}
          disabled={disabled}
          id="dbs-expiry-date"
          defaultValue={
            data?.dbs_expiry_date
              ? toYYYYMMDD(new Date(data.dbs_expiry_date))
              : ""
          }
          placeholder="DBS Expiry Date"
          name="dbs_expiry_date"
        />
      </div>

      {/* DBS Document */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="dbs-doc">DBS Document</Label>
        {readOnly ? (
          data?.dbs_doc ? (
            <Link passHref href={data.dbs_doc} target="_blank">
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
          <Input
            type="file"
            key={`dbs-doc-${data?.dbs_doc}`}
            readOnly={readOnly}
            disabled={disabled}
            id="dbs-doc"
            defaultValue={data?.dbs_doc ?? ""}
            placeholder="DBS Document Link"
            name="dbs_doc"
          />
        )}
      </div>

      {/* DBS Type */}
      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="dbs-type"
        >
          DBS Type
        </Label>
        <Select
          required
          key={`dbs-type-${data?.dbs_type}`}
          disabled={readOnly || disabled}
          defaultValue={data?.dbs_type.toLowerCase()}
          name="dbs_type"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Your DBS Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select your DBS type</SelectLabel>
            </SelectGroup>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* DBS Current Status */}
      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="dbs-is-current"
        >
          Is this your current status?
        </Label>
        <Select
          key={`euss-is-current-${data?.euss_is_current}`}
          defaultValue={data?.euss_is_current === 1 ? "yes" : "no"}
          disabled={readOnly || disabled}
          name="dbs_is_current"
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
    </>
  );
}
