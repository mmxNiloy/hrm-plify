import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { IPaginatedDutyRosters } from "@/schema/RotaSchema";
import ReportPDFLayout from "./ReprotPDFLayout";
import { renderToStream } from "@react-pdf/renderer";

function makeQueryString(fd: FormData) {
  const { employee_id, from_date, end_date, department_id, shift_id } = {
    employee_id: fd.get("employee_id") as string | undefined,
    from_date: fd.get("from_date") as string | undefined,
    end_date: fd.get("end_date") as string | undefined,
    department_id: fd.get("department_id") as string | undefined,
    shift_id: fd.get("shift_id") as string | undefined,
  };

  return (
    (employee_id && employee_id.length > 0
      ? `employee_id=${employee_id}&`
      : "") +
    (from_date && from_date.length > 0 ? `from_date=${from_date}&` : "") +
    (end_date && end_date.length > 0 ? `end_date=${end_date}&` : "") +
    (department_id && department_id.length > 0
      ? `department_id=${department_id}&`
      : "") +
    (shift_id && shift_id.length > 0 ? `shift_id=${shift_id}` : "")
  );
}

export async function POST(req: NextRequest) {
  // Check if the user is logged in
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const fd = await req.formData();
  const company_id = fd.get("company_id") as string;

  try {
    const apiRes = await fetch(
      `${
        process.env.API_BASE_URL
      }/rota/duty-roaster/report/${company_id}?${makeQueryString(fd)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.value}`,
        },
      }
    );

    if (!apiRes.ok) {
      console.error(
        "POST > Generate Duty Roster Report PDF > Failed to get duty roster data >",
        await apiRes.json()
      );
      return NextResponse.json(
        { message: "Failed to get duty roster data" },
        { status: apiRes.status }
      );
    }

    const result = (await apiRes.json()) as IPaginatedDutyRosters;
    const stream = await renderToStream(<ReportPDFLayout data={result} />);
    return new NextResponse(stream as unknown as ReadableStream);
  } catch (err) {
    console.error(
      "POST > Generate Duty Roster Report PDF > Failed to get duty roster data >",
      err
    );
    return NextResponse.json(
      { message: "Failed to get duty roster data", err },
      { status: 500 }
    );
  }
}
