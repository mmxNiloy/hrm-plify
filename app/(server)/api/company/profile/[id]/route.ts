import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { IDProps } from "../../../apiParams";
import SiteConfig from "@/utils/SiteConfig";
import { IUploadResult } from "@/app/(server)/actions/upload";

async function uploadFile(file: File, session: string) {
  const fd = new FormData();
  fd.append("file", file);
  return await fetch(`${process.env.API_BASE_URL}/upload`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
    method: "POST",
    body: fd,
  });
}

export async function POST(req: NextRequest, { params }: IDProps) {
  const fd = await req.formData();
  const company_name = fd.get("company_name"); // stirng
  const industry = fd.get("industry"); // string
  const headquarters = fd.get("headquarters"); // string
  const contact_number = fd.get("contact_number"); // string
  const founded_year = fd.get("founded_year"); // string
  const website = fd.get("website"); // string
  const logo = fd.get("logo"); // string
  const email = fd.get("email"); // string
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
        email: (email as string | undefined) ?? "",
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
    const logoUrl = fd.get("logo_url") as string | undefined;
    const is_active = fd.get("is_active") as "yes" | "no"; // enum('yes', 'no')
    const email = (fd.get("email") as string | undefined) ?? "";

    console.log("File included", logo);

    if ((logo?.size ?? 0) > SiteConfig.maxFileSize) {
      // toast({
      //   title: "File too large",
      //   description: `Cannot upload this file. The file exceeds the permissible limit: ${
      //     SiteConfig.maxFileSize / 1e5
      //   }MB`,
      //   variant: "destructive",
      // });
      // setLoading(false);
      return NextResponse.json(
        { message: "File too large.", error: new Error("File too large.") },
        { status: 400 }
      );
    }

    const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
    var uploadRes = undefined;
    if (logo && logo.size <= SiteConfig.maxFileSize) {
      const mRes = await uploadFile(logo, session?.value ?? "");
      if (mRes.ok) {
        const data = (await mRes.json()) as IUploadResult;
        uploadRes = data.fileUrl;
      }
    }

    // request body as raw json
    const reqBod = {
      company_name: company_name as string,
      industry: industry as string,
      headquarters: headquarters as string,
      contact_number: contact_number as string,
      founded_year: Number.parseInt(founded_year as string),
      website: website as string,
      logo: uploadRes ?? logoUrl ?? "",
      is_active: is_active === "yes" ? 1 : 0,
      email,
    };

    // Check if the user is logged in
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
