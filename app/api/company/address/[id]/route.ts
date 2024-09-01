import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const fd = await req.formData();
  const postcode = fd.get("postcode"); // stirng
  const address_line = fd.getAll("address_line"); // string[]
  const city_county = fd.get("city_county"); // string
  const country = fd.get("country"); // string
  return NextResponse.json(
    {
      message: "TODO: Integrate with the server when it's ready",
      data: {
        company_id: params.id,
        postcode: postcode as string,
        address_line: address_line as string[],
        city_county: city_county as string,
        country: country as string,
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
  const postcode = fd.get("postcode"); // stirng
  const address_line = fd.getAll("address_line"); // string[]
  const city_county = fd.get("city_county"); // string
  const country = fd.get("country"); // string
  return NextResponse.json(
    {
      message: "TODO: Integrate with the server when it's ready",
      data: {
        company_id: params.id,
        postcode: postcode as string,
        address_line: address_line as string[],
        city_county: city_county as string,
        country: country as string,
      },
    },
    { status: 501 }
  );
}
