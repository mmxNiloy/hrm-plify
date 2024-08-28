import { ICompanyCreationBody } from "@/schema/CompanySchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (!process.env.COOKIE_SESSION_KEY || !process.env.API_BASE_URL) {
    return NextResponse.json(
      { message: "Invalid environment!" },
      { status: 500 }
    );
  }

  const page = Number.parseInt(req.nextUrl.searchParams.get("page") ?? "1");
  const limit = Number.parseInt(req.nextUrl.searchParams.get("limit") ?? "10");

  // Check session
  const session = cookies().get(process.env.COOKIE_SESSION_KEY);
  if (!session) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/companies?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.value}`,
        },
      }
    );
    if (apiRes.ok) {
      return NextResponse.json(await apiRes.json(), { status: apiRes.status });
    } else {
      return NextResponse.json(
        { message: "Failed to fetch data", res: await apiRes.json() },
        { status: apiRes.status }
      );
    }
  } catch (_) {
    return NextResponse.json(
      { message: "Server error encountered" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.COOKIE_SESSION_KEY || !process.env.API_BASE_URL) {
    return NextResponse.json(
      { message: "Invalid environment!" },
      { status: 500 }
    );
  }

  // Check session
  const session = cookies().get(process.env.COOKIE_SESSION_KEY);
  if (!session) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  try {
    const fd = await req.formData();
    const data: ICompanyCreationBody = {
      company_name: (fd.get("company_name") ?? "") as string,
      industry: (fd.get("industry") ?? "") as string,
      headquarters: (fd.get("headquarters") ?? "") as string,
      founded_year: Number.parseInt((fd.get("founded_year") ?? "") as string),
      website: (fd.get("website") ?? "") as string,
      logo: (fd.get("logo") ?? "") as string,
      contact_number: (fd.get("contact_number") ?? "") as string,
    };

    const apiRes = await fetch(`${process.env.API_BASE_URL}/companies/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (apiRes.ok) {
      return NextResponse.json(await apiRes.json(), { status: apiRes.status });
    } else {
      return NextResponse.json(
        { message: "Failed to create a company", res: await apiRes.json() },
        { status: apiRes.status }
      );
    }
  } catch (_) {
    return NextResponse.json(
      { message: "Server error encountered" },
      { status: 500 }
    );
  }
}
