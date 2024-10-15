import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { message: "Work In progress. This feature is not ready yet." },
    { status: 501 }
  );
}
