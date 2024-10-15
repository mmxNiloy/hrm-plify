"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ICompany } from "@/schema/CompanySchema";
import { redirect } from "next/navigation";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { ButtonBlue } from "@/styles/button.tailwind";
import Icons from "@/components/ui/icons";
import TaskSearch from "@/components/custom/Dashboard/Task/TaskSearch";
import TasksDataTable from "@/components/custom/DataTable/TasksDataTable";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";

export default async function CompanyTasksDashboardPage({
  params,
}: CompanyByIDPageProps) {
  // Get company information
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(params.companyId);

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Tasks</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs company={company} user={user} title="Tasks" />

        <div className="flex gap-4 items-center">
          {/* <TaskSearch /> */}
          <Button disabled className={ButtonBlue}>
            <Icons.plus /> Add a Task (WIP)
          </Button>
        </div>
      </div>

      <TasksDataTable company_id={params.companyId} />
    </main>
  );
}
