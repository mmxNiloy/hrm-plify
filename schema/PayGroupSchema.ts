export interface IPayGroup {
  company_id: number;
  pay_group_id: number;
  pay_group_name: string;
  is_active: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IAnnualPay {
  company_id: number;
  annual_pay_id: number;
  annual_pay_amount: number;
  pay_group_id: number;
  pay_groups?: IPayGroup;
  created_at?: Date;
  updated_at?: Date;
}
