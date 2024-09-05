import { NextRequest, NextResponse } from "next/server";

export function validateSession(req: NextRequest) {
  try {
    const sessionID = req.cookies.get(
      process.env.COOKIE_SESSION_KEY ??
        process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY ??
        "hrmplify_session_token"
    );

    if (!sessionID) {
      return NextResponse.json(
        { message: "Token expired. Login again" },
        { status: 401 }
      );
    } else {
      return sessionID.value;
    }
  } catch (err) {
    console.error("middlewares > validateSession()", err);
    return NextResponse.json(
      { message: "Internal server error. Check logs for details." },
      { status: 500 }
    );
  }
}
