"use server";
import { IEmployeeEussDbsData } from "@/schema/EmployeeSchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import EussDbsEditDialog from "@/components/custom/Dialog/Employee/EussDbsEditDialog";
import EussFormFragment from "@/components/custom/Form/Fragment/Employee/EussFormFragment";
import DbsFormFragment from "@/components/custom/Form/Fragment/Employee/DbsFormFragment";
import { getEussDBInfo } from "@/app/(server)/actions/employee/getEussDBInfo";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";

export default async function EussDetailsSlot({
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
  const { data: euss, error } = await getEussDBInfo(empId);

  if (error) {
    return (
      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">EUSS/Time Limit Information</p>
        </div>
        <ErrorFallbackCard error={error} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">EUSS/Time Limit Information</p>
          {/* {updateAccess && (
          )} */}
          <EussDbsEditDialog data={euss} employee_id={employeeId} />
        </div>
        <EussFormFragment readOnly data={euss} />
      </div>

      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">
            Disclosure and Barring Service (DBS) Details
          </p>
          {/* <DbsEditDialog data={euss} employee_id={params.employeeId} /> */}
        </div>
        <DbsFormFragment readOnly data={euss} />
      </div>
    </div>
  );
}
