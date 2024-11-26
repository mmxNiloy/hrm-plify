import { IEmployeeWithUserMetadata } from "./EmployeeSchema";
import { IPaginatedResponse } from "./PaginatedResponse";

export interface IRightToWorkBase {
  employee_id: number;
  date_of_check: string;
  type_of_check: string;
  medium_of_check: string;
  evidence_presented: string;
  time_of_check: string;
  list_a_options: string[];
  list_b_group_1_options: string[];
  list_b_group_2_options: string[];
  is_photo_consistent: string;
  is_dob_consistent: string;
  is_not_expired: string;
  is_not_restricted: string;
  is_doc_genuine: string;
  is_name_consistent: string;
  is_copied_from_list_a: boolean;
  is_copied_from_list_b_group_1: boolean;
  is_copied_from_list_b_group_2: boolean;
  has_passport_copy: string;
  has_all_other_docs: string;
  list_b_group_1_follow_up_date: string;
  list_b_group_2_follow_up_date: string;
  euss_follow_up_date: string;
  rtw_evidence_scan_1: string;
  rtw_evidence_scan_1_file?: File;
  rtw_evidence_scan_1_file_url?: string;
  rtw_evidence_scan_2: string;
  rtw_evidence_scan_2_file?: File;
  rtw_evidence_scan_2_file_url?: string;
  rtw_report_doc: string;
  rtw_report_doc_file?: File;
  rtw_report_doc_file_url?: string;
  rtw_check_result: string;
  checker_name: string;
  checker_designation: string;
  checker_contact: string;
  checker_email: string;
  rtw_remarks: string;
}

export interface IRightToWork extends IRightToWorkBase {
  // Additional data goes here
  employee?: IEmployeeWithUserMetadata;
  company_employees?: IEmployeeWithUserMetadata[];
}

export interface IPaginatedRTW extends IPaginatedResponse {
  data: {
    body: IRightToWorkBase;
    employee: IEmployeeWithUserMetadata;
  }[];
}
