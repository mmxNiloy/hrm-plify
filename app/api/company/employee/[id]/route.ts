import { validateSession } from "@/middlewares/validateSession";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: number;
  };
}
export async function GET(req: NextRequest, { params }: Props) {
  try {
    // Check token
    const sessionId = validateSession(req);
    // Invalid token/error encountered
    if (typeof sessionId !== "string") return sessionId;

    const page = Number.parseInt(req.nextUrl.searchParams.get("page") ?? "1");
    const limit = Number.parseInt(
      req.nextUrl.searchParams.get("limit") ?? "10"
    );

    // Make api call
    const apiRes = await fetch(
      `${process.env.API_BASE_URL!}/company/employee/${
        params.id
      }?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${sessionId}`,
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
