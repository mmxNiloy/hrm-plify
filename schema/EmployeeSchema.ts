export interface IEmployee {
  employee_id: string;
  employee_name: string;
  dob?: Date;
  mobile: string;
  email: string;
  designation?: string;
  nationality?: string;
  ni_number?: string;
  visa_expired?: Date;
  passport_number: string;
  address: string;
}

export interface IChangeOfCircumstances {
  updated_date: Date;
  employment_type: string;
  employee_id: string;
  employee_name: string;
  job_title: string;
  address: string;
  contact: string;
  nationality: string;
  brp: string;
  visa_expired: Date;
  remarks: string;
  passport_number: string;
  euss_details: string;
  dbs_details: string;
  national_id_details: string;
  other_documents: string;
  is_informed: string;
  is_cooperative: string;
  annual_reminder_date?: Date;

  department?: string;
  ni_number?: string;
  post_code?: string;
  address_line_1?: string;
  address_line_2?: string;
  address_line_3?: string;
  city?: string;
  country?: string;
  proof_of_address?: string;

  euss_reference_number?: string;
  euss_date_issued?: string;
  euss_expiry_date?: Date;
  euss_eligible_review_date?: Date;
  euss_current_status?: "yes" | "no";
  euss_remarks?: string;

  national_id_number?: string;
  nid_date_issued?: Date;
  nid_expiry_date?: Date;
  nid_eligible_review_date?: Date;
  nid_current_status?: "yes" | "no";
  nid_remarks?: string;

  passport_nationality?: string;
  place_of_birth?: string;
  passport_issued_by?: string;
  passport_date_issued?: Date;
  passport_expiry_date?: Date;
  passport_eligible_review_date?: Date;
  passport_current_document?: "yes" | "no";
  passport_remarks?: string;

  visa_number?: string;
  visa_nationality?: string;
  country_of_residence?: string;
  visa_issued_by?: string;
  visa_date_issued?: Date;
  visa_expiry_date?: Date;
  visa_eligible_review_date?: Date;
  visa_current_document?: "yes" | "no";
  visa_remarks?: string;
}

export interface IContractAgreement {
  employment_type: string;
  employee_id: string;
  employee_name: string;
  dob: Date;
  mobile: string;
  nationality: string;
  ni_number: string;
  visa_expired: Date;
  passport_number: string;
  address: string;
  agreement_word_document_url?: string;
  agreement_pdf_document_url?: string;
}
