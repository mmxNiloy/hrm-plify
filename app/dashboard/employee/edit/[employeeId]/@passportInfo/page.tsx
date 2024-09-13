"use server";
import React from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import PassportDetailsEditDialog from "@/app/Components/Employee/EditDialog/PassportDetailsEditDialog";
import PassportDetailsTable from "@/app/Components/Employee/PassportDetailsTable";
import { redirect } from "next/navigation";
import { IEmployeePassportDetail } from "@/schema/EmployeeSchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import PassportDetailsFormFragment from "@/app/Components/Employee/EditDialog/PassportDetailsEditDialog/form-fragment";

export default async function PassportInfoSlot({
  params,
}: EditEmployeeByIdProps) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var passportInfo: IEmployeePassportDetail | undefined = undefined;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/employee/get-passport-data/${params.employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!apiRes.ok) {
      console.error("Edit Employee > Passport Info > Data not found");
      redirect("/not-found");
    } else {
      passportInfo = (await apiRes.json()) as IEmployeePassportDetail;
      //   console.log("Data found", passportInfo);
    }
  } catch (err) {
    console.error("Edit Employee > Passport Info > Data not found");
    redirect("/not-found");
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Passport Information</p>
        <PassportDetailsEditDialog
          employee_id={params.employeeId}
          data={passportInfo}
        />
      </div>
      <PassportDetailsFormFragment readOnly data={passportInfo} />
    </div>
  );
}
