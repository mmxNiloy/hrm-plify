export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IUser {
  user_id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  status: string;
  created_at: string;
  updated_at: string;
  middle_name: string;
  company_id?: number;
  user_roles: IUserRoles;
}

export interface IUserRoles {
  roles: IRoles;
}

export interface IRoles {
  role_name: "Super Admin" | "Admin" | "Company Admin" | "Employee" | string;
}
