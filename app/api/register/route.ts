import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqBod = await req.json();

  console.log("POST > Register > Request body >", reqBod);

  // HIT the api
  try {
    const apiRes = await fetch(`${process.env.API_BASE_URL}/register`, {
      method: "POST",
      body: JSON.stringify(reqBod),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(await apiRes.json(), { status: apiRes.status });
  } catch (err) {
    console.error("POST > Register > Failed to register >", err);
    return NextResponse.json(
      { message: "Registration failed." },
      { status: 500 }
    );
  }
}
