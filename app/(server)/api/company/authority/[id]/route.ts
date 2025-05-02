import { ICompanyAuthorizedDetailsBase } from "@/schema/CompanySchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { IDProps } from "../../../apiParams";
import SiteConfig from "@/utils/SiteConfig";
import { IUploadResult } from "@/app/(server)/actions/upload";

interface IReqBody extends ICompanyAuthorizedDetailsBase {
  endpoint: string;
  document?: File;
  type: "Authorised Personnel" | "Key Contact" | "Level 1 User";
  is_same_as_key_contact: boolean;
}

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

  const reqBod = makeRequestBody(
    fd,
    Number.parseInt((await params).id),
    "POST"
  );

  // Check if the user is logged in
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  if ((reqBod.document?.size ?? 0) > SiteConfig.maxFileSize) {
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

  const token = session.value;

  // try to upload the document here
  var uploadRes = undefined;
  if (reqBod.document) {
    const mRes = await uploadFile(reqBod.document, token);
    if (mRes.ok) {
      const data = (await mRes.json()) as IUploadResult;
      uploadRes = data.fileUrl;
    }
  }

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/${reqBod.endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value}`,
        },
        body: JSON.stringify(
          Object.assign(reqBod, { doc_link: uploadRes ?? "" })
        ),
      }
    );

    const data = await apiRes.json();
    return NextResponse.json(data, { status: apiRes.status });
  } catch (err) {
    console.error(`Failed to update company ${reqBod.type}`, err);
    return NextResponse.json(
      {
        message: `Failed to update company ${reqBod.type}. Check logs for detail.`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: IDProps) {
  const fd = await req.formData();

  const reqBod = makeRequestBody(fd, Number.parseInt((await params).id), "PUT");

  if ((reqBod.document?.size ?? 0) > SiteConfig.maxFileSize) {
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

  const token = session?.value ?? "";

  // try to upload the document here
  var uploadRes = undefined;
  if (reqBod.document) {
    const mRes = await uploadFile(reqBod.document, token);
    if (mRes.ok) {
      const data = (await mRes.json()) as IUploadResult;
      uploadRes = data.fileUrl;
    }
  }

  // Check if the user is logged in
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/${reqBod.endpoint}/${(await params).id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value}`,
        },
        body: JSON.stringify(
          Object.assign(reqBod, { doc_link: uploadRes ?? "" })
        ),
      }
    );

    const data = await apiRes.json();
    return NextResponse.json(data, { status: apiRes.status });
  } catch (err) {
    console.error(`Failed to update company ${reqBod.type}`, err);
    return NextResponse.json(
      {
        message: `Failed to update company ${reqBod.type}. Check logs for detail.`,
      },
      { status: 500 }
    );
  }
}

function makeRequestBody(
  fd: FormData,
  company_id: number,
  method: "POST" | "PUT"
): IReqBody {
  const cId = fd.get("company_id") as string;
  const fname = fd.get("fname") as string; // stirng
  const lname = fd.get("lname") as string; // string
  const designation = fd.get("designation") as string; // string
  const phone_no = fd.get("phone_no") as string; // string
  const email = fd.get("email") as string; // string
  const document = fd.get("document") as File | undefined; // file
  const offence_history = fd.get("offence_history") as string; // string
  const is_same_as_key_contact = Boolean(
    fd.get("is_same_as_key_contact") as string
  );
  const type = fd.get("type") as
    | "Authorised Personnel"
    | "Key Contact"
    | "Level 1 User"; // enum("Authorised Personnel" | "Key Contact" | "Level 1 User")

  var endpoint = "";
  switch (type) {
    case "Authorised Personnel":
      endpoint = `my-company/${
        method === "POST" ? "create" : "update"
      }/company-authorised-details`;
      break;
    case "Key Contact":
      endpoint = "my-company/company-key-contacts";
      break;
    case "Level 1 User":
      endpoint = "my-company/company-l1-users";
      break;
  }

  return {
    company_id: Number.parseInt(cId),
    fname,
    lname,
    designation,
    phone_no,
    email,
    document,
    doc_link: "",
    offence_history,
    endpoint,
    type,
    is_same_as_key_contact,
  };
}
