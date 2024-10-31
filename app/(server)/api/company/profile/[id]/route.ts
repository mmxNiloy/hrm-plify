import { upload } from "@/app/(server)/actions/upload";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { IDProps } from "../../../apiParams";

export async function POST(req: NextRequest, { params }: IDProps) {
  const fd = await req.formData();
  const company_name = fd.get("company_name"); // stirng
  const industry = fd.get("industry"); // string
  const headquarters = fd.get("headquarters"); // string
  const contact_number = fd.get("contact_number"); // string
  const founded_year = fd.get("founded_year"); // string
  const website = fd.get("website"); // string
  const logo = fd.get("logo"); // string
  return NextResponse.json(
    {
      message: "TODO: Integrate with the server when it's ready",
      data: {
        company_id: (await params).id,
        company_name: company_name as string,
        industry: industry as string,
        headquarters: headquarters as string,
        contact_number: contact_number as string,
        founded_year: founded_year as string,
        website: website as string,
        logo: logo as string,
      },
    },
    { status: 501 }
  );
}

export async function PUT(req: NextRequest, { params }: IDProps) {
  try {
    // Extract form data
    const fd = await req.formData();
    const company_name = fd.get("company_name"); // stirng
    const industry = fd.get("industry"); // string
    const headquarters = fd.get("headquarters"); // string
    const contact_number = fd.get("contact_number"); // string
    const founded_year = fd.get("founded_year"); // string
    const website = fd.get("website"); // string
    const logo = fd.get("logo") as File | undefined; // file
    const is_active = fd.get("is_active") as "yes" | "no"; // enum('yes', 'no')

    var uploadRes = undefined;
    if (logo) {
      uploadRes = await upload(logo);
    }

    // request body as raw json
    const reqBod = {
      company_name: company_name as string,
      industry: industry as string,
      headquarters: headquarters as string,
      contact_number: contact_number as string,
      founded_year: Number.parseInt(founded_year as string),
      website: website as string,
      logo: uploadRes?.data?.fileUrl ?? "",
      is_active: is_active === "yes" ? 1 : 0,
    };

    // Check if the user is logged in
    const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
    if (!session || session.value.length < 1) {
      return NextResponse.json(
        { message: "Session expired. Login again." },
        { status: 401 }
      );
    }

    const apiRes = await fetch(
      `${process.env.API_BASE_URL!}/companies/update/${(await params).id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          Authorization: `Bearer ${session.value}`,
        },
        body: JSON.stringify(reqBod),
      }
    );

    const data = await apiRes.json();
    return NextResponse.json(data, { status: apiRes.status });
  } catch (err) {
    console.error("Failed to update company profile", err);
    return NextResponse.json(
      {
        message:
          "Failed to update company profile information. Check logs for detail.",
      },
      { status: 500 }
    );
  }

  // return NextResponse.json(
  //   {
  //     message: "TODO: Integrate with the server when it's ready",
  //     data: {
  //       company_id: params.id,
  //       company_name: company_name as string,
  //       industry: industry as string,
  //       headquarters: headquarters as string,
  //       contact_number: contact_number as string,
  //       founded_year: founded_year as string,
  //       website: website as string,
  //       logo: logo as string,
  //     },
  //   },
  //   { status: 501 }
  // );
}
