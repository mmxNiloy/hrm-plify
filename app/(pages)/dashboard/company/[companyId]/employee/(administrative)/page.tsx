"use server";
import React from "react";
import { Metadata } from "next";
import Icons from "@/components/ui/icons";
import Link from "next/link";
import Counter from "@/components/custom/Counter";
import getCompanyMeta from "@/app/(server)/actions/company/get-company-meta.controller";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import getEmployeeStats from "@/app/(server)/actions/company/employee/get-employee-stats.controller";

export async function generateMetadata({
  params,
}: CompanyIDURLParamSchema): Promise<Metadata> {
  const mParams = await params;
  const companyId = mParams.companyId;
  return await getCompanyMeta(companyId, "Employee Dashboard");
}

export default async function EmployeeDashboardPage({
  params,
}: CompanyIDURLParamSchema) {
  const mParams = await params;
  const companyId = mParams.companyId;

  const data = await getEmployeeStats(companyId);

  const stats = data.payload;

  return (
    <>
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">Statistics</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 justify-items-center *:w-full *:sm:min-w-40 *:md:min-w-64">
        <Link href={"./employee/all"}>
          <div className="flex flex-col gap-2 p-4 rounded-md from-teal-500/80 to-indigo-600 hover:from-sky-400/80 hover:to-indigo-500 bg-gradient-to-br text-white">
            <div className="flex gap-2 text-xl font-semibold">
              <Icons.employees />
              Active Employees
            </div>
            <Counter value={stats?.totalEmployees ?? 0} className="text-end" />
          </div>
        </Link>
        <Link href={"./employee/migrant"}>
          <div className="flex flex-col gap-2 p-4 rounded-md from-lime-500/80 to-emerald-600 hover:from-lime-400/80 hover:to-emerald-500 bg-gradient-to-br text-white">
            <div className="flex gap-2 text-xl font-semibold">
              <Icons.users />
              Migrant Employees
            </div>
            <Counter
              value={stats?.foreignEmployees ?? 0}
              className="text-end"
            />
          </div>
        </Link>
        <Link href={"./employee/staff-report"}>
          <div className="flex flex-col h-full gap-2 p-4 rounded-md from-rose-500/80 to-amber-600 hover:rose-lime-400/80 hover:to-amber-500 bg-gradient-to-br text-white">
            <div className="flex gap-2 text-xl font-semibold">
              <Icons.files />
              Staff Report
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
