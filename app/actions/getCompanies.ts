"use server";

import {
  IDepartment,
  IPaginatedCompany,
  IPaginatedDepartment,
} from "@/schema/CompanySchema";
import { cookies } from "next/headers";
import { logout } from "./logout";

export async function getCompanies({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const fallback: IPaginatedCompany = {
    total_page: 1,
    data: [],
    data_count: 0,
  };

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/companies?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );
    if (apiRes.ok) {
      return (await apiRes.json()) as IPaginatedCompany;
    } else {
      return fallback;
    }
  } catch (_) {
    return fallback;
  }
}
