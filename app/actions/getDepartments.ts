"use server";

import { IDepartment, IPaginatedDepartment } from "@/schema/CompanySchema";
import { cookies } from "next/headers";

export async function getDepartments({
  company_id,
  page,
  limit,
}: {
  company_id: number;
  page: number;
  limit: number;
}) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  var paginatedDepartments: IPaginatedDepartment = {
    total_page: 1,
    data: [],
    data_count: 0,
  };

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/get-departments/${company_id}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (apiRes.ok) {
      paginatedDepartments = (await apiRes.json()) as IPaginatedDepartment;
    }
  } catch (err) {
    console.error(
      "Actions > Get Departments of a company > Failed to get departments of a company >",
      err
    );
  }

  return paginatedDepartments;
}

export async function getAllDepartments(company_id: number) {
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  var departments: IDepartment[] = [];

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/get-all-departments/${company_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (apiRes.ok) {
      departments = (await apiRes.json()) as IDepartment[];
    } else departments = [];
  } catch (err) {
    console.error(
      "Action > Get all departments of a company > Failed to get all departments >",
      err
    );
    departments = [];
  }

  return departments;
}
