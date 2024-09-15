"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ICompanyTradeDetails } from "@/schema/CompanySchema";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

export default function CompanyTradeFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<ICompanyTradeDetails>) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="company-reg-input"
        >
          Registration No.
        </Label>
        <Input
          required
          key={`company-reg-${data?.company_reg}`}
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.company_reg ?? ""}
          placeholder="Registration Number"
          name="company_reg"
          id="company-reg-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="type-of-company-input"
        >
          Company Type
        </Label>
        <Input
          required
          key={`company-type-${data?.type_of_company}`}
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.type_of_company ?? ""}
          placeholder="Company Type"
          name="type_of_company"
          id="type-of-company-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="trade-name-input"
        >
          Trade
        </Label>
        <Input
          required
          key={`company-trade-name-${data?.trade_name}`}
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.trade_name ?? ""}
          placeholder="Trade"
          name="trade_name"
          id="trade-name-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="sector-input"
        >
          Sector
        </Label>
        <Input
          required
          key={`company-sector-${data?.sector}`}
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.sector ?? ""}
          placeholder="Sector"
          name="sector"
          id="sector-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="org-email-input"
        >
          Organization Email
        </Label>
        <Input
          required
          key={`company-org-email-${data?.org_email}`}
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.org_email ?? ""}
          placeholder="Organization Email"
          name="org_email"
          id="org-email-input"
        />
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <Label htmlFor="change-of-name-select">
          Has the organization/trading name changed in the last 5 years?
        </Label>
        <Select
          key={`company-change-of-name-${data?.change_of_name_5}`}
          name="change_of_name_5"
          disabled={readOnly || disabled}
          defaultValue={data?.change_of_name_5 ?? "no"}
        >
          <SelectTrigger id="change-of-name-select" className="rounded-full">
            <SelectValue placeholder="Has name changed?" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <Label htmlFor="faced-penalty-select">
          Has the organization faced a penalty in the last 3 years?
        </Label>
        <Select
          key={`company-faced-penalty-${data?.faced_penaly_org}`}
          name="faced_penaly_org"
          disabled={readOnly || disabled}
          defaultValue={data?.faced_penaly_org ?? "no"}
        >
          <SelectTrigger id="faced-penalty-select" className="rounded-full">
            <SelectValue placeholder="Has the organization faced a penalty? (e.g., for recruiting illegal employees)" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
