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
import { ICompany } from "@/schema/CompanySchema";
import { ButtonWarn } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, { useCallback, useState } from "react";
import CompanyProfileFormFragment from "../../../Form/Fragment/Company/CompanyProfileFormFragment";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastSuccess } from "@/styles/toast.tailwind";

export default function CompanyProfileEditDialog({ data }: { data: ICompany }) {
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
        const apiRes = await fetch(`/api/company/profile/${data.company_id}`, {
          method: "PUT",
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
    [data.company_id, router, toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={ButtonWarn} size={"sm"}>
          <Icons.edit /> Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          if (updating) e.preventDefault();
        }}
        className={DialogContentWidth}
      >
        <DialogHeader>
          <DialogTitle>Edit Company Profile</DialogTitle>
          <DialogDescription>
            Update your company profile by filling out the form.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <ScrollArea className="h-[70vh]">
            <div className="p-1 flex flex-col gap-4">
              <CompanyProfileFormFragment disabled={updating} data={data} />
            </div>
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={updating}
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
