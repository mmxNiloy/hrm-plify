"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
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

export default async function CompanyTasksDashboardPage({
  params,
}: CompanyByIDPageProps) {
  // Get company information
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  var company: ICompany;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/companies/${params.companyId}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!apiRes.ok) redirect("/not-found");
    company = (await apiRes.json()) as ICompany;
  } catch (err) {
    console.error("Failed to fetch company information", err);
    redirect("/not-found");
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Tasks Dashboard</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="..">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href=".">{company.company_name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Tasks Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex gap-4 items-center">
          <TaskSearch />
          <Button className={ButtonBlue}>
            <Icons.plus /> Add a Task
          </Button>
        </div>
      </div>

      <TasksDataTable company_id={params.companyId} />
    </main>
  );
}
