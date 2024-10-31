import { ICompanyTradeDetailsBase } from "@/schema/CompanySchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fd = await req.formData();
  const company_reg = fd.get("company_reg") as string; // stirng
  const type_of_company = fd.get("type_of_company") as string; // string
  const trade_name = fd.get("trade_name") as string; // string
  const sector = fd.get("sector") as string; // string
  const org_email = fd.get("org_email") as string; // string
  const change_of_name_5 = fd.get("change_of_name_5") as string; // string
  const faced_penaly_org = fd.get("faced_penaly_org") as string; // string

  const reqBod: ICompanyTradeDetailsBase = {
    company_reg,
    type_of_company,
    trade_name,
    sector,
    org_email,
    change_of_name_5,
    faced_penaly_org,
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
      `${process.env.API_BASE_URL}/my-company/company-trade-details`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value}`,
        },
        body: JSON.stringify({
          company_id: Number.parseInt(params.id),
          ...reqBod,
        }),
      }
    );

    const data = await apiRes.json();
    return NextResponse.json(data, { status: apiRes.status });
  } catch (err) {
    console.error(`Failed to update company trade details.`, err);
    return NextResponse.json(
      {
        message: `Failed to update company trade details. Check logs for detail.`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fd = await req.formData();
  const company_reg = fd.get("company_reg") as string; // stirng
  const type_of_company = fd.get("type_of_company") as string; // string
  const trade_name = fd.get("trade_name") as string; // string
  const sector = fd.get("sector") as string; // string
  const org_email = fd.get("org_email") as string; // string
  const change_of_name_5 = fd.get("change_of_name_5") as string; // string
  const faced_penaly_org = fd.get("faced_penaly_org") as string; // string

  const reqBod: ICompanyTradeDetailsBase = {
    company_reg,
    type_of_company,
    trade_name,
    sector,
    org_email,
    change_of_name_5,
    faced_penaly_org,
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
      `${process.env.API_BASE_URL}/my-company/company-trade-details/${params.id}`,
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
    console.error(`Failed to update company trade details.`, err);
    return NextResponse.json(
      {
        message: `Failed to update company trade details. Check logs for detail.`,
      },
      { status: 500 }
    );
  }
}
