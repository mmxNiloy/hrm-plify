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
import { ButtonWarn } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, { useCallback, useState } from "react";
import { ICompanyAuthorizedDetailsBase } from "@/schema/CompanySchema";
import CompanyAuthorityFormFragment from "../../../Form/Fragment/Company/CompanyAuthorityFormFragment";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastSuccess } from "@/styles/toast.tailwind";

export default function CompanyAuthorityEditDialog({
  data,
  title = "Authorised Personnel",
  companyId,
  id,
}: {
  data?: ICompanyAuthorizedDetailsBase;
  title?: "Authorised Personnel" | "Key Contact" | "Level 1 User";
  companyId: string;
  id?: number;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  const [docError, setDocError] = useState<Boolean>(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const fd = new FormData(e.currentTarget);
      fd.append("company_id", `${companyId}`);

      if (docError) {
        fd.delete("document");
      }

      setUpdating(true);

      try {
        const apiRes = await fetch(
          `/api/company/authority/${id ?? companyId}`,
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
    [companyId, data, docError, id, router, toast]
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
          <DialogTitle>Edit {title} Details</DialogTitle>
          <DialogDescription>
            Update your company&apos;s {title.toLowerCase()} details by filling
            out the form.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input className="hidden" name="type" defaultValue={title} />
          <ScrollArea className="h-[60vh] sm:h-[70vh]">
            <div className="p-1 grid grid-cols-2 gap-4">
              <CompanyAuthorityFormFragment
                setDocError={setDocError}
                title={title}
                disabled={updating}
                data={data}
              />
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
