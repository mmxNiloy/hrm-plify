import { ICompanyAddressBase } from "@/schema/CompanySchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { IDProps } from "../../../apiParams";

export async function POST(req: NextRequest, { params }: IDProps) {
  const fd = await req.formData();
  const postcode = fd.get("postcode") as string; // stirng
  const address_line_1 = fd.get("address_line_1") as string; // string
  const address_line_2 = fd.get("address_line_2") as string; // string
  const address_line_3 = fd.get("address_line_3") as string; // string
  const city_county = fd.get("city_county") as string; // string
  const country = fd.get("country") as string; // string

  const reqBod: ICompanyAddressBase = {
    postcode,
    address_line_1,
    address_line_2,
    address_line_3,
    city_county,
    country,
  };

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
      `${process.env.API_BASE_URL}/my-company/company-addresses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value}`,
        },
        body: JSON.stringify({
          company_id: Number.parseInt((await params).id),
          ...reqBod,
        }),
      }
    );
    if (apiRes.ok) {
      const data = await apiRes.json();
      return NextResponse.json(data, { status: apiRes.status });
    }
    return NextResponse.json(
      { _html: await apiRes.text() },
      { status: apiRes.status }
    );
  } catch (err) {
    console.error(`Failed to update company address.`, err);
    return NextResponse.json(
      {
        message: `Failed to update company address. Check logs for detail.`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: IDProps) {
  const fd = await req.formData();
  const postcode = fd.get("postcode") as string; // stirng
  const address_line_1 = fd.get("address_line_1") as string; // string
  const address_line_2 = fd.get("address_line_2") as string; // string
  const address_line_3 = fd.get("address_line_3") as string; // string
  const city_county = fd.get("city_county") as string; // string
  const country = fd.get("country") as string; // string

  const reqBod: ICompanyAddressBase = {
    postcode,
    address_line_1,
    address_line_2,
    address_line_3,
    city_county,
    country,
  };

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
      `${process.env.API_BASE_URL}/my-company/company-addresses/${
        (
          await params
        ).id
      }`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value}`,
        },
        body: JSON.stringify(reqBod),
      }
    );

    const data = await apiRes.json();
    return NextResponse.json(data, { status: apiRes.status });
  } catch (err) {
    console.error(`Failed to update company address.`, err);
    return NextResponse.json(
      {
        message: `Failed to update company address. Check logs for detail.`,
      },
      { status: 500 }
    );
  }
}
