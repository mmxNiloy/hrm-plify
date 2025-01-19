import { ICompanyWithDesignationMeta } from "@/schema/CompanySchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const data = await req.json();

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/organogram/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return NextResponse.json(await apiRes.json(), { status: apiRes.status });
  } catch (err) {
    console.error(
      "POST > Create Company Department > Failed to create department\n",
      err
    );
    return NextResponse.json(
      { message: "Failed to create depatment!" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const data = await req.json();

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/organogram/${data.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return NextResponse.json(await apiRes.json(), { status: apiRes.status });
  } catch (err) {
    console.error(
      "POST > Create Company Department > Failed to create department\n",
      err
    );
    return NextResponse.json(
      { message: "Failed to create depatment!" },
      { status: 500 }
    );
  }
}
