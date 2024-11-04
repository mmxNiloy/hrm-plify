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
import { upload } from "@/app/(server)/actions/upload";

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);
      const doc = fd.get("proof_of_address_doc") as File | null;

      setLoading(true);

      var document_link = data?.proof_address_doc_link ?? "";
      if (doc) {
        const docUpload = await upload(doc);
        if (docUpload.error) {
          toast({
            title: "Upload Failed",
            description: `Failed to upload contact info. Please try again later. Errors encountered: ${docUpload.error.message}`,
            variant: "destructive",
          });

          setLoading(false);
          return;
        }

        document_link = docUpload.data.fileUrl;
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
      console.log("Request body", reqBod);

      // Request api here
      try {
        const apiRes = await fetch(`/api/employee/contact-info`, {
          method: data ? "PATCH" : "POST",
          body: JSON.stringify(reqBod),
        });

        if (apiRes.ok) {
          // Close dialog, show toast, refresh parent ssc
          toast({
            title: "Update Successful",
            className: ToastSuccess,
          });
          // if (onSuccess) onSuccess(data.data.department_id);

          router.refresh();
          setOpen(false);
        } else {
          // show a failure dialog
          const res = await apiRes.json();

          toast({
            title: "Update Failed",
            description: JSON.stringify(res.message),
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
    },
    [data, employeeId, router, toast]
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
          <ScrollArea className="h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
              <ContactInfoFormFragment data={data} />
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
