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
import { ICompanyAddress } from "@/schema/CompanySchema";
import { ButtonWarn } from "@/styles/button.tailwind";
import React, { useCallback, useState } from "react";
import CompanyAddressFormFragment from "../../../Form/Fragment/Company/CompanyAddressFormFragment";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastSuccess } from "@/styles/toast.tailwind";

export default function CompanyAddressEditDialog({
  data,
  company_id,
}: {
  data?: ICompanyAddress;
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
      fd.set("country", "Bangladesh");

      setUpdating(true);

      try {
        const apiRes = await fetch(
          `/api/company/address/${data?.address_id ?? company_id}`,
          {
            method: data ? "PUT" : "POST",
            body: fd,
          }
        );
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
            description: res.message,
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
          <Icons.edit /> Update Information
        </Button>
      </DialogTrigger>

      <DialogContent
        className={DialogContentWidth}
        onInteractOutside={(e) => {
          if (updating) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Edit Company Address</DialogTitle>
          <DialogDescription>
            Update your company&apos;s address by filling out the form.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[60vh] sm:h-[70vh]">
            <div className="p-1 grid grid-cols-2 gap-4">
              <CompanyAddressFormFragment disabled={updating} data={data} />
            </div>
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
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
