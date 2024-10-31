"use server";

import { IDesignation } from "@/schema/DesignationSchema";
import { withError } from "@/utils/Debug";
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
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(
    `${process.env.API_BASE_URL}/company/operation/get-designation/${company_id}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const { data, error } = await withError<{ data: IDesignation[] }>(req);
  if (error) {
    console.error(
      "Actions > Get Designations > Failed to get designations >",
      error
    );
    return { error };
  }

  return { data: data.data };
}
