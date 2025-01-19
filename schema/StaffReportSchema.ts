import { IEmployeeWithUserMetadata } from "./EmployeeSchema";
import { IPaginatedResponse } from "./PaginatedResponse";

export interface IPaginatedStaffReport extends IPaginatedResponse {
  data: IEmployeeWithUserMetadata[];
}
