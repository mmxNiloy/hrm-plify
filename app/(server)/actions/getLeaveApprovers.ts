"use server";

import { ILeaveApprover } from "@/schema/LeaveSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getLeaveApprovers({
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
    `${process.env.API_BASE_URL}/company/operation/get-leave-approver/${company_id}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const { data, error } = await withError<{ data: ILeaveApprover[] }>(req);
  if (error) {
    console.error(
      "Actions > Get Leave Approvers > Failed to get leave approvers >",
      error
    );
    return { error };
  }

  return { data: data.data };
}
