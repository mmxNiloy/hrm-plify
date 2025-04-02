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
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";

export default async function PassportInfoSlot({
  params,
}: EditEmployeeByIdProps) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_emp_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_emp_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_emp_update");

  // if (!readAccess) {
  //   return <AccessDenied />;
  // }

  const { employeeId, companyId } = await params;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const emp = await getEmployeeData();
  const empId = emp.data?.data?.employee_id ?? 0;
  const { data: passportInfo, error } = await getPassportInfo(empId);

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6 md:p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold">
            Passport Information
          </p>
        </div>
        <ErrorFallbackCard error={error} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6 md:p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Passport Information
        </p>
        {/* {updateAccess && (
        )} */}
        <PassportDetailsEditDialog
          employee_id={employeeId}
          data={passportInfo}
        />
      </div>
      <PassportDetailsFormFragment readOnly data={passportInfo} />
    </div>
  );
}
