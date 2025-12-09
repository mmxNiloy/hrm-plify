export interface IBank {
  id: number;
  company_id: number;
  author_id: number;
  name: string;
  shortcode?: string;
  created_at?: Date;
  updated_at?: Date;
}
