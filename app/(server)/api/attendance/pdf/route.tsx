import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { IPaginatedDutyRosters } from "@/schema/RotaSchema";
import ReportPDFLayout from "./ReprotPDFLayout";
import { renderToStream } from "@react-pdf/renderer";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getAttendanceReports } from "@/app/(server)/actions/getAttendanceReports";

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
  const session = (await cookies()).get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  const fd = await req.formData();
  const company_id = Number.parseInt(fd.get("company_id") as string);
  const filters = {
    employee_id: Math.max(
      0,
      Number.parseInt((fd.get("employee_id") as string | undefined) ?? "0")
    ),
    from_date: fd.get("from_date") as string | undefined,
    to_date: fd.get("to_date") as string | undefined,
    sort: (fd.get("sort") as string | undefined) ?? "DESC",
  };

  const company = await getCompanyData(company_id);
  const attendance = await getAttendanceReports({
    company_id,
    limit: 10,
    page: 1,
    filters,
  });

  if (attendance.error) {
    return NextResponse.json(attendance.error, { status: 500 });
  }

  const stream = await renderToStream(
    <ReportPDFLayout data={attendance.data} />
  );
  return new NextResponse(stream as unknown as ReadableStream);
}
