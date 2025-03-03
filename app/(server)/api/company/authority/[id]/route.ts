import { upload } from "@/app/(server)/actions/upload";
import { ICompanyAuthorizedDetailsBase } from "@/schema/CompanySchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { IDProps } from "../../../apiParams";

interface IReqBody extends ICompanyAuthorizedDetailsBase {
  endpoint: string;
  document?: File;
  type: "Authorised Personnel" | "Key Contact" | "Level 1 User";
  is_same_as_key_contact: boolean;
}

export async function POST(req: NextRequest, { params }: IDProps) {
  const fd = await req.formData();

  const reqBod = makeRequestBody(
    fd,
    Number.parseInt((await params).id),
    "POST"
  );

  console.log(
    "POST > Create Company Authorized Details > Request Body >",
    reqBod
  );

  // Check if the user is logged in
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  // try to upload the document here
  var uploadRes = undefined;
  if (reqBod.document) {
    uploadRes = await upload(reqBod.document);
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
          Object.assign(reqBod, { doc_link: uploadRes?.data?.fileUrl ?? "" })
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

  // try to upload the document here
  var uploadRes = undefined;
  if (reqBod.document) {
    uploadRes = await upload(reqBod.document);
  }

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
      `${process.env.API_BASE_URL}/${reqBod.endpoint}/${(await params).id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value}`,
        },
        body: JSON.stringify(
          Object.assign(reqBod, { doc_link: uploadRes?.data?.fileUrl ?? "" })
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
    company_id,
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
