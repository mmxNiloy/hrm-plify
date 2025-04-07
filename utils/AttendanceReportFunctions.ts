import { ESortFilter } from "@/schema/enum/sort-filter";

export interface AttendanceReportFilter {
  employee_ids: number[];
  sort: ESortFilter;
  from_date?: string;
  end_date?: string;
}

export function generateAttendanceReportFilterParams(
  filters?: AttendanceReportFilter
) {
  if (!filters) return "";

  var result = `&sort=${filters.sort}`;
  if (filters.from_date)
    result = result.concat(`&from_date=${filters.from_date}`);
  if (filters.end_date) result = result.concat(`&end_date=${filters.end_date}`);

  result = result.concat(
    `&employee_ids=${filters.employee_ids.join()}&employee_id=${
      filters.employee_ids.at(0) ?? "all"
    }`
  );
  return result;
}
