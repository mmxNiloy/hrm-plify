"use server";
import { ICompanyExtraData } from "@/schema/CompanySchema";
import {
  IPaginatedJobApplicants,
  IPaginatedJobListing,
} from "@/schema/JobSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function getCompanyShortlistedApplicantsByJobId({
  jobId,
  page,
  limit,
}: {
  page: number;
  limit: number;
  jobId: number;
}) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  console.log(
    "API Endpoint >",
    `${process.env.API_BASE_URL}/recruitment/job/shortlisted-by-job-id?job_id=${jobId}&page=${page}&limit=${limit}`
  );

  const req = fetch(
    `${process.env.API_BASE_URL}/recruitment/job/shortlisted-by-job-id?job_id=${jobId}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      method: "GET",
    }
  );
  const { data, error } = await withError<IPaginatedJobApplicants>(req);
  if (error) {
    console.error(
      "Actions > Get Company Job Listings > Failed to get company job listings >",
      error
    );
    return { error };
  }
  return { data };
}
