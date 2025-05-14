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
import { useToast } from "@/components/ui/use-toast";
import { IEmployeeContactInfo } from "@/schema/EmployeeSchema";
import { ButtonSuccess, ButtonWarn } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import ContactInfoFormFragment from "../../Form/Fragment/Employee/ContactInfoFormFragment";
import { IUploadResult, upload } from "@/app/(server)/actions/upload";
import SiteConfig from "@/utils/SiteConfig";
import uploadFile from "@/utils/uploadFile";
import createChangeOfCircumstances from "@/app/(server)/actions/change-of-circumstances/create-change-of-circumstances.controller";

export default function ContactInfoEditDialog({
  data,
  employeeId,
}: {
  data?: IEmployeeContactInfo;
  employeeId: number;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [docError, setDocError] = useState<Boolean>(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        const fd = new FormData(e.currentTarget);
        const doc = fd.get("proof_of_address_doc") as File | null;

        setLoading(true);

        if ((doc?.size ?? 0) > SiteConfig.maxFileSize) {
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

        var document_link = data?.proof_address_doc_link ?? "";
        if (doc && !docError) {
          // Upload the logo
          const docUpload = await uploadFile(doc);
          if (!docUpload.ok) {
            toast({
              title: "Upload Failed",
              description: `Failed to upload the logo. Cause: ${docUpload.error.message}`,
              variant: "destructive",
            });
          } else {
            const res = docUpload.data;
            document_link = res.fileUrl;
          }
        }

        const contactInfo = {
          postcode: fd.get("postcode") as string,
          address_line: fd.get("address_line") as string,
          additional_address_1: fd.get("additional_address_1") as string,
          additional_address_2: fd.get("additional_address_2") as string,
          country: fd.get("country") as string,
          proof_address_doc_link: document_link,
        };

        const reqBod = data
          ? Object.assign(data, contactInfo)
          : { employee_id: employeeId, ...contactInfo };
        // console.log("Request body", reqBod);

        // Request api here
        try {
          const [apiRes, coc] = await Promise.allSettled([
            fetch(`/api/employee/contact-info`, {
              method: data ? "PATCH" : "POST",
              body: JSON.stringify(reqBod),
            }),
            createChangeOfCircumstances({
              employee_id: reqBod.employee_id,
              newValue: reqBod,
              oldValue: data ?? {},
            }),
          ]);

          if (coc.status === "rejected") {
            toast({
              title: "Failed to record the change of circumstances",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Recorded the change of circumstanecs",
              className: ToastSuccess,
            });
          }

          if (apiRes.status === "fulfilled") {
            // Close dialog, show toast, refresh parent ssc
            toast({
              title: "Update Successful",
              className: ToastSuccess,
            });
            // if (onSuccess) onSuccess(data.data.department_id);

            router.refresh();
            setOpen(false);
          } else {
            toast({
              title: "Update Failed",
              variant: "destructive",
            });
          }
        } catch (err) {
          // console.error("Failed to update employee personal information.", err);
          toast({
            title: "Update Failed",
            variant: "destructive",
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast({
          title: "Something went wrong!",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
    },
    [data, docError, employeeId, router, toast]
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={ButtonWarn}>
          <Icons.edit /> Edit Contact Information
        </Button>
      </DialogTrigger>

      <DialogContent
        className={DialogContentWidth}
        onInteractOutside={(e) => {
          if (loading) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Edit Contact Information</DialogTitle>
          <DialogDescription>
            Fill out the form appropriately.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[60vh] sm:h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
              <ContactInfoFormFragment setDocError={setDocError} data={data} />
            </div>
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                disabled={loading}
                className="rounded-full"
                variant={"destructive"}
                size="sm"
              >
                <Icons.cross /> Close
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className={ButtonSuccess}
              size="sm"
            >
              {loading ? (
                <Icons.spinner className="animate-spin ease-in-out" />
              ) : (
                <Icons.check />
              )}{" "}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
