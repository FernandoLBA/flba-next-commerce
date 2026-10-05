export type AppPagination<TKey extends string, TItem> = Record<
  TKey,
  TItem[]
> & {
  totalPages: number;
  page: number;
  totalItems: number;
};
