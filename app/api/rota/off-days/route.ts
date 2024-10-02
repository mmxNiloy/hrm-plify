import { IOffDaysBase, IShift } from "@/schema/RotaSchema";
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

  const data = (await req.json()) as IOffDaysBase;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/rota/day-off/create`,
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
    console.error("POST > Create off days > Failed to create off days", err);
    return NextResponse.json(
      { message: "Failed to create off days" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  // Check if the user is logged in
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const data = (await req.json()) as IOffDaysBase;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/rota/day-off/edit`,
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
    console.error("PUT > Update Off Days > Failed to update off days", err);
    return NextResponse.json(
      { message: "Failed to update off days" },
      { status: 500 }
    );
  }
}
