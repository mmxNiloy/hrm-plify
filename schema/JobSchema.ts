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
