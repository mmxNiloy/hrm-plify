"use server";

import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { cookies } from "next/headers";

export async function getDesignations({
  company_id,
  page,
  limit,
}: {
  company_id: number;
  page: number;
  limit: number;
}) {
  var data: IDesignation[] = [];
  try {
    const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/get-designation/${company_id}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    const res = await apiRes.json();

    console.log("Actions > Get Designations > ", res);

    if (apiRes.ok) {
      data = (res as { data: IDesignation[] }).data;
    } else {
      console.error(
        "Actions > Get Designations > Failed to get designations >",
        res
      );
      data = [];
    }
  } catch (err) {
    data = [];
    console.error(
      "Actions > Get Designations > Failed to get designations >",
      err
    );
  }

  return data;
}
