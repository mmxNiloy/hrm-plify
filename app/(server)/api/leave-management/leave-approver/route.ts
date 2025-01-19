import { ILeaveApprover, ILeaveType } from "@/schema/LeaveSchema";
import { IOffDaysBase, IShift } from "@/schema/RotaSchema";
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

  const data = (await req.json()) as ILeaveApprover;

  console.log("POST > Create leave approver > Body data", data);

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/create-leave-approver`,
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
      "POST > Create leave approver > Failed to create leave approver",
      err
    );
    return NextResponse.json(
      { message: "Failed to create leave approver" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  // Check if the user is logged in
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const data = (await req.json()) as ILeaveApprover;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/update-leave-approver`,
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
      "PATCH > Update leave approver > Failed to update leave approver",
      err
    );
    return NextResponse.json(
      { message: "Failed to update leave approver" },
      { status: 500 }
    );
  }
}
