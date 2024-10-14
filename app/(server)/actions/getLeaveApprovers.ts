"use server";

import { ILeaveApprover } from "@/schema/LeaveSchema";
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
  var data: ILeaveApprover[] = [];
  try {
    const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/get-leave-approver/${company_id}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    const res = (await apiRes.json()) as { data: ILeaveApprover[] };

    console.log("Actions > Get Leave Approvers > ", res);

    if (apiRes.ok) {
      data = res.data;
    } else {
      console.error(
        "Actions > Get Leave Approvers > Failed to get leave approvers >",
        res
      );
      data = [];
    }
  } catch (err) {
    data = [];
    console.error(
      "Actions > Get Leave Approvers > Failed to get leave approvers >",
      err
    );
  }
  return data;
}
