import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const fd = await req.formData();
  const email = fd.get("email");
  const password = fd.get("password");
  const rememberMe = fd.get("remember-me");

  return NextResponse.json(
    { message: "Form data", email, password, rememberMe },
    { status: 200 }
  );
}
