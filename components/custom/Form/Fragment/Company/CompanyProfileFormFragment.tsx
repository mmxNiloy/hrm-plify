"use client";

import getCurrentUser from "@/app/(server)/actions/getCurrentUser";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { IFormFragmentProps } from "@/utils/Types";
import React, { useCallback, useEffect, useState } from "react";

interface Props extends IFormFragmentProps<ICompany> {
  asClient?: boolean;
  onSizeExceeded?: () => void;
}

export default function CompanyProfileFormFragment({
  data,
  readOnly,
  disabled,
  asClient = false,
  onSizeExceeded,
}: Props) {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(false);

  const getUserData = useCallback(async () => {
    setLoading(true);
    const userData = await getCurrentUser();
    setUser(userData);
    setLoading(false);
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-2 w-full flex-1 text-sm sm:text-base">
        <Icons.spinner className="animate-spin size-5 sm:size-6" />
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="company-name-input"
          className={cn(
            "text-sm sm:text-base",
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
        >
          Company Name
        </Label>
        <Input
          minLength={3}
          required
          key={`company-name-${data?.company_name ?? ""}`}
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={data?.company_name ?? ""}
          id="company-name-input"
          name="company_name"
          placeholder="Company Name"
          className="rounded-full text-sm sm:text-base"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div
          className={cn("flex flex-col gap-2", asClient ? "col-span-full" : "")}
        >
          <Label
            htmlFor="industry-input"
            className={cn(
              "text-sm sm:text-base",
              readOnly
                ? ""
                : "after:content-['*'] after:text-red-500 after:ml-1"
            )}
          >
            Industry
          </Label>
          <Input
            required
            minLength={3}
            key={`company-industry-${data?.industry ?? ""}`}
            disabled={disabled}
            readOnly={readOnly}
            defaultValue={data?.industry ?? ""}
            id="industry-input"
            name="industry"
            placeholder="Industry"
            className="rounded-full text-sm sm:text-base"
          />
        </div>
        <div
          className={cn(
            "flex flex-col gap-2",
            asClient ||
              (user?.user_roles?.roles.role_name !== "Super Admin" &&
                user?.user_roles?.roles.role_name !== "Admin")
              ? "hidden"
              : ""
          )}
        >
          <Label className="text-sm sm:text-base">Status</Label>
          <Select
            key={`company-status-${data?.is_active ?? 0}`}
            disabled={disabled || readOnly}
            name="is_active"
            defaultValue={(data?.is_active ?? 0) == 1 ? "yes" : "no"}
          >
            <SelectTrigger className="rounded-full text-sm sm:text-base">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a company status</SelectLabel>
                <SelectItem value="yes">Active</SelectItem>
                <SelectItem value="no">Inactive</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            "text-sm sm:text-base",
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="headquarters-input"
        >
          Headquarters
        </Label>
        <Input
          required
          minLength={3}
          key={`company-hq-${data?.headquarters ?? ""}`}
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={data?.headquarters ?? ""}
          id="headquarters-input"
          name="headquarters"
          placeholder="Headquarters"
          className="rounded-full text-sm sm:text-base"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            "text-sm sm:text-base",
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="contact-number-input"
        >
          Contact Number
        </Label>
        <Input
          required
          key={`company-contact-number-${data?.contact_number ?? ""}`}
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={data?.contact_number ?? ""}
          id="contact-number-input"
          type="tel"
          name="contact_number"
          placeholder="Contact Number"
          className="rounded-full text-sm sm:text-base"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="flex flex-col gap-2">
          <Label
            className={cn(
              "text-sm sm:text-base",
              readOnly
                ? ""
                : "after:content-['*'] after:text-red-500 after:ml-1"
            )}
            htmlFor="founded-year-input"
          >
            Founded Year
          </Label>
          <Input
            required
            key={`company-founded-year-${data?.founded_year ?? 0}`}
            disabled={disabled}
            readOnly={readOnly}
            defaultValue={data?.founded_year ?? ""}
            id="founded-year-input"
            type="number"
            max={new Date().getFullYear()}
            min={0}
            name="founded_year"
            placeholder="Founded Year"
            className="rounded-full text-sm sm:text-base"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm sm:text-base" htmlFor="website-input">
            Website
          </Label>
          <Input
            key={`company-website-${data?.website ?? ""}`}
            disabled={disabled}
            readOnly={readOnly}
            defaultValue={data?.website ?? ""}
            id="website-input"
            type="url"
            name="website"
            placeholder="Website"
            className="rounded-full text-sm sm:text-base"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm sm:text-base" htmlFor="email-input">
            Email
          </Label>
          <Input
            key={`company-email-${data?.email ?? ""}`}
            disabled={disabled}
            readOnly={readOnly}
            defaultValue={data?.email ?? ""}
            id="email-input"
            type="email"
            name="email"
            placeholder="Email"
            className="rounded-full text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm sm:text-base" htmlFor="logo-input">
          Logo
        </Label>
        <Input className="hidden" defaultValue={data?.logo} name="logo_url" />
        <div className="relative">
          <AvatarPicker
            key={`company-logo-${data?.logo}`}
            readOnly={readOnly}
            disabled={disabled}
            name="logo"
            onSizeExceeded={onSizeExceeded}
            placeholderIcon={
              <Icons.factory
                className={cn(
                  "size-8 sm:size-12",
                  disabled || readOnly ? "" : "group-hover:invisible"
                )}
              />
            }
            className="w-24 sm:w-32 md:w-40"
            variant="video"
            src={data?.logo?.replace("http:", "https:")}
            alt={`${data?.company_name} Logo`}
          />
        </div>
      </div>
    </div>
  );
}
