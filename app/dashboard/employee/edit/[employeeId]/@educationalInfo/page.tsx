"use server";
import React from "react";
import { EditEmployeeByUserIdProps } from "../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { IEmployeeEducationalDetail } from "@/schema/EmployeeSchema";
import { redirect } from "next/navigation";
import EducationalInfoTable from "@/app/Components/Employee/EducationalInfoTable";
import EducationalInfoEditDialog from "@/app/Components/Employee/EditDialog/EducationalInfoEditDialog";

export default async function EducationalInfoSlot({
  params,
}: EditEmployeeByUserIdProps) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var educationalInfo: IEmployeeEducationalDetail[] = [];

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/employee/get-education-data/${params.employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!apiRes.ok) {
      console.error("Edit Employee > Contact Info > Data not found");
      redirect("/not-found");
    } else {
      const result = (await apiRes.json()) as {
        message: string;
        data: IEmployeeEducationalDetail[];
      };
      educationalInfo = result.data;
      // console.log("Data found", educationalInfo);
    }
  } catch (err) {
    console.error("Edit Employee > Contact Info > Data not found");
    redirect("/not-found");
  }
  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Educational Information</p>
        <EducationalInfoEditDialog employee_id={params.employeeId} />
      </div>
      <div className="col-span-full">
        <EducationalInfoTable
          key={`${params.employeeId}-educational-info-table-length-${educationalInfo.length}`}
          data={educationalInfo}
        />
      </div>
    </div>
  );
}
