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
import { ICompanyDoc, IEmployeeDoc } from "@/schema/CompanySchema";
import React, { useCallback, useState } from "react";
import EmployeeDocumentForm from "./employee-document-form";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props extends ButtonProps {
  data?: IEmployeeDoc;
  employeeId: string;
}

const EmployeeDocumentEditDialog = React.forwardRef<HTMLButtonElement, Props>(
  (
    { className, data, employeeId, variant = "default", size, ...props },
    ref,
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
                {data ? "Edit" : "Create a"} Employee Document
              </span>
            </DialogTitle>
            <DialogDescription>
              Update your employee&apos;s document by filling out the form.
            </DialogDescription>
          </DialogHeader>

          <EmployeeDocumentForm
            data={data}
            employeeId={employeeId}
            onSuccess={onSuccess}
          />
        </DialogContent>
      </Dialog>
    );
  },
);
EmployeeDocumentEditDialog.displayName = "EmployeeDocumentEditDialog";

export default EmployeeDocumentEditDialog;
