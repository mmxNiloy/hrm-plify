import { ILoginResponse } from "@/schema/UserSchema";
import { encrypt } from "@/utils/Security";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const fd = await req.formData();
  const email = fd.get("email");
  const password = fd.get("password");
  const rememberMe = fd.get("remember-me");

  try {
    const apiRes = await fetch(`${process.env.API_BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (apiRes.ok) {
      const data = (await apiRes.json()) as ILoginResponse;
      // Send a cookie w\ user data
      cookies().set(process.env.COOKIE_SESSION_KEY!, data.token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: Date.now() + 43200000, // 12hrs
      });
      cookies().set(process.env.COOKIE_USER_KEY!, JSON.stringify(data.user), {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: Date.now() + 43200000, // 12hrs
      });

      return NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: apiRes.status }
    );
  } catch (_) {
    return NextResponse.json(
      {
        message: "Failed to make request (or server responded with an error).",
      },
      { status: 500 }
    );
  }
}
