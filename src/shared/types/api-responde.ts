export type ApiResponse<T> = {
  data: Pagination<T>;
  message: string;
  statusCode: number;
  success: boolean;
};

export type Pagination<T> = {
  data: T;
  currentPageItem: number;
  limit: number;
  nextPage: boolean;
  page: number;
  previousPage: boolean;
  totalItems: number;
  totalPages: number;
};
