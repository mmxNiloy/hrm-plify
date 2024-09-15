import {
  IEmployeeEussDbsData,
  IEmployeeVisaBrp,
} from "@/schema/EmployeeSchema";
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

  const data = (await req.json()) as IEmployeeEussDbsData;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/employee/create-euss-dbs-data/`,
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
    if (res.error) {
      console.error(`POST > Create EUSS/DBS Detail > Error`, res.error);
    }
    return NextResponse.json(res, { status: apiRes.status });
  } catch (err) {
    console.error(
      "POST > Create EUSS/DBS Detail of Employee > Failed to create EUSS/DBS detail",
      err
    );
    return NextResponse.json(
      { message: "Failed to create EUSS/DBS information" },
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

  const data = (await req.json()) as IEmployeeVisaBrp;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/employee/update-euss-dbs-data/`,
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
      "PATCH > Update EUSS/DBS Detail of Employee > Failed to update EUSS/DBS detail",
      err
    );
    return NextResponse.json(
      { message: "Failed to update EUSS/DBS information" },
      { status: 500 }
    );
  }
}
