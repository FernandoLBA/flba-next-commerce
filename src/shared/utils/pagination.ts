/**
 * Esta función convierte el total, skip y limit a page y totalPages
 * para que funcione el paginado que ya tengo hecho.
 * @param param0
 * @returns
 */
export const toPagination = ({
  total,
  skip,
  limit,
}: {
  total: number;
  skip: number;
  limit: number;
}) => ({
  page: Math.floor(skip / limit) + 1,
  totalPages: Math.max(1, Math.ceil(total / limit)),
});
