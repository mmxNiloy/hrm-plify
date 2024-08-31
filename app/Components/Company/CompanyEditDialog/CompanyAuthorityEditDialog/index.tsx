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
import React from "react";
import { ICompanyAuthorisedDetails } from "@/schema/CompanySchema";
import CompanyAuthorityFormFragment from "./form-fragment";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CompanyAuthorityEditDialog({
  data,
}: {
  data?: ICompanyAuthorisedDetails;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={ButtonWarn} size={"sm"}>
          <Icons.edit /> Update Information
        </Button>
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle>Edit Authorized Personnel Details</DialogTitle>
          <DialogDescription>
            Update your company&apos;s authorized personnel details by filling
            out the form.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[70vh]">
          <div className="p-1 grid grid-cols-2 gap-4">
            <CompanyAuthorityFormFragment data={data} />
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

          <Button className={ButtonWarn} size={"sm"}>
            <Icons.update /> Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
