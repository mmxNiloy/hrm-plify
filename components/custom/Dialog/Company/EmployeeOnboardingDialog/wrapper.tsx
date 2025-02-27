"use client";
import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import React, { useCallback, useState } from "react";
import EmployeeOnboardingDialog from ".";
import { IUser } from "@/schema/UserSchema";
import { IEmployee } from "@/schema/EmployeeSchema";
import { IJobApplicant } from "@/schema/JobSchema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";
import { getFullNameOfUser } from "@/utils/Misc";

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
  employmentType: IEmploymentType[];
  data?: IJobApplicant;
  asIcon?: boolean;
  asMigrant?: boolean;
  onSuccess?: (employeeData: EmployeeCreationResponse) => void;
}

export default function EmployeeOnboardingDialogWrapper({
  company_id,
  departments,
  designations,
  employmentType,
  data,
  asIcon,
  asMigrant,
  onSuccess,
}: Props) {
  const router = useRouter();

  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [empData, setEmpData] = useState<EmployeeCreationResponse | undefined>(
    undefined
  );

  return (
    <>
      <EmployeeOnboardingDialog
        onSuccess={(emp) => {
          setEmpData(emp);
          setOpenAlertDialog(true);
        }}
        data={data}
        asIcon={asIcon}
        asMigrant={asMigrant}
        departments={departments}
        designations={designations}
        company_id={company_id}
        employmentTypes={employmentType}
      />

      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogTrigger asChild>
          <Button className="hidden">
            <Icons.externalLink /> Open Alert Dialog
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Employee Created Successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              Employee created successfully. An email has been sent to{" "}
              {empData && getFullNameOfUser(empData.user)}{" "}
              <em>({empData?.user.email})</em> with their login credentials.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="hidden flex-col gap-4">
            <p>Employee Login Credentials</p>

            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input readOnly value={empData?.user.email} placeholder="Email" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <PasswordInput
                readOnly
                defaultValue={empData?.password}
                asVisible
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button
                onClick={() => {
                  router.refresh();
                  setOpenAlertDialog(false);
                }}
                variant={"destructive"}
                className="bg-red-500 hover:bg-red-400"
              >
                <Icons.cross /> Close
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
