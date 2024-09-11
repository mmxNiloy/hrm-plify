import { IEmployeeContactInfo } from "@/schema/EmployeeSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
