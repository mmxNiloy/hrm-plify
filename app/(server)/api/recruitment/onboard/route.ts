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

  console.log("POST > Onboard an applicant > Request body", bod);

  const request = fetch(`${process.env.API_BASE_URL}/recruitment/job/onboard`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bod),
  });

  const { data, error } = await withError<{
    success: boolean;
    msg: string;
  }>(request);

  if (error) {
    console.error(
      "POST > Onboard an applicant > Failed to onboard an applicant > ",
      error
    );
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({ ...data, message: data.msg }, { status: 200 });
}
