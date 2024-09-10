import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Create a new employee, hit central api, get response, notify client
export async function POST(req: NextRequest) {
  const fd = await req.formData();
  const email = fd.get("email") as string;
  const fname = fd.get("fname") as string;
  const lname = fd.get("lname") as string;
  const middleName = fd.get("middleName") as string;
  const company_id = Number.parseInt(fd.get("company_id") as string);
  const department_id = Number.parseInt(fd.get("department_id") as string);
  const designation_id = Number.parseInt(fd.get("designation_id") as string);

  const reqBody = {
    email,
    fname,
    lname,
    middleName,
    company_id,
    department_id,
    designation_id,
  };

  // Check if the user is logged in
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!);
  if (!session || session.value.length < 1) {
    return NextResponse.json(
      { message: "Session expired. Login again." },
      { status: 401 }
    );
  }

  try {
    const apiRes = await fetch(
      `http://localhost:5000/api/employee/admin/on-board-employee`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value}`,
        },
        body: JSON.stringify(reqBody),
      }
    );

    const data = await apiRes.json();
    return NextResponse.json(data, { status: apiRes.status });
  } catch (err) {
    console.error("Failed to create new employee", err);
    return NextResponse.json(
      { message: "Failed to create new employee", err },
      { status: 500 }
    );
  }
}
