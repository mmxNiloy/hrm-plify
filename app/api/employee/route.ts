import { NextRequest, NextResponse } from "next/server";

// Create a new employee, hit central api, get response, notify client
export async function POST(req: NextRequest) {
  const fd = await req.formData();
  return NextResponse.json(
    {
      message: "Data received",
      data: Object.fromEntries(fd),
    },
    { status: 200 }
  );
}
