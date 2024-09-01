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
import React, { useCallback } from "react";
import { ICompanyAuthorisedDetails } from "@/schema/CompanySchema";
import CompanyAuthorityFormFragment from "./form-fragment";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

export default function CompanyAuthorityEditDialog({
  data,
  title = "Authorised Personnel",
  company_id,
}: {
  data?: ICompanyAuthorisedDetails;
  title?: "Authorised Personnel" | "Key Contact" | "Level 1 User";
  company_id: number;
}) {
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const fd = new FormData(e.currentTarget);
      const apiRes = await fetch(`/api/company/authority/${company_id}`, {
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
          <DialogTitle>Edit {title} Details</DialogTitle>
          <DialogDescription>
            Update your company&apos;s {title.toLowerCase()} details by filling
            out the form.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input className="hidden" name="type" defaultValue={title} />
          <ScrollArea className="h-[70vh]">
            <div className="p-1 grid grid-cols-2 gap-4">
              <CompanyAuthorityFormFragment data={data} />
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

            <Button className={ButtonWarn} size={"sm"}>
              <Icons.update /> Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
