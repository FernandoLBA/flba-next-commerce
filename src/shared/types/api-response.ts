export type ApiResponse<T> = {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
};

export type Pagination<T> = {
  data: T[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  currentPageItem: number;
  nextPage: boolean;
  previousPage: boolean;
};

export type PaginatedResponse<T> = ApiResponse<Pagination<T>>;
