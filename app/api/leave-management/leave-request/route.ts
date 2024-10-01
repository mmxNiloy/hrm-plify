import { ILeaveRequest } from "@/schema/LeaveSchema";
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

  const data = (await req.json()) as ILeaveRequest;
  data.status = "Pending";

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/leave-management/create-leave`,
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
      "POST > Create leave request > Failed to create leave request",
      err
    );
    return NextResponse.json(
      { message: "Failed to create leave request" },
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

  const data = (await req.json()) as ILeaveRequest;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/leave-management/edit-leave`,
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
      "PATCH > Update leave rquest > Failed to update leave request",
      err
    );
    return NextResponse.json(
      { message: "Failed to update leave request" },
      { status: 500 }
    );
  }
}
