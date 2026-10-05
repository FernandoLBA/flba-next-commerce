export type PaginatedResponse<TKey extends string, TItem> = Record<
  TKey,
  TItem[]
> & {
  total: number;
  skip: number;
  limit: number;
};
