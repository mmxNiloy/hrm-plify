import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { IEmployeeEmergencyContact } from "@/schema/EmployeeSchema";

export async function GET(
  req: NextRequest,
  { params }: { params: { employee_id: string } }
) {
  // Check if the user is logged in
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";

  if (!session) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/employee/get-next-kin-data/${params.employee_id}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!apiRes.ok) {
      console.error("GET > Emergency Contact > Data not found");
      return NextResponse.json(
        { message: "Emergency contact not found" },
        { status: 404 }
      );
    }

    const result = (await apiRes.json()) as {
      message: string;
      data: IEmployeeEmergencyContact;
    };

    return NextResponse.json(result, { status: apiRes.status });
  } catch (err) {
    console.error("GET > Emergency Contact > Failed to retrieve contact", err);
    return NextResponse.json(
      { message: "Failed to retrieve emergency contact" },
      { status: 500 }
    );
  }
}
