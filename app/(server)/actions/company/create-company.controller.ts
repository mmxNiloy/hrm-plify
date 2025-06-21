"use server";

import { ICompany } from "@/schema/CompanySchema";
import executeRequest from "../network/request-builder.service";

interface IReqBody {
  company_name: string;
  industry: string;
  headquarters: string;
  founded_year: number;
  website?: string;
  logo: string;
  contact_number: string;
  is_current_user_owner?: boolean;
  is_active: number;
}

export default async function createCompany(data: IReqBody) {
  return await executeRequest<ICompany>({
    method: "POST",
    endpoint: ["v2", "company", "create"].join("/"),
    body: JSON.stringify(data),
  });
}
