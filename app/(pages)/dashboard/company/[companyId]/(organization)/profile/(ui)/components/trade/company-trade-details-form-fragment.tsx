"use client";

import updateCompanyTradeDetails from "@/app/(server)/actions/company/trade/details/update-company-trade-details.controller";
import { updateCompany } from "@/app/(server)/actions/company/update-company.controller";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ICompany, ICompanyTradeDetails } from "@/schema/CompanySchema";
import {
  CompanyTradeDetailsSchema,
  UpdateCompanySchema,
} from "@/schema/form/company.schema";
import { IUser } from "@/schema/UserSchema";
import { ButtonWarn } from "@/styles/button.tailwind";
import SiteConfig from "@/utils/SiteConfig";
import { IFormFragmentProps } from "@/utils/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = CompanyTradeDetailsSchema;

type FormType = z.infer<typeof FormSchema>;

interface Props {
  onSuccess?: () => void;
  data?: FormType;
  readOnly?: boolean;
  isAdmin?: boolean;
  companyId: string;
}

export default function CompanyTradeDetailsFormFragment({
  data,
  readOnly,
  onSuccess,
  companyId,
}: Props) {
  const [updating, startUpdate] = useTransition();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      company_reg: data?.company_reg ?? "",
      type_of_company: data?.type_of_company ?? "",
      trade_name: data?.trade_name ?? "",
      sector: data?.sector ?? "",
      org_email: data?.org_email ?? "",
      change_of_name_5: data?.change_of_name_5 ?? "no",
      faced_penalty_org: data?.faced_penalty_org ?? "no",
    },
    disabled: updating || readOnly,
  });

  const onSubmit = useCallback(
    (values: FormType) => {
      startUpdate(async () => {
        try {
          const result = await updateCompanyTradeDetails(companyId, values);

          if (result.error) {
            toast.error(
              `Failed to update company trade details. Cause: ${result.message}`
            );
            return;
          }
          toast.success("Company trade details updated successfully");

          if (onSuccess) onSuccess();
        } catch (error) {
          toast.error(
            "An unexpected error occured while updating the company trade details."
          );
        }
      });
    },
    [companyId, onSuccess]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={cn(
            "p-1 grid grid-cols-1 md:grid-cols-2 gap-4",
            readOnly ? "" : "h-[60vh] sm:h-[70vh] overflow-y-scroll"
          )}
        >
          <FormField
            control={form.control}
            name="company_reg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <div className="w-full flex relative items-center justify-center">
                    <Input
                      className="pr-16"
                      placeholder="Eg: 123-ABCDEF-999"
                      {...field}
                      readOnly={readOnly}
                    />
                    <Link
                      target="_blank"
                      passHref
                      className="absolute right-0 flex items-center gap-1 text-sm text-white bg-blue-500 hover:bg-blue-400 px-2 py-1 rounded-e-md h-full"
                      href={`https://find-and-update.company-information.service.gov.uk/search?q=${encodeURIComponent(
                        field.value ?? ""
                      )}#services-information-results`}
                    >
                      <Icons.externalLink className="size-4" />
                      Find
                    </Link>
                  </div>
                </FormControl>
                <FormDescription>
                  The registration number of your company.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type_of_company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Type</FormLabel>
                <FormControl>
                  <Input placeholder="eg: Private Limited Company" {...field} />
                </FormControl>
                <FormDescription>
                  What is the type of your company?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="trade_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trade</FormLabel>
                <FormControl>
                  <Input placeholder="eg: Metallurgy" {...field} />
                </FormControl>
                <FormDescription>
                  Specify the trade of your company.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sector</FormLabel>
                <FormControl>
                  <Input placeholder="eg: Blacksmithing" {...field} />
                </FormControl>
                <FormDescription>
                  Specify the sector of your company.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="org_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organizational Email</FormLabel>
                <FormControl>
                  <Input placeholder="eg: support@acme.com" {...field} />
                </FormControl>
                <FormDescription>
                  Provide the organizational email of your company.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="change_of_name_5"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organisation/trading name change</FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue="no"
                    disabled={field.disabled}
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                  >
                    <div className="flex gap-1 items-center">
                      <RadioGroupItem id="comp-name-radio-yes" value="yes" />
                      <Label htmlFor="comp-name-radio-yes">Yes</Label>
                    </div>

                    <div className="flex gap-1 items-center">
                      <RadioGroupItem id="comp-name-radio-no" value="no" />
                      <Label htmlFor="comp-name-radio-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  Has the organisation/trading name changed in the past five
                  years?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="change_of_name_5"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organisational penalty history</FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue="no"
                    disabled={field.disabled}
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                  >
                    <div className="flex gap-1 items-center">
                      <RadioGroupItem id="comp-name-radio-yes" value="yes" />
                      <Label htmlFor="comp-name-radio-yes">Yes</Label>
                    </div>

                    <div className="flex gap-1 items-center">
                      <RadioGroupItem id="comp-name-radio-no" value="no" />
                      <Label htmlFor="comp-name-radio-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  Has the organisation faced a penalty in the past three years?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {!readOnly && (
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant={"destructive"}
                className="gap-1"
                size={"sm"}
              >
                <Icons.cross /> Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              variant="warning"
              disabled={updating}
              className="shadow-sm hover:shadow-md"
              size={"sm"}
            >
              <Icons.update
                className={cn(updating ? "animate-spin ease-in-out" : "")}
              />
              {updating ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        )}
      </form>
    </Form>
  );
}
