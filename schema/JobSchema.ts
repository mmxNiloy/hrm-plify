import { ICompany, IDepartment } from "./CompanySchema";
import { IDesignation } from "./DesignationSchema";
import { IPaginatedResponse } from "./PaginatedResponse";

export interface IJobListing {
  id: number;
  employee_id: number;
  company_id: number;
  designation_id: number;
  dept_id: number;
  title: string;
  lastDate: Date;
  jobCode: string;
  isPublished: number;
  desc?: string; // Description
  status?: number;
  created_at?: Date;
  updated_at?: Date;

  company?: ICompany;
  department?: IDepartment;
  designation?: IDesignation;
}

export interface IPaginatedJobListing extends IPaginatedResponse {
  data: IJobListing[];
}

export interface IJobApplicant {
  id: number;
  job_id: number;
  company_id: number;

  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  cv_url: string; // Resume/CV
  cover_letter_url?: string;

  job_status?: string; // Handled in the server
  uni_key: string; // Send empty string. Ignore this

  last_date?: Date;
  job?: IJobListing;
}

export interface IPaginatedJobApplicants extends IPaginatedResponse {
  data: IJobApplicant[];
}

export interface IJobStat {
  company_id: number;
  job_status: string;
  month: string;
  year: string;
  total: string;
}
