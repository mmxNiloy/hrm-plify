"use server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { ICompany, IPaginatedCompany } from "@/schema/CompanySchema";
import { StaticDataTable } from "@/components/ui/data-table";
import { LeavePageCompanyDataTableColumns } from "@/app/Components/Leave/LeavePageCompanyDataTableColumns";
import { getPaginationParams } from "@/utils/Misc";
import { ISearchParamsProps } from "@/utils/Types";

export default async function LeavePage({ searchParams }: ISearchParamsProps) {
  const { page, limit } = getPaginationParams(searchParams);

  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var companies: ICompany[] = [];
  var total_page: number = 1;
  try {
    // Get companies list here
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/companies?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!apiRes.ok) {
      companies = [];
      total_page = 0;
    }

    const result = (await apiRes.json()) as IPaginatedCompany;
    companies = result.data;
    total_page = result.total_page;
  } catch (err) {
    console.error("Failed to fetch company information", err);
    companies = [];
    total_page = 0;
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Leave Management Dashboard</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Leave</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <StaticDataTable
        data={companies}
        columns={LeavePageCompanyDataTableColumns}
        pageCount={total_page}
      />
    </main>
  );
}
