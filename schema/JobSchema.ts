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
}

export interface IPaginatedJobListing extends IPaginatedResponse {
  data: IJobListing[];
}
