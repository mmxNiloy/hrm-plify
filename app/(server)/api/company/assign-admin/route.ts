import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Create a new employee, hit central api, get response, notify client
export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  // Check if the user is logged in
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/companies/operation/create-assgin-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value}`,
        },
        body: JSON.stringify(reqBody),
      }
    );

    const data = await apiRes.json();
    return NextResponse.json(data, { status: apiRes.status });
  } catch (err) {
    console.error("Failed to create new company user", err);
    return NextResponse.json(
      { message: "Failed to create new company user", err },
      { status: 500 }
    );
  }
}
