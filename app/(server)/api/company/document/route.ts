import { ICompanyDoc } from "@/schema/CompanySchema";
import { IOffDaysBase, IShift } from "@/schema/RotaSchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Check if the user is logged in
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const data = (await req.json()) as ICompanyDoc;
  console.log("POST > Create company document > Request body >", data);

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/docs/${data.company_id}`,
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
      "POST > Create company document > Failed to create company document",
      err
    );
    return NextResponse.json(
      { message: "Failed to create company document" },
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

  const data = (await req.json()) as ICompanyDoc;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/docs/${data.company_id}/${data.doc_id}`,
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
      "PATCH > Update Company Document > Failed to update company document",
      err
    );
    return NextResponse.json(
      { message: "Failed to update company document" },
      { status: 500 }
    );
  }
}

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
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/docs/${data.document_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.value}`,
        },
      }
    );

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
