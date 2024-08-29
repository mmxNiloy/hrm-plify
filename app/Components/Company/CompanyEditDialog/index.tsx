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
import {
  ButtonBase,
  ButtonBlue,
  ButtonSuccess,
} from "@/styles/button.tailwind";
import React from "react";
import CompanyEditForm from "./edit-form";
import { ICompany } from "@/schema/CompanySchema";
import { DialogContentWidth } from "@/styles/dialog.tailwind";

export default function CompanyEditDialog({ data }: { data: ICompany }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={ButtonBlue} size="sm">
          <Icons.edit /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            <Icons.edit /> Edit Company Details
          </DialogTitle>
          <DialogDescription>Fill out the form accordingly.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[70vh]">
          <CompanyEditForm data={data} />
        </ScrollArea>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant={"destructive"}
              className={ButtonBase}
            >
              <Icons.cross /> Cancel
            </Button>
          </DialogClose>
          <Button type="submit" className={ButtonSuccess}>
            <Icons.check /> Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
