import { NextRequest, NextResponse } from "next/server";

// Example data
const types = ["full-time", "contractual", "suspended", "part-time", "left"];
const exampleData = Array.from(
  { length: types.length * 3 },
  (_, index) => `Example Employee (EMP-${101 + index})`
);

export async function GET(req: NextRequest) {
  var emp_type = req.nextUrl.searchParams.get("employment_type");

  if (!emp_type)
    return NextResponse.json(
      { message: "Parameter for employment type is required." },
      { status: 400 }
    );
  else emp_type = decodeURIComponent(emp_type);

  const start = types.indexOf(emp_type);
  if (start == -1)
    return NextResponse.json({ message: "No data found" }, { status: 404 });

  return NextResponse.json(exampleData.slice(start * 3, start * 3 + 3), {
    status: 200,
  });
}
