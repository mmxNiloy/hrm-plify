interface PersonalDetails {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  contact: string;
  alt_contact: string;
  gender: "male" | "female" | "n/a";
  nationality: string;
}

interface ServiceDetails {
  department: string;
  designation: string;
  date_of_joining: Date;
  employee_type: string;
  date_of_confirmation: Date;
  contract_start_date: Date;
  contract_end_date: Date;
  job_location: string;
}

export interface EmployeeCreationForm extends PersonalDetails, ServiceDetails {}
