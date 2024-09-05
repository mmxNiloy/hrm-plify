import { NextRequest, NextResponse } from "next/server";

export function validateSession(req: NextRequest) {
  try {
    const sessionID = req.cookies.get(
      process.env.COOKIE_SESSION_KEY ??
        process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY ??
        "hrmplify_session_token"
    );

    if (!sessionID) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.error("middlewares > validateSession()", err);
    return false;
  }
}
