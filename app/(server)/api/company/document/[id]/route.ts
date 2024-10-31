import { NextRequest, NextResponse } from "next/server";
import { IDProps } from "../../../apiParams";

export async function POST(req: NextRequest, { params }: IDProps) {
  const fd = await req.formData();
  const doc_name = fd.get("doc_name"); // stirng
  const doc_type = fd.get("doc_type"); // string
  const doc_file = fd.get("doc_file"); // file

  return NextResponse.json(
    {
      message: "TODO: Integrate with the server when it's ready",
      data: {
        company_id: (await params).id,
        doc_name: doc_name as string,
        doc_type: doc_type as string,
        doc_file: (doc_file as File).name,
      },
    },
    { status: 501 }
  );
}

export async function PUT(req: NextRequest, { params }: IDProps) {
  const fd = await req.formData();
  const doc_name = fd.get("doc_name"); // stirng
  const doc_type = fd.get("doc_type"); // string
  const doc_file = fd.get("doc_file"); // file

  return NextResponse.json(
    {
      message: "TODO: Integrate with the server when it's ready",
      data: {
        company_id: (await params).id,
        doc_name: doc_name as string,
        doc_type: doc_type as string,
        doc_file: (doc_file as File).name,
      },
    },
    { status: 501 }
  );
}
