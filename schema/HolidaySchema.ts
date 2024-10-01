export interface IHolidayType {
  holiday_type_id: number;
  company_id: number;
  holiday_type_name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IHoliday {
  holiday_id: number;
  company_id: number;
  start_date: Date;
  end_date: Date;
  holiday_type_id: number;
  created_at?: Date;
  updated_at?: Date;

  holiday_types?: IHolidayType;
}

export interface IHolidayWithHolidayTypes extends IHoliday {
  company_holiday_types: IHolidayType[];
}
