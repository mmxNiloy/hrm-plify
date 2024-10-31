"use server";

import { ILeaveType } from "@/schema/LeaveSchema";
import { withError } from "@/utils/Debug";
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
  const { page, limit } = getPaginationParams(await searchParams);

  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${process.env.API_BASE_URL}/company/operation/get-leave-type/${company_id}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }
  );

  const { data, error } = await withError<{ data: ILeaveType[] }>(req);
  if (error) {
    console.error(
      "Action > Get company leave types > Failed to get company leave types",
      error
    );
    return { error };
  }
  return { data: data.data };
}
