import { IRoles, IUser } from "@/schema/UserSchema";
import { NextRequest } from "next/server";

export function checkRole(
  req: NextRequest
): { role: IRoles; company_id: number } | undefined {
  try {
    const userCookie = req.cookies.get(
      process.env.NEXT_PUBLIC_COOKIE_USER_KEY!
    );
    const userData = JSON.parse(userCookie?.value ?? "{}") as IUser;

    // console.log("Middleware > User Cookie Data >", req.cookies);

    return {
      role: userData.user_roles?.roles ?? { role_name: "Guest" },
      company_id: userData.usercompany?.company_id ?? 0,
    };
  } catch (_) {
    return undefined;
  }
}
