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
import React from "react";
import CompanyProfileFormFragment from "./form-fragment";

export default function CompanyProfileEditDialog({ data }: { data: ICompany }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={ButtonWarn} size={"sm"}>
          <Icons.edit /> Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle>Edit Company Profile</DialogTitle>
          <DialogDescription>
            Update your company profile by filling out the form.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[70vh]">
          <div className="p-1 flex flex-col gap-4">
            <CompanyProfileFormFragment data={data} />
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
