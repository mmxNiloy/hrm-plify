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
import { ILeaveApprover, ILeaveType } from "@/schema/LeaveSchema";
import { ButtonBlue, ButtonSuccess } from "@/styles/button.tailwind";
import React, { useCallback, useState } from "react";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";
import LeaveApproverFormFragment from "../../Form/Fragment/Leave/LeaveApproverFormFragment";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";

export default function LeaveApproverEditDialog({
  data,
  asIcon = false,
  company_id,
  employees,
}: {
  data?: ILeaveApprover;
  asIcon?: boolean;
  company_id: number;
  employees: IEmployeeWithUserMetadata[];
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
      const approver: ILeaveApprover = {
        company_id,
        employee_id: data
          ? data.employee_id
          : Number.parseInt(
              (fd.get("employee_id") as string | undefined) ?? "0"
            ),
        approver_id: data?.approver_id ?? 1,
        is_active: Number.parseInt(
          (fd.get("is_active") as string | undefined) ?? "0"
        ),
      };

      setLoading(true);

      try {
        const apiRes = await fetch(`/api/leave-management/leave-approver`, {
          method: data ? "PATCH" : "POST",
          body: JSON.stringify(approver),
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
        console.error("Failed to update leave approver");
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
            <Icons.plus /> Assign a Leave Approver
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle>
            {data ? "Update" : "Assign"} a Leave Approver
          </DialogTitle>
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
            <div className="grid grid-cols-1 p-4 gap-4">
              <LeaveApproverFormFragment
                employees={employees}
                disabled={loading}
                data={data}
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
