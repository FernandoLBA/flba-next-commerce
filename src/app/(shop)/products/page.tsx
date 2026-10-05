import {
  buildProductsHref,
  getCategories,
  getProducts,
  parseProductFilters,
  type ProductCategory,
  ProductsFeatureView,
} from "@/features/products";
import { appMessages } from "@/shared/constants/app.messages";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ProductListingPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const generateMetadata = async ({
  searchParams,
}: ProductListingPageProps): Promise<Metadata> => {
  const { category, q, sortBy, page } = parseProductFilters(await searchParams);

  return {
    title: q
      ? `${appMessages.PRODUCTS.SEARCH_TITLE} «${q}»`
      : appMessages.PRODUCTS.TITLE,
    // La búsqueda y el orden repiten contenido: apuntan a la versión sin ellos.
    alternates: { canonical: buildProductsHref({ category, page }) },
    robots: q || sortBy ? { index: false, follow: true } : undefined,
  };
};

const ProductListingPage = async ({
  searchParams,
}: ProductListingPageProps) => {
  const filters = parseProductFilters(await searchParams);
  const [res, categories] = await Promise.all([
    getProducts(filters),
    getCategories().catch((): ProductCategory[] => []),
  ]);

  const unknownCategory =
    filters.category &&
    categories.length > 0 &&
    !categories.some((category) => category.slug === filters.category);

  if (unknownCategory) notFound();
  if ((filters.page ?? 1) > res.totalPages) notFound();

  return <ProductsFeatureView paginatedProducts={res} filters={filters} />;
};

export default ProductListingPage;
