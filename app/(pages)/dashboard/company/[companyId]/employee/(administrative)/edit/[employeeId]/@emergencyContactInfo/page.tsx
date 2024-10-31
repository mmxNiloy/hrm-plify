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

export default async function EmergencyContactInfoSlot({
  params,
}: EditEmployeeByIdProps) {
  const { employeeId, companyId } = await params;
  const { data: emergencyContact, error } = await getEmergencyContactInfo(
    employeeId
  );

  if (error) {
    return (
      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">Emergency Contact Information</p>
        </div>
        <ErrorFallbackCard error={error} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Emergency Contact Information</p>
        <EmergencyContactEditDialog
          data={emergencyContact}
          employee_id={employeeId}
        />
      </div>
      <EmergencyContactFormFragment data={emergencyContact} readOnly />
    </div>
  );
}
