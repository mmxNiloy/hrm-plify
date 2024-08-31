export interface IPaginatedResponse {
  total_page: number;
  data_count: number;
  next_page?: number;
  previous_page?: number;
  data: any[];
}
