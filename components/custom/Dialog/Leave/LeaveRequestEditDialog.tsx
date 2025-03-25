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
import { ILeaveRequest, ILeaveType, TLeaveStatus } from "@/schema/LeaveSchema";
import { ButtonGradient, ButtonSuccess } from "@/styles/button.tailwind";
import React, { useCallback, useState } from "react";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";
import LeaveRequestFormFragment from "../../Form/Fragment/Leave/LeaveRequestFormFragment";

export default function LeaveRequestEditDialog({
  data,
  asIcon = false,
  company_id,
  leaveTypes = [],
  employee_id,
}: {
  data?: ILeaveRequest;
  asIcon?: boolean;
  company_id: number;
  leaveTypes?: ILeaveType[];
  employee_id?: number;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (!data?.employee_id && !employee_id) {
        // console.error("Leave Request Edit Dialog >", data);
        alert(
          "Data integrity failed. Employee ID does not exist for this entry. Cannot edit this item. Please check data integrity."
        );
        return;
      }

      const fd = new FormData(e.currentTarget);
      const leaveReq: ILeaveRequest = {
        company_id: Number.parseInt(`${company_id}`),
        employee_id: data?.employee_id ?? employee_id ?? 0,
        end_date: new Date(
          (fd.get("end_date") as string | undefined) ?? new Date()
        ),
        leave_request_id: data?.leave_request_id ?? 0,
        leave_type_id: data
          ? data.leave_type_id
          : Number.parseInt(
              (fd.get("leave_type_id") as string | undefined) ?? "0"
            ),
        reason: data ? data.reason : (fd.get("reason") as string),
        start_date: new Date(
          (fd.get("start_date") as string | undefined) ?? new Date()
        ),
        status: fd.get("status") as TLeaveStatus,
      };

      setLoading(true);

      try {
        const apiRes = await fetch(`/api/leave-management/leave-request`, {
          method: data ? "PATCH" : "POST",
          body: JSON.stringify(leaveReq),
        });

        const result = await apiRes.json();

        console.log(
          "Leave Request Edit Dialog > Create Leave Req > Response >",
          result
        );

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

          toast({
            title: "Update Failed",
            description: JSON.stringify(result.message),
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
    [company_id, data, employee_id, router, toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {asIcon ? (
          <Button variant={"ghost"} size="icon">
            <Icons.edit />
          </Button>
        ) : (
          <Button className={ButtonGradient}>
            <Icons.plus /> Request a Leave
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          if (loading) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className={DialogContentWidth}
      >
        <DialogHeader>
          <DialogTitle>
            {data ? "Update Leave Request" : "Request a Leave"}
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
              <LeaveRequestFormFragment
                disabled={loading}
                leaveTypes={leaveTypes}
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

            <DialogClose asChild>
              <Button
                type="button"
                disabled={loading}
                className="rounded-full gap-1"
                variant={"destructive"}
                size="sm"
              >
                <Icons.trash /> Cancel Request
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
