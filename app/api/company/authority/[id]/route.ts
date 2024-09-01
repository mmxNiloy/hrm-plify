import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const fd = await req.formData();
  const first_name = fd.get("first_name"); // stirng
  const last_name = fd.get("last_name"); // string
  const designation = fd.get("designation"); // string
  const phone = fd.get("phone"); // string
  const email = fd.get("email"); // string
  const document = fd.get("document"); // file
  const offence_history = fd.get("offence_history"); // string
  const type = fd.get("type") as string;

  return NextResponse.json(
    {
      message: "TODO: Integrate with the server when it's ready",
      data: {
        company_id: params.id,
        type,
        first_name: first_name as string,
        last_name: last_name as string,
        designation: designation as string,
        phone: phone as string,
        email: email as string,
        document: (document as File).name,
        offence_history: offence_history as string,
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
  const first_name = fd.get("first_name"); // stirng
  const last_name = fd.get("last_name"); // string
  const designation = fd.get("designation"); // string
  const phone = fd.get("phone"); // string
  const email = fd.get("email"); // string
  const document = fd.get("document"); // file
  const offence_history = fd.get("offence_history"); // string
  const type = fd.get("type") as string;

  return NextResponse.json(
    {
      message: "TODO: Integrate with the server when it's ready",
      data: {
        company_id: params.id,
        type,
        first_name: first_name as string,
        last_name: last_name as string,
        designation: designation as string,
        phone: phone as string,
        email: email as string,
        document: (document as File).name,
        offence_history: offence_history as string,
      },
    },
    { status: 501 }
  );
}
