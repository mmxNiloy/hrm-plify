"use client";
import { Button, ButtonProps } from "@/components/ui/button";
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
import React, { HTMLAttributes, useCallback, useState } from "react";
import CompanyDocumentForm from "./company-document-form";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props extends ButtonProps {
  data?: ICompanyDoc;
  companyId: string;
}

const CompanyDocumentEditDialog = React.forwardRef<HTMLButtonElement, Props>(
  (
    { className, data, companyId, variant = "default", size, ...props },
    ref
  ) => {
    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();

    const onSuccess = useCallback(() => {
      setOpen(false);
      router.refresh();
    }, [router]);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size={size}
            variant={variant}
            className={className}
            ref={ref}
            {...props}
          ></Button>
        </DialogTrigger>

        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <DialogHeader>
            <DialogTitle>
              <span className="flex gap-1 items-center">
                <Edit />
                {data ? "Edit" : "Create a"} Company Document
              </span>
            </DialogTitle>
            <DialogDescription>
              Update your company&apos;s document by filling out the form.
            </DialogDescription>
          </DialogHeader>

          <CompanyDocumentForm
            data={data}
            companyId={companyId}
            onSuccess={onSuccess}
          />
        </DialogContent>
      </Dialog>
    );
  }
);
CompanyDocumentEditDialog.displayName = "CompanyDocumentEditDialog";

export default CompanyDocumentEditDialog;
