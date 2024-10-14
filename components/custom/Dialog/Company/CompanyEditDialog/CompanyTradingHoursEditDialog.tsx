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
import { ICompanyTradingHour } from "@/schema/CompanySchema";
import { ButtonWarn } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, { useCallback, useState } from "react";
import CompanyTradingHoursFormFragment from "../../../Form/Fragment/Company/CompanyTradingHoursFormFragment";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function CompanyTradingHoursEditDialog({
  data,
  company_id,
}: {
  data: ICompanyTradingHour[];
  company_id: number;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const fd = new FormData(e.currentTarget);

      setUpdating(true);

      try {
        const apiRes = await fetch(`/api/company/trade-hour/${company_id}`, {
          method: data.length ? "PUT" : "POST",
          body: fd,
        });

        const res = await apiRes.json();

        if (apiRes.ok) {
          // Close dialog, show toast, refresh parent ssc
          toast({
            title: "Update Successful",
            className: ToastSuccess,
          });

          router.refresh();
          setOpen(false);
        } else {
          // show a failure dialog
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

      setUpdating(false);
    },
    [company_id, data, router, toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={ButtonWarn} size={"sm"}>
          <Icons.edit /> Update Trading Hours
        </Button>
      </DialogTrigger>

      <DialogContent
        className={DialogContentWidth}
        onInteractOutside={(e) => {
          if (updating) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Update Company Trading Hours</DialogTitle>
          <DialogDescription>
            Fill out the form to update company trading hours.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[70vh]">
            <div className="p-1 grid grid-cols-4 gap-4">
              <CompanyTradingHoursFormFragment data={data} />
            </div>
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant={"destructive"}
                className="rounded-full gap-1"
                size={"sm"}
              >
                <Icons.cross /> Cancel
              </Button>
            </DialogClose>

            <Button disabled={updating} className={ButtonWarn} size={"sm"}>
              {updating ? (
                <>
                  <Icons.update className="animate-spin ease-in-out" />
                  {" Updating..."}
                </>
              ) : (
                <>
                  <Icons.update />
                  {" Update"}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
