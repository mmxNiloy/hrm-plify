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
import React, { useCallback } from "react";
import CompanyAddressFormFragment from "./form-fragment";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { useToast } from "@/components/ui/use-toast";

export default function CompanyAddressEditDialog({
  data,
  company_id,
}: {
  data?: ICompanyAddress;
  company_id: number;
}) {
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const fd = new FormData(e.currentTarget);
      const apiRes = await fetch(`/api/company/address/${company_id}`, {
        method: "PUT",
        body: fd,
      });
      const res = await apiRes.json();
      toast({
        title: res.message,
        description: JSON.stringify(res.data),
      });
    },
    [company_id, toast]
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={ButtonWarn} size={"sm"}>
          <Icons.edit /> Update Information
        </Button>
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle>Edit Company Address</DialogTitle>
          <DialogDescription>
            Update your company&apos;s address by filling out the form.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[70vh]">
            <div className="p-1 grid grid-cols-2 gap-4">
              <CompanyAddressFormFragment data={data} />
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

            <Button type="submit" className={ButtonWarn} size={"sm"}>
              <Icons.update /> Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
