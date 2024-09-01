import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const fd = await req.formData();
  const company_name = fd.get("company_name"); // stirng
  const industry = fd.get("industry"); // string
  const headquarters = fd.get("headquarters"); // string
  const contact_number = fd.get("contact_number"); // string
  const founded_year = fd.get("founded_year"); // string
  const website = fd.get("website"); // string
  const logo = fd.get("logo"); // string
  return NextResponse.json(
    {
      message: "TODO: Integrate with the server when it's ready",
      data: {
        company_id: params.id,
        company_name: company_name as string,
        industry: industry as string,
        headquarters: headquarters as string,
        contact_number: contact_number as string,
        founded_year: founded_year as string,
        website: website as string,
        logo: logo as string,
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
  const company_name = fd.get("company_name"); // stirng
  const industry = fd.get("industry"); // string
  const headquarters = fd.get("headquarters"); // string
  const contact_number = fd.get("contact_number"); // string
  const founded_year = fd.get("founded_year"); // string
  const website = fd.get("website"); // string
  const logo = fd.get("logo"); // string
  return NextResponse.json(
    {
      message: "TODO: Integrate with the server when it's ready",
      data: {
        company_id: params.id,
        company_name: company_name as string,
        industry: industry as string,
        headquarters: headquarters as string,
        contact_number: contact_number as string,
        founded_year: founded_year as string,
        website: website as string,
        logo: logo as string,
      },
    },
    { status: 501 }
  );
}
