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
import { ILeaveType } from "@/schema/LeaveSchema";
import { ButtonBlue, ButtonSuccess } from "@/styles/button.tailwind";
import React, { useCallback, useState } from "react";
import LeaveTypeFormFragment from "../../Form/Fragment/Leave/LeaveTypeFormFragment";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";
import {
  IOrganogramHeirarchyRecord,
  IOrganogramLevel,
} from "@/schema/OrganogramSchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { IDesignation } from "@/schema/DesignationSchema";
import HeirarchyFormFragment from "../../Form/Fragment/Organogram/HeirarchyFormFragment";

export default function HeirarchyEditDialog({
  data,
  asIcon = false,
  company_id,
  employees,
  designations,
  levels,
}: {
  data?: IOrganogramHeirarchyRecord;
  asIcon?: boolean;
  company_id: number;
  employees: IEmployeeWithUserMetadata[];
  designations: IDesignation[];
  levels: IOrganogramLevel[];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);
      const leaveType: IOrganogramHeirarchyRecord = {
        company_id: Number.parseInt(`${company_id}`),
        heirarchy_record_id: data?.heirarchy_record_id ?? 1,
        designation_id: Number.parseInt(
          (fd.get("designation_id") as string | undefined) ?? "0"
        ),
        employee_id: Number.parseInt(
          (fd.get("employee_id") as string | undefined) ?? "0"
        ),
        level_id: Number.parseInt(
          (fd.get("level_id") as string | undefined) ?? "0"
        ),
        level_reporting_authority_id: Number.parseInt(
          (fd.get("level_reporting_authority_id") as string | undefined) ?? "0"
        ),
        reporting_authority_id: Number.parseInt(
          (fd.get("reporting_authority_id") as string | undefined) ?? "0"
        ),
        designation_reporting_authority_id: Number.parseInt(
          (fd.get("designation_reporting_authority_id") as
            | string
            | undefined) ?? "0"
        ),
      };

      setLoading(true);

      try {
        const apiRes = await fetch(`/api/leave-management/leave-type`, {
          method: data ? "PATCH" : "POST",
          body: JSON.stringify(leaveType),
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
        // console.error("Failed to update leave type");
        toast({
          title: "Update Failed",
          variant: "destructive",
        });
      }

      setLoading(false);
    },
    [company_id, data, router, toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {asIcon ? (
          <Button variant={"ghost"} size="icon">
            <Icons.edit />
          </Button>
        ) : (
          <Button className={ButtonBlue}>
            <Icons.plus /> Create a Heirarchy Record
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle>
            {data ? "Update" : "Create"} a Heirarchy Record
          </DialogTitle>
          <DialogDescription>
            Fill out the form appropriately.
          </DialogDescription>
          <DialogDescription>
            Fields marked by asterisks (<span className="text-red-500">*</span>)
            are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[70vh]">
            <div className="grid grid-cols-1 p-4 gap-4">
              <HeirarchyFormFragment
                disabled={loading}
                data={data}
                employees={employees}
                designations={designations}
                levels={levels}
              />
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
