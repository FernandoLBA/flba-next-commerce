type ToPaginationParams = {
  total: number;
  skip: number;
  limit: number;
};

/**
 * Convierte total, skip y limit a page y totalPages, que son los que usan la
 * interfaz y la URL.
 * @param param0
 * @returns
 */
export const toPagination = ({ total, skip, limit }: ToPaginationParams) => {
  const pageSize = Math.max(1, limit);

  return {
    page: Math.floor(skip / pageSize) + 1,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
};
