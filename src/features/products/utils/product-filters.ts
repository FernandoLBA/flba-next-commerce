import { appMessages } from "@/shared/constants/app.messages";
import { appRoutes } from "@/shared/constants/app.routes";
import type {
  ProductFilters,
  ProductSortBy,
  SortOrder,
} from "../types/product.types";

type RawSearchParams = Record<string, string | string[] | undefined>;

const text = appMessages.PRODUCTS;
const MAX_QUERY_LENGTH = 80;

/** Las únicas formas de ordenar que ofrece la interfaz. Todo lo demás se ignora. */
export const PRODUCT_SORT_OPTIONS = [
  { value: "", label: text.SORT_DEFAULT },
  { value: "price:asc", label: text.SORT_PRICE_ASC },
  { value: "price:desc", label: text.SORT_PRICE_DESC },
  { value: "rating:desc", label: text.SORT_RATING_DESC },
  { value: "title:asc", label: text.SORT_TITLE_ASC },
] as const;

type SortSelection = Pick<ProductFilters, "sortBy" | "order">;

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export const sortOptionValue = ({ sortBy, order }: SortSelection) =>
  sortBy && order ? `${sortBy}:${order}` : "";

export const parseSortOption = (value: string): SortSelection => {
  const option = PRODUCT_SORT_OPTIONS.find((o) => o.value === value);
  const [sortBy, order] = option?.value ? option.value.split(":") : [];

  return {
    sortBy: sortBy as ProductSortBy | undefined,
    order: order as SortOrder | undefined,
  };
};

/**
 * Convierte los `searchParams` de la URL (siempre texto, y a veces listas) en
 * filtros válidos. Es la frontera de confianza: lo que no se reconoce se descarta.
 */
export const parseProductFilters = (params: RawSearchParams): ProductFilters => {
  const category = firstValue(params.category)?.trim();
  const q = firstValue(params.q)?.trim().slice(0, MAX_QUERY_LENGTH);
  const page = Number(firstValue(params.page));
  // parseSortOption descarta lo que no sea una de las opciones de la interfaz.
  const sort = parseSortOption(
    `${firstValue(params.sortBy)}:${firstValue(params.order)}`,
  );

  return {
    category: category || undefined,
    q: q || undefined,
    ...sort,
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
};

export const buildProductsHref = (filters: ProductFilters = {}) => {
  const params = new URLSearchParams();

  if (filters.category) params.set("category", filters.category);
  if (filters.q) params.set("q", filters.q);
  if (filters.sortBy && filters.order) {
    params.set("sortBy", filters.sortBy);
    params.set("order", filters.order);
  }
  if (filters.page && filters.page > 1) {
    params.set("page", String(filters.page));
  }

  const query = params.toString();

  return query
    ? `${appRoutes.PRODUCTS.BASE}?${query}`
    : appRoutes.PRODUCTS.BASE;
};
