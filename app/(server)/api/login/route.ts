import { ILoginResponse } from "@/schema/UserSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const fd = await req.formData();
  const email = fd.get("email");
  const password = fd.get("password");
  const rememberMe = fd.get("remember-me");
  const request = fetch(`${process.env.API_BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { data, error } = await withError<ILoginResponse>(request);

  if (error) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 400 }
    );
  }

  console.log("POST > Login > Login response", data);
  // Access Permissions is too large to store
  // Store in a separate cookie
  // ISSUE: Data too large, do not store this cookie.
  const { access_permissions, ...userData } = data.user;
  const expires = Date.now() + 43200000; // 12hrs

  // Send a cookie w\ user data
  const cks = await cookies();
  cks.set(process.env.COOKIE_SESSION_KEY!, data.token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires,
  });

  cks.set(process.env.NEXT_PUBLIC_COOKIE_USER_KEY!, JSON.stringify(userData), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires,
  });

  // [!] Set user access cookie here
  cks.set(
    process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!,
    JSON.stringify(data.permissions),
    {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires,
    }
  );

  return NextResponse.json(
    {
      role: data.user.user_roles?.roles?.role_name,
      company: data.user.usercompany?.companies?.is_active,
    },
    { status: 200 }
  );
}
