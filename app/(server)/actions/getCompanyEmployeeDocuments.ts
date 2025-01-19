"use server";

import { IPaginatedEmployeeDocument } from "@/schema/EmployeeSchema";
import { IPaginatedCompanyUser } from "@/schema/UserSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getCompanyEmployeeDocuments({
  companyId,
  page,
  limit,
  orderBy = "visa",
}: {
  companyId: number;
  page: number;
  limit: number;
  orderBy?: "visa" | "passport" | "dbss" | "euss";
}) {
  const sessionId = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  const req = fetch(
    `${process.env.API_BASE_URL}/company/operation/close-expiry-data?company_id=${companyId}&order_by=${orderBy}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${sessionId?.value}`,
      },
    }
  );

  const { data, error } = await withError<IPaginatedEmployeeDocument>(req);
  if (error) {
    console.error(
      "Actions > Get Company Employee Documents > Failed to get company employee documents >",
      error
    );
    return { error };
  }

  return { data };
}
