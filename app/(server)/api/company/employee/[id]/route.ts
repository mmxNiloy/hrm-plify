import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { IDProps } from "../../../apiParams";

export async function GET(req: NextRequest, { params }: IDProps) {
  try {
    // Check token
    const sessionId = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
    // Invalid token/error encountered
    if (!sessionId || sessionId.value.length < 1)
      return NextResponse.json(
        { message: "Session Expired. Login again." },
        { status: 401 }
      );

    const page = Number.parseInt(req.nextUrl.searchParams.get("page") ?? "1");
    const limit = Number.parseInt(
      req.nextUrl.searchParams.get("limit") ?? "10"
    );

    // Make api call
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/companies/my/get-employee/${
        (
          await params
        ).id
      }?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${sessionId.value}`,
        },
      }
    );

    return NextResponse.json(await apiRes.json(), { status: apiRes.status });
  } catch (err) {
    console.error("API Error | api > company > employee > [id]", err);
    return NextResponse.json(
      { message: "Internal server error. Check logs for details." },
      { status: 500 }
    );
  }
}
