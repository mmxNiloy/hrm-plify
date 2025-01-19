import { ICompanyWithDesignationMeta } from "@/schema/CompanySchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page") ?? "1";
  const limit = req.nextUrl.searchParams.get("limit") ?? "10";

  // Check if the user is logged in
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/admin/dashboard/get-companies-designations?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.value}`,
        },
      }
    );

    const res = (await apiRes.json()) as {
      companies: ICompanyWithDesignationMeta[];
      totalCompanies: number;
      totalPages: number;
      currentPage: number;
      limit: number;
    };

    console.log(`GET > Company Designations > Data found`, res);

    return NextResponse.json(
      { data: res.companies, total_page: res.totalPages },
      { status: apiRes.status }
    );
  } catch (error) {
    // Code
    console.error("GET > Get company job count/stats\n", error);
    return NextResponse.json(
      { message: "Failed to get company job statistics", error },
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
  const designation_name = fd.get("designation_name") as string;
  const dept_id = fd.get("department_id") as string;

  try {
    const reqBody = {
      company_id: Number.parseInt(company_id),
      designation_name,
      dept_id: Number.parseInt(dept_id),
    };

    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/create-designation`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
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

  const fd = await req.formData();

  const designation_id = fd.get("designation_id") as string;
  const designation_name = fd.get("designation_name") as string;
  const dept_id = fd.get("department_id") as string;

  try {
    const reqBody = {
      designation_id: Number.parseInt(designation_id),
      designation_name,
      dept_id: Number.parseInt(dept_id),
    };

    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/update-designation`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
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
