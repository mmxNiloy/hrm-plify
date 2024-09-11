"use server";
import React, { Suspense } from "react";
import { EditEmployeeByUserIdProps } from "../PageProps";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { IEmployee, IEmployeeWithPersonalInfo } from "@/schema/EmployeeSchema";
import { redirect } from "next/navigation";
import EmployeeDetailsFormFragment from "@/app/Components/Employee/EditDialog/PersonalInfoEditDialog/FormFragment/EmployeeDetailsFormFragment";
import ServiceDetailsFormFragment from "@/app/Components/Employee/EditDialog/PersonalInfoEditDialog/FormFragment/ServiceDetailsFormFragment";
import EmployeeDetailsEditDialog from "@/app/Components/Employee/EditDialog/PersonalInfoEditDialog/EmployeeDetailsEditDialog";
import ServiceInformationEditDialog from "@/app/Components/Employee/EditDialog/PersonalInfoEditDialog/ServiceInformationEditDialog";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { ButtonWarn } from "@/styles/button.tailwind";
import ServiceInformationEditDialogWrapper from "@/app/Components/Employee/EditDialog/PersonalInfoEditDialog/ServiceInformationEditDialogWrapper";

export default async function PersonalInfoSlot({
  params,
}: EditEmployeeByUserIdProps) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var personalInfo: IEmployeeWithPersonalInfo | undefined = undefined;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/employee/get-personal-data/${params.employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!apiRes.ok) {
      console.error("Edit Employee > Personal Info > Data not found");
      redirect("/not-found");
    } else {
      personalInfo = (await apiRes.json()) as IEmployeeWithPersonalInfo;
    }
  } catch (err) {
    console.error("Failed to fetch company information", err);
    redirect("/not-found");
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Personal Information</p>
        <EmployeeDetailsEditDialog data={personalInfo} />
      </div>
      <EmployeeDetailsFormFragment data={personalInfo} readOnly />

      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Service Information</p>
        {/* <CompanyProfileEditDialog data={data} /> */}
        <Suspense
          fallback={
            <Button disabled className={ButtonWarn}>
              <Icons.edit /> Edit Service Details
            </Button>
          }
        >
          <ServiceInformationEditDialogWrapper data={personalInfo} />
        </Suspense>
      </div>
      <ServiceDetailsFormFragment data={personalInfo} readOnly />
    </div>
  );
}
