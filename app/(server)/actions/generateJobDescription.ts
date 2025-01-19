"use server";

import { withError } from "@/utils/Debug";

interface Props {
  title: string;
  designation: string;
  department: string;
  deadline: string;
}

export async function generateJobDescription({
  title,
  designation,
  department,
  deadline,
}: Props) {
  const request = fetch(
    `${process.env.GEMINI_AGENT_BASE_URL}/generate-job-description`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        designation,
        department,
        deadline,
      }),
    }
  );

  const { data, error } = await withError<{ result: string }>(request);

  if (error) {
    console.error(
      "Actions > Generate Job Description > Failed to generate job description >",
      error
    );
    return { error };
  }

  return { data };
}
