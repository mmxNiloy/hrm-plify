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
import React from "react";
import CompanyTradingHoursFormFragment from "./form-fragment";

export default function CompanyTradingHoursEditDialog({
  data,
}: {
  data: ICompanyTradingHour[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={ButtonWarn} size={"sm"}>
          <Icons.edit /> Update Trading Hours
        </Button>
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle>Update Company Trading Hours</DialogTitle>
          <DialogDescription>
            Fill out the form to update company trading hours.
          </DialogDescription>
        </DialogHeader>
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

          <Button className={ButtonWarn} size={"sm"}>
            <Icons.update /> Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
