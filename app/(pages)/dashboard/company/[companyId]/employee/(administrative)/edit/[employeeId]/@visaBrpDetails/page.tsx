"use server";
import { IEmployeeVisaBrp } from "@/schema/EmployeeSchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import VisaBrpEditDialog from "@/components/custom/Dialog/Employee/VisaBrpEditDialog";
import VisaBrpFormFragment from "@/components/custom/Form/Fragment/Employee/VisaBrpFormFragment";

export default async function VisaBRPDetailSlot({
  params,
}: EditEmployeeByIdProps) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var visaBrp: IEmployeeVisaBrp | undefined = undefined;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/employee/get-visa-brp-data/${params.employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!apiRes.ok) {
      console.error("Edit Employee > Visa BRP Info > Data not found");
      redirect("/not-found");
    } else {
      const result = (await apiRes.json()) as {
        message: string;
        data?: IEmployeeVisaBrp;
      };
      visaBrp = result.data;

      // console.log("Data found", visaBrp);
    }
  } catch (err) {
    console.error("Edit Employee > Visa BRP Info > Data not found");
    redirect("/not-found");
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">VISA/BRP Information</p>
        <VisaBrpEditDialog data={visaBrp} employee_id={params.employeeId} />
      </div>
      <VisaBrpFormFragment data={visaBrp} readOnly />
    </div>
  );
}
