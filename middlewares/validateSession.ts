import { NextRequest } from "next/server";

export function validateSession(req: NextRequest) {
  try {
    const sessionID = req.cookies.get(process.env.COOKIE_SESSION_KEY!);
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
