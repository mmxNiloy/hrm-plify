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
import React, { useCallback, useState } from "react";
import EussFormFragment from "../../Form/Fragment/Employee/EussFormFragment";
import DbsFormFragment from "../../Form/Fragment/Employee/DbsFormFragment";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { ButtonSuccess, ButtonWarn } from "@/styles/button.tailwind";
import { IEmployeeEussDbsData } from "@/schema/EmployeeSchema";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastSuccess } from "@/styles/toast.tailwind";

export default function EussDbsEditDialog({
  employee_id,
  data,
  asIcon,
}: {
  employee_id: number;
  data?: IEmployeeEussDbsData;
  asIcon?: boolean;
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

      const combinedDetails = {
        id: 0,
        employee_id: Number.parseInt(`${employee_id}`),
        // EUSS Fields
        euss_time_linit_ref_num: fd.get("euss_time_linit_ref_num") as string,
        euss_issue_date: fd.get("euss_issue_date")
          ? new Date(fd.get("euss_issue_date") as string)
          : null,
        euss_expiry_date: fd.get("euss_expiry_date")
          ? new Date(fd.get("euss_expiry_date") as string)
          : null,
        euss_doc: "", // TODO: File upload handling here?
        euss_remarks: (fd.get("euss_remarks") as string | null) ?? "",
        euss_is_current: fd.get("euss_is_current")
          ? fd.get("euss_is_current") === "yes"
            ? 1
            : 0
          : 0,
        // DBS Fields
        dbs_ref_no: fd.get("dbs_ref_no") as string,
        nationality: fd.get("nationality") as string,
        dbs_issue_date: fd.get("dbs_issue_date")
          ? new Date(fd.get("dbs_issue_date") as string)
          : null,
        dbs_expiry_date: fd.get("dbs_expiry_date")
          ? new Date(fd.get("dbs_expiry_date") as string)
          : null,
        dbs_doc: "", // TODO: Upload file handling here?
        dbs_type: (fd.get("dbs_type") as string | null) ?? "",
        dbs_is_current: fd.get("dbs_is_current")
          ? fd.get("dbs_is_current") === "yes"
            ? 1
            : 0
          : 0,
      } as IEmployeeEussDbsData;

      const reqBod = data
        ? Object.assign(data, combinedDetails)
        : combinedDetails;

      setLoading(true);

      try {
        const apiRes = await fetch(`/api/employee/euss-dbs-info`, {
          method: data ? "PATCH" : "POST",
          body: JSON.stringify(reqBod),
        });

        if (apiRes.ok) {
          toast({
            title: "Update Successful",
            className: ToastSuccess,
          });

          router.refresh();
          setOpen(false);
        } else {
          const res = await apiRes.json();
          toast({
            title: "Update Failed",
            description: JSON.stringify(res.message),
            variant: "destructive",
          });
        }
      } catch (err) {
        toast({
          title: "Update Failed",
          variant: "destructive",
        });
      }

      setLoading(false);
    },
    [data, employee_id, router, toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {asIcon ? (
          <Button variant={"ghost"} size="icon" className="rounded-full">
            <Icons.edit />
          </Button>
        ) : (
          <Button className={ButtonWarn}>
            <Icons.edit /> Edit EUSS & DBS Information
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        className={DialogContentWidth}
        onInteractOutside={(e) => {
          if (loading) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>EUSS & DBS Information</DialogTitle>
          <DialogDescription>
            Fill out the form appropriately.
          </DialogDescription>
          <DialogDescription>
            Fields marked by an asterisk (
            <span className="text-red-500">*</span>) are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
              <p className="text-lg font-semibold col-span-full">
                EUSS/Time Limit Information
              </p>
              <EussFormFragment data={data} />

              <p className="text-lg font-semibold col-span-full">
                Disclosure and Barring Service (DBS) Details
              </p>
              <DbsFormFragment data={data} />
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
