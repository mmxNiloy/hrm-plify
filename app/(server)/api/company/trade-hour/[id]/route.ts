import { ICompanyTradingHourBase } from "@/schema/CompanySchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { IDProps } from "../../../apiParams";
import { weekDays } from "@/utils/Misc";

export async function POST(req: NextRequest, { params }: IDProps) {
  const fd = await req.formData();
  const day_name = weekDays;
  const trade_status = day_name.map(
    (day) => fd.get(`${day.toLowerCase()}_trade_status`) as "open" | "close"
  );
  const opening_time = day_name.map(
    (day) => fd.get(`${day.toLowerCase()}_opening_time`) as string
  );
  const closing_time = day_name.map(
    (day) => fd.get(`${day.toLowerCase()}_closing_time`) as string
  );

  // console.log("Trading hours edit endpoint >", {
  //   trade_status,
  //   opening_time,
  //   closing_time,
  // });

  const company_id = (await params).id;

  const reqBod: ICompanyTradingHourBase[] = day_name.map((day, index) => ({
    company_id: Number.parseInt(company_id),
    day_name: day as
      | "Sunday"
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday",
    trade_status: trade_status[index] == "open" ? 1 : 0,
    opening_time: opening_time[index] ?? "00:00",
    closing_time: closing_time[index] ?? "00:00",
  }));

  // console.log("POST > Trade Hours > Request Body >", reqBod);

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
      `${process.env.API_BASE_URL}/my-company/company-trading-hours`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value}`,
        },
        body: JSON.stringify(reqBod),
      }
    );

    const data = await apiRes.json();
    console.log("API > Company > Trading hours >", data);
    return NextResponse.json(data, { status: apiRes.status });
  } catch (err) {
    console.error(`Failed to update company trading hours.`, err);
    return NextResponse.json(
      {
        message: `Failed to update company trading hours. Check logs for detail.`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: IDProps) {
  const fd = await req.formData();
  const day_name = weekDays;
  const trade_status = day_name.map(
    (day) => fd.get(`${day.toLowerCase()}_trade_status`) as "open" | "close"
  );
  const opening_time = day_name.map(
    (day) => fd.get(`${day.toLowerCase()}_opening_time`) as string
  );
  const closing_time = day_name.map(
    (day) => fd.get(`${day.toLowerCase()}_closing_time`) as string
  );

  // console.log("Trading hours edit endpoint >", {
  //   trade_status,
  //   opening_time,
  //   closing_time,
  // });

  const company_id = (await params).id;

  const reqBod: ICompanyTradingHourBase[] = day_name.map((day, index) => ({
    company_id: Number.parseInt(company_id),
    day_name: day as
      | "Sunday"
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday",
    trade_status: trade_status[index] == "open" ? 1 : 0,
    opening_time: opening_time[index] ?? "00:00",
    closing_time: closing_time[index] ?? "00:00",
  }));

  // console.log("PUT > Trade Hours > Request Body >", reqBod);

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
      `${process.env.API_BASE_URL}/my-company/company-trading-hours`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.value}`,
        },
        body: JSON.stringify(reqBod),
      }
    );

    const data = await apiRes.json();
    console.log("API > Company > Trading hours >", data);
    return NextResponse.json(data, { status: apiRes.status });
  } catch (err) {
    console.error(`Failed to update company trading hours.`, err);
    return NextResponse.json(
      {
        message: `Failed to update company trading hours. Check logs for detail.`,
      },
      { status: 500 }
    );
  }
}
