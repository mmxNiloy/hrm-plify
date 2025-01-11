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
import { ButtonBlue, ButtonSuccess } from "@/styles/button.tailwind";
import {
  DialogContentWidth,
  DialogTitleStyles,
} from "@/styles/dialog.tailwind";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import EmployeeOnboardingFormFragment from "../../Form/Fragment/Company/EmployeeOnboardingFormFragment";
import { IJobApplicant } from "@/schema/JobSchema";
import ApplicantOnboardingFormFragment from "../../Form/Fragment/Recruitment/ApplicantOnboardingFormFragment";
import { IUser } from "@/schema/UserSchema";
import { IEmployee } from "@/schema/EmployeeSchema";

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
  data: IJobApplicant;
  asMenuItem?: boolean;
  disabled?: boolean;
  onSuccess?: (data: any) => void;
}

export default function ApplicantOnboardingDialog({
  company_id,
  departments,
  designations,
  data,
  asMenuItem: asIcon,
  disabled,
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

      setLoading(true);

      try {
        const apiRes = await fetch(`/api/recruitment/onboard`, {
          method: "POST",
          body: JSON.stringify({
            job_id: data.job_id,
            applicant_id: data.id,
          }),
        });

        const res = await apiRes.json();

        if (apiRes.ok) {
          // Close dialog, show toast, refresh parent ssc
          toast({
            title: "Creation Successful",
            className: ToastSuccess,
          });
          // if (onSuccess) onSuccess(data.data.department_id);

          if (onSuccess) {
            onSuccess(res);
          }

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
        console.error("Failed to create employee.", err);
        toast({
          title: "Creation Failed",
          variant: "destructive",
        });
      }

      setLoading(false);
    },
    [data.id, data.job_id, onSuccess, toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {asIcon ? (
          <Button
            disabled={disabled}
            size="sm"
            variant={"ghost"}
            className="w-full justify-start gap-1"
          >
            <Icons.userPlus /> Hire Applicant
          </Button>
        ) : (
          <Button disabled={disabled} className={ButtonBlue}>
            <Icons.plus /> Onboard an Applicant
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
            <Icons.employee /> Onboard an Applicant
          </DialogTitle>
          <DialogDescription>
            Fill out the form with appropriate information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {/* Form body */}
          <div className="flex flex-col gap-4 h-[70vh]">
            <ApplicantOnboardingFormFragment data={data} />
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
