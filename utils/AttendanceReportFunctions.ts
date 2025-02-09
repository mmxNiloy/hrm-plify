export interface AttendanceReportFilter {
  employee_id?: number;
  sort: string;
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
  if (filters.employee_id)
    result = result.concat(
      `&employee_id=${filters.employee_id == 0 ? "all" : filters.employee_id}`
    );
  return result;
}
