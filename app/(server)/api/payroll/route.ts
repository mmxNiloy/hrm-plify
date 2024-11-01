import { ILeaveType } from "@/schema/LeaveSchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Check if the user is logged in
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const data = await req.json();

  console.log("POST > Create payroll > Body data", data);

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/payroll/salary/create`,
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
    console.error("POST > Create payroll > Failed to create payroll", err);
    return NextResponse.json(
      { message: "Failed to create payroll" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  // Check if the user is logged in
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const data = await req.json();

  console.log("PUT > Update payroll > Request Body", data);

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/payroll/salary/${data.id}`,
      {
        method: "PUT",
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
    console.error("PUT > Update payroll > Failed to update payroll", err);
    return NextResponse.json(
      { message: "Failed to update payroll" },
      { status: 500 }
    );
  }
}
