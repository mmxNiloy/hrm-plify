import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const fd = await req.formData();
  const company_reg = fd.get("company_reg"); // stirng
  const type_of_company = fd.get("type_of_company"); // string
  const trade_name = fd.get("trade_name"); // string
  const sector = fd.get("sector"); // string
  const org_email = fd.get("org_email"); // string
  const change_of_name_5 = fd.get("change_of_name_5"); // string
  const faced_penaly_org = fd.get("faced_penaly_org"); // string
  return NextResponse.json(
    {
      message: "TODO: Integrate with the server when it's ready",
      data: {
        company_id: params.id,
        company_reg: company_reg as string,
        type_of_company: type_of_company as string,
        trade_name: trade_name as string,
        sector: sector as string,
        org_email: org_email as string,
        change_of_name_5: change_of_name_5 as string,
        faced_penaly_org: faced_penaly_org as string,
      },
    },
    { status: 501 }
  );
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const fd = await req.formData();
  const company_reg = fd.get("company_reg"); // stirng
  const type_of_company = fd.get("type_of_company"); // string
  const trade_name = fd.get("trade_name"); // string
  const sector = fd.get("sector"); // string
  const org_email = fd.get("org_email"); // string
  const change_of_name_5 = fd.get("change_of_name_5"); // string
  const faced_penaly_org = fd.get("faced_penaly_org"); // string
  return NextResponse.json(
    {
      message: "TODO: Integrate with the server when it's ready",
      data: {
        company_id: params.id,
        company_reg: company_reg as string,
        type_of_company: type_of_company as string,
        trade_name: trade_name as string,
        sector: sector as string,
        org_email: org_email as string,
        change_of_name_5: change_of_name_5 as string,
        faced_penaly_org: faced_penaly_org as string,
      },
    },
    { status: 501 }
  );
}
