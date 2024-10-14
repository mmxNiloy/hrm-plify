"use server";
import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import React from "react";
import EmployeeOnboardingDialog from ".";

interface Props {
  company_id: number;
  session: string;
}

export default async function EmployeeOnboardingDialogWrapper({
  session,
  company_id,
}: Props) {
  // Get departments
  var departments: IDepartment[] = [];
  var designations: IDesignation[] = [];
  try {
    const dptRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/get-all-departments/${company_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    const dptData = (await dptRes.json()) as IDepartment[];
    departments = dptData;

    const dsgRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/get-designation/${company_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    const dsgData = (await dsgRes.json()) as { data: IDesignation[] };
    designations = dsgData.data;
  } catch (err) {
    console.error("Failed to get departments", err);
    departments = [];
    designations = [];
  }
  return (
    <EmployeeOnboardingDialog
      departments={departments}
      designations={designations}
      company_id={company_id}
    />
  );
}
