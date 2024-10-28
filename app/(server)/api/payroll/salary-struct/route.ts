import { ILeaveType } from "@/schema/LeaveSchema";
import { ISalaryStructure } from "@/schema/Payroll";
import { IOffDaysBase, IShift } from "@/schema/RotaSchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface ReqBody extends ISalaryStructure {
  selected_employees: number[];
}

export async function POST(req: NextRequest) {
  // Check if the user is logged in
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const data = (await req.json()) as ReqBody;

  console.log("POST > Create salary structure > Body data", data);

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/create-salary-structure`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value}`,
        },
      }
    );

    const res = await apiRes.json();
    return NextResponse.json(res, { status: apiRes.status });
  } catch (err) {
    console.error(
      "POST > Create Salary Structure > Failed to create salary structure",
      err
    );
    return NextResponse.json(
      { message: "Failed to create salary structure" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  // Check if the user is logged in
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const data = (await req.json()) as ReqBody;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/update-salary-structure`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value}`,
        },
      }
    );

    const res = await apiRes.json();
    return NextResponse.json(res, { status: apiRes.status });
  } catch (err) {
    console.error(
      "PATCH > Update salary structure > Failed to update salary structure",
      err
    );
    return NextResponse.json(
      { message: "Failed to update salary structure" },
      { status: 500 }
    );
  }
}
