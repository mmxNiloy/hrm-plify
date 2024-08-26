import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const fd = await req.formData();

  return NextResponse.json(
    {
      message: "Data received. TODO: API calls for registration.",
      data: {
        first_name: fd.get("first_name"),
        last_name: fd.get("last_name"),
        middle_name: fd.get("middle_name"),
        email: fd.get("email"),
        password: fd.get("password"),
      },
    },
    { status: 200 }
  );
}
