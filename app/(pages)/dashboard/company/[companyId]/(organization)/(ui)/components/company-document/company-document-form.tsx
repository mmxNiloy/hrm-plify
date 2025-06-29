"use client";
import createCompanyDocument from "@/app/(server)/actions/company/document/create-company-document.controller";
import updateCompanyDocument from "@/app/(server)/actions/company/document/update-company-document.controller";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ICompanyDoc } from "@/schema/CompanySchema";
import { ButtonSuccess, ButtonWarn } from "@/styles/button.tailwind";
import SiteConfig from "@/utils/SiteConfig";
import { IFormFragmentProps } from "@/utils/Types";
import uploadFile from "@/utils/uploadFile";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ExternalLink,
  LoaderCircle,
  RefreshCcw,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const docTypes = SiteConfig.data.documentTypes;

interface Props extends IFormFragmentProps<ICompanyDoc> {
  onSuccess?: () => void;
  companyId: string;
}

const FormSchema = z.object({
  doc_name: z.string(),
  doc_type: z.enum(docTypes),
  doc_file: z
    .instanceof(File)
    .refine((file) => file?.size !== 0, "Document File is required.")
    .refine(
      (file) => file.size < SiteConfig.maxFileSize,
      `Maximum file size is ${Number.parseInt(
        (SiteConfig.maxFileSize / 1e6).toString()
      )} MB`
    )
    .refine((file) => {
      const ext = file.name.split(".").pop() ?? "";
      return /pdf|docx|txt|xlsx|txt|png|bmp|jpg|jpeg/.test(ext);
    }, "Unsupport document type. Allowed document types are: PDF, DOCX, XLSX, TXT, PNG, BMP, and JPG/JPEG.")
    .optional(),
});

type FormType = z.infer<typeof FormSchema>;

export default function CompanyDocumentForm({
  data,
  onSuccess,
  companyId,
  readOnly,
  disabled,
}: Props) {
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      doc_name: data?.doc_name,
      doc_type: data?.doc_type,
    },
    disabled: disabled || readOnly,
  });

  const [updating, startSubmit] = useTransition();

  const router = useRouter();

  const onSubmit = useCallback(
    (values: FormType) => {
      startSubmit(async () => {
        try {
          var doc: ICompanyDoc = {
            doc_id: data?.doc_id ?? 0,
            company_id: Number.parseInt(companyId),
            ...values,
          };

          const docFile = values.doc_file;
          var docLink = data?.doc_link ?? "";

          if (docFile) {
            const docUpload = await uploadFile(docFile);
            if (!docUpload.ok) {
              toast.error("Document upload failed!");
            } else {
              toast.success("Document uploaded!");
              const res = docUpload.data;
              docLink = res.fileUrl;
            }

            doc.doc_link = docLink;
          }

          let operation;
          if (data) {
            operation = updateCompanyDocument(data.doc_id.toString(), {
              ...values,
              doc_link: docLink,
            });
          } else {
            operation = createCompanyDocument(companyId, {
              ...values,
              doc_link: docLink,
            });
          }

          const apiRes = await operation;

          if (!apiRes.error) {
            toast.success(`Document ${data ? "updated" : "added"}!`);
            router.refresh();
            if (onSuccess) onSuccess();
          } else {
            toast.error(`Document ${data ? "update" : "creation"} failed!`);
          }
        } catch (error) {
          toast.error("Something went wrong!");
        }
      });
    },
    [companyId, data, onSuccess, router]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          <FormField
            control={form.control}
            name="doc_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Name</FormLabel>
                <FormControl>
                  <Input placeholder="What's your document name?" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your document name. EG: Financial Document
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="doc_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Type</FormLabel>
                <FormControl>
                  <ComboBox
                    className="w-full"
                    placeholder="Select a document type"
                    items={docTypes}
                    onValueChange={(val) => field.onChange(val)}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>Select a document type.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="doc_file"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Document File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.item(0);

                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormDescription>Upload your document.</FormDescription>
                {data?.doc_link && (
                  <Link href={data.doc_link} target="_blank" passHref>
                    <Button
                      type="button"
                      variant={"ghost"}
                      size="sm"
                      className="gap-1 [&_svg]:size-4"
                    >
                      <ExternalLink /> View existing document
                    </Button>
                  </Link>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter className="col-span-full">
          <DialogClose asChild>
            <Button
              autoFocus
              type="button"
              disabled={updating}
              variant={"destructive"}
              className="gap-1 shadow-sm hover:shadow-md"
              size={"sm"}
            >
              <XIcon /> Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            variant="warning"
            disabled={updating}
            className="shadow-sm hover:shadow-md gap-1"
            size={"sm"}
          >
            <Icons.update
              className={cn(updating ? "animate-spin ease-in-out" : "")}
            />
            {updating ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
