import { ICompany } from "./CompanySchema";
import { IEmployee, IEmployeeWithUserMetadata } from "./EmployeeSchema";
import { IPaginatedResponse } from "./PaginatedResponse";

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IUserBase {
  user_id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  status: string;
  created_at: string;
  updated_at: string;
  middle_name: string;
}

export interface IUserWithEmployeeData extends IUserBase {
  employee_data?: IEmployee;
}

export interface IUser extends IUserBase {
  user_roles?: IUserRoles;
  usercompany?: ICompanyUser;
}

export interface IUserRoles {
  roles: IRoles;
}

export type TRole =
  | "Super Admin"
  | "Admin"
  | "Company Admin"
  | "Employee"
  | "Guest";

export interface IRoles {
  role_name: TRole;
}

export interface IPaginatedCompanyUser extends IPaginatedResponse {
  data: ICompanyUser[];
}

export interface ICompanyUser {
  user_company_id: number;
  user_id: number;
  company_id: number;
  company_role_id: number;
  created_at: string;
  updated_at: string;
  isActive: boolean;
  users: IUserWithEmployeeData;
  roles: ICompanyUserRoles;
  companies?: ICompany;
}

export interface ICompanyUserRoles {
  role_id: number;
  role_name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserConfig {
  employee_id: number;
  company_id: number;
  email: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;

  // employee data
  employees?: IEmployeeWithUserMetadata;
}

export interface IEmployeeUserRole {
  company_id: number;
  employee_id: number;
  module_name: string;
  access: string;
  permissions: string;

  employees?: IEmployeeWithUserMetadata;
}
