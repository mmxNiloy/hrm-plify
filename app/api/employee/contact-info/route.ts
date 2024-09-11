import { IEmployeeContactInfo } from "@/schema/EmployeeSchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Check if the user is logged in
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const data = (await req.json()) as IEmployeeContactInfo;

  return NextResponse.json(
    {
      message:
        "Hit the API to create a new contact information for a user/employee",
      data,
    },
    { status: 501 }
  );
}
