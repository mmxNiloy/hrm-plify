export interface ITax {
  tax_id: number;
  company_id: number;
  tax_code: string;
  percentage: number;
  tax_reference: string;
  created_at?: Date;
  updated_at?: Date;
}
