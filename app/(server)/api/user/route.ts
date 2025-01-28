import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  // Check if the user is logged in
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const data = await req.json();

  try {
    const apiRes = await fetch(`${process.env.API_BASE_URL}/deleteUser`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: data.user_id }),
    });

    const res = await apiRes.json();
    return NextResponse.json(res, { status: apiRes.status });
  } catch (err) {
    console.error(
      "DELETE > Delete Company Document > Failed to delete company document",
      err
    );
    return NextResponse.json(
      { message: "Failed to delete company document" },
      { status: 500 }
    );
  }
}
