"use server";

import { IPaginatedLeaveRequest } from "@/schema/LeaveSchema";
import { cookies } from "next/headers";
import { getEmployeeData } from "./getEmployeeData";
import { redirect } from "next/navigation";
import { withError } from "@/utils/Debug";

export async function getLeaveRequests({
  company_id,
  page,
  limit,
}: {
  company_id: number;
  page: number;
  limit: number;
}) {
  const { data: user, error: userError } = await getEmployeeData();
  if (userError) return { error: userError };

  if (user.role_name === "Guest")
    return {
      error: new Error("Permission Denied", {
        cause:
          "Trying to access information not available for the current user.",
      }),
    };

  var endpoint = `leave-management/get-all-leave/${company_id}`;
  if (user.role_name === "Employee" && !user.data.leave_approvers) {
    endpoint = `leave-management/get-my-leave/${user.data.employee_id}`;
  }
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${process.env.API_BASE_URL}/${endpoint}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const { data, error } = await withError<IPaginatedLeaveRequest>(req);
  if (error) {
    console.error(
      "Actions > Get Leave Approvers > Failed to get leave approvers >",
      error
    );
    return { error };
  }

  return { data };
}
