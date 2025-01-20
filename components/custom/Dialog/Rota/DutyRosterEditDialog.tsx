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
import { IDutyRoster, IDutyRosterBase, IShift } from "@/schema/RotaSchema";
import { ButtonBlue, ButtonSuccess } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, { useCallback, useState } from "react";
import DutyRosterFormFragment from "../../Form/Fragment/Rota/DutyRosterFormFragment";
import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";

interface Props {
  company_id: number;
  data?: IDutyRoster;
  asIcon?: boolean;
  type?: "designation" | "employee";
  departments?: IDepartment[];
  designations?: IDesignation[];
  employees?: IEmployeeWithUserMetadata[];
  shifts?: IShift[];
}

export default function DutyRosterEditDialog({
  data,
  asIcon = false,
  type = "designation",
  departments = [],
  designations = [],
  employees = [],
  shifts = [],
  company_id,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);
      const dutyRoster: IDutyRosterBase = {
        roaster_id: data?.roaster_id ?? 1, // Ignored on the server side
        designation_id: data?.designation_id ?? 1, // Ignored on the server side
        company_id: Number.parseInt(`${company_id}`),
        shift_id: Number.parseInt(
          (fd.get("shift_id") as string | undefined) ?? "0"
        ),
        department_id: Number.parseInt(
          (fd.get("department_id") as string | undefined) ?? "0"
        ),
        employee_id: Number.parseInt(
          (fd.get("employee_id") as string | undefined) ?? "0"
        ),
        from_date: new Date(
          (fd.get("from_date") as string | undefined) ?? new Date()
        ),
        end_date: new Date(
          (fd.get("end_date") as string | undefined) ?? new Date()
        ),
      };

      setLoading(true);

      try {
        const apiRes = await fetch(`/api/rota/duty-roster`, {
          method: data ? "PUT" : "POST",
          body: JSON.stringify(dutyRoster),
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
            <Icons.plus /> Create a Duty Roster
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
          <DialogTitle>{data ? "Update" : "Create"} a Duty Roster</DialogTitle>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
              <DutyRosterFormFragment
                disabled={loading}
                showEmployee={type === "employee"}
                data={data}
                departments={departments}
                designations={designations}
                employees={employees}
                shifts={shifts}
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
