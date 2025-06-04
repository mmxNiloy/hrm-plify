"use server";

import { ICompanyUser } from "@/schema/UserSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export default async function getCompanyAdmin(company_id: string) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${process.env.API_BASE_URL}/companies/admin/${company_id}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );
  const { data, error } = await withError<ICompanyUser[]>(req);
  if (error) {
    console.error(
      "Actions > Get company admins > Failed to fetch company admins",
      error
    );

    return { error };
  }

  return { data };
}
