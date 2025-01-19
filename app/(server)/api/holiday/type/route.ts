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

  const data = (await req.json()) as IHolidayType;

  console.log("POST > Create holiday type > Body data", data);

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/create-holiday-types`,
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
      "POST > Create holiday type > Failed to create holiday type",
      err
    );
    return NextResponse.json(
      { message: "Failed to create holiday type" },
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

  const data = (await req.json()) as IHolidayType;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/update-holiday-types`,
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
      "PATCH > Update holiday type > Failed to update holiday type",
      err
    );
    return NextResponse.json(
      { message: "Failed to update holiday type" },
      { status: 500 }
    );
  }
}
