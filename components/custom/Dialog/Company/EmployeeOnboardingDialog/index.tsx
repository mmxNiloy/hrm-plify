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
import { useToast } from "@/components/ui/use-toast";
import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { ButtonGradient, ButtonSuccess } from "@/styles/button.tailwind";
import {
  DialogContentWidth,
  DialogTitleStyles,
} from "@/styles/dialog.tailwind";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import EmployeeOnboardingFormFragment from "../../../Form/Fragment/Company/EmployeeOnboardingFormFragment";
import { IJobApplicant } from "@/schema/JobSchema";
import { IUser } from "@/schema/UserSchema";
import { IEmployee } from "@/schema/EmployeeSchema";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";

interface EmployeeCreationResponse {
  message: string;
  user: IUser;
  employee: IEmployee;
  password: string;
}

interface Props {
  company_id: number;
  departments: IDepartment[];
  designations: IDesignation[];
  employmentTypes: IEmploymentType[];
  data?: IJobApplicant;
  asIcon?: boolean;
  asMigrant?: boolean;
  onSuccess?: (employeeData: EmployeeCreationResponse) => void;
}

export default function EmployeeOnboardingDialog({
  company_id,
  departments,
  designations,
  employmentTypes,
  data,
  asIcon,
  asMigrant,
  onSuccess,
}: Props) {
  const { toast } = useToast();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);
      fd.append("company_id", `${company_id}`);

      if (asMigrant) {
        fd.set("is_foreign", "1");
      }

      setLoading(true);

      try {
        const apiRes = await fetch(`/api/employee`, {
          method: "POST",
          body: fd,
        });

        const res = await apiRes.json();

        if (apiRes.ok) {
          // Show an alert dialog to remind the user that this password is one-time use only
          if (onSuccess) {
            onSuccess(res as EmployeeCreationResponse);
          }

          // Close dialog, show toast, refresh parent ssc
          toast({
            title: "Creation Successful",
            className: ToastSuccess,
          });
          // if (onSuccess) onSuccess(data.data.department_id);

          // router.refresh();
          setOpen(false);
        } else {
          // show a failure dialog
          toast({
            title: "Creation Failed",
            description: JSON.stringify(res.message),
            variant: "destructive",
          });
        }
      } catch (err) {
        // console.error("Failed to create employee.", err);
        toast({
          title: "Creation Failed",
          variant: "destructive",
        });
      }

      setLoading(false);
    },
    [asMigrant, company_id, onSuccess, toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {asIcon ? (
          <Button size="icon" variant={"ghost"}>
            <Icons.userPlus />
          </Button>
        ) : (
          <Button className={ButtonGradient}>
            <Icons.plus /> Add an Employee
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        className={DialogContentWidth}
        onInteractOutside={(e) => {
          if (loading) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className={DialogTitleStyles}>
            <Icons.employee /> Add an Employee
          </DialogTitle>
          <DialogDescription>
            Fill out the form with appropriate information.
          </DialogDescription>
          <DialogDescription>
            Fields marked by asterisks (<span className="text-red-500">*</span>)
            are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {/* Form body */}
          <div className="grid grid-cols-3 gap-4 py-4">
            <EmployeeOnboardingFormFragment
              data={data}
              departments={departments}
              designations={designations}
              employmentTypes={employmentTypes}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={loading}
                type="button"
                className="rounded-full gap-2"
                variant={"destructive"}
                size={"sm"}
              >
                <Icons.cross /> Close
              </Button>
            </DialogClose>

            <Button
              disabled={loading}
              type="submit"
              className={ButtonSuccess}
              size={"sm"}
            >
              {loading ? (
                <Icons.spinner className="animate-spin ease-in-out" />
              ) : (
                <Icons.check />
              )}{" "}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
