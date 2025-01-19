"use server";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getAllStaffReportsOfCompany({
  companyId,
}: {
  companyId: number;
}) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  const req = fetch(
    `${process.env.API_BASE_URL}/employee/report/${companyId}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      method: "GET",
    }
  );
  const { data, error } = await withError<IEmployeeWithUserMetadata[]>(req);
  if (error) {
    console.error(
      "Actions > Get Company Staff Report (Paginated) > Failed to get company staff report (paginated) >",
      error
    );
    return { error };
  }
  return { data };
}
