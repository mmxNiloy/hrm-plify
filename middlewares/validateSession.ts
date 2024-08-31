import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export function validateSession(req: NextRequest) {
  try {
    const sessionID = req.cookies.get(process.env.COOKIE_SESSION_KEY!);
    const c = cookies().get(process.env.COOKIE_SESSION_KEY!);
    console.log("Middleware > validateSession > Session ID", {
      sessionID,
      cookieSessionID: c,
    });

    if (!sessionID) {
      return false;
    } else {
      // TODO: Verify session ID here
      return true;
    }
  } catch (_) {
    return false;
  }
}
