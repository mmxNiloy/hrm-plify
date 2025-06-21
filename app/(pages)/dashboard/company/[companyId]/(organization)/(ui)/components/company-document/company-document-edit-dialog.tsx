"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ICompanyDoc } from "@/schema/CompanySchema";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, { HTMLAttributes, useState } from "react";
import CompanyDocumentForm from "./company-document-form";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  data?: ICompanyDoc;
  companyId: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

const CompanyDocumentEditDialog = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, data, companyId, variant = "default", ...props }, ref) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={variant}
            className={className}
            ref={ref}
            {...props}
          ></Button>
        </DialogTrigger>

        <DialogContent
          className={DialogContentWidth}
          onInteractOutside={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <DialogHeader>
            <DialogTitle>
              {data ? "Edit" : "Create a"} Company Document
            </DialogTitle>
            <DialogDescription>
              Update your company&apos;s document by filling out the form.
            </DialogDescription>
          </DialogHeader>

          <CompanyDocumentForm
            data={data}
            companyId={companyId}
            onSuccess={() => {
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }
);
CompanyDocumentEditDialog.displayName = "CompanyDocumentEditDialog";

export default CompanyDocumentEditDialog;
