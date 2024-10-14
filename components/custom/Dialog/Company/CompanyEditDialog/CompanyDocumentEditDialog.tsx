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
import { ICompanyDoc } from "@/schema/CompanySchema";
import {
  ButtonBlue,
  ButtonSuccess,
  ButtonWarn,
} from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, { useCallback } from "react";
import CompanyDocumentFormFragment from "../../../Form/Fragment/Company/CompanyDocumentFormFragment";
import { useToast } from "@/components/ui/use-toast";

export default function CompanyDocumentEditDialog({
  data,
  asIcon,
  type = "edit",
  company_id,
}: {
  data?: ICompanyDoc;
  asIcon?: boolean;
  type?: "edit" | "create";
  company_id: number;
}) {
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const fd = new FormData(e.currentTarget);
      const apiRes = await fetch(`/api/company/document/${company_id}`, {
        method: type === "edit" ? "PUT" : "POST",
        body: fd,
      });
      const res = await apiRes.json();
      toast({
        title: res.message,
        description: JSON.stringify(res.data),
      });
    },
    [company_id, toast, type]
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={asIcon ? "ghost" : "default"}
          className={type === "edit" ? ButtonWarn : ButtonBlue}
          size={asIcon ? "icon" : "sm"}
        >
          {type === "edit" ? <Icons.edit /> : <Icons.plus />}{" "}
          {!asIcon &&
            (type === "edit" ? "Update Document" : "Create a Document")}
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

        <form onSubmit={handleSubmit} encType="multipart/form-data">
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

            <Button
              className={type === "edit" ? ButtonWarn : ButtonSuccess}
              size={"sm"}
            >
              {type === "edit" ? (
                <>
                  <Icons.update /> Update
                </>
              ) : (
                <>
                  <Icons.check /> Submit
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
