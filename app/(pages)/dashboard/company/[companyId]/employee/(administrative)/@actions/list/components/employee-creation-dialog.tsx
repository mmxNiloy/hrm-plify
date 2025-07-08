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
import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { UserPlus2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import EmployeeCreationForm from "./employee-creation-form";
import { useRouter } from "next/navigation";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";

interface Props extends ButtonProps {
  companyId: string;
  departments: IDepartment[];
  designations: IDesignation[];
  employmentTypes: IEmploymentType[];
}

const EmployeeCreationDialog = React.forwardRef<HTMLButtonElement, Props>(
  (
    { departments, designations, employmentTypes, companyId, ...props },
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
          <Button ref={ref} {...props}></Button>
        </DialogTrigger>

        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <DialogHeader>
            <DialogTitle>
              <span className="flex items-center gap-1">
                <UserPlus2 />
                Add Employee
              </span>
            </DialogTitle>
            <DialogDescription>
              Add new employee to the company.
            </DialogDescription>
          </DialogHeader>

          <EmployeeCreationForm
            departments={departments}
            designations={designations}
            employmentTypes={employmentTypes}
            companyId={companyId}
            onSuccess={onSuccess}
          />
        </DialogContent>
      </Dialog>
    );
  }
);

EmployeeCreationDialog.displayName = "EmployeeCreationDialog";

export default EmployeeCreationDialog;
