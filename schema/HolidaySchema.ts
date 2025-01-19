export interface IHolidayType {
  id: number;
  company_id: number;
  holiday_type_name: string;
  is_active?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IHoliday {
  holiday_id: number;
  holiday_type: number; /// Holiday type id
  holiday_name: string;
  holiday_desc: string; /// Holiday Description
  company_id: number;
  start_time: Date;
  end_time: Date;
  created_at?: Date;
  updated_at?: Date;
  type_data?: IHolidayType;
  is_active?: number;
}

export interface IHolidayWithHolidayTypes extends IHoliday {
  company_holiday_types: IHolidayType[];
}
