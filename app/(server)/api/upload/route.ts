import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();

    const session =
      (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
    const result = await fetch(`${process.env.API_BASE_URL}/upload`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      method: "POST",
      body: fd,
    });

    if (result.ok) {
      const mRes = await result.json();
      console.debug("Upload route result >", mRes);

      return NextResponse.json(
        mRes,
        { status: 201 }
      );
    }

    let res = "";
    if (result.headers.get("Content-Type")?.includes("json"))
      res = await result.json();
    else res = await result.text();

    return NextResponse.json(
      { message: "Upload failed.", error: res },
      { status: result.status }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Upload failed",
        error,
      },
      { status: 500 }
    );
  }
}
