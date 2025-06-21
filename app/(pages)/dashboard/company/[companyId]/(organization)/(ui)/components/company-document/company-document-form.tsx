"use client";
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
import { ICompanyDoc } from "@/schema/CompanySchema";
import { ButtonSuccess, ButtonWarn } from "@/styles/button.tailwind";
import SiteConfig from "@/utils/SiteConfig";
import { IFormFragmentProps } from "@/utils/Types";
import uploadFile from "@/utils/uploadFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, LoaderCircle, RefreshCcw, XIcon } from "lucide-react";
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
    }, "Unsupport document type. Allowed document types are: PDF, DOCX, XLSX, TXT, PNG, BMP, and JPG/JPEG."),
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

  const [loading, startSubmit] = useTransition();

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

          const docUpload = await uploadFile(docFile);
          if (!docUpload.ok) {
            toast.error("Document upload failed!");
          } else {
            toast.success("Document uploaded!");
            const res = docUpload.data;
            docLink = res.fileUrl;
          }

          doc.doc_link = docLink;

          const apiRes = await fetch(`/api/company/document`, {
            method: data ? "PATCH" : "POST",
            body: JSON.stringify(doc),
          });

          if (apiRes.ok) {
            if (onSuccess) onSuccess();

            toast.success(`Document ${data ? "updated" : "added"}!`);
            router.refresh();
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
        className="overflow-x-clip overflow-y-scroll px-2 gap-4 grid grid-cols-1 md:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="doc_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="What's your document name?" />
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
                <Select
                  onValueChange={(val) => field.onChange(val)}
                  value={field.value}
                >
                  <SelectTrigger id="doc-type-select">
                    <SelectValue placeholder="Select a document type" />
                  </SelectTrigger>

                  <SelectContent className="max-w-xs px-2">
                    <SelectGroup>
                      <SelectLabel>Document Type</SelectLabel>
                      {docTypes.map((dt) => (
                        <React.Fragment key={dt}>
                          <SelectItem value={dt}>{dt}</SelectItem>
                          <SelectSeparator />
                        </React.Fragment>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <FormDescription>
                  <Link href={data.doc_link} target="_blank">
                    View existing document
                  </Link>
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="col-span-full">
          <DialogClose asChild>
            <Button
              disabled={loading}
              variant={"destructive"}
              className="rounded-full gap-1"
              size={"sm"}
            >
              <XIcon /> Cancel
            </Button>
          </DialogClose>

          <Button
            disabled={loading}
            className={data ? ButtonWarn : ButtonSuccess}
            size={"sm"}
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin ease-in-out" />
                Updating...
              </>
            ) : data ? (
              <>
                <RefreshCcw /> Update
              </>
            ) : (
              <>
                <Check /> Submit
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
