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
import {
  ILatePolicy,
  IOffDays,
  IOffDaysBase,
  IShift,
} from "@/schema/RotaSchema";
import { ButtonBlue, ButtonSuccess } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, { useCallback, useState } from "react";
import OffDaysFormFragment from "../../Form/Fragment/Rota/OffDaysFormFragment";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";
import LatePolicyFormFragment from "../../Form/Fragment/Rota/LatePolicyFormFragment";
import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";

export default function LatePolicyEditDialog({
  data,
  asIcon = false,
  company_id,
  shifts = [],
  departments = [],
  designations = [],
}: {
  company_id: number;
  data?: ILatePolicy;
  asIcon?: boolean;
  shifts?: IShift[];
  departments?: IDepartment[];
  designations?: IDesignation[];
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);
      const latePolicy: ILatePolicy = {
        id: data?.id ?? 1,
        company_id: Number.parseInt(`${company_id}`),
        shift_id: Number.parseInt((fd.get("shift_id") as string) ?? "0"),
        num_day_allow: Number.parseInt(
          ((fd.get("num_day_allow") as string | undefined) || null) ?? "0"
        ),
        num_day_salary_deduct: Number.parseInt(
          ((fd.get("num_day_salary_deduct") as string | undefined) || null) ??
            "0"
        ),
        max_grace_period_min: Number.parseInt(
          ((fd.get("max_grace_period_min") as string | undefined) || null) ??
            "0"
        ),
        department_id: Number.parseInt(
          ((fd.get("department_id") as string | undefined) || null) ?? "0"
        ),
        designation_id: Number.parseInt(
          (fd.get("designation_id") as string | undefined) ?? "0"
        ),
      };

      setLoading(true);

      try {
        const apiRes = await fetch(`/api/rota/late-policy`, {
          method: data ? "PUT" : "POST",
          body: JSON.stringify(latePolicy),
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
            <Icons.plus /> Create Late Policy
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
          <DialogTitle>{data ? "Edit" : "Create"} Late Policy</DialogTitle>
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
              <LatePolicyFormFragment
                disabled={loading}
                shifts={shifts}
                data={data}
                departments={departments}
                designations={designations}
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
