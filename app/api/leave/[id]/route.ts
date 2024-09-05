import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: number;
  };
}

export async function GET(req: NextRequest, { params }: Props) {
  const currentYear = new Date().getFullYear();
  // TODO: Use our API to fetch leave days of the year by company ID
  //! Current API requests sent to a 3rd party service provider.
  const apiRes = await fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/GB`
  );
  if (apiRes.ok) {
    return NextResponse.json(await apiRes.json(), { status: 200 });
  }

  return NextResponse.json({ message: "Failed to get holidays" });
}
