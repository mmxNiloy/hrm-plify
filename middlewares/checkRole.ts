import { IRoles, IUser } from "@/schema/UserSchema";
import { decrypt } from "@/utils/Security";
import { NextRequest } from "next/server";

export function checkRole(
  req: NextRequest
): { role: IRoles; company_id: number } | undefined {
  try {
    const userCookie = req.cookies.get(
      process.env.NEXT_PUBLIC_COOKIE_USER_KEY!
    );
    const userData = JSON.parse(userCookie?.value ?? "") as IUser;
    return {
      role: userData.user_roles.roles,
      company_id: userData.company_id ?? 0,
    };
  } catch (_) {
    return undefined;
  }
}
