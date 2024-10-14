export interface IPaymentType {
  company_id: number;
  payment_type_id: number;
  payment_type_name: string;
  min_hours: number;
  rate: string;
  created_at?: Date;
  updated_at?: Date;
}
