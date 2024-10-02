"use server";

import { ILeaveType } from "@/schema/LeaveSchema";
import { IUser } from "@/schema/UserSchema";
import { getPaginationParams } from "@/utils/Misc";
import { ISearchParamsProps } from "@/utils/Types";
import { cookies } from "next/headers";

interface Props extends ISearchParamsProps {
  company_id: string | number;
}

export async function getCompanyLeaveTypes({
  company_id,
  searchParams,
}: Props) {
  const { page, limit } = getPaginationParams(searchParams);

  var leaveTypes: ILeaveType[] = [];
  var total_page: number = 1;

  try {
    const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/get-leave-type/${company_id}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (apiRes.ok) {
      const res = (await apiRes.json()) as { data: ILeaveType[] };
      console.log("Action > Get company leave types > data", res.data);

      return res.data;
    }

    console.error(
      "Action > Get company leave types > Failed to get company leave types",
      { status: apiRes.status }
    );

    return [];
  } catch (err) {
    console.error(
      "Action > Get company leave types > Failed to get company leave types",
      err
    );
    return [];
  }
}
