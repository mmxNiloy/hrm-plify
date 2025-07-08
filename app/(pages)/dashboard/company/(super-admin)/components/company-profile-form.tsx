"use client";

import createCompany from "@/app/(server)/actions/company/create-company.controller";
import refreshUserCookie from "@/app/(server)/actions/refreshUserCookie";
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
import { ICompany } from "@/schema/CompanySchema";
import { ButtonBase, ButtonSuccess } from "@/styles/button.tailwind";
import SiteConfig from "@/utils/SiteConfig";
import { IFormFragmentProps } from "@/utils/Types";
import uploadFile from "@/utils/uploadFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props extends IFormFragmentProps<ICompany> {
  hasPermission?: boolean;
  asClient?: boolean;
  onSuccess?: () => void;
}

const FormSchema = z.object({
  company_name: z.string(),
  industry: z.string(),
  is_active: z.number().nonnegative().max(1).optional().default(0),
  headquarters: z.string(),
  contact_number: z.string(),
  founded_year: z.number().nonnegative(),
  website: z.string().url().optional(),
  email: z.string().email().optional(),
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

export default function CompanyProfileForm({
  data,
  readOnly,
  disabled,
  hasPermission = false,
  asClient = false,
  onSuccess,
}: Props) {
  const form = useForm({
    defaultValues: {
      company_name: data?.company_name ?? "",
      industry: data?.industry ?? "",
      headquarters: data?.headquarters ?? "",
      founded_year: data?.founded_year ?? 0,
      website: data?.website ?? "",
      email: data?.email ?? "",
      contact_number: data?.contact_number ?? "",
      is_active: data?.is_active ?? 0,
    },
    resolver: zodResolver(FormSchema),
    disabled: readOnly || disabled,
  });

  const [loading, startSubmit] = useTransition();

  const router = useRouter();

  const onSubmit = useCallback(
    (values: FormType) => {
      startSubmit(async () => {
        try {
          const logoFile = values.logoFile;
          var logoUrl = "";

          if (logoFile) {
            const logoUpload = await uploadFile(logoFile);

            if (!logoUpload.ok) {
              toast.error("Failed to upload company logo!");
            } else {
              toast.success("Company logo uploaded!");
              const res = logoUpload.data;
              logoUrl = res.fileUrl;
            }
          }

          const results = await createCompany({
            company_name: values.company_name,
            industry: values.industry,
            headquarters: values.headquarters,
            founded_year: values.founded_year,
            website: values.website ?? "",
            logo: logoUrl,
            contact_number: values.contact_number,
            is_active: values.is_active,
          });

          if (results.error) {
            toast.error("Failed to create the company!");
          } else {
            toast.success("Company created!");

            if (onSuccess) onSuccess();

            if (asClient) await refreshUserCookie();
            router.refresh();
          }
        } catch (error) {
          toast.error("Something went wrong!");
        }
      });
    },
    [asClient, onSuccess, router]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Company Creation form */}
        <ScrollArea className="h-[60vh] sm:h-[70vh]">
          <div className="p-1 flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:gap-6">
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your company name..."
                        {...field}
                      />
                    </FormControl>

                    <FormDescription>
                      Enter your company name here. EG: Acme Inc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input placeholder="Industry" {...field} />
                      </FormControl>

                      <FormDescription>
                        Enter your company&apos;s industry here. EG:
                        Pharmaceutical.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <RadioGroup
                          className="flex flex-col gap-2"
                          disabled={field.disabled || !hasPermission}
                          value={(field.value ?? 0).toString()}
                          onValueChange={(val) =>
                            field.onChange(Number.parseInt(val))
                          }
                        >
                          <div className="flex gap-2">
                            <RadioGroupItem value="1" />
                            <Label htmlFor="status-radio-active">Active</Label>
                          </div>

                          <div className="flex gap-2">
                            <RadioGroupItem value="0" />
                            <Label htmlFor="status-radio-inactive">
                              Inctive
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>

                      <FormDescription>
                        Enter your company&apos;s industry here. EG:
                        Pharmaceutical.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="headquarters"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Headquarters</FormLabel>
                    <FormControl>
                      <Input placeholder="Headquarters" {...field} />
                    </FormControl>

                    <FormDescription>
                      Enter your company&apos;s headquarters here. EG: Nowhere,
                      USA.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+123 456 789" {...field} />
                    </FormControl>

                    <FormDescription>
                      Enter your company&apos;s contact number here. EG: +123
                      456 789.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <FormField
                  control={form.control}
                  name="founded_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Founded Year</FormLabel>
                      <FormControl>
                        <Input placeholder="2010" {...field} />
                      </FormControl>

                      <FormDescription>
                        Enter your company&apos;s founding year. EG: 2010.
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
                        <Input
                          placeholder="https://www.example.com"
                          {...field}
                        />
                      </FormControl>

                      <FormDescription>
                        Enter your company&apos;s website. EG:
                        https://www.example.com.
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
                        <Input placeholder="example@email.com" {...field} />
                      </FormControl>

                      <FormDescription>
                        Enter your company&apos;s email here. EG:
                        example@email.com
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
                      <FormLabel>Company Logo</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.item(0);

                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      {/* Image Preview */}
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
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <ImageIcon className="size-16" />
                          </div>
                        )}
                      </div>
                      <FormDescription>Upload your document.</FormDescription>
                      {data?.logo && (
                        <FormDescription>
                          <Link href={data.logo} target="_blank">
                            View existing document
                          </Link>
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="gap-1">
          <DialogClose asChild>
            <Button
              disabled={loading}
              type="button"
              variant={"destructive"}
              className={ButtonBase}
            >
              <Icons.cross /> Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={loading} className={ButtonSuccess}>
            {loading ? (
              <>
                <Icons.spinner className="animate-spin ease-in-out" /> Loading
              </>
            ) : (
              <>
                <Icons.check /> Submit
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
