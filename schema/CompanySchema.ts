import { IPaginatedResponse } from "./PaginatedResponse";

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

export interface ICompanyAddress {
  address_id: number;
  company_id: number;
  postcode: string;
  address_line_1?: string;
  address_line_2?: string;
  address_line_3?: string;
  city_county: string;
  country?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICompanyAuthorisedDetails {
  authorised_id: number;
  company_id: number;
  fname: string;
  lname: string;
  designation: string;
  phone_no: string;
  email: string;
  doc_link?: string;
  offence_history?: string;
  created_at: Date;
  updated_at: Date;
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

export interface ICompanyKeyContact
  extends Exclude<ICompanyAuthorisedDetails, "authorised_id"> {
  key_contact_id: number;
}

export interface ICompanyL1User
  extends Exclude<ICompanyAuthorisedDetails, "authorised_id"> {
  l1_user_id: number;
}

export interface ICompanyTradeDetails {
  id: number;
  company_id: number;
  company_reg: string;
  type_of_company: string;
  trade_name: string;
  org_email: string;
  sector: string;
  change_of_name_5?: string;
  faced_penaly_org?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICompanyTradingHour {
  id: number;
  company_id: number;
  day_name: string;
  trade_status: number;
  opening_time?: string;
  closing_time?: string;
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
