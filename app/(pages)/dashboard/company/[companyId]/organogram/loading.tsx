import { DutyRosterDataTableColumns } from "@/components/custom/DataTable/Columns/Rota/DutyRosterDataTableColumns";
import { OffDaysDataTableColumns } from "@/components/custom/DataTable/Columns/Rota/OffDaysDataTableColumns";
import { ShiftsDataTableColumns } from "@/components/custom/DataTable/Columns/Rota/ShiftsDataTableColumns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StaticDataTable } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { ButtonBlue } from "@/styles/button.tailwind";
import Link from "next/link";
import React from "react";

export default function CompanyLeaveDashboardLoading() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Organogram Chart</p>
      <div className="flex items-center justify-between">
        <Skeleton className="w-3/5 h-5" />
      </div>

      <div className="flex flex-col w-full h-96 items-center justify-center">
        <Icons.spinner className="animate-spin ease-in-out" />
        Loading...
      </div>
    </main>
  );
}
