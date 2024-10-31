import { IDepartment } from "@/schema/CompanySchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const company_id = req.nextUrl.searchParams.get("company_id");
  const page = req.nextUrl.searchParams.get("page") ?? "1";
  const limit = req.nextUrl.searchParams.get("limit") ?? "10";
  const get_all = req.nextUrl.searchParams.get("get_all") ?? "false";

  if (!company_id)
    return NextResponse.json(
      { message: "Company ID is necessary!" },
      { status: 400 }
    );

  console.log(
    "Hitting API",
    `${process.env.API_BASE_URL}/company/operation/get-${
      get_all === "true" ? "all-" : ""
    }departments/${company_id}?page=${page}&limit=${limit}`
  );

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/get-${
        get_all === "true" ? "all-" : ""
      }departments/${company_id}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.value}`,
        },
      }
    );

    return NextResponse.json(await apiRes.json(), { status: apiRes.status });
  } catch (err) {
    console.error(`Failed to get company departments`, err);
    return NextResponse.json(
      {
        message: `Failed to get company departments. Check logs for detail.`,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const fd = await req.formData();
  const company_id = fd.get("company_id") as string;
  const dpt_name = fd.get("dpt_name") as string;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/create-deparment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_id: Number.parseInt(company_id),
          dpt_name,
        }),
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

export async function PUT(req: NextRequest) {
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const bod = (await req.json()) as IDepartment;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/update-deparment`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bod),
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
