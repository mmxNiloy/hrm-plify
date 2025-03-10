"use server";

import { IContactDemo } from "@/schema/IContactDemoSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getContactDemo({
  is_demo_only = "false",
  page,
  limit,
}: {
  is_demo_only?: "true" | "false";
  page?: number;
  limit?: number;
}) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(
    `${process.env.API_BASE_URL}/company/operation/get-contact-demo?is_demo_only=${is_demo_only}&page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const { data, error } = await withError<IContactDemo[]>(req);
  if (error) {
    console.error(
      "Actions > Get contact/demo requests > Failed to get contact/demo requests >",
      error
    );

    return { error };
  }

  return { data };
}
