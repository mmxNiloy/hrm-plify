"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/styles/button.tailwind";
import Icons from "@/components/ui/icons";
import TasksDataTable from "@/components/custom/DataTable/TasksDataTable";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

export default async function CompanyTasksDashboardPage({
  params,
}: CompanyByIDPageProps) {
  // Get company information
  const mParams = await params;
  const companyId = mParams.companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(companyId);

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Tasks</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Tasks</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs title="Tasks" />

        <div className="flex gap-4 items-center">
          {/* <TaskSearch /> */}
          <Button disabled className={ButtonGradient}>
            <Icons.plus /> Add a Task (WIP)
          </Button>
        </div>
      </div>

      {/* <TasksDataTable company_id={companyId} /> */}
    </main>
  );
}
