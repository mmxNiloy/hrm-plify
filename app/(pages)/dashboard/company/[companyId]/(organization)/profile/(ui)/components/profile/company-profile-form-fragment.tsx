"use client";

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
import { ICompany } from "@/schema/CompanySchema";
import { UpdateCompanySchema } from "@/schema/form/company.schema";
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

interface Props {
  onSuccess?: () => void;
  data: ICompany;
  readOnly?: boolean;
  isAdmin?: boolean;
}

const FormSchema = UpdateCompanySchema.extend({
  logoFile: z
    .instanceof(File)
    .refine(
      (file) => file?.size < SiteConfig.maxFileSize,
      `Maximum file size is ${Number.parseInt(
        (SiteConfig.maxFileSize / 1e6).toString()
      )} MB`
    )
    .refine((file) => {
      return file?.type.startsWith("image/");
    }, "Unsupport file type. Only image files are allowed.")
    .optional(),
});

type FormType = z.infer<typeof FormSchema>;

export default function CompanyProfileFormFragment({
  data,
  readOnly,
  onSuccess,
  isAdmin,
}: Props) {
  const [updating, startUpdate] = useTransition();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      company_name: data.company_name,
      industry: data.industry ?? "",
      headquarters: data.headquarters,
      founded_year: data.founded_year,
      website: data.website,
      email: data.email,
      contact_number: data.contact_number,
      is_active: data.is_active,
      logo: data.logo || undefined,
    },
    disabled: updating || readOnly,
  });

  const companyName = form.watch("company_name");

  const onSubmit = useCallback(
    (values: FormType) => {
      startUpdate(async () => {
        try {
          const result = await updateCompany(
            data.company_id.toString(),
            values
          );

          if (result.error) {
            toast.error(`Failed to update company. Cause: ${result.message}`);
            return;
          }
          toast.success("Company updated successfully");

          if (onSuccess) onSuccess();
        } catch (error) {
          toast.error(
            "An unexpected error occured while updating the company."
          );
        }
      });
    },
    [data.company_id, onSuccess]
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
            name="company_name"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <div className="w-full flex relative items-center justify-center">
                    <Input
                      className="pr-16"
                      placeholder="Eg: ACME Incorporated"
                      {...field}
                      readOnly={readOnly}
                    />
                    <Link
                      target="_blank"
                      passHref
                      className="absolute right-0 flex items-center gap-1 text-sm text-white bg-blue-500 hover:bg-blue-400 px-2 py-1 rounded-e-md h-full"
                      href={`https://find-and-update.company-information.service.gov.uk/search?q=${encodeURIComponent(
                        companyName ?? ""
                      )}#services-information-results`}
                    >
                      <Icons.externalLink className="size-4" />
                      Find
                    </Link>
                  </div>
                </FormControl>
                <FormDescription>
                  The name of the company. This is the primary identifier of
                  your organization.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    className="resize-none"
                    placeholder="eg: Technology"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Categorize your company&apos;s industry (following UKVI
                  guidelines if applicable).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="headquarters"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Headquarters</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    className="resize-none"
                    placeholder="eg: 123, Sesame Street, Wonderland, USA"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Specify where your company is headquartered.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {(readOnly || isAdmin) && (
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      disabled={field.disabled}
                      value={(field.value ?? 0) > 0 ? "active" : "inactive"}
                      onValueChange={(val) => {
                        if (val === "active") field.onChange(1);
                        else field.onChange(0);
                      }}
                    >
                      <div className="flex gap-1 items-center">
                        <RadioGroupItem
                          id="comp-status-radio-active"
                          value="active"
                        />
                        <Label htmlFor="comp-status-radio-active">Active</Label>
                      </div>

                      <div className="flex gap-1 items-center">
                        <RadioGroupItem
                          id="comp-status-radio-inactive"
                          value="inactive"
                        />
                        <Label htmlFor="comp-status-radio-inactive">
                          Inactive
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Current status of the company in the system (e.g. active or
                    inactive).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="contact_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact</FormLabel>
                <FormControl>
                  <Input placeholder="eg: +1 555-444-3333" {...field} />
                </FormControl>
                <FormDescription>
                  Provide your company&apos;s contact information.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="eg: https://www.example.com" {...field} />
                </FormControl>
                <FormDescription>
                  What&apos;s your company&apos;s website?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="eg: example@email.com" {...field} />
                </FormControl>
                <FormDescription>
                  What&apos;s your company&apos;s email?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logoFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl className={cn(readOnly ? "hidden" : "block")}>
                  <Input
                    type="file"
                    accept="image/*"
                    disabled={field.disabled}
                    onChange={(e) => {
                      const file = e.target.files?.item(0);

                      field.onChange(file);
                    }}
                  />
                </FormControl>

                <div className="w-full aspect-video p-2 border rounded-md overflow-clip bg-muted">
                  {field.value ? (
                    <Image
                      unoptimized
                      height={0}
                      width={0}
                      className="w-full aspect-video object-contain"
                      alt="logo-preview"
                      src={URL.createObjectURL(field.value)}
                    />
                  ) : data.logo ? (
                    <Image
                      unoptimized
                      height={0}
                      width={0}
                      className="w-full aspect-video object-contain"
                      alt="logo-preview"
                      src={data.logo}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <ImageIcon className="size-16" />
                    </div>
                  )}
                </div>

                <FormDescription>Set your company&apos;s logo.</FormDescription>
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
