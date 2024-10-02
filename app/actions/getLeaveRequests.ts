"use server";

import {
  ILeaveApprover,
  ILeaveRequest,
  IPaginatedLeaveRequest,
} from "@/schema/LeaveSchema";
import { cookies } from "next/headers";
import { getEmployeeData } from "./getEmployeeData";
import { redirect } from "next/navigation";

export async function getLeaveRequests({
  company_id,
  page,
  limit,
}: {
  company_id: number;
  page: number;
  limit: number;
}): Promise<IPaginatedLeaveRequest> {
  const user = await getEmployeeData();
  const fallback = { data: [], total_page: 1, data_count: 0 };

  if (user.role_name === "Guest") return fallback;

  var endpoint = `leave-management/get-all-leave/${company_id}`;
  if (user.role_name === "Employee") {
    if (!user.data) redirect("/api/logout?_ref=data-not-found");
    if (!user.data.leave_approvers)
      endpoint = `leave-management/get-my-leave/${user.data.employee_id}`;
  }

  try {
    const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/${endpoint}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    const res = (await apiRes.json()) as IPaginatedLeaveRequest;
    console.log("Actions > Get Leave Approvers > ", res);

    if (apiRes.ok) {
      if (user.data) {
      }
      return res;
    } else {
      console.error(
        "Actions > Get Leave Approvers > Failed to get leave approvers >",
        res
      );
      return fallback;
    }
  } catch (err) {
    console.error(
      "Actions > Get Leave Approvers > Failed to get leave approvers >",
      err
    );
  }
  return fallback;
}
