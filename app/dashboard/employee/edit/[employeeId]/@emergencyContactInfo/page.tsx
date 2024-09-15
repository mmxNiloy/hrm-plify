"use server";
import EmergencyContactEditDialog from "@/app/Components/Employee/EditDialog/EmergencyContactEditDialog";
import { IEmployeeEmergencyContact } from "@/schema/EmployeeSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import EmergencyContactFormFragment from "@/app/Components/Employee/EditDialog/EmergencyContactEditDialog/form-fragment";

export default async function EmergencyContactInfoSlot({
  params,
}: EditEmployeeByIdProps) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  let emergencyContact: IEmployeeEmergencyContact | undefined = undefined;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/employee/get-next-kin-data/${params.employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!apiRes.ok) {
      console.error("Get Emergency Contact > Data not found");
      redirect("/not-found");
    } else {
      emergencyContact = (await apiRes.json()) as IEmployeeEmergencyContact;
    }
  } catch (err) {
    console.error("Get Emergency Contact > Data retrieval failed", err);
    redirect("/not-found");
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Emergency Contact Information</p>
        <EmergencyContactEditDialog
          data={emergencyContact}
          employee_id={params.employeeId}
        />
      </div>
      <EmergencyContactFormFragment data={emergencyContact} readOnly />
    </div>
  );
}
