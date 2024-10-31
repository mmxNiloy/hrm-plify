import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface IContactInfoReqBody {
  postcode: string;
  address_line: string;
  additional_address_1: string;
  additional_address_2: string;
  country: string;
  proof_of_address_doc: File | null;
}

export async function POST(req: NextRequest) {
  // Check if the user is logged in
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const data = (await req.json()) as IContactInfoReqBody;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/employee/create-contact-data/`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value}`,
        },
      }
    );

    const res = await apiRes.json();
    return NextResponse.json(res, { status: apiRes.status });
  } catch (err) {
    console.error(
      "POST > Create Contact Information of Employee > Failed to create contact information",
      err
    );
    return NextResponse.json(
      { message: "Failed to create contact information" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  // Check if the user is logged in
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const data = (await req.json()) as IContactInfoReqBody;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/employee/update-contact-data/`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value}`,
        },
      }
    );

    const res = await apiRes.json();
    return NextResponse.json(res, { status: apiRes.status });
  } catch (err) {
    console.error(
      "PATCH > Update Contact Information of Employee > Failed to update contact information",
      err
    );
    return NextResponse.json(
      { message: "Failed to update contact information" },
      { status: 500 }
    );
  }
}
