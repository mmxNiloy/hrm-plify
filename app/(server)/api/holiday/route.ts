import { IHoliday, IHolidayType } from "@/schema/HolidaySchema";
import { ILeaveType } from "@/schema/LeaveSchema";
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

  const data = (await req.json()) as IHoliday;

  console.log("POST > Create holiday > Body data", data);

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/create-holiday`,
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
    console.error("POST > Create holiday > Failed to create holiday", err);
    return NextResponse.json(
      { message: "Failed to create holiday" },
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

  const data = (await req.json()) as IHoliday;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/update-holiday`,
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
    console.error("PATCH > Update holiday > Failed to update holiday", err);
    return NextResponse.json(
      { message: "Failed to update holiday" },
      { status: 500 }
    );
  }
}
