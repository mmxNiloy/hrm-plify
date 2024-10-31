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

  // Send a cookie w\ user data
  (await cookies()).set(process.env.COOKIE_SESSION_KEY!, data.token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: Date.now() + 43200000, // 12hrs
  });
  (await cookies()).set(
    process.env.COOKIE_USER_KEY!,
    JSON.stringify(data.user),
    {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: Date.now() + 43200000, // 12hrs
    }
  );

  return NextResponse.json(data, { status: 200 });
}
