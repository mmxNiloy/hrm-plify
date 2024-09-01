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
import { ICompanyDoc } from "@/schema/CompanySchema";
import { ButtonWarn } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React from "react";
import CompanyDocumentFormFragment from "./form-fragment";

export default function CompanyDocumentEditDialog({
  data,
  asIcon,
  type = "edit",
}: {
  data?: ICompanyDoc;
  asIcon?: boolean;
  type?: "edit" | "create";
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={asIcon ? "ghost" : "default"}
          className={ButtonWarn}
          size={asIcon ? "icon" : "sm"}
        >
          <Icons.edit /> {!asIcon && "Update Information"}
        </Button>
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle>
            {type === "edit" ? "Edit" : "Create a"} Company Document
          </DialogTitle>
          <DialogDescription>
            Update your company&apos;s document by filling out the form.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[70vh]">
          <div className="p-1 flex flex-col gap-4">
            <CompanyDocumentFormFragment data={data} />
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
