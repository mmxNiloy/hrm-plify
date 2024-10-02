"use server";
import EmployeesDataTable from "@/app/Components/Dashboard/Employee/EmployeesDataTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Icons from "@/components/ui/icons";
import React from "react";
import { Button } from "@/components/ui/button";
import ContractAgreementTable from "@/app/Components/Dashboard/Employee/ContractAgreementTable";
import { CompanyByIDPageProps } from "../../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { ICompany } from "@/schema/CompanySchema";
import { redirect } from "next/navigation";

export default async function ContactAgreementPage({
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

  // await wait(5000);

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Contract Agreement</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className="line-clamp-1 text-ellipsis max-w-32"
                href={`/dashboard/company/${params.companyId}`}
              >
                {company.company_name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/dashboard/company/${params.companyId}/employee`}
              >
                Employee Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Contract Agreement</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main content, a table of employees */}
      <ContractAgreementTable />
    </main>
  );
}
