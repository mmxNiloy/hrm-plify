import { IPaginatedResponse } from "./PaginatedResponse";

export interface ICompany {
  company_id: number;
  company_name: string;
  industry: string;
  headquarters: string;
  founded_year: number;
  website: string;
  logo: string;
  created_at: string;
  updated_at: string;
  contact_number: string;
  is_active: number;
}

export interface ICompanyCreationBody {
  company_name: string;
  industry: string;
  headquarters: string;
  founded_year: number;
  website: string;
  logo: string;
  contact_number: string;
}

export interface IPaginatedCompany extends IPaginatedResponse<ICompany> {}
