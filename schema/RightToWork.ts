import { IEmployeeWithUserMetadata } from "./EmployeeSchema";
import { IPaginatedResponse } from "./PaginatedResponse";

export interface IRightToWork {
  id: number;
  employee_id: number;
  company_id: number;
  date_of_check: Date;
  type_of_check: string;

  // Additional data goes here
  employees?: IEmployeeWithUserMetadata;
}

export interface IPaginatedRTW extends IPaginatedResponse {
  data: IRightToWork[];
}
