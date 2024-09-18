"use server";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export async function getCompanyData(company_id: number) {
  // Get company information
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  var company: ICompany;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/companies/${company_id}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!apiRes.ok) notFound();
    company = (await apiRes.json()) as ICompany;
    // cookies().set(process.env.COOKIE_COMPANY_KEY!, JSON.stringify(company));
    return company;
  } catch (err) {
    console.error("Failed to fetch company information", err);
    notFound();
  }
}
