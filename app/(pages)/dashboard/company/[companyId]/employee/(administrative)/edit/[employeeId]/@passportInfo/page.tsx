"use server";
import React from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import { redirect } from "next/navigation";
import { IEmployeePassportDetail } from "@/schema/EmployeeSchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import PassportDetailsFormFragment from "@/components/custom/Form/Fragment/Employee/PassportDetailsFormFragment";
import PassportDetailsEditDialog from "@/components/custom/Dialog/Employee/PassportDetailsEditDialog";
import { getPassportInfo } from "@/app/(server)/actions/employee/getPassportInfo";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function PassportInfoSlot({
  params,
}: EditEmployeeByIdProps) {
  const { employeeId, companyId } = await params;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const { data: passportInfo, error } = await getPassportInfo(employeeId);

  if (error) {
    return (
      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">Passport Information</p>
        </div>
        <ErrorFallbackCard error={error} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Passport Information</p>
        <PassportDetailsEditDialog
          employee_id={employeeId}
          data={passportInfo}
        />
      </div>
      <PassportDetailsFormFragment readOnly data={passportInfo} />
    </div>
  );
}
