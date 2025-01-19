import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const reqBod = await req.json();

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/profile/admin/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...reqBod,
        }),
      }
    );

    return NextResponse.json(await apiRes.json(), { status: apiRes.status });
  } catch (err) {
    console.error(
      "POST > Create System User > Failed to create System User\n",
      err
    );
    return NextResponse.json(
      { message: "Failed to create System User!" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const bod = await req.json();

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/profile/admin/update`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bod),
      }
    );

    return NextResponse.json(await apiRes.json(), { status: apiRes.status });
  } catch (err) {
    console.error(
      "PATCH > Update system user > Failed to update system user\n",
      err
    );
    return NextResponse.json(
      { message: "Failed to update system user!" },
      { status: 500 }
    );
  }
}
