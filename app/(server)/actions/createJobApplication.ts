"use server";

import { IJobApplicant } from "@/schema/JobSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

interface Result {
  data: IJobApplicant;
  success: boolean;
}

export async function createJobApplication(jobApplication: IJobApplicant) {
  const req = fetch(`${process.env.API_BASE_URL}/recruitment/job/apply`, {
    method: "POST",
    body: JSON.stringify(jobApplication),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { data, error } = await withError<Result>(req);

  if (error) {
    console.error(
      "Actions > Create a new job application > Failed to create a new job application >",
      error
    );
    return { error };
  }

  (await cookies()).set(`applied-job-${jobApplication.job_id}`, "true", {
    httpOnly: true,
    secure: true,
    expires: jobApplication.last_date,
    sameSite: "lax",
  });

  return { data: data.data };
}
