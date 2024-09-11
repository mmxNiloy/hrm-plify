import { IEmployeeContactInfo } from "@/schema/EmployeeSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const data = (await req.json()) as IEmployeeContactInfo;

  return NextResponse.json(
    { message: "Hit API to update employee contact information", data },
    { status: 501 }
  );
}
