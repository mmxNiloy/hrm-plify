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

export interface IUser extends IUserBase {
  company_id?: number;
  user_roles: IUserRoles;
}

export interface IUserRoles {
  roles: IRoles;
}

export interface IRoles {
  role_name: "Super Admin" | "Admin" | "Company Admin" | "Employee" | string;
}

export interface ICompanyUser {
  user_company_id: number;
  user_id: number;
  company_id: number;
  company_role_id: number;
  created_at: string;
  updated_at: string;
  isActive: boolean;
  users: IUserBase;
  roles: ICompanyUserRoles;
}

export interface ICompanyUserRoles {
  role_id: number;
  role_name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}
