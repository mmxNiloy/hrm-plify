"use server";
import { IEmployeeEmergencyContact } from "@/schema/EmployeeSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import EmergencyContactEditDialog from "@/components/custom/Dialog/Employee/EmergencyContactEditDialog";
import EmergencyContactFormFragment from "@/components/custom/Form/Fragment/Employee/EmergencyContactFormFragment";
import { getEmergencyContactInfo } from "@/app/(server)/actions/employee/getEmergencyContactInfo";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";

export default async function EmergencyContactInfoSlot({
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

  const emp = await getEmployeeData();
  const empId = emp.data?.data?.employee_id ?? 0;
  const { data: emergencyContact, error } = await getEmergencyContactInfo(
    empId
  );

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6 md:p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold">
            Emergency Contact Information
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
          Emergency Contact Information
        </p>
        {/* {updateAccess && (
        )} */}
        <EmergencyContactEditDialog
          data={emergencyContact}
          employee_id={empId}
        />
      </div>
      <EmergencyContactFormFragment data={emergencyContact} readOnly />
    </div>
  );
}
