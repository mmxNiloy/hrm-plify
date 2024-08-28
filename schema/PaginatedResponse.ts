export interface IPaginatedResponse<T> {
  total_page: number;
  data_count: number;
  next_page?: number;
  previous_page?: number;
  data: T[];
}
