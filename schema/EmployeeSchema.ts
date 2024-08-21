export interface IEmployee {
  employee_id: string;
  employee_name: string;
  dob?: Date;
  mobile: string;
  email: string;
  designation?: string;
  nationaility?: string;
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
}
