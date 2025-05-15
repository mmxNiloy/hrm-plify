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
import { ToastSuccess, ToastWarn } from "@/styles/toast.tailwind";
import { IUploadResponse, upload } from "@/app/(server)/actions/upload";
import EussDbsDialogContext from "@/context/EussDbsDialogContext";
import createChangeOfCircumstances from "@/app/(server)/actions/change-of-circumstances/create-change-of-circumstances.controller";

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
  const [eussDocError, setEussDocError] = useState<Boolean>(false);
  const [dbsDocError, setDbsDocError] = useState<Boolean>(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        const fd = new FormData(e.currentTarget);
        const euss_doc = fd.get("euss_doc") as File | undefined;
        const dbs_doc = fd.get("dbs_doc") as File | undefined;

        setLoading(true);

        if (eussDocError || dbsDocError) {
          toast({
            title: "File too large",
            description:
              "Attached document exceeds file limit. File(s) will not be uploaded.",
            className: ToastWarn,
          });
        }

        const [eussDocUpload, dbsDocUpload] = await Promise.all([
          euss_doc && !eussDocError
            ? upload(euss_doc)
            : new Promise<IUploadResponse>((resolve, reject) => {
                resolve({
                  data: {
                    message: "Default EUSS doc link",
                    fileUrl: data?.euss_doc ?? "",
                  },
                });
              }),
          dbs_doc && !dbsDocError
            ? upload(dbs_doc)
            : new Promise<IUploadResponse>((resolve, reject) => {
                resolve({
                  data: {
                    message: "Default DBS doc link",
                    fileUrl: data?.dbs_doc ?? "",
                  },
                });
              }),
        ]);

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
          euss_doc: eussDocUpload.data?.fileUrl ?? data?.euss_doc ?? "",
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
          dbs_doc: dbsDocUpload.data?.fileUrl ?? data?.dbs_doc ?? "",
          dbs_type: (fd.get("dbs_type") as string | null) ?? "",
          dbs_is_current: fd.get("dbs_is_current")
            ? fd.get("dbs_is_current") === "yes"
              ? 1
              : 0
            : 0,
        };

        const newValue = {
          euss_time_linit_ref_num:
            combinedDetails.euss_time_linit_ref_num || "",
          euss_issue_date: combinedDetails.euss_issue_date
            ? combinedDetails.euss_issue_date.toISOString().split("T")[0]
            : "",
          euss_expiry_date: combinedDetails.euss_expiry_date
            ? combinedDetails.euss_expiry_date.toISOString().split("T")[0]
            : "",
          euss_doc: combinedDetails.euss_doc || "",
          euss_remarks: combinedDetails.euss_remarks || "",
          euss_is_current: combinedDetails.euss_is_current || 0,
          dbs_ref_no: combinedDetails.dbs_ref_no || "",
          nationality: combinedDetails.nationality || "",
          dbs_issue_date: combinedDetails.dbs_issue_date
            ? combinedDetails.dbs_issue_date.toISOString().split("T")[0]
            : "",
          dbs_expiry_date: combinedDetails.dbs_expiry_date
            ? combinedDetails.dbs_expiry_date.toISOString().split("T")[0]
            : "",
          dbs_doc: combinedDetails.dbs_doc || "",
          dbs_type: combinedDetails.dbs_type || "",
          dbs_is_current: combinedDetails.dbs_is_current || 0,
        };

        const oldValue: typeof newValue = {
          euss_time_linit_ref_num: data?.euss_time_linit_ref_num || "",
          euss_issue_date: data?.euss_issue_date
            ? new Date(data?.euss_issue_date).toISOString().split("T")[0]
            : "",
          euss_expiry_date: data?.euss_expiry_date
            ? new Date(data?.euss_expiry_date).toISOString().split("T")[0]
            : "",
          euss_doc: data?.euss_doc || "",
          euss_remarks: data?.euss_remarks || "",
          euss_is_current: data?.euss_is_current || 0,
          dbs_ref_no: data?.dbs_ref_no || "",
          nationality: data?.nationality || "",
          dbs_issue_date: data?.dbs_issue_date
            ? new Date(data?.dbs_issue_date).toISOString().split("T")[0]
            : "",
          dbs_expiry_date: data?.dbs_expiry_date
            ? new Date(data?.dbs_expiry_date).toISOString().split("T")[0]
            : "",
          dbs_doc: data?.dbs_doc || "",
          dbs_type: data?.dbs_type || "",
          dbs_is_current: data?.dbs_is_current || 0,
        };

        const reqBod = data
          ? Object.assign(data, combinedDetails)
          : combinedDetails;

        try {
          const [apiRes, coc] = await Promise.allSettled([
            fetch(`/api/employee/euss-dbs-info`, {
              method: data ? "PATCH" : "POST",
              body: JSON.stringify(reqBod),
            }),
            createChangeOfCircumstances({
              employee_id,
              newValue,
              oldValue,
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
            toast({
              title: "Update Successful",
              className: ToastSuccess,
            });

            router.refresh();
            setOpen(false);
          } else {
            toast({
              title: "Update Failed",
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
      } catch (error) {
        setLoading(false);
        toast({
          title: "Something went wrong!",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
    },
    [data, dbsDocError, employee_id, eussDocError, router, toast]
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
            Fields marked by asterisks (<span className="text-red-500">*</span>)
            are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[60vh] sm:h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
              <p className="text-lg font-semibold col-span-full">
                EUSS/Time Limit Information
              </p>
              <EussDbsDialogContext.Provider
                value={{
                  eussDocError,
                  setEussDocError,
                  dbsDocError,
                  setDbsDocError,
                }}
              >
                <EussFormFragment data={data} />

                <p className="text-lg font-semibold col-span-full">
                  Disclosure and Barring Service (DBS) Details
                </p>
                <DbsFormFragment data={data} />
              </EussDbsDialogContext.Provider>
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
