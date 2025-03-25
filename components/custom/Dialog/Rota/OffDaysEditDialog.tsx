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
import { IOffDays, IOffDaysBase, IShift } from "@/schema/RotaSchema";
import { ButtonGradient, ButtonSuccess } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, { useCallback, useState } from "react";
import OffDaysFormFragment from "../../Form/Fragment/Rota/OffDaysFormFragment";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";

export default function OffDaysEditDialog({
  data,
  asIcon = false,
  company_id,
  shifts = [],
}: {
  company_id: number;
  data?: IOffDays;
  asIcon?: boolean;
  shifts?: IShift[];
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
      const offDays: IOffDaysBase = {
        id: data?.id ?? 1,
        company_id: Number.parseInt(`${company_id}`),
        shift_id: Number.parseInt((fd.get("shift_id") as string) ?? "0"),
        sunday:
          (fd.get("sunday") as string | null | undefined) === "on" ? 1 : 0,
        monday:
          (fd.get("monday") as string as string | null | undefined) === "on"
            ? 1
            : 0,
        tuesday:
          (fd.get("tuesday") as string as string | null | undefined) === "on"
            ? 1
            : 0,
        wednesday:
          (fd.get("wednesday") as string as string | null | undefined) === "on"
            ? 1
            : 0,
        thursday:
          (fd.get("thursday") as string as string | null | undefined) === "on"
            ? 1
            : 0,
        friday:
          (fd.get("friday") as string as string | null | undefined) === "on"
            ? 1
            : 0,
        saturday:
          (fd.get("saturday") as string as string | null | undefined) === "on"
            ? 1
            : 0,
      };

      setLoading(true);

      try {
        const apiRes = await fetch(`/api/rota/off-days`, {
          method: data ? "PUT" : "POST",
          body: JSON.stringify(offDays),
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
          <Button className={ButtonGradient}>
            <Icons.plus /> Create Off Days&apos; Schedule
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
          <DialogTitle>Create an Off Days&apos; Schedule</DialogTitle>
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
              <OffDaysFormFragment
                disabled={loading}
                shifts={shifts}
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
