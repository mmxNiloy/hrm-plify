import { IEmployeeEmergencyContact } from "@/schema/EmployeeSchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Check if the user is logged in
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  if (!session) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const data = (await req.json()) as IEmployeeEmergencyContact;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/employee/create-next-kin-data/`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
      }
    );

    const result = await apiRes.json();

    if (result.error) {
      console.error(`POST > Create Emergency Contact > Error`, result.error);
    }

    return NextResponse.json(result, { status: apiRes.status });
  } catch (err) {
    console.error(
      "POST > Create Emergency Contact > Failed to create contact",
      err
    );
    return NextResponse.json(
      { message: "Failed to create emergency contact" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  // Check if the user is logged in
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  if (!session) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const data = (await req.json()) as IEmployeeEmergencyContact;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/employee/update-next-kin-data/`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
      }
    );

    const result = await apiRes.json();

    if (result.error) {
      console.error(`PATCH > Update Emergency Contact > Error`, result.error);
    }

    return NextResponse.json(result, { status: apiRes.status });
  } catch (err) {
    console.error(
      "PATCH > Update Emergency Contact > Failed to update contact",
      err
    );
    return NextResponse.json(
      { message: "Failed to update emergency contact" },
      { status: 500 }
    );
  }
}
