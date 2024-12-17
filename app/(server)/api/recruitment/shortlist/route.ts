import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { withError } from "@/utils/Debug";

export async function POST(req: NextRequest) {
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const bod = await req.json();

  console.log("POST > Shortlist an applicant > Request body", bod);

  const request = fetch(
    `${process.env.API_BASE_URL}/recruitment/job/make-short-list`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bod),
    }
  );

  const { data, error } = await withError<{
    success: boolean;
    data: {
      status: boolean;
      data: string;
    };
  }>(request);

  if (error) {
    console.error(
      "POST > Create a job listing > Failed to create a job listing > ",
      error
    );
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
