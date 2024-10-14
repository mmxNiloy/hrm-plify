"use server";

import { ICompanyUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";

export default async function getCompanyAdmin(company_id: number) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  var data: ICompanyUser[] = [];

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/companies/admin/${company_id}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!apiRes.ok) return data;
    data = (await apiRes.json()) as ICompanyUser[];
    // cookies().set(process.env.COOKIE_COMPANY_KEY!, JSON.stringify(company));
    return data;
  } catch (err) {
    console.error(
      "Actions > Get company admins > Failed to fetch company admins",
      err
    );
    return [];
  }
}
