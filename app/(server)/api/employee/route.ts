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
  const is_foreign = fd.get("is_foreign") ?? "0";
  const emp_type_id = fd.get("emp_type_id") as string;

  const reqBody = {
    email,
    fname,
    lname,
    middleName,
    company_id,
    department_id,
    designation_id,
    employment_type: 1,
    is_foreign,
    emp_type_id: emp_type_id ? Number.parseInt(emp_type_id) : undefined,
  };

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
      `${process.env.API_BASE_URL}/employee/admin/on-board-employee`,
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

  console.log("Trying to delete usercompany:", data.user_company_id);

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/companies/my/remove-user/${data.user_company_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.value}`,
        },
      }
    );

    const mData = await apiRes.json();

    return NextResponse.json(
      { message: mData.message },
      { status: apiRes.status }
    );
  } catch (err) {
    console.error(
      "DELETE > Delete Company Employee > Failed to delete company employee",
      err
    );
    return NextResponse.json(
      { message: "Failed to delete company employee" },
      { status: 500 }
    );
  }
}
