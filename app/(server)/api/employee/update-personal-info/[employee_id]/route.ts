import { IEmployeeWithPersonalInfo } from "@/schema/EmployeeSchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{
    employee_id: string;
  }>;
}

interface IUpdateBod extends IEmployeeWithPersonalInfo {
  first_name: string;
  middle_name: string;
  last_name: string;
}

export async function PATCH(req: NextRequest, { params }: Props) {
  // Check if the user is logged in
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const bod = (await req.json()) as IUpdateBod;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/employee/update-personal-data/${
        (
          await params
        ).employee_id
      }`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value}`,
        },
        body: JSON.stringify(bod),
      }
    );

    const data = await apiRes.json();
    return NextResponse.json(data, { status: apiRes.status });
  } catch (err) {
    console.error("Failed to update employee personal information", err);
    return NextResponse.json(
      { message: "Failed to update employee personal information", err },
      { status: 500 }
    );
  }
}
