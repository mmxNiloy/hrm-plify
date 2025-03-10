export interface IContactDemo {
  id: number;
  email: string;
  contact_num?: string;
  is_demo_call?: boolean;
  first_name: string;
  last_name: string;
  message?: string;

  created_at?: Date;
  updated_at?: Date;
}
