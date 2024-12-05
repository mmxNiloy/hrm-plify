import { ICompanyWithDesignationMeta } from "@/schema/CompanySchema";
import { IJobListing } from "@/schema/JobSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const bod = await req.json();
  const request = fetch(`${process.env.API_BASE_URL}/recruitment/job`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bod),
  });

  const { data, error } = await withError<{
    success: boolean;
    data: IJobListing;
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

export async function PATCH(req: NextRequest) {
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const bod = (await req.json()) as IJobListing;
  const request = fetch(
    `${process.env.API_BASE_URL}/recruitment/job/${bod.id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bod),
    }
  );

  const { data, error } = await withError<{
    success: boolean;
    data: IJobListing;
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
