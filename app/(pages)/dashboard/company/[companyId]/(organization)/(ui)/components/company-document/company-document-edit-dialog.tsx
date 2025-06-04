"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icons from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ICompanyDoc } from "@/schema/CompanySchema";
import {
  ButtonGradient,
  ButtonSuccess,
  ButtonWarn,
} from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, { HTMLAttributes, useCallback, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastSuccess } from "@/styles/toast.tailwind";
import SiteConfig from "@/utils/SiteConfig";
import uploadFile from "@/utils/uploadFile";
import CompanyDocumentFormFragment from "./company-document-form-fragment";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  data?: ICompanyDoc;
  type?: "edit" | "create";
  company_id: number;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

const CompanyDocumentEditDialog = React.forwardRef<HTMLButtonElement, Props>(
  (
    { className, data, type, company_id, variant = "default", ...props },
    ref
  ) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    const [docError, setDocError] = useState<Boolean>(false);

    const handleSubmit = useCallback(
      async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        try {
          setLoading(true);

          const fd = new FormData(e.currentTarget);
          var doc: ICompanyDoc = {
            doc_id: data?.doc_id ?? 0,
            company_id: Number.parseInt(`${company_id}`),
            doc_type: fd.get("doc_type") as string,
            doc_name: fd.get("doc_name") as string,
          };

          const docFile = fd.get("doc_file") as File | undefined;
          var docLink = data?.doc_link ?? "";

          if ((docFile?.size ?? 0) > SiteConfig.maxFileSize) {
            toast({
              title: "File too large",
              description: `Cannot upload this file. The file exceeds the permissible limit: ${
                SiteConfig.maxFileSize / 1e5
              }MB`,
              variant: "destructive",
            });
            setLoading(false);
            return;
          }

          if (docFile && !docError) {
            const docUpload = await uploadFile(docFile);
            if (!docUpload.ok) {
              toast({
                title: "Upload Failed",
                description: `Failed to upload the logo. Cause: ${docUpload.error.message}`,
                variant: "destructive",
              });
            } else {
              const res = docUpload.data;
              docLink = res.fileUrl;
            }
          }

          doc.doc_link = docLink;

          const apiRes = await fetch(`/api/company/document`, {
            method: data ? "PATCH" : "POST",
            body: JSON.stringify(doc),
          });
          setLoading(false);
          if (apiRes.ok) {
            toast({
              title: "Document Update Successful",
              className: ToastSuccess,
            });
            setOpen(false);
            router.refresh();
          } else {
            toast({
              title: "Document Update Failed",
              variant: "destructive",
            });
          }
        } catch (error) {
          setLoading(false);
          toast({
            title: "Something went wrong!",
            description: (error as Error).message,
            variant: "destructive",
          });
        }
      },
      [company_id, data, docError, router, toast]
    );

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={variant}
            className={className}
            ref={ref}
            {...props}
          ></Button>
        </DialogTrigger>

        <DialogContent
          className={DialogContentWidth}
          onInteractOutside={(e) => {
            if (loading) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>
              {type === "edit" ? "Edit" : "Create a"} Company Document
            </DialogTitle>
            <DialogDescription>
              Update your company&apos;s document by filling out the form.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <ScrollArea className="h-[60vh] sm:h-[70vh]">
              <div className="p-1 flex flex-col gap-4">
                <CompanyDocumentFormFragment
                  setDocError={setDocError}
                  data={data}
                />
              </div>
            </ScrollArea>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={loading}
                  variant={"destructive"}
                  className="rounded-full gap-1"
                  size={"sm"}
                >
                  <Icons.cross /> Cancel
                </Button>
              </DialogClose>

              <Button
                disabled={loading}
                className={data ? ButtonWarn : ButtonSuccess}
                size={"sm"}
              >
                {loading ? (
                  <>
                    <Icons.spinner className="animate-spin ease-in-out" />
                    Updating...
                  </>
                ) : data ? (
                  <>
                    <Icons.update /> Update
                  </>
                ) : (
                  <>
                    <Icons.check /> Submit
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
);
CompanyDocumentEditDialog.displayName = "CompanyDocumentEditDialog";

export default CompanyDocumentEditDialog;
