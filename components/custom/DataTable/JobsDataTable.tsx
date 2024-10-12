"use server";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { JobsDataTableColumns } from "./Columns/JobsDataTableColumns";
import { IDesignation } from "@/schema/DesignationSchema";
import { cookies } from "next/headers";

export default async function JobsDataTable({
  company_id,
}: {
  company_id: number;
}) {
  var data: IDesignation[] = [];
  try {
    const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/get-designation/${company_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    const res = await apiRes.json();

    console.log("JobsDataTable > API Response >", res);

    if (apiRes.ok) {
      data = (res as { data: IDesignation[] }).data;
    } else {
      console.error("JobsDataTable > Failed to get jobs\n", res);
      data = [];
    }
  } catch (err) {
    data = [];
    console.error("JobsDataTable > Failed to get jobs\n", err);
  }
  return <DataTable columns={JobsDataTableColumns} data={data} />;
}
