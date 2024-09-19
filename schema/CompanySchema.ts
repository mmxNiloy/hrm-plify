import { IDesignation } from "./DesignationSchema";
import {
  IEmployee,
  IEmployeeWithPersonalInfo,
  IEmployeeWithUserMetadata,
} from "./EmployeeSchema";
import { IPaginatedResponse } from "./PaginatedResponse";
import { IShift } from "./RotaSchema";

export interface ICompany {
  company_id: number;
  company_name: string;
  industry?: string;
  headquarters?: string;
  founded_year?: number;
  website?: string;
  logo?: string;
  created_at: Date;
  updated_at: Date;
  contact_number?: string;
  is_active: number;
}

export interface ICompanyWithEmployeeMeta extends ICompany {
  total_employees: number;
  total_migrant_employees: number;
  company_authorized_details?: ICompanyAuthorisedDetails;
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

export interface IPaginatedCompany extends IPaginatedResponse {
  data: ICompany[];
}

export interface ICompanyWithDesignationMeta extends ICompany {
  totalDesignations: number;
  designations: IDesignation[];
}

export interface ICompanyAddressBase {
  postcode: string;
  address_line_1?: string;
  address_line_2?: string;
  address_line_3?: string;
  city_county: string;
  country?: string;
}

export interface ICompanyAddress extends ICompanyAddressBase {
  address_id: number;
  company_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ICompanyAuthorizedDetailsBase {
  company_id: number;
  fname: string;
  lname: string;
  designation: string;
  phone_no: string;
  email: string;
  doc_link?: string;
  offence_history?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ICompanyAuthorisedDetails
  extends ICompanyAuthorizedDetailsBase {
  authorised_id: number;
}

export interface ICompanyDoc {
  doc_id: number;
  company_id: number;
  doc_type_id?: number;
  doc_name?: string;
  doc_link?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICompanyKeyContact extends ICompanyAuthorizedDetailsBase {
  key_contact_id: number;
}

export interface ICompanyL1User extends ICompanyAuthorizedDetailsBase {
  l1_user_id: number;
}

export interface ICompanyTradeDetailsBase {
  company_reg: string;
  type_of_company: string;
  trade_name: string;
  org_email: string;
  sector: string;
  change_of_name_5?: string;
  faced_penaly_org?: string;
}

export interface ICompanyTradeDetails extends ICompanyTradeDetailsBase {
  id: number;
  company_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ICompanyTradingHourBase {
  company_id: number;
  day_name:
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday";
  trade_status: number;
  opening_time?: string;
  closing_time?: string;
}

export interface ICompanyTradingHour extends ICompanyTradingHourBase {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ICompanyLeaveApprover {
  approver_id: number;
  company_id: number;
  employee_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ICompanyTradeData {
  company_trade_details?: ICompanyTradeDetails;
  company_trading_hour: ICompanyTradingHour[];
}

export interface ICompanyDetails extends ICompany, ICompanyTradeData {
  company_address?: ICompanyAddress;
  company_authorised_details?: ICompanyAuthorisedDetails;
  company_doc_db?: ICompanyDoc[];
  company_key_contact?: ICompanyKeyContact;
  company_l1_user?: ICompanyL1User;
  leave_approvers?: ICompanyLeaveApprover[];
}

export interface IDepartment {
  department_id: number;
  company_id: number;
  created_at?: Date;
  updated_at?: Date;
  dpt_name: string;
}

export interface ICompanyExtraData {
  message?: string;
  shifts: IShift[];
  departments: IDepartment[];
  designations: IDesignation[];
  employees: IEmployeeWithUserMetadata[];
}
