"use client";
import updateCompanyAuthority from "@/app/(server)/actions/company/authority/update-company-authority.controller";
import updateCompanyKeyContact from "@/app/(server)/actions/company/key-contact/update-company-key-contact.controller";
import updateCompanyL1User from "@/app/(server)/actions/company/l1-user/update-company-l1-user.controller";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { FilePicker } from "@/components/ui/file-picker";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ICompanyAuthorizedDetailsBase } from "@/schema/CompanySchema";
import {
  CompanyAuthoritySchema,
  UpdateCompanySchema,
} from "@/schema/form/company.schema";
import { ButtonGradient, ButtonWarn } from "@/styles/button.tailwind";
import { FileSizeWarning } from "@/styles/label.tailwind";
import SiteConfig from "@/utils/SiteConfig";
import { IFormFragmentProps } from "@/utils/Types";
import uploadFile from "@/utils/uploadFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  data?: ICompanyAuthorizedDetailsBase;
  readOnly?: boolean;
  onSuccess?: () => void;
  title?: "Authorised Personnel" | "Key Contact" | "Level 1 User";
  companyId: string;
  updateFn?: typeof updateCompanyAuthority;
}

const FormSchema = CompanyAuthoritySchema.extend({
  override: z.boolean().optional().default(false),
  docFile: z
    .instanceof(File)
    .refine((file) => file?.size !== 0, "Document File is required.")
    .refine(
      (file) => file.size < SiteConfig.maxFileSize,
      `Maximum file size is ${Number.parseInt(
        (SiteConfig.maxFileSize / 1e6).toString()
      )} MB`
    )
    .optional(),
});
type FormType = z.infer<typeof FormSchema>;

export default function CompanyAuthorityFormFragment({
  data,
  readOnly,
  onSuccess,
  title = "Authorised Personnel",
  companyId,
  updateFn,
}: Props) {
  const [updating, startUpdate] = useTransition();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    disabled: readOnly || updating,
    defaultValues: {
      fname: data?.fname ?? "",
      lname: data?.lname ?? "",
      designation: data?.designation ?? "",
      phone_no: data?.phone_no ?? "",
      email: data?.email ?? "",
      offence_history: data?.offence_history ?? "",
      override: data?.is_same_as_key_contact ?? false,
      doc_link: data?.doc_link || undefined,
    },
  });

  const docFile = form.watch("docFile");

  const onSubmit = useCallback(
    (values: FormType) => {
      if (!updateFn) {
        toast.warning("Unspecified update function!");
        return;
      }

      startUpdate(async () => {
        try {
          let doc_link = values.doc_link;
          if (docFile) {
            const uploadRes = await uploadFile(docFile);
            if (uploadRes.ok) {
              doc_link = uploadRes.data.fileUrl;
            }
          }

          const result = await updateFn(companyId, {
            ...values,
            doc_link,
          });
          if (result.error) {
            toast.error(`${title} Update Failed. Cause: ${result.message}`);
            return;
          }

          toast.success(`${title} Update successful!`);

          if (onSuccess) onSuccess();
        } catch (err) {
          toast.error(`${title} Update Failed.`);
        }
      });
    },
    [companyId, docFile, onSuccess, title, updateFn]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-2",
            !readOnly && "h-[60vh] sm:h-[70vh] overflow-y-scroll"
          )}
        >
          {!readOnly && (
            <FormField
              control={form.control}
              name="override"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Checkbox
                        id="is-same-as-key-contact"
                        checked={field.value}
                        onCheckedChange={(chk) => field.onChange(chk === true)}
                        disabled={field.disabled}
                      />
                      <Label
                        htmlFor="is-same-as-key-contact"
                        className="text-sm md:text-base"
                      >
                        Do the{" "}
                        {title === "Authorised Personnel"
                          ? "Key Contact and L1 User"
                          : title === "Key Contact"
                          ? "Authorised Personnel and L1 User"
                          : "Authorised Personnel and Key Contact"}{" "}
                        refer to the same person as the {title}?
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="fname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="eg: John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="eg: Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Designation</FormLabel>
                <FormControl>
                  <Input placeholder="eg: CEO" {...field} />
                </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="eg: +1 555-444-3333" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Document select UI here */}
          <FormField
            control={form.control}
            name="docFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document</FormLabel>
                <FormControl className={cn(readOnly ? "hidden" : "block")}>
                  <Input
                    type="file"
                    disabled={field.disabled}
                    onChange={(e) => {
                      const file = e.target.files?.item(0);

                      field.onChange(file);
                    }}
                  />
                </FormControl>

                <div className="w-full h-fit p-2 border rounded-md overflow-clip bg-muted">
                  {data?.doc_link ? (
                    <Link href={data?.doc_link} target="_blank" passHref>
                      <Button className={cn(ButtonGradient, "w-full")}>
                        <Icons.externalLink /> View Document
                      </Button>
                    </Link>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-16">
                      <Info className="size-8" />
                      <span>No document</span>
                    </div>
                  )}
                </div>

                <FormDescription>Attached document of {title}.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="offence_history"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Previous Offences</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="eg: None"
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>

                <FormDescription>
                  Does this person have a history of criminal conviction,
                  bankruptcy, or disqualification?
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
